/* eslint-disable @typescript-eslint/ban-types */

import { IOrm, Schema, Stage } from './model'
import { ExpressionManager, Transaction, StageFacade, Executor, SchemaManager, Routing } from './manager'
import { ConnectionManager, MySqlConnectionPool, MariadbConnectionPool, MssqlConnectionPool, PostgresConnectionPool, SqlJsConnectionPool } from './connection'
import { LanguageManager } from './language'
import { SqlLanguage } from './language/sql'
import { expressions, Expressions, Cache, MemoryCache } from 'js-expressions'
import modelConfig from './expression/model.json'
import { OrmExtesionLib } from './expression/extension'

/**
 * Facade through which you can access all the functionalities of the library.
 */
export class Orm implements IOrm {
	private _cache: Cache
	private stageFacade: StageFacade
	private connectionManager: ConnectionManager
	private languageManager: LanguageManager
	// private libManager: LibManager
	private expressionManager: ExpressionManager
	private routing: Routing
	private executor:Executor
	private static _instance: Orm
	private schemaManager: SchemaManager
	private _expressions: Expressions

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
		this._expressions.config.load(modelConfig)
		this._expressions.config.addLibrary(new OrmExtesionLib())

		this.schemaManager = new SchemaManager(workspace, this._expressions)
		this._cache = new MemoryCache()
		this.connectionManager = new ConnectionManager()

		this.languageManager = new LanguageManager(this.schemaManager, this._expressions)
		this.languageManager.addLanguage('sql', new SqlLanguage())
		// this.languageManager.addLanguage('noSql',new NoSqlLanguage())
		this.connectionManager.addType('mysql', MySqlConnectionPool)
		this.connectionManager.addType('mariadb', MariadbConnectionPool)
		this.connectionManager.addType('postgres', PostgresConnectionPool)
		this.connectionManager.addType('mssql', MssqlConnectionPool)
		this.connectionManager.addType('sqljs', SqlJsConnectionPool)
		// this.connectionManager.addType('oracle',OracleConnectionPool)

		this.routing = new Routing(this.schemaManager, this._expressions)
		this.expressionManager = new ExpressionManager(this._cache, this.schemaManager, this.languageManager, this._expressions, this.routing)
		this.executor = new Executor(this.connectionManager, this.languageManager, this.schemaManager, this.expressionManager, this._expressions)
		this.stageFacade = new StageFacade(this.schemaManager, this.routing, this.expressionManager, this.languageManager, this.executor)
	}

	public get defaultStage ():Stage {
		return this.schemaManager.stage.get(undefined)
	}

	/**
 * metodo para incializar la libreria de orm
 * @param source optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaorm.yaml" in the root of the project
 * @returns promise void
 */
	public async init (source?: string | Schema, connect = true): Promise<Schema> {
		const schema = await this.schemaManager.init(source)
		// set connections
		if (connect && schema.dataSources) {
			for (const p in schema.dataSources) {
				const dataSource = schema.dataSources[p]
				this.connectionManager.load(dataSource)
			}
		}
		// add enums
		if (schema.enums) {
			const enums: any = {}
			for (const i in schema.enums) {
				const _enum = schema.enums[i]
				const values:any = {}
				for (const j in _enum.values) {
					values[_enum.values[j].name] = _enum.values[j].value
				}
				enums[_enum.name] = values
			}
			expressions.config.load({ enums: enums })
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
		return this.schemaManager.workspace
	}

	public dialect (dataSource:string): string {
		return this.schemaManager.dataSource.get(dataSource).dialect
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
	public get expressions (): Expressions {
		return this._expressions
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
	public model(expression:Function): any
	public model(expression:string): any
	public model (expression: string|Function): any {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		return this.expressionManager.model(expression)
	}

	/**
	 * Get parameters of expression
	 * @returns Parameters of expression
	 */
	public parameters(expression:Function): any;
	public parameters(expression:string): any;
	public parameters (expression: string|Function): any {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		return this.expressionManager.parameters(expression)
	}

	/**
	 * Get metadata of expression
	 * @returns metadata of expression
	 */
	public metadata(expression: Function): any
	public metadata (expression:string):any
	public metadata (expression: string|Function): any {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		return this.expressionManager.metadata(expression)
	}

	/**
	 * Get sentence of expression
	 * @param expression
	 * @param dataSource
	 */
	public sentence(expression: Function, stage?: string): string;
	public sentence(expression: string, stage?: string): string;
	public sentence (expression: string|Function, stage: string|undefined): string {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		const _stage = this.schemaManager.stage.get(stage)
		return this.expressionManager.sentence(expression, _stage.name)
	}

	/**
	 * Execute expression
	 * @param data Data with variables
	 * @param dataSource DataStore name
	 * @returns Result of execution
	 */
	public async execute(expression: Function, data?: any, stage?: string):Promise<any>;
	public async execute(expression: string, data?: any, stage?: string):Promise<any>;
	public async execute (expression: string|Function, data: any = {}, stage: string|undefined): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		const _stage = this.schemaManager.stage.get(stage)
		const query = await this.expressionManager.toQuery(expression, _stage.name)
		return await this.executor.execute(query, data, _stage.name)
	}

	/**
 * Crea una transaccion
 * @param stage Database name
 * @param callback Codigo que se ejecutara en transaccion
 */
	public async transaction (stage: string, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const _stage = this.schemaManager.stage.get(stage)
		return await this.executor.transaction(_stage.name, callback)
	}
}
