
import { Cache, IOrm, Config } from './model'
import { ExpressionConfig } from './parser/index'
import { ExpressionFacade, ExpressionManager, MemoryCache, Transaction, LibManager, DatastoreFacade, Executor, ConfigManager } from './manager'
import { ConnectionManager, MySqlConnectionPool, MariadbConnectionPool, MssqlConnectionPool, PostgresConnectionPool, SqlJsConnectionPool } from './connection'
import { LanguageManager, Language } from './language'
import { SqlDMLBuilder, SqlDDLBuilder } from './language/sql'
// import { NoSqlQueryBuilder, NoSqlSchemaBuilder } from './language/nosql'
import { CoreLib } from './language/lib/coreLib'
import expConfig from './parser/config.json'
import sqlConfig from './language/sql/config.json'
// import nosqlConfig from './language/nosql/config.json'
import { Helper } from './helper'

/**
 * Facade through which you can access all the functionalities of the library.
 */
export class Orm implements IOrm {
	private _cache: Cache
	private expressionConfig: ExpressionConfig
	private datastoreFacade: DatastoreFacade
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
		this.libManager = new LibManager()

		this.expressionConfig = new ExpressionConfig()
		this.expressionConfig.load(expConfig)

		const sqlLanguage = new Language('sql', new SqlDDLBuilder(), new SqlDMLBuilder())
		sqlLanguage.addLibrary({ name: 'sql', dialects: sqlConfig.dialects })

		// const nosqlLanguage = new Language('nosql', new NoSqlQueryBuilder(), new NoSqlSchemaBuilder())
		// nosqlLanguage.addLibrary({ name: 'nosql', dialects: nosqlConfig.dialects })

		this.languageManager = new LanguageManager(this.expressionConfig)
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
		this.executor = new Executor(this.connectionManager, this.languageManager, this.expressionManager, this.configManager)
		this.datastoreFacade = new DatastoreFacade(this.configManager, this.expressionManager, this.languageManager, this.executor)
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

		if (connect && config.datastores) {
			for (const p in config.datastores) {
				const datastore = config.datastores[p]
				this.connectionManager.load(datastore)
			}
		}
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

	public dialect (datastore:string): string {
		return this.configManager.datastore.get(datastore).dialect
	}

	/**
* Get reference to config manager
*/
	public get lib (): LibManager {
		return this.libManager
	}

	/**
* Get reference to datastore manager
*/
	public get datastore (): DatastoreFacade {
		return this.datastoreFacade
	}

	/**
* set to cache manager
*/
	public setCache (value: Cache):void {
		this._cache = value
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
 * @param datastore Database name
 * @param callback Codigo que se ejecutara en transaccion
 */
	public async transaction (datastore: string, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const db = this.configManager.datastore.get(datastore)
		return await this.executor.transaction(db, callback)
	}
}
