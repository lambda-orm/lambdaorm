/* eslint-disable @typescript-eslint/ban-types */

import { OrmH3lp } from '../../shared/infrastructure'
import { h3lp } from 'h3lp'
import { QueryOptions, MetadataParameter, MetadataConstraint, MetadataModel, Metadata, Dialect, Schema, Stage, QueryPlan, SchemaFacade, SchemaFacadeBuilder, SchemaState, SchemaStateBuilder, Logger, LoggerBuilder } from 'lambdaorm-base'
import { ConnectionFacade } from '../../connection/application'
import { LanguagesService } from '../../language/application'
import { StageFacade } from '../../stage/application'
import { ExpressionFacade, QueryTransaction } from '../../expressions/application'
import { SentenceFacade } from '../../sentence/application'
import { IOrm } from '../application'
import { ConnectionFacadeBuilder } from '../../connection/infrastructure'
import { OperandFacade } from '../../operand/application'
import { OrmExpressionsBuilder } from './expressionsBuilder'
import { Expressions } from '3xpr'
import { OperandFacadeBuilder } from '../../operand/infrastructure'
import { SentenceFacadeBuilder } from '../../sentence/infrastructure/facadeBuilder'
import { ExpressionFacadeBuilder } from '../../expressions/infrastructure'
import { ExecutorBuilder } from '../../execution/infrastructure.ts'
import { StageFacadeBuilder } from '../../stage/infrastructure'
import { SentenceLanguageServiceBuilder } from '../../sentence/infrastructure'
import { ExecutionActionObserver } from '../../execution/application'
import { ActionObserver, ObservableExecutorDecorator } from '../../execution/domain'
import { OrmLibrary } from './ormLibrary'

/**
 * Facade through which you can access all the functionalities of the library.
 */
export class Orm implements IOrm {
	public connection: ConnectionFacade
	public language: LanguagesService
	public exp:Expressions
	public schema: SchemaFacade
	public state: SchemaState
	public stage: StageFacade
	public helper: OrmH3lp
	private operand: OperandFacade
	private sentence: SentenceFacade
	private expression: ExpressionFacade
	private executor:ObservableExecutorDecorator

	constructor (private _logger?:Logger) {
		this._logger = _logger || new LoggerBuilder().build()
		this.helper = new OrmH3lp(h3lp, this._logger)
		this.exp = new OrmExpressionsBuilder(this.helper).build()
		new OrmLibrary(this).load()
		this.language = new SentenceLanguageServiceBuilder(this.helper).build()
		this.connection = new ConnectionFacadeBuilder(this.helper).build()
		this.schema = new SchemaFacadeBuilder(this.exp, this.helper).build()
		this.state = new SchemaStateBuilder(this.exp, this.schema, this.helper).build()
		this.executor = new ExecutorBuilder(this.connection, this.language, this.exp, this.helper).build(this.state)
		this.operand = new OperandFacadeBuilder(this.exp, this.helper).build(this.state)
		this.sentence = new SentenceFacadeBuilder(this.exp, this.helper).build(this.state, this.operand)
		this.expression = new ExpressionFacadeBuilder(this.language, this.executor, this.exp, this.helper).build(this.sentence, this.state)
		this.stage = new StageFacadeBuilder(this.language, this.executor, this.helper).build(this.state, this.expression)
	}

	public get logger ():Logger {
		return this._logger as Logger
	}

	public set logger (value:Logger) {
		this._logger = value
	}

	public get defaultStage ():Stage {
		return this.state.stage.get()
	}

	/**
 * initialize the orm library
 * @param source optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project
 * @returns promise void
 */
	public async init (source?: string | Schema, connect = true): Promise<Schema> {
		const schema = await this.state.load(source || process.cwd())
		// set connections
		if (connect && schema.infrastructure?.sources) {
			for (const source of schema.infrastructure.sources.filter(p => this.helper.val.isNotEmpty(p.connection))) {
				this.connection.load(source)
			}
		}
		// add enums
		if (schema.domain.enums) {
			for (const _enum of schema.domain.enums) {
				const values:[string, any][] = []
				if (_enum.values) {
					for (const enumValue of _enum.values) {
						values.push([enumValue.name, enumValue.value])
					}
				}
				this.exp.addEnum(_enum.name, values)
			}
		}
		// start
		if (schema.application?.start) {
			for (const task of schema.application.start) {
				if (task.condition === undefined || this.exp.eval(task.condition)) {
					await this.exp.evalAsync(task.expression)
				}
			}
		}
		// add listeners
		if (schema.application?.listeners) {
			for (const listener of schema.application.listeners) {
				const observer = new ExecutionActionObserver(listener, this.exp)
				this.subscribe(observer)
			}
		}
		return schema
	}

