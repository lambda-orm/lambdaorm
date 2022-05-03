/* eslint-disable @typescript-eslint/ban-types */

import { IOrm, Schema, Stage, MetadataParameter, MetadataConstraint, MetadataSentence, MetadataModel, Metadata } from './model'
import { ExpressionManager, Transaction, StageFacade, Executor, SchemaManager, Routing, Languages } from './manager'
import { ConnectionManager, MySQLConnectionPool, MariaDBConnectionPool, SqlServerConnectionPool, PostgreSQLConnectionPool, SQLjsConnectionPool, OracleConnectionPool, MongoDBConnectionPool } from './connection'
import { SqlLanguage } from './language/SQL'
import { NoSqlLanguage } from './language/NoSQL'
import { expressions, Expressions, Cache, MemoryCache } from 'js-expressions'
import modelConfig from './expression/model.json'
import { OrmExtensionLib } from './expression/extension'

/**
 * Facade through which you can access all the functionalities of the library.
 */
export class Orm implements IOrm {
	private _cache: Cache
	private stageFacade: StageFacade
	private connectionManager: ConnectionManager
	private languages: Languages
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
		this._expressions.config.addLibrary(new OrmExtensionLib())

		this.schemaManager = new SchemaManager(workspace, this._expressions)
		this._cache = new MemoryCache()
		this.connectionManager = new ConnectionManager()

		this.languages = new Languages()
		this.languages.add(new SqlLanguage(this._expressions))
		this.languages.add(new NoSqlLanguage(this._expressions))
		this.connectionManager.addType('MySQL', MySQLConnectionPool)
		this.connectionManager.addType('MariaDB', MariaDBConnectionPool)
		this.connectionManager.addType('PostgreSQL', PostgreSQLConnectionPool)
		this.connectionManager.addType('SqlServer', SqlServerConnectionPool)
		this.connectionManager.addType('SQLjs', SQLjsConnectionPool)
		this.connectionManager.addType('Oracle', OracleConnectionPool)
		this.connectionManager.addType('MongoDB', MongoDBConnectionPool)

		this.routing = new Routing(this.schemaManager, this._expressions)
		this.expressionManager = new ExpressionManager(this._cache, this.schemaManager, this.languages, this._expressions, this.routing)
		this.executor = new Executor(this.connectionManager, this.languages, this.schemaManager, this.expressionManager, this._expressions)
		this.stageFacade = new StageFacade(this.schemaManager, this.routing, this.expressionManager, this.languages, this.executor)
	}

	public get defaultStage ():Stage {
		return this.schemaManager.stage.get(undefined)
	}

	/**
 * initialize the orm library
 * @param source optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project
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
	 * Normalize expression
	 * @returns Expression normalized
	 */
	public normalize(expression:Function): string
	public normalize(expression:string): string
	public normalize (expression: string|Function): string {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		return this.expressionManager.normalize(expression)
	}

	/**
	 * Get model of expression
	 * @returns Model of expression
	 */
	public model(expression:Function): MetadataModel[]
	public model(expression:string): MetadataModel[]
	public model (expression: string|Function): MetadataModel[] {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		return this.expressionManager.model(expression)
	}

	/**
	 * Get parameters of expression
	 * @returns Parameters of expression
	 */
	public parameters(expression:Function): MetadataParameter[];
	public parameters(expression:string): MetadataParameter[];
	public parameters (expression: string|Function): MetadataParameter[] {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		return this.expressionManager.parameters(expression)
	}

	/**
	 * Get constraints of expression
	 * @returns Constraints of expression
	 */
	public constraints(expression:Function): MetadataConstraint;
	public constraints(expression:string): MetadataConstraint;
	public constraints (expression: string|Function): MetadataConstraint {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		return this.expressionManager.constraints(expression)
	}

	/**
	 * Get metadata of expression
	 * @returns metadata of expression
	 */
	public metadata(expression: Function): Metadata
	public metadata (expression:string):Metadata
	public metadata (expression: string|Function): Metadata {
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
	public sentence(expression: Function, view?:string, stage?: string): MetadataSentence;
	public sentence(expression: string, view?:string, stage?: string): MetadataSentence;
	public sentence (expression: string|Function, view: string|undefined, stage: string|undefined): MetadataSentence {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		const _stage = this.schemaManager.stage.get(stage)
		const _view = this.schemaManager.view.get(view)
		return this.expressionManager.sentence(expression, _stage.name, _view.name)
	}

	/**
	 * Execute expression
	 * @param data Data with variables
	 * @param dataSource DataStore name
	 * @returns Result of execution
	 */
	public async execute(expression: Function, data?: any, view?:string, stage?: string):Promise<any>;
	public async execute(expression: string, data?: any, view?:string, stage?: string):Promise<any>;
	public async execute (expression: string|Function, data: any = {}, view: string|undefined, stage: string|undefined): Promise<any> {
		if (typeof expression !== 'string') {
			expression = this.expressionManager.toExpression(expression)
		}
		const _stage = this.schemaManager.stage.get(stage)
		const _view = this.schemaManager.view.get(view)
		const query = this.expressionManager.toQuery(expression, _stage.name, _view.name)
		return await this.executor.execute(query, data, _stage.name, _view.name)
	}

	/**
 * Create a transaction
 * @param stage Database name
 * @param callback Code to be executed in transaction
 */
	public async transaction (stage: string, view:string|undefined, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const _stage = this.schemaManager.stage.get(stage)
		const _view = this.schemaManager.view.get(view)
		return await this.executor.transaction(_stage.name, _view.name, callback)
	}
}
