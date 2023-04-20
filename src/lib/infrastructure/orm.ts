/* eslint-disable @typescript-eslint/ban-types */

import {
	ActionObserver, Dialect, QueryOptions, Schema, Stage, MetadataParameter, MetadataConstraint, QueryInfo,
	MetadataModel, Metadata, Query
} from '../domain'
import {
	SchemaService, SentenceRoute, Executor, Transaction, ExpressionActionObserver, ExpressionsWrapper, ConnectionService, SentenceLibrary, StageService,
	LanguagesService, QueryService, SentenceService, helper, IOrm
} from '../application'
import {
	MySQLConnectionPoolAdapter, MariaDBConnectionPoolAdapter, SqlServerConnectionPoolAdapter, PostgreSQLConnectionPoolAdapter,
	SQLjsConnectionPoolAdapter, OracleConnectionPoolAdapter, MongoDBConnectionPoolAdapter
} from './connection/adapters'
import { SqlLanguageAdapter, NoSqlLanguageAdapter } from './language'
import { expressions, IExpressions } from '3xpr'

/**
 * Facade through which you can access all the functionalities of the library.
 */
export class Orm implements IOrm {
	// private _cache: Cache
	private stageService: StageService
	private connectionService: ConnectionService
	private languages: LanguagesService
	// private libManager: LibManager
	private sentenceService: SentenceService
	private queryService: QueryService
	private sentenceRoute: SentenceRoute
	private executor:Executor
	// eslint-disable-next-line no-use-before-define
	private static _instance: Orm
	private schemaService: SchemaService
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
		this._expressions = new ExpressionsWrapper(expressions)
		new SentenceLibrary(this._expressions.model).load()
		this.schemaService = new SchemaService(workspace, this._expressions)
		this.connectionService = new ConnectionService()
		this.languages = new LanguagesService()
		this.languages.add(new SqlLanguageAdapter(this._expressions))
		this.languages.add(new NoSqlLanguageAdapter(this._expressions))
		this.connectionService.addType(Dialect.MySQL, MySQLConnectionPoolAdapter)
		this.connectionService.addType(Dialect.MariaDB, MariaDBConnectionPoolAdapter)
		this.connectionService.addType(Dialect.PostgreSQL, PostgreSQLConnectionPoolAdapter)
		this.connectionService.addType(Dialect.SqlServer, SqlServerConnectionPoolAdapter)
		this.connectionService.addType(Dialect.SQLjs, SQLjsConnectionPoolAdapter)
		this.connectionService.addType(Dialect.Oracle, OracleConnectionPoolAdapter)
		this.connectionService.addType(Dialect.MongoDB, MongoDBConnectionPoolAdapter)
		this.sentenceRoute = new SentenceRoute(this.schemaService, this._expressions)
		this.sentenceService = new SentenceService(this.schemaService, this.expressions, this.sentenceRoute)
		this.queryService = new QueryService(this.sentenceService, this.schemaService, this.languages)
		this.executor = new Executor(this.connectionService, this.languages, this.schemaService, this.sentenceService, this.queryService, this._expressions)
		this.stageService = new StageService(this.schemaService, this.sentenceRoute, this.queryService, this.languages, this.executor)
	}

	public get defaultStage ():Stage {
		return this.schemaService.stage.get()
	}

	/**
 * initialize the orm library
 * @param source optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project
 * @returns promise void
 */
	public async init (source?: string | Schema, connect = true): Promise<Schema> {
		const schema = await this.schemaService.init(source || this.schemaService.workspace)
		// set connections
		if (connect && schema.data.sources) {
			for (const source of schema.data.sources.filter(p => helper.val.isNotEmpty(p.connection))) {
				this.connectionService.load(source)
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
		const schema = this.schema.schema
		if (schema.app.end) {
			for (const task of schema.app.end) {
				if (task.condition === undefined || this._expressions.eval(task.condition)) {
					this._expressions.eval(task.expression)
				}
			}
		}
		await this.connectionService.end()
	}

	/**
	 * Get workspace path
	 */
	public get workspace (): string {
		return this.schemaService.workspace
	}

	/**
	 * Get dialect of source
	 * @param source Name of source
	 * @returns
	 */
	public dialect (source:string): string {
		return this.schemaService.source.get(source).dialect
	}

	/**
	* Get reference to stage manager
	*/
	public get stage (): StageService {
		return this.stageService
	}

	/**
	 * Get reference to SchemaConfig
	 */
	public get schema (): SchemaService {
		return this.schemaService
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
		return this.sentenceService.normalize(_expression)
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
		return this.sentenceService.model(_expression)
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
		return this.sentenceService.parameters(_expression)
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
		return this.sentenceService.constraints(_expression)
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
		return this.sentenceService.metadata(_expression)
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
		const _options = this.schemaService.solveOptions(options)
		return this.queryService.getInfo(_expression, _options)
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
		const _options = this.schemaService.solveOptions(options)
		const query = this.queryService.create(_expression, _options, true)
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
		const _options = this.schemaService.solveOptions(options)
		return this.executor.transaction(_options, callback)
	}

	/**
	 * Convert a lambda expression to a query expression
	 * @param lambda lambda expression
	 * @returns Expression manager
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	public toExpression (func: Function): string {
		return this.sentenceService.toExpression(func)
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
