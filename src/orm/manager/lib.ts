import fs from 'fs'
import path from 'path'
import { Config, Database } from '../model'
import { Helper } from '../helper'
const ConfigExtends = require('config-extends')
const yaml = require('js-yaml')

export class LibManager {
	public async getConfig (source?: string): Promise<Config> {
		let workspace : string
		let configFile: string|undefined

		workspace = process.cwd()

		if (source === undefined) {
			configFile = this.getConfigFileName(workspace)
		} else if (typeof source === 'string') {
			const lstat = fs.lstatSync(source)
			if (lstat.isFile()) {
				configFile = path.basename(source)
				workspace = path.dirname(source)
			} else {
				workspace = source
				configFile = this.getConfigFileName(workspace)
			}
		} else {
			throw new Error(`Config: ${source} not supported`)
		}

		let config: Config = { app: { workspace: workspace, configFile: configFile, src: 'src', data: 'data' }, databases: [], schemas: [] }
		if (configFile !== undefined) {
			const configPath = path.join(workspace, configFile)
			if (path.extname(configFile) === '.yaml' || path.extname(configFile) === '.yml') {
				config = await ConfigExtends.apply(configPath)
			} else if (path.extname(configFile) === '.json') {
				const content = await Helper.readFile(configPath)
				if (content !== null) {
					config = JSON.parse(content)
				} else {
					throw new Error(`Config file: ${configPath} empty`)
				}
			} else {
				throw new Error(`Config file: ${configPath} not supported`)
			}
		}

		if (config.app === undefined) {
			config.app = { workspace: workspace, configFile: configFile, src: 'src', data: 'data' }
		} else {
			if (config.app.workspace === undefined) {
				config.app.workspace = workspace
			}
			if (config.app.configFile === undefined) {
				config.app.configFile = configFile
			}
			if (config.app.src === undefined) {
				config.app.src = 'src'
			}
			if (config.app.data === undefined) {
				config.app.data = 'data'
			}
		}
		if (config.databases === undefined) config.databases = []
		if (config.schemas === undefined) config.schemas = []

		return config
	}

	public getConfigFileName (workspace:string):string|undefined {
		if (fs.existsSync(path.join(workspace, 'lambdaorm.yaml'))) {
			return 'lambdaorm.yaml'
		} else if (fs.existsSync(path.join(workspace, 'lambdaorm.yml'))) {
			return 'lambdaorm.yml'
		} else if (fs.existsSync(path.join(workspace, 'lambdaorm.json'))) {
			return 'lambdaorm.json'
		} else {
			return undefined
		}
	}

	public async writeConfig (config: Config): Promise<void> {
		if (config.app.configFile !== undefined) {
			const configPath = path.join(config.app.workspace, config.app.configFile)
			if (path.extname(configPath) === '.yaml' || path.extname(configPath) === '.yml') {
				const content = yaml.dump(config)
				await Helper.writeFile(configPath, content, true)
			} else if (path.extname(configPath) === '.json') {
				const content = JSON.stringify(config, null, 2)
				await Helper.writeFile(configPath, content, true)
			} else {
				throw new Error(`Config file: ${configPath} not supported`)
			}
		} else {
			throw new Error('Config not defined')
		}
	}

	public getDatabase (database:string, config:Config):Database {
		// get database
		let db:Database|undefined
		if (database === undefined) {
			if (config.databases.length === 1) {
				db = config.databases[0]
			} else if (config.databases.length > 1 && config.app.defaultDatabase !== undefined) {
				db = config.databases.find(p => p.name === config.app.defaultDatabase)
				if (db === undefined) {
					throw new Error(`database: ${config.app.defaultDatabase} not found in config`)
				}
			} else {
				throw new Error('the name argument with the name of the database is required')
			}
		} else {
			db = config.databases.find(p => p.name === database)
			if (db === undefined) {
				throw new Error(`database: ${database} not found in config`)
			}
		}
		return db
	}

