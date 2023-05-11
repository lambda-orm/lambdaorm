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
import {
	MySQLConnectionPoolAdapter, MariaDBConnectionPoolAdapter, SqlServerConnectionPoolAdapter, PostgreSQLConnectionPoolAdapter,
	SQLjsConnectionPoolAdapter, OracleConnectionPoolAdapter, MongoDBConnectionPoolAdapter
} from '../../connection/infrastructure'
import { SqlLanguageAdapter, NoSqlLanguageAdapter } from '../../sentence/infrastructure'
import { IOrmExpressions } from '../../shared/domain'
import { MemoryCache } from 'h3lp'
import { OrmExpressions } from '../../shared/infrastructure'
import { OperandFacade } from '../../operand/application'
import { SentenceLibrary } from '../../sentence/application/services/library'

/**
 * Facade through which you can access all the functionalities of the library.
 */
export class Orm implements IOrm {
	// private _cache: Cache
	private stageFacade: StageFacade
	private connection: ConnectionFacade
	private languages: LanguagesService
	// private libManager: LibManager
	private operandFacade: OperandFacade
	private sentenceFacade: SentenceFacade
	private queryFacade: QueryFacade
	private execution:ExecutionFacade

	private schemaFacade: SchemaFacade
	private _expressions:IOrmExpressions
	private observers:ActionObserver[] = []

