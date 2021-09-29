
import { Cache, IOrm, Context, Config } from './model'
import { Model, NodeManager } from './node/index'
import { Expression, MemoryCache, Transaction } from './manager'
import { SchemaManager } from './schema/schemaManager'
import { DatabaseManager } from './database'
import { ConnectionManager, MySqlConnectionPool, MariadbConnectionPool, PostgresConnectionPool, ConnectionConfig } from './connection'
import { LanguageManager, Operand, Sentence, Query } from './language'
import { SqlLanguage } from './language/sql/index'
import { CoreLib } from './language/lib/coreLib'
import modelConfig from './node/config.json'
import sqlConfig from './language/sql/config.json'
const ConfigExtends = require('config-extends')
const fs = require('fs')
const path = require('path')
class Orm implements IOrm {
	private _cache:Cache
	public config:Config
	private languageModel: Model
	// TODO: cambiar el nombre nodeManager por parserManager
	private nodeManager:NodeManager
	private schemaManager:SchemaManager
	private databaseManager:DatabaseManager
	private connectionManager:ConnectionManager
	private languageManager:LanguageManager

	private static _instance: Orm
	public static get instance ():Orm {
		if (!this._instance) {
			this._instance = new Orm()
		}
		return this._instance
	}

	constructor () {
		this.config = { paths: {} }
		this._cache = new MemoryCache()
		this.connectionManager = new ConnectionManager()

		this.languageModel = new Model()
		this.languageModel.load(modelConfig)
		this.nodeManager = new NodeManager(this.languageModel)

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

	public async init (configPath?: string): Promise<void> {
		if (configPath !== undefined && fs.existsSync(configPath)) {
			// if a path is passed per argument
			this.config = await ConfigExtends.apply(configPath)
		} else if (process.env.LAMBDA_ORM_CONFIG !== undefined) {
			// if the default environment variable exists
			this.config = JSON.parse(process.env.LAMBDA_ORM_CONFIG)
		} else if (fs.existsSync(path.join(process.cwd(), 'lambdaORM.yaml'))) {
			// if the default file exists in the root of the project
			this.config = await ConfigExtends.apply(path.join(process.cwd(), 'lambdaORM.yaml'))
		} else {
			console.log('lambdaomr [INFO] pending define configuration ')
			return
		}

		if (!this.config.paths) { this.config.paths = {} }
		if (!this.config.paths.state) { this.config.paths.state = path.join(process.cwd(), 'state') }
		if (!this.config.paths.schemas) { this.config.paths.schemas = path.join(process.cwd(), 'schemas') }
		if (!fs.existsSync(this.config.paths.state)) { fs.mkdirSync(this.config.paths.state) }
		const _schemas = await ConfigExtends.apply(this.config.paths.schemas)
		if (_schemas) {
			for (const p in _schemas) {
				if (p === 'abstract') continue
				this.schema.load(_schemas[p])
			}
		}
		if (this.config.databases) {
			for (const p in this.config.databases) {
				const database = this.config.databases[p]
				const connectionConfig: ConnectionConfig = { name: database.name, dialect: database.dialect, connection: {} }
				if (typeof database.connection === 'string') {
					const value = process.env[database.connection] as string
					connectionConfig.connection = JSON.parse(value)
				} else if (typeof database.connection === 'object') {
					connectionConfig.connection = database.connection
				} else {
					throw new Error(`wrong connection in database ${database.name} `)
				}
				this.connection.load(connectionConfig)
				this.database.load(database)
			}
		}
	}

	/**
	 * Frees the resources used, for example the connection pools
	 */
	public async end ():Promise<void> {
		await orm.connection.end()
	}

	public get node ():NodeManager {
		return this.nodeManager
	}

	public get schema ():SchemaManager {
		return this.schemaManager
	}

	public get language ():LanguageManager {
		return this.languageManager
	}

	public get database ():DatabaseManager {
		return this.databaseManager
	}

	public get connection ():ConnectionManager {
		return this.connectionManager
	}

	public get cache ():Cache {
		return this._cache
	}

	public set cache (value:Cache) {
		this._cache = value
	}

	public complete (expression:string, schema:string):string {
		try {
			const _schema = this.schemaManager.getInstance(schema)
			const node = this.node.parse(expression)
			const completeNode = this.language.complete(node, _schema)
			return this.node.toExpression(completeNode)
		} catch (error:any) {
			console.log(error)
			throw new Error('complete expression: ' + expression + ' error: ' + error.toString())
		}
	}

	public async build (expression:string, schema:string):Promise<Operand> {
		try {
			const key = 'build_' + expression
			let operand = await this._cache.get(key)
			if (!operand) {
				const _schema = this.schemaManager.getInstance(schema)
				const node = this.node.parse(expression)
				operand = this.language.build(node, _schema)
				await this._cache.set(key, operand)
			}
			return operand as Operand
		} catch (error:any) {
			console.log(error)
			throw new Error('build expression: ' + expression + ' error: ' + error.toString())
		}
	}

	public async query (expression:string, dialect:string, schema:string):Promise<Query> {
		try {
			const key = dialect + '-query_' + expression
			let operand = await this._cache.get(key)
			if (!operand) {
				const sentence = await this.build(expression, schema) as Sentence
				operand = this.language.query(dialect, sentence)
				await this._cache.set(key, operand)
			}
			return operand as Query
		} catch (error:any) {
			console.log(error)
			throw new Error('query expression: ' + expression + ' error: ' + error.toString())
		}
	}

	public expression (value:string):Expression {
		return new Expression(this, value.trim())
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public lambda (value:Function):Expression {
		const str = value.toString().trim()
		const index = str.indexOf('=>') + 2
		const expression = str.substring(index, str.length).trim()
		return new Expression(this, expression)
	}

	public async eval (expression:string, context:any, schema:string):Promise<any> {
		const operand = await this.build(expression, schema)
		const _context = new Context(context)
		return this.language.eval(operand, _context)
	}

	public async execute (expression:string, context:any, database:string):Promise<any> {
		const _database = this.database.get(database)
		const operand = await this.query(expression, _database.dialect, _database.schema)
		try {
			const _context = new Context(context)
			const _database = this.database.get(database)
			let result
			if (operand.children.length === 0) {
				const executor = this.connectionManager.createExecutor(_database.name)
				result = await this.language.execute(_database.dialect, operand, _context, executor)
			} else {
				const tr = this.connectionManager.createTransaction(database)
				try {
					await tr.begin()
					result = await this.language.execute(_database.dialect, operand, _context, tr)
					await tr.commit()
				} catch (error) {
					console.log(error)
					tr.rollback()
					throw error
				}
			}
			return result
		} catch (error:any) {
			throw new Error('execute: ' + expression + ' error: ' + error.toString())
		}
	}

	public async executeSentence (sentence:any, database:string):Promise<any> {
		const executor = this.connectionManager.createExecutor(database)
		return await executor.execute(sentence)
	}

	public async transaction (database:string, callback:{(tr:Transaction): Promise<void>}):Promise<void> {
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
export const orm = Orm.instance