	/**
  * Frees the resources used, for example the connection pools
  */
	public async end (): Promise<void> {
		// ends task
		const schema = this.state.schema
		if (schema.application?.end) {
			for (const task of schema.application.end) {
				if (task.condition === undefined || this.exp.eval(task.condition)) {
					await this.exp.evalAsync(task.expression)
				}
			}
		}
		await this.connection.end()
	}

	/**
	 * Get dialect of source
	 * @param source Name of source
	 * @returns
	 */
	public dialect (source:string): Dialect {
		return this.state.source.get(source).dialect
	}

	/**
	 * Normalize query
	 * @param query query expression
	 * @returns Expression normalized
	 */
	public normalize(query:Function): string
	public normalize(query:string): string
	public normalize (query: string|Function): string {
		const expression = this.toExpression(query)
		return this.operand.normalize(expression)
	}

	/**
	 * Get model of query
	 * @param query query expression
	 * @returns Model of query
	 */
	public model(query:Function): MetadataModel[]
	public model(query:string): MetadataModel[]
	public model (query: string|Function): MetadataModel[] {
		const expression = this.toExpression(query)
		return this.sentence.model(expression)
	}

	/**
	 * Get parameters of query
	 * @param query query expression
	 * @returns Parameters of query
	 */
	public parameters(query:Function): MetadataParameter[];
	public parameters(query:string): MetadataParameter[];
	public parameters (query: string|Function): MetadataParameter[] {
		const expression = this.toExpression(query)
		return this.sentence.parameters(expression)
	}

	/**
	 * Get constraints of query
	 * @param query query expression
	 * @returns Constraints of query
	 */
	public constraints(query:Function): MetadataConstraint;
	public constraints(query:string): MetadataConstraint;
	public constraints (query: string|Function): MetadataConstraint {
		const expression = this.toExpression(query)
		return this.sentence.constraints(expression)
	}

	/**
	 * Get metadata of query
	 * @param query query expression
	 * @returns metadata of query
	 */
	public metadata(query: Function): Metadata
	public metadata (query:string):Metadata
	public metadata (query: string|Function): Metadata {
		const expression = this.toExpression(query)
		return this.sentence.metadata(expression)
	}

	/**
	 * Get getInfo of query
	 * @param query query expression
	 * @param options options of execution
	 */
	public plan(query: Function, options?: QueryOptions): QueryPlan;
	public plan(query: string, options?: QueryOptions): QueryPlan;
	public plan (query: string|Function, options?: QueryOptions): QueryPlan {
		const expression = this.toExpression(query)
		const _options = options !== undefined && typeof options === 'string' ? JSON.parse(options) : options || {}
		return this.expression.plan(expression, _options)
	}

	/**
	 * Execute query
	 * @param query query expression
	 * @param data Data with variables
	 * @param options options of execution
	 * @returns Result of execution
	 */
	public async execute(query: Function, data?: any, options?: QueryOptions):Promise<any>;
	public async execute(query: string, data?: any, options?: QueryOptions):Promise<any>;
	public async execute (query: string|Function, data: any = {}, options?: QueryOptions): Promise<any> {
		if (query === undefined || query === null) {
			throw new Error('query is empty')
		}
		const expression = this.toExpression(query)
		if (expression === '') {
			throw new Error('query is empty')
		}
		const _data = data !== undefined && typeof data === 'string' ? JSON.parse(data) : data || {}
		const _options = options !== undefined && typeof options === 'string' ? JSON.parse(options) : options || {}
		return this.expression.execute(expression, _data, _options)
	}

	/**
	 * Create a transaction
	 * @param options options of execution
	 * @param callback Code to be executed in transaction
	 */
	public async transaction (options: QueryOptions|undefined, callback: { (tr: QueryTransaction): Promise<void> }): Promise<void> {
		return this.expression.transaction(options, callback)
	}

	private toExpression (query:string|Function):string {
		return typeof query !== 'string' ? this.exp.convert(query, 'function')[0] : query
	}

	public subscribe (observer:ActionObserver):void {
		this.executor.subscribe(observer)
	}

	public unsubscribe (observer:ActionObserver): void {
		this.executor.unsubscribe(observer)
	}
}
export const orm = new Orm()
