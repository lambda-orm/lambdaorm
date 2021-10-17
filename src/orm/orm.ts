
import { Cache, IOrm, Context, Config } from './model'
import { Model, ParserManager } from './parser/index'
import { Expression, MemoryCache, Transaction, LibManager } from './manager'
import { SchemaManager } from './schema/schemaManager'
import { DatabaseManager } from './database'
import { ConnectionManager, MySqlConnectionPool, MariadbConnectionPool, PostgresConnectionPool, ConnectionConfig } from './connection'
import { LanguageManager, Operand, Sentence, Query } from './language'
import { SqlLanguage } from './language/sql/index'
import { CoreLib } from './language/lib/coreLib'
import modelConfig from './parser/config.json'
import sqlConfig from './language/sql/config.json'
import { Helper } from './helper'
import { type } from 'os'

/**
 * Facade through which you can access all the functionalities of the library.
 */
export class Orm implements IOrm {
	private _cache: Cache
	private languageModel: Model
	private parserManager: ParserManager
	private schemaManager: SchemaManager
	private databaseManager: DatabaseManager
	private connectionManager: ConnectionManager
	private languageManager: LanguageManager
	private libManager:LibManager
	private static _instance: Orm
	/**
	 * Property that exposes the configuration
	 */
	public config: Config
	/**
	 * Singleton
	 */
	public static get instance (): Orm {
		if (!this._instance) {
			this._instance = new Orm()
		}
		return this._instance
	}

	constructor () {
		this.config = { app: { workspace: process.cwd(), src: 'src', data: 'data' }, databases: [], schemas: [] }
		this._cache = new MemoryCache()
		this.connectionManager = new ConnectionManager()
		this.libManager = new LibManager()

		this.languageModel = new Model()
		this.languageModel.load(modelConfig)
		this.parserManager = new ParserManager(this.languageModel)

		this.schemaManager = new SchemaManager(this)
		this.databaseManager = new DatabaseManager(this)

		const sqlLanguage = new SqlLanguage()
		sqlLanguage.addLibrary({ name: 'sql', dialects: sqlConfig.dialects })

		this.languageManager = new LanguageManager(this, this.languageModel)
		this.language.addLibrary(new CoreLib())
		this.language.add(sqlLanguage)

		this.connection.addType('mysql', MySqlConnectionPool)
		this.connection.addType('mariadb', MariadbConnectionPool)
		this.connection.addType('postgres', PostgresConnectionPool)
		// this.connection.addType('mssql',MssqlConnectionPool)
		// this.connection.addType('oracle',OracleConnectionPool)
	}

	/**
	 * metodo para incializar la libreria de orm
	 * @param source optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaorm.yaml" in the root of the project
	 * @returns promise void
	 */
	public async init (source?: string | Config, connect = true): Promise<void> {
		if (source === undefined || typeof source === 'string') {
			this.config = await this.libManager.getConfig(source)
		} else {
			const _config = source as Config
			if (_config === undefined) {
				throw new Error(`Config: ${source} not supported`)
			}
			this.config = _config
		}
		Helper.solveEnriromentVariables(this.config)
		if (this.config.schemas) {
			for (const p in this.config.schemas) {
				this.schema.load(this.config.schemas[p])
			}
		}
		if (this.config.databases) {
			for (const p in this.config.databases) {
				const database = this.config.databases[p]
				const connectionConfig: ConnectionConfig = { name: database.name, dialect: database.dialect, connection: {} }
				connectionConfig.connection = database.connection
				if (connect) {
					this.connection.load(connectionConfig)
				}
				this.database.load(database)
			}
		}
		this.database.default = this.config.app.defaultDatabase
	}

	/**
	 * Frees the resources used, for example the connection pools
	 */
	public async end (): Promise<void> {
		await this.connection.end()
	}

	/**
	* Get reference to config manager
	*/
	public get lib (): LibManager {
		return this.libManager
	}

	/**
	* Get reference to parser manager
	*/
	public get parser (): ParserManager {
		return this.parserManager
	}

	/**
	* Get reference to schema manager
	*/
	public get schema (): SchemaManager {
		return this.schemaManager
	}

