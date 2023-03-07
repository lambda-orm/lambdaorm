/* eslint-disable @typescript-eslint/ban-types */

import { ActionObserver, Dialect, IOrm, QueryOptions, Schema, Stage, MetadataParameter, MetadataConstraint, QueryInfo, MetadataModel, Metadata, Query } from './contract'
import { SchemaManager, Routing, helper, Executor, Transaction, ExpressionActionObserver } from './manager'
import { QueryManager } from './query'
import { Languages } from './language'
import { SentenceManager } from './sentence'
import { StageFacade } from './stage'
import { ConnectionManager, MySQLConnectionPool, MariaDBConnectionPool, SqlServerConnectionPool, PostgreSQLConnectionPool, SQLjsConnectionPool, OracleConnectionPool, MongoDBConnectionPool } from './connection'
import { SqlLanguage } from './language/SQL'
import { NoSqlLanguage } from './language/NoSQL'
import { expressions, IExpressions } from '3xpr'
import { SentenceLibrary } from './sentence/library'
/**
 * Facade through which you can access all the functionalities of the library.
 */
export class Orm implements IOrm {
	// private _cache: Cache
	private stageFacade: StageFacade
	private connectionManager: ConnectionManager
	private languages: Languages
	// private libManager: LibManager
	private sentenceManager: SentenceManager
	private queryManager: QueryManager
	private routing: Routing
	private executor:Executor
	// eslint-disable-next-line no-use-before-define
	private static _instance: Orm
	private schemaManager: SchemaManager
	private _expressions: IExpressions
	private observers:ActionObserver[] = []

	/**
 * Singleton
 */
	public static get instance (): Orm {
		if (!this._instance) {
			this._instance = new Orm()
		}
		return this._instance
	}

	constructor (workspace: string = process.cwd()) {
		this._expressions = expressions
		new SentenceLibrary(this._expressions.model).load()
		this.schemaManager = new SchemaManager(workspace, this._expressions)
		this.connectionManager = new ConnectionManager()
		this.languages = new Languages()
		this.languages.add(new SqlLanguage(this._expressions))
		this.languages.add(new NoSqlLanguage(this._expressions))
		this.connectionManager.addType(Dialect.MySQL, MySQLConnectionPool)
		this.connectionManager.addType(Dialect.MariaDB, MariaDBConnectionPool)
		this.connectionManager.addType(Dialect.PostgreSQL, PostgreSQLConnectionPool)
		this.connectionManager.addType(Dialect.SqlServer, SqlServerConnectionPool)
		this.connectionManager.addType(Dialect.SQLjs, SQLjsConnectionPool)
		this.connectionManager.addType(Dialect.Oracle, OracleConnectionPool)
		this.connectionManager.addType(Dialect.MongoDB, MongoDBConnectionPool)
		this.routing = new Routing(this.schemaManager, this._expressions)
		this.sentenceManager = new SentenceManager(this.schemaManager, this.expressions, this.routing)
		this.queryManager = new QueryManager(this.sentenceManager, this.schemaManager, this.languages, this._expressions)
		this.executor = new Executor(this.connectionManager, this.languages, this.schemaManager, this.sentenceManager, this.queryManager, this._expressions)
		this.stageFacade = new StageFacade(this.schemaManager, this.routing, this.queryManager, this.languages, this.executor)
	}

	public get defaultStage ():Stage {
		return this.schemaManager.stage.get()
	}

