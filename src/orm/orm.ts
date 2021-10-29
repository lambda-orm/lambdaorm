
import { Cache, IOrm, Config } from './model'
import { Model } from './parser/index'
import { ExpressionFacade, ExpressionManager, MemoryCache, Transaction, LibManager, DatabaseFacade, Executor, ConfigManager } from './manager'
import { ConnectionManager, MySqlConnectionPool, MariadbConnectionPool, MssqlConnectionPool, PostgresConnectionPool, SqlJsConnectionPool, ConnectionConfig } from './connection'
import { LanguageManager, Language } from './language'
import { SqlQueryBuilder, SqlSchemaBuilder } from './language/sql'
// import { NoSqlQueryBuilder, NoSqlSchemaBuilder } from './language/nosql'
import { CoreLib } from './language/lib/coreLib'
import modelConfig from './parser/config.json'
import sqlConfig from './language/sql/config.json'
// import nosqlConfig from './language/nosql/config.json'
import { Helper } from './helper'

/**
 * Facade through which you can access all the functionalities of the library.
 */
export class Orm implements IOrm {
	private _cache: Cache
	private languageModel: Model
	private databaseFacade: DatabaseFacade
	private connectionManager: ConnectionManager
	private languageManager: LanguageManager
	private libManager: LibManager
	private expressionManager: ExpressionManager

	private executor:Executor
	private static _instance: Orm
	/**
	 * Property that exposes the configuration
	 */
	private configManager: ConfigManager

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
		this.configManager = new ConfigManager(workspace)
		this._cache = new MemoryCache()
		this.connectionManager = new ConnectionManager()
		this.libManager = new LibManager(this)

		this.languageModel = new Model()
		this.languageModel.load(modelConfig)

		const sqlLanguage = new Language('sql', new SqlQueryBuilder(), new SqlSchemaBuilder())
		sqlLanguage.addLibrary({ name: 'sql', dialects: sqlConfig.dialects })

		// const nosqlLanguage = new Language('nosql', new NoSqlQueryBuilder(), new NoSqlSchemaBuilder())
		// nosqlLanguage.addLibrary({ name: 'nosql', dialects: nosqlConfig.dialects })

		this.languageManager = new LanguageManager(this.languageModel)
		this.languageManager.addLibrary(new CoreLib())
		this.languageManager.add(sqlLanguage)
		// this.languageManager.add(nosqlLanguage)

		this.connectionManager.addType('mysql', MySqlConnectionPool)
		this.connectionManager.addType('mariadb', MariadbConnectionPool)
		this.connectionManager.addType('postgres', PostgresConnectionPool)
		this.connectionManager.addType('mssql', MssqlConnectionPool)
		this.connectionManager.addType('sqljs', SqlJsConnectionPool)
		// this.connectionManager.addType('oracle',OracleConnectionPool)

		this.expressionManager = new ExpressionManager(this._cache, this.configManager, this.languageManager)
		this.executor = new Executor(this.connectionManager, this.languageManager, this.expressionManager)
		this.databaseFacade = new DatabaseFacade(this.configManager, this.expressionManager, this.languageManager, this.executor)
	}

	/**
 * metodo para incializar la libreria de orm
 * @param source optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaorm.yaml" in the root of the project
 * @returns promise void
 */
	public async init (source?: string | Config, connect = true): Promise<void> {
		let config
		if (source === undefined || typeof source === 'string') {
			config = await this.libManager.getConfig(source)
		} else {
			const _config = source as Config
			if (_config === undefined) {
				throw new Error(`Config: ${source} not supported`)
			}
			config = _config
		}
		Helper.solveEnriromentVariables(config)
		this.configManager.load(config)

		if (connect && config.databases) {
			for (const p in config.databases) {
				const database = config.databases[p]
				const connectionConfig: ConnectionConfig = { name: database.name, dialect: database.dialect, connection: {} }
				this.connectionManager.load(connectionConfig)
			}
		}
		await this.connectionManager.init()
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

	public dialect (database:string): string {
		return this.configManager.database.get(database).dialect
	}

	/**
* Get reference to config manager
*/
	public get lib (): LibManager {
		return this.libManager
	}

	/**
* Get reference to database manager
*/
	public get database (): DatabaseFacade {
		return this.databaseFacade
	}

	/**
* set to cache manager
*/
	public setCache (value: Cache):void {
		this._cache = value
	}

	public get dialects ():any {
		return this.languageManager.dialects
	}

	/**
 * Read expression
 * @param expression string expression
 * @returns Expression manager
 */
	public expression (expression: string): ExpressionFacade {
		if (!expression) {
			throw new Error('empty expression}')
		}
		return new ExpressionFacade(this.expressionManager, this.executor, this.configManager, expression)
	}

	/**
 * Read lambda expression
 * @param func lambda expression
 * @returns Expression manager
 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	public lambda (func: Function): ExpressionFacade {
		const expression = this.expressionManager.toExpression(func)
		return new ExpressionFacade(this.expressionManager, this.executor, this.configManager, expression)
	}

	/**
 * Crea una transaccion
 * @param database Database name
 * @param callback Codigo que se ejecutara en transaccion
 */
	public async transaction (database: string, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const db = this.configManager.database.get(database)
		return await this.executor.transaction(db, callback)
	}
}