	constructor (workspace: string = process.cwd()) {
		this.connection = new ConnectionFacade()
		this.languages = new LanguagesService()
		this.languages.add(new SqlLanguageAdapter())
		this.languages.add(new NoSqlLanguageAdapter())
		this.connection.addDialect(Dialect.MySQL, MySQLConnectionPoolAdapter)
		this.connection.addDialect(Dialect.MariaDB, MariaDBConnectionPoolAdapter)
		this.connection.addDialect(Dialect.PostgreSQL, PostgreSQLConnectionPoolAdapter)
		this.connection.addDialect(Dialect.SqlServer, SqlServerConnectionPoolAdapter)
		this.connection.addDialect(Dialect.SQLjs, SQLjsConnectionPoolAdapter)
		this.connection.addDialect(Dialect.Oracle, OracleConnectionPoolAdapter)
		this.connection.addDialect(Dialect.MongoDB, MongoDBConnectionPoolAdapter)
		this._expressions = new OrmExpressions()
		new SentenceLibrary(this._expressions.model).load()
		this.schemaFacade = new SchemaFacade(workspace, this._expressions)
		this.execution = new ExecutionFacade(this.connection, this.languages, this.schemaFacade, this._expressions)
		const operandCache = new MemoryCache<string, string>()
		this.operandFacade = new OperandFacade(this.schemaFacade, operandCache)
		const sentenceCache = new MemoryCache<string, string>()
		this.sentenceFacade = new SentenceFacade(this.schemaFacade, this.operandFacade, this._expressions, sentenceCache)
		const queryCache = new MemoryCache<string, string>()
		this.queryFacade = new QueryFacade(this.sentenceFacade, this.schemaFacade, this.languages, this.execution, queryCache, this._expressions)
		this.stageFacade = new StageFacade(this.schemaFacade, this.queryFacade, this.languages, this.sentenceFacade)
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

	public get expressions (): IOrmExpressions {
		return this._expressions
	}

	public get defaultStage ():Stage {
		return this.schemaFacade.stage.get()
	}

	/**
 * initialize the orm library
 * @param source optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project
 * @returns promise void
 */
	public async init (source?: string | Schema, connect = true): Promise<Schema> {
		const schema = await this.schemaFacade.initialize(source || this.schemaFacade.workspace)
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
				this._expressions.addEnum(_enum.name, values)
			}
		}
		// start
		if (schema.app.start) {
			for (const task of schema.app.start) {
				if (task.condition === undefined || this._expressions.eval(task.condition)) {
					this._expressions.eval(task.expression)
				}
			}
		}
		// add listeners
		if (schema.app.listeners) {
			for (const listener of schema.app.listeners) {
				const observer = new ExpressionActionObserver(listener, this._expressions)
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
		const schema = this.schemaFacade.schema
		if (schema.app.end) {
			for (const task of schema.app.end) {
				if (task.condition === undefined || this._expressions.eval(task.condition)) {
					this._expressions.eval(task.expression)
				}
			}
		}
		await this.connection.end()
	}

	/**
	 * Get workspace path
	 */
	public get workspace (): string {
		return this.schemaFacade.workspace
	}

	/**
	 * Get dialect of source
	 * @param source Name of source
	 * @returns
	 */
	public dialect (source:string): Dialect {
		return this.schemaFacade.source.get(source).dialect
	}

	/**
	* Get reference to stage manager
	*/
	public get stage (): StageFacade {
		return this.stageFacade
	}

	/**
	 * Get reference to SchemaConfig
	 */
	public get schema (): SchemaFacade {
		return this.schemaFacade
	}

	/**
	 * Normalize expression
	 * @param expression query expression
	 * @returns Expression normalized
	 */
	public normalize(expression:Function): string
	public normalize(expression:string): string
	public normalize (expression: string|Function): string {
		const _expression = typeof expression !== 'string' ? this._expressions.toExpression(expression) : expression
		return this.operandFacade.normalize(_expression)
	}

	/**
	 * Get model of expression
	 * @param expression query expression
	 * @returns Model of expression
	 */
	public model(expression:Function): MetadataModel[]
	public model(expression:string): MetadataModel[]
	public model (expression: string|Function): MetadataModel[] {
		const _expression = typeof expression !== 'string' ? this._expressions.toExpression(expression) : expression
		return this.sentenceFacade.model(_expression)
	}

	/**
	 * Get parameters of expression
	 * @param expression query expression
	 * @returns Parameters of expression
	 */
	public parameters(expression:Function): MetadataParameter[];
	public parameters(expression:string): MetadataParameter[];
	public parameters (expression: string|Function): MetadataParameter[] {
		const _expression = typeof expression !== 'string' ? this._expressions.toExpression(expression) : expression
		return this.sentenceFacade.parameters(_expression)
	}

	/**
	 * Get constraints of expression
	 * @param expression query expression
	 * @returns Constraints of expression
	 */
	public constraints(expression:Function): MetadataConstraint;
	public constraints(expression:string): MetadataConstraint;
	public constraints (expression: string|Function): MetadataConstraint {
		const _expression = typeof expression !== 'string' ? this._expressions.toExpression(expression) : expression
		return this.sentenceFacade.constraints(_expression)
	}

	/**
	 * Get metadata of expression
	 * @param expression query expression
	 * @returns metadata of expression
	 */
	public metadata(expression: Function): Metadata
	public metadata (expression:string):Metadata
	public metadata (expression: string|Function): Metadata {
		const _expression = typeof expression !== 'string' ? this._expressions.toExpression(expression) : expression
		return this.sentenceFacade.metadata(_expression)
	}

	/**
	 * Get getInfo of expression
	 * @param expression query expression
	 * @param options options of execution
	 */
	public getInfo(expression: Function, options?: QueryOptions): QueryInfo;
	public getInfo(expression: string, options?: QueryOptions): QueryInfo;
	public getInfo (expression: string|Function, options: QueryOptions|undefined): QueryInfo {
		const _expression = typeof expression !== 'string' ? this._expressions.toExpression(expression) : expression
		const _options = this.queryFacade.solveOptions(options)
		return this.queryFacade.getInfo(_expression, _options)
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
		const _expression = typeof expression !== 'string' ? this._expressions.toExpression(expression) : expression
		const _options = this.queryFacade.solveOptions(options)
		const query = this.queryFacade.build(_expression, _options)
		try {
			let result = null
			await this.beforeExecutionNotify(_expression, query, data, _options)
			if (this.observers.find(p => p.transactional === true) !== undefined) {
				// execute before and after listeners transactional
				this.queryFacade.transaction(_options, async (tr:ExpressionTransaction) => {
					await this.beforeExecutionNotify(_expression, query, data, _options, true)
					result = await tr.execute(_expression, data)
					await this.afterExecutionNotify(_expression, query, data, _options, result, true)
				})
			} else {
				result = await this.queryFacade.executeQuery(query, data, _options)
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
		const _options = this.queryFacade.solveOptions(options)
		return this.queryFacade.transaction(_options, callback)
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
				if (this._expressions.eval(observer.condition, context)) {
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
				if (this._expressions.eval(observer.condition, context)) {
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
				if (this._expressions.eval(observer.condition, context)) {
					await observer.error(args)
				}
			}
		})
	}
}
export const orm = Orm.instance