	/**
 * initialize the orm library
 * @param source optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project
 * @returns promise void
 */
	public async init (source?: string | Schema, connect = true): Promise<Schema> {
		const schema = await this.schemaManager.init(source || this.schemaManager.workspace)
		// set connections
		if (connect && schema.data.sources) {
			for (const source of schema.data.sources.filter(p => helper.val.isNotEmpty(p.connection))) {
				this.connectionManager.load(source)
			}
		}
		// add enums
		if (schema.model.enums) {
			for (const _enum of schema.model.enums) {
				const values:[string, any][] = []
				for (const enumValue of _enum.values) {
					values.push([enumValue.name, enumValue.value])
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
		const schema = this.schema.schema
		if (schema.app.end) {
			for (const task of schema.app.end) {
				if (task.condition === undefined || this._expressions.eval(task.condition)) {
					this._expressions.eval(task.expression)
				}
			}
		}
		await this.connectionManager.end()
	}

	/**
	 * Get workspace path
	 */
	public get workspace (): string {
		return this.schemaManager.workspace
	}

	/**
	 * Get dialect of source
	 * @param source Name of source
	 * @returns
	 */
	public dialect (source:string): string {
		return this.schemaManager.source.get(source).dialect
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
	public get schema (): SchemaManager {
		return this.schemaManager
	}

	/**
	 * Get reference to SchemaConfig
	 */
	public get expressions (): IExpressions {
		return this._expressions
	}

	/**
	 * Normalize expression
	 * @param expression query expression
	 * @returns Expression normalized
	 */
	public normalize(expression:Function): string
	public normalize(expression:string): string
	public normalize (expression: string|Function): string {
		const _expression = typeof expression !== 'string' ? this.toExpression(expression) : expression
		return this.sentenceManager.normalize(_expression)
	}

	/**
	 * Get model of expression
	 * @param expression query expression
	 * @returns Model of expression
	 */
	public model(expression:Function): MetadataModel[]
	public model(expression:string): MetadataModel[]
	public model (expression: string|Function): MetadataModel[] {
		const _expression = typeof expression !== 'string' ? this.toExpression(expression) : expression
		return this.sentenceManager.model(_expression)
	}

	/**
	 * Get parameters of expression
	 * @param expression query expression
	 * @returns Parameters of expression
	 */
	public parameters(expression:Function): MetadataParameter[];
	public parameters(expression:string): MetadataParameter[];
	public parameters (expression: string|Function): MetadataParameter[] {
		const _expression = typeof expression !== 'string' ? this.toExpression(expression) : expression
		return this.sentenceManager.parameters(_expression)
	}

	/**
	 * Get constraints of expression
	 * @param expression query expression
	 * @returns Constraints of expression
	 */
	public constraints(expression:Function): MetadataConstraint;
	public constraints(expression:string): MetadataConstraint;
	public constraints (expression: string|Function): MetadataConstraint {
		const _expression = typeof expression !== 'string' ? this.toExpression(expression) : expression
		return this.sentenceManager.constraints(_expression)
	}

	/**
	 * Get metadata of expression
	 * @param expression query expression
	 * @returns metadata of expression
	 */
	public metadata(expression: Function): Metadata
	public metadata (expression:string):Metadata
	public metadata (expression: string|Function): Metadata {
		const _expression = typeof expression !== 'string' ? this.toExpression(expression) : expression
		return this.sentenceManager.metadata(_expression)
	}

	/**
	 * Get getInfo of expression
	 * @param expression query expression
	 * @param options options of execution
	 */
	public getInfo(expression: Function, options?: QueryOptions): QueryInfo;
	public getInfo(expression: string, options?: QueryOptions): QueryInfo;
	public getInfo (expression: string|Function, options: QueryOptions|undefined): QueryInfo {
		const _expression = typeof expression !== 'string' ? this.toExpression(expression) : expression
		const _options = this.schemaManager.solveOptions(options)
		return this.queryManager.getInfo(_expression, _options)
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
		const _expression = typeof expression !== 'string' ? this.toExpression(expression) : expression
		const _options = this.schemaManager.solveOptions(options)
		const query = this.queryManager.create(_expression, _options)
		try {
			let result = null
			await this.beforeExecutionNotify(_expression, query, data, _options)
			if (this.observers.find(p => p.transactional === true) !== undefined) {
				// execute before and after listeners transactional
				this.executor.transaction(_options, async (tr:Transaction) => {
					await this.beforeExecutionNotify(_expression, query, data, _options, true)
					result = await tr.execute(_expression, data)
					await this.afterExecutionNotify(_expression, query, data, _options, result, true)
				})
			} else {
				result = await this.executor.execute(query, data, _options)
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
	public async transaction (options: QueryOptions|undefined, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const _options = this.schemaManager.solveOptions(options)
		return this.executor.transaction(_options, callback)
	}

	/**
	 * Convert a lambda expression to a query expression
	 * @param lambda lambda expression
	 * @returns Expression manager
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	public toExpression (func: Function): string {
		return this.sentenceManager.toExpression(func)
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
