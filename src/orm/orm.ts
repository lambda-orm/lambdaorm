/* eslint-disable @typescript-eslint/ban-types */

import { Cache, IOrm, Schema } from './model'
import { ExpressionManager, MemoryCache, Transaction, LibManager, DataSourceFacade, Executor, SchemaConfig } from './manager'
import { ConnectionManager, MySqlConnectionPool, MariadbConnectionPool, MssqlConnectionPool, PostgresConnectionPool, SqlJsConnectionPool } from './connection'
import { LanguageManager } from './language'
import { SqlLanguage } from './language/sql'
// import { NoSqlQueryBuilder, NoSqlSchemaBuilder } from './language/nosql'
import { CoreLib } from './language/lib/coreLib'
import { Helper } from './helper'

/**
 * Facade through which you can access all the functionalities of the library.
 */
export class Orm implements IOrm {
	private _cache: Cache
	// private expressionConfig: ExpressionConfig
	private datastoreFacade: DataSourceFacade
	private connectionManager: ConnectionManager
	private languageManager: LanguageManager
	private libManager: LibManager
	private expressionManager: ExpressionManager

	private executor:Executor
	private static _instance: Orm
	/**
	 * Property that exposes the configuration
	 */
	private configManager: SchemaConfig

	/**
 * Singleton
 */
	public static get instance (): Orm {
		if (!this._instance) {
			this._instance = new Orm()
		}
		return this._instance
	}

	constructor (workspace:string = process.cwd()) {
		this.configManager = new SchemaConfig(workspace)
		this._cache = new MemoryCache()
		this.connectionManager = new ConnectionManager()
		this.libManager = new LibManager()

		this.languageManager = new LanguageManager(this.configManager)
		this.languageManager.addLibrary(new CoreLib())
		this.languageManager.addLanguage('sql', new SqlLanguage())
		// this.languageManager.addLanguage('noSql',new NoSqlLanguage())

		this.connectionManager.addType('mysql', MySqlConnectionPool)
		this.connectionManager.addType('mariadb', MariadbConnectionPool)
		this.connectionManager.addType('postgres', PostgresConnectionPool)
		this.connectionManager.addType('mssql', MssqlConnectionPool)
		this.connectionManager.addType('sqljs', SqlJsConnectionPool)
		// this.connectionManager.addType('oracle',OracleConnectionPool)

		this.expressionManager = new ExpressionManager(this._cache, this.configManager, this.languageManager)
		this.executor = new Executor(this.connectionManager, this.languageManager, this.expressionManager, this.configManager)
		this.datastoreFacade = new DataSourceFacade(this.configManager, this.expressionManager, this.languageManager, this.executor)
	}

	/**
 * metodo para incializar la libreria de orm
 * @param source optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaorm.yaml" in the root of the project
 * @returns promise void
 */
	public async init (source?: string | Schema, connect = true): Promise<Schema> {
		let schema
		if (source === undefined || typeof source === 'string') {
			schema = await this.libManager.getConfig(source)
		} else {
			const _config = source as Schema
			if (_config === undefined) {
				throw new Error(`Schema: ${source} not supported`)
			}
			schema = _config
		}
		Helper.solveEnvironmentVariables(schema)
		schema = await this.configManager.load(schema)

		if (connect && schema.dataSources) {
			for (const p in schema.dataSources) {
				const dataSource = schema.dataSources[p]
				this.connectionManager.load(dataSource)
			}
		}
		return schema
	}

	/**
 * Frees the resources used, for example the connection pools
 */
	public async end (): Promise<void> {
		await this.connectionManager.end()
	}

	public get workspace (): string {
		return this.configManager.workspace
	}

	public dialect (dataSource:string): string {
		return this.configManager.dataSource.get(dataSource).dialect
	}

	/**
* Get reference to schema manager
*/
	public get lib (): LibManager {
		return this.libManager
	}

	/**
* Get reference to dataSource manager
*/
	public get dataSource (): DataSourceFacade {
		return this.datastoreFacade
	}

	/**
* set to cache manager
*/
	public setCache (value: Cache):void {
		this._cache = value
	}

	/**
	 * Read lambda expression
	 * @param lambda lambda expression
	 * @returns Expression manager
	 */
	public toExpression (lambda: Function): string {
		return this.expressionManager.toExpression(lambda)
	}

	/**
	 * Complete expression
	 * @returns Expression complete
	 */
	public complete(expression:Function): string
	public complete(expression:string): string
	public complete (expression: string|Function): string {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		return this.expressionManager.complete(expression)
	}

	/**
	 * Get model of expression
	 * @returns Model of expression
	 */
	public async model(expression:Function): Promise<any>
	public async model(expression:string): Promise<any>
	public async model (expression: string|Function): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		return this.expressionManager.model(expression)
	}

	/**
	 * Get parameters of expression
	 * @returns Parameters of expression
	 */
	public async parameters(expression:Function): Promise<any>;
	public async parameters(expression:string): Promise<any>;
	public async parameters (expression: string|Function): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		return this.expressionManager.parameters(expression)
	}

	public async sentence(expression: Function, dataSource: string): Promise<string>;
	public async sentence(expression: string, dataSource: string): Promise<string>;
	public async sentence (expression: string|Function, dataSource: string): Promise<string> {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		return this.expressionManager.sentence(expression, dataSource)
	}

	/**
	 * Get metadata of expression
	 * @returns metadata of expression
	 */
	public async metadata(expression: Function): Promise<any>
	public async metadata (expression:string):Promise<any>
	public async metadata (expression: string|Function): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		return this.expressionManager.metadata(expression)
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @returns Result of the evaluale expression
	*/
	public async eval (expression: string, data: any): Promise<any> {
		return await this.expressionManager.eval(expression, data)
	}

	/**
	 * Execute expression
	 * @param data Data with variables
	 * @param context Context
	 * @param dataSource DataStore name
	 * @returns Result of execution
	 */
	public async execute(expression: Function, data?: any, context?: any, dataSource?: string):Promise<any>;
	public async execute(expression: string, data?: any, context?: any, dataSource?: string):Promise<any>;
	public async execute (expression: string|Function, data: any = {}, context: any = {}, dataSource: string|undefined): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		const db = this.configManager.dataSource.get(dataSource)
		const query = await this.expressionManager.toQuery(expression, db.name)
		return await this.executor.execute(db, query, data, context)
	}

	/**
 * Crea una transaccion
 * @param dataSource Database name
 * @param callback Codigo que se ejecutara en transaccion
 */
	public async transaction (context:any, dataSource: string, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const db = this.configManager.dataSource.get(dataSource)
		return await this.executor.transaction(db, context, callback)
	}
}