	public completeConfig (config: Config, database: string, dialect?:string, connection?: any):Database {
		let db = config.databases.find(p => p.name === database)
		if (db === undefined) {
			// si la base de datos no esta definida la crea
			if (connection === undefined) {
				connection = this.defaultConnection(dialect || 'mysql')
			}
			db = { name: database, dialect: dialect || 'mysql', schema: database, connection: connection }
			config.databases.push(db)
		} else {
			// si la base de datos esta definida

			// actualiza el dialecto si corresponse
			if ((dialect !== undefined && db.dialect !== dialect) || (db.dialect === undefined)) {
				db.dialect = dialect || 'mysql'
			}
			// actualiza la connecion si correspose
			if (connection !== undefined) {
				db.connection = connection
			} else if (db.connection === undefined) {
				db.connection = this.defaultConnection(db.dialect)
			}
			// setea el schema si no fue seteado
			if (db.schema === undefined) {
				db.schema = db.name
			}
		}
		const schema = config.schemas.find(p => p.name === db?.schema)
		if (schema === undefined) {
			config.schemas.push({ name: db.schema, enums: [], entities: [] })
		}
		if (config.app.configFile === undefined) {
			config.app.configFile = 'lambdaorm.yaml'
		}
		if (config.app.defaultDatabase === undefined) {
			config.app.defaultDatabase = db.name
		}
		return db
	}

	public defaultConnection (dialect: string): any {
		switch (dialect) {
		case 'mysql':
			return {
				host: 'localhost',
				port: 3306,
				user: 'test',
				password: 'test',
				database: 'test',
				multipleStatements: true,
				waitForConnections: true,
				connectionLimit: 10,
				queueLimit: 0
			}
		case 'mariadb':
			return {
				host: 'localhost',
				port: 3306,
				user: 'test',
				password: 'test',
				database: 'test',
				multipleStatements: true,
				waitForConnections: true,
				connectionLimit: 10,
				queueLimit: 0
			}
		case 'sqlite':
			return {
				database: 'database.sqlite'
			}
		case 'better-sqlite3':
			return {
				database: 'database.sqlite'
			}
		case 'postgres':
			return {
				host: 'localhost',
				port: 5432,
				username: 'test',
				password: 'test',
				database: 'test'
			}
		case 'mssql':
			return {
				// host: 'localhost',
				// username: 'sa',
				// password: 'Admin12345',
				// database: 'tempdb',
				server: 'localhost',
				authentication: { type: 'default', options: { userName: 'sa', password: 'Admin12345' } },
				options: { encrypt: false, database: 'tempdb' }
			}
		case 'oracle':
			return {
				host: 'localhost',
				username: 'system',
				password: 'oracle',
				port: 1521,
				sid: 'xe.oracle.docker'
			}
		case 'mongodb':
			return {
				database: 'test'
			}
		default:
			throw new Error(`dialect: ${dialect} not supported`)
		}
	}

	public getLib (dialect: string): string {
		switch (dialect) {
		case 'mysql':
		case 'mariadb':
			return 'mysql2'
		case 'sqlite':
			return 'sqlite3'
		case 'better-sqlite3':
			return 'better-sqlite3'
		case 'postgres':
			return 'pg'
		case 'mssql':
			return 'tedious'
		case 'oracle':
			return 'oracledb'
		case 'mongodb':
			return 'mongodb'
		default:
			throw new Error(`dialect: ${dialect} not supported`)
		}
	}

	public async getLocalPackage (name:string, workspace:string): Promise<string> {
		const exp = new RegExp(`${name}@(.*)\n`)
		const localNpmList = await Helper.exec('npm list --depth=0', workspace)
		const localMatches = localNpmList.match(exp)
		return (localMatches && localMatches[1] ? localMatches[1] : '').replace(/"invalid"/gi, '').trim()
	}

	public async getGlobalPackage (name:string): Promise<string> {
		const exp = new RegExp(`${name}@(.*)\n`)
		const globalNpmList = await Helper.exec('npm list -g --depth=0')
		const globalMatches = globalNpmList.match(exp)
		return (globalMatches && globalMatches[1] ? globalMatches[1] : '').replace(/"invalid"/gi, '').trim()
	}

	public getTypescriptContent () {
		return {
			compilerOptions: {
				experimentalDecorators: true,
				emitDecoratorMetadata: true,
				resolveJsonModule: true,
				esModuleInterop: true,
				strict: true,
				declaration: true,
				moduleResolution: 'node',
				sourceMap: true,
				target: 'ES6',
				module: 'commonjs',
				outDir: './build',
				baseUrl: './src',
				typeRoots: [
					'node_modules/@types'
				]
			},
			include: [
				'src/**/*'
			],
			exclude: [
				'node_modules'
			]
		}
	}
}
