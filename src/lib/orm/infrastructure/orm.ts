/* eslint-disable @typescript-eslint/ban-types */

import { helper } from '../../shared/application'
import { QueryOptions, QueryInfo, Query } from '../../query/domain'
import { Dialect, Schema, Stage } from '../../schema/domain'
import { MetadataParameter, MetadataConstraint, MetadataModel, Metadata } from '../../sentence/domain'
import { ActionObserver } from '../domain'
import { SchemaFacade } from '../../schema/application'
import { ConnectionFacade } from '../../connection/application'
import { LanguagesService } from '../../language/application'
import { StageFacade } from '../../stage/application'
import { ExecutionFacade } from '../../execution/application'
import { ExpressionTransaction, QueryFacade } from '../../expressions/application'
import { SentenceFacade } from '../../sentence/application'
import { IOrm, ExpressionActionObserver } from '../application'
import { ConnectionFacadeBuilder } from '../../connection/infrastructure'
import { OperandFacade } from '../../operand/application'
import { OrmExpressionsBuilder } from './expressionsBuilder'
import { Expressions } from '3xpr'
import { OperandFacadeBuilder } from '../../operand/infrastructure'
import { SentenceFacadeBuilder } from '../../sentence/infrastructure/facadeBuilder'
import { QueryFacadeBuilder } from '../../expressions/infrastructure'
import { ExecutionFacadeBuilder } from '../../execution/infrastructure.ts'
import { SchemaFacadeBuilder } from '../../schema/infrastructure'
import { StageFacadeBuilder } from '../../stage/infrastructure'
import { SentenceLanguageServiceBuilder } from '../../sentence/infrastructure'

/**
 * Facade through which you can access all the functionalities of the library.
 */
export class Orm implements IOrm {
	public connection: ConnectionFacade
	public language: LanguagesService
	public expressions:Expressions
	public schema: SchemaFacade
	public stage: StageFacade
	private operand: OperandFacade
	private sentence: SentenceFacade
	private query: QueryFacade
	private execution:ExecutionFacade
	private observers:ActionObserver[] = []

	constructor (workspace: string = process.cwd()) {
		this.language = new SentenceLanguageServiceBuilder().build()
		this.connection = new ConnectionFacadeBuilder().build()
		this.expressions = new OrmExpressionsBuilder().build()
		this.schema = new SchemaFacadeBuilder(this.expressions).build(workspace)
		this.execution = new ExecutionFacadeBuilder(this.connection, this.language, this.expressions).build(this.schema)
		this.operand = new OperandFacadeBuilder(this.expressions).build(this.schema)
		this.sentence = new SentenceFacadeBuilder(this.expressions).build(this.schema, this.operand)
		this.query = new QueryFacadeBuilder(this.language, this.execution, this.expressions).build(this.sentence, this.schema)
		this.stage = new StageFacadeBuilder(this.language).build(this.schema, this.query)
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
		if (connect && schema.data.sources) {
			for (const source of schema.data.sources.filter(p => helper.val.isNotEmpty(p.connection))) {
				this.connection.load(source)
			}
		}
		// add enums
		if (schema.model.enums) {
			for (const _enum of schema.model.enums) {
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
		if (schema.app.start) {
			for (const task of schema.app.start) {
				if (task.condition === undefined || this.expressions.eval(task.condition)) {
					this.expressions.eval(task.expression)
				}
			}
		}
		// add listeners
		if (schema.app.listeners) {
			for (const listener of schema.app.listeners) {
				const observer = new ExpressionActionObserver(listener, this.expressions)
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
		if (schema.app.end) {
			for (const task of schema.app.end) {
				if (task.condition === undefined || this.expressions.eval(task.condition)) {
					this.expressions.eval(task.expression)
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
	public getInfo(expression: Function, options?: QueryOptions): QueryInfo;
	public getInfo(expression: string, options?: QueryOptions): QueryInfo;
	public getInfo (expression: string|Function, options: QueryOptions|undefined): QueryInfo {
		const _expression = this.toExpression(expression)
		const _options = this.query.solveOptions(options)
		return this.query.getInfo(_expression, _options)
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
	public async execute (expression: string|Function, data: any = {}, options: QueryOptions|undefined = undefined): Promise<any> {
		const _expression = this.toExpression(expression)
		const _options = this.query.solveOptions(options)
		const query = this.query.build(_expression, _options)
		try {
			let result = null
			await this.beforeExecutionNotify(_expression, query, data, _options)
			if (this.observers.find(p => p.transactional === true) !== undefined) {
				// execute before and after listeners transactional
				this.query.transaction(_options, async (tr:ExpressionTransaction) => {
					await this.beforeExecutionNotify(_expression, query, data, _options, true)
					result = await tr.execute(_expression, data)
					await this.afterExecutionNotify(_expression, query, data, _options, result, true)
				})
			} else {
				result = await this.query.executeQuery(query, data, _options)
			}
			await this.afterExecutionNotify(_expression, query, data, _options, result)
			return result
		} catch (error) {
			await this.errorExecutionNotify(_expression, query, data, _options, error)
			throw error
		}
	}

	/**
	 * Create a transaction
	 * @param options options of execution
	 * @param callback Code to be executed in transaction
	 */
	public async transaction (options: QueryOptions|undefined, callback: { (tr: ExpressionTransaction): Promise<void> }): Promise<void> {
		const _options = this.query.solveOptions(options)
		return this.query.transaction(_options, callback)
	}

	private toExpression (expression:string|Function):string {
		return typeof expression !== 'string' ? this.expressions.convert(expression, 'function')[0] : expression
	}

	// Listeners and subscribers

	public subscribe (observer:ActionObserver):void {
		this.observers.push(observer)
	}

	public unsubscribe (observer:ActionObserver): void {
		const index = this.observers.indexOf(observer)
		if (index === -1) {
			throw new Error('Subject: Nonexistent observer.')
		}
		this.observers.splice(index, 1)
	}

	private async beforeExecutionNotify (expression:string, query: Query, data: any, options: QueryOptions, transactional = false):Promise<void> {
		const args = { expression, query, data, options }
		this.observers.filter(p => p.actions.includes(query.action) && helper.utils.nvl(p.transactional, false) === transactional).forEach(async (observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.before(args)
			} else {
				const context = { query, options }
				if (this.expressions.eval(observer.condition, context)) {
					await observer.before(args)
				}
			}
		})
	}

	private async afterExecutionNotify (expression:string, query: Query, data: any, options: QueryOptions, result:any, transactional = false):Promise<void> {
		const args = { expression, query, data, options, result }
		this.observers.filter(p => p.actions.includes(query.action) && helper.utils.nvl(p.transactional, false) === transactional).forEach(async (observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.after(args)
			} else {
				const context = { query, options }
				if (this.expressions.eval(observer.condition, context)) {
					await observer.after(args)
				}
			}
		})
	}

	private async errorExecutionNotify (expression:string, query: Query, data: any, options: QueryOptions, error:any):Promise<void> {
		const args = { expression, query, data, options, error }
		this.observers.filter(p => p.actions.includes(query.action)).forEach(async (observer:ActionObserver) => {
			if (observer.condition === undefined) {
				observer.error(args)
			} else {
				const context = { query, options }
				if (this.expressions.eval(observer.condition, context)) {
					await observer.error(args)
				}
			}
		})
	}
}
export const orm = Orm.instance