	/**
	* Get reference to language manager
	*/
	public get language (): LanguageManager {
		return this.languageManager
	}

	/**
	* Get reference to database manager
	*/
	public get database (): DatabaseManager {
		return this.databaseManager
	}

	/**
	* Get reference to connection manager
	*/
	public get connection (): ConnectionManager {
		return this.connectionManager
	}

	/**
	* Get reference to cache manager
	*/
	public get cache (): Cache {
		return this._cache
	}

	/**
	* set to cache manager
	*/
	public set cache (value: Cache) {
		this._cache = value
	}

	/**
	 * complete the expression. Since in some cases the expressions use simplifications, this method is in charge of returning a complete expression from a simplified expression.
	 * @param expression expression that can be simplified
	 * @param schema schema name
	 * @returns full expression
	 */
	public complete (expression: string, schema: string): string {
		try {
			const _schema = this.schemaManager.getInstance(schema)
			const node = this.parser.parse(expression)
			const completeNode = this.language.complete(node, _schema)
			return this.parser.toExpression(completeNode)
		} catch (error: any) {
			console.log(error)
			throw new Error('complete expression: ' + expression + ' error: ' + error.toString())
		}
	}

	public async build (expression: string, schema: string): Promise<Operand> {
		try {
			const key = 'build_' + expression
			let operand = await this._cache.get(key)
			if (!operand) {
				const _schema = this.schemaManager.getInstance(schema)
				const node = this.parser.parse(expression)
				operand = this.language.build(node, _schema)
				await this._cache.set(key, operand)
			}
			return operand as Operand
		} catch (error: any) {
			console.log(error)
			throw new Error('build expression: ' + expression + ' error: ' + error.toString())
		}
	}

	public async query (expression: string, dialect: string, schema: string): Promise<Query> {
		try {
			const key = dialect + '-query_' + expression
			let operand = await this._cache.get(key)
			if (!operand) {
				const sentence = await this.build(expression, schema) as Sentence
				operand = this.language.query(dialect, sentence)
				await this._cache.set(key, operand)
			}
			return operand as Query
		} catch (error: any) {
			throw new Error('query expression: ' + expression + ' error: ' + error.toString())
		}
	}

	public expression (expression: string): Expression {
		if (!expression) {
			throw new Error('empty expression}')
		}
		return new Expression(this, expression)
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public lambda (func: Function): Expression {
		if (!func) {
			throw new Error('empty lambda function}')
		}
		return new Expression(this, Helper.clearLambda(func))
	}

	public async eval (expression: string, context: any, schema: string): Promise<any> {
		const operand = await this.build(expression, schema)
		const _context = new Context(context)
		return this.language.eval(operand, _context)
	}

	public async execute (expression: string, context: any = {}, database?: string): Promise<any> {
		try {
			if (typeof context !== 'object') {
				throw new Error(`object type ${typeof context} is invalied`)
			}

			const db = this.database.get(database)
			const operand = await this.query(expression, db.dialect, db.schema)
			const _context = new Context(context)
			let result
			if (operand.children.length === 0) {
				const executor = this.connectionManager.createExecutor(db.name)
				result = await this.language.execute(db.dialect, operand, _context, executor)
			} else {
				const tr = this.connectionManager.createTransaction(db.name)
				try {
					await tr.begin()
					result = await this.language.execute(db.dialect, operand, _context, tr)
					await tr.commit()
				} catch (error) {
					console.log(error)
					tr.rollback()
					throw error
				}
			}
			return result
		} catch (error: any) {
			throw new Error('execute: ' + expression + ' error: ' + error.toString())
		}
	}

	public async executeSentence (sentence: any, database: string): Promise<any> {
		const executor = this.connectionManager.createExecutor(database)
		return await executor.execute(sentence)
	}

	public async transaction (database: string, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const _database = this.database.get(database)
		const tr = this.connectionManager.createTransaction(database)
		try {
			await tr.begin()
			const transaction = new Transaction(this, _database, tr)
			await callback(transaction)
			await tr.commit()
		} catch (error) {
			console.log(error)
			tr.rollback()
			throw error
		}
	}
}
// export const orm = Orm.instance
