/* eslint-disable @typescript-eslint/ban-types */

import { Helper } from '../../shared/application'
import { h3lp } from 'h3lp'
import { QueryOptions, QueryPlan } from '../../query/domain'
import { Dialect, Schema, Stage } from '../../schema/domain'
import { MetadataParameter, MetadataConstraint, MetadataModel, Metadata } from '../../sentence/domain'
import { SchemaFacade } from '../../schema/application'
import { ConnectionFacade } from '../../connection/application'
import { LanguagesService } from '../../language/application'
import { StageFacade } from '../../stage/application'
import { ExpressionFacade, ExpressionTransaction } from '../../expressions/application'
import { SentenceFacade } from '../../sentence/application'
import { IOrm } from '../application'
import { ConnectionFacadeBuilder } from '../../connection/infrastructure'
import { OperandFacade } from '../../operand/application'
import { OrmExpressionsBuilder } from './expressionsBuilder'
import { Expressions, OperandHelper } from '3xpr'
import { OperandFacadeBuilder } from '../../operand/infrastructure'
import { SentenceFacadeBuilder } from '../../sentence/infrastructure/facadeBuilder'
import { ExpressionFacadeBuilder } from '../../expressions/infrastructure'
import { ExecutorBuilder } from '../../execution/infrastructure.ts'
import { SchemaFacadeBuilder } from '../../schema/infrastructure'
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
	public expressions:Expressions
	public schema: SchemaFacade
	public stage: StageFacade
	private helper: Helper
	private operand: OperandFacade
	private sentence: SentenceFacade
	private expression: ExpressionFacade
	private executor:ObservableExecutorDecorator

	constructor (workspace: string = process.cwd()) {
		this.expressions = new OrmExpressionsBuilder().build()
		new OrmLibrary(this).load()
		this.helper = new Helper(new OperandHelper(this.expressions.constBuilder), h3lp)
		this.language = new SentenceLanguageServiceBuilder(this.helper).build()
		this.connection = new ConnectionFacadeBuilder(this.helper).build()
		this.schema = new SchemaFacadeBuilder(this.expressions, this.helper).build(workspace)
		this.executor = new ExecutorBuilder(this.connection, this.language, this.expressions, this.helper).build(this.schema)
		this.operand = new OperandFacadeBuilder(this.expressions, this.helper).build(this.schema)
		this.sentence = new SentenceFacadeBuilder(this.expressions, this.helper).build(this.schema, this.operand)
		this.expression = new ExpressionFacadeBuilder(this.language, this.executor, this.expressions, this.helper).build(this.sentence, this.schema)
		this.stage = new StageFacadeBuilder(this.language, this.executor, this.helper).build(this.schema, this.expression)
	}

	// eslint-disable-next-line no-use-before-define
	private static _instance: Orm
	/**
  * Singleton
  */
	public static get instance (): Orm {
		if (!this._instance) {
			this._instance = new Orm()
		}
		return this._instance
	}

	public get defaultStage ():Stage {
		return this.schema.stage.get()
	}

	/**
 * initialize the orm library
 * @param source optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project
 * @returns promise void
 */
	public async init (source?: string | Schema, connect = true): Promise<Schema> {
		const schema = await this.schema.initialize(source || this.schema.workspace)
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
				this.expressions.addEnum(_enum.name, values)
			}
		}
		// start
		if (schema.application?.start) {
			for (const task of schema.application.start) {
				if (task.condition === undefined || this.expressions.eval(task.condition)) {
					await this.expressions.evalAsync(task.expression)
				}
			}
		}
		// add listeners
		if (schema.application?.listeners) {
			for (const listener of schema.application.listeners) {
				const observer = new ExecutionActionObserver(listener, this.expressions)
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
		const schema = this.schema.schema
		if (schema.application?.end) {
			for (const task of schema.application.end) {
				if (task.condition === undefined || this.expressions.eval(task.condition)) {
					await this.expressions.evalAsync(task.expression)
				}
			}
		}
		await this.connection.end()
	}

	/**
	 * Get workspace path
	 */
	public get workspace (): string {
		return this.schema.workspace
	}

	/**
	 * Get dialect of source
	 * @param source Name of source
	 * @returns
	 */
	public dialect (source:string): Dialect {
		return this.schema.source.get(source).dialect
	}

	/**
	 * Normalize expression
	 * @param expression query expression
	 * @returns Expression normalized
	 */
	public normalize(expression:Function): string
	public normalize(expression:string): string
	public normalize (expression: string|Function): string {
		const _expression = this.toExpression(expression)
		return this.operand.normalize(_expression)
	}

	/**
	 * Get model of expression
	 * @param expression query expression
	 * @returns Model of expression
	 */
	public model(expression:Function): MetadataModel[]
	public model(expression:string): MetadataModel[]
	public model (expression: string|Function): MetadataModel[] {
		const _expression = this.toExpression(expression)
		return this.sentence.model(_expression)
	}

	/**
	 * Get parameters of expression
	 * @param expression query expression
	 * @returns Parameters of expression
	 */
	public parameters(expression:Function): MetadataParameter[];
	public parameters(expression:string): MetadataParameter[];
	public parameters (expression: string|Function): MetadataParameter[] {
		const _expression = this.toExpression(expression)
		return this.sentence.parameters(_expression)
	}

	/**
	 * Get constraints of expression
	 * @param expression query expression
	 * @returns Constraints of expression
	 */
	public constraints(expression:Function): MetadataConstraint;
	public constraints(expression:string): MetadataConstraint;
	public constraints (expression: string|Function): MetadataConstraint {
		const _expression = this.toExpression(expression)
		return this.sentence.constraints(_expression)
	}

	/**
	 * Get metadata of expression
	 * @param expression query expression
	 * @returns metadata of expression
	 */
	public metadata(expression: Function): Metadata
	public metadata (expression:string):Metadata
	public metadata (expression: string|Function): Metadata {
		const _expression = this.toExpression(expression)
		return this.sentence.metadata(_expression)
	}

	/**
	 * Get getInfo of expression
	 * @param expression query expression
	 * @param options options of execution
	 */
	public plan(expression: Function, options?: QueryOptions): QueryPlan;
	public plan(expression: string, options?: QueryOptions): QueryPlan;
	public plan (expression: string|Function, options?: QueryOptions): QueryPlan {
		const _expression = this.toExpression(expression)
		const _options = options !== undefined && typeof options === 'string' ? JSON.parse(options) : options || {}
		return this.expression.plan(_expression, _options)
	}

	/**
	 * Execute expression
	 * @param expression query expression
	 * @param data Data with variables
	 * @param options options of execution
	 * @returns Result of execution
	 */
	public async execute(expression: Function, data?: any, options?: QueryOptions):Promise<any>;
	public async execute(expression: string, data?: any, options?: QueryOptions):Promise<any>;
	public async execute (expression: string|Function, data: any = {}, options?: QueryOptions): Promise<any> {
		if (expression === undefined || expression === null) {
			throw new Error('expression is empty')
		}
		const _expression = this.toExpression(expression)
		if (_expression === '') {
			throw new Error('expression is empty')
		}
		const _data = data !== undefined && typeof data === 'string' ? JSON.parse(data) : data || {}
		const _options = options !== undefined && typeof options === 'string' ? JSON.parse(options) : options || {}
		return this.expression.execute(_expression, _data, _options)
	}

	/**
	 * Create a transaction
	 * @param options options of execution
	 * @param callback Code to be executed in transaction
	 */
	public async transaction (options: QueryOptions|undefined, callback: { (tr: ExpressionTransaction): Promise<void> }): Promise<void> {
		return this.expression.transaction(options, callback)
	}

	private toExpression (expression:string|Function):string {
		return typeof expression !== 'string' ? this.expressions.convert(expression, 'function')[0] : expression
	}

	public subscribe (observer:ActionObserver):void {
		this.executor.subscribe(observer)
	}

	public unsubscribe (observer:ActionObserver): void {
		this.executor.unsubscribe(observer)
	}
}
export const orm = Orm.instance
