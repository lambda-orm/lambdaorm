import fs from 'fs'
import path from 'path'
import { ConfigInfo, Config, Database } from '../model'
import { Helper } from '../helper'
const ConfigExtends = require('config-extends')
const yaml = require('js-yaml')

export class LibManager {
	public async getConfigInfo (source?: string | Config): Promise<ConfigInfo> {
		const configInfo: ConfigInfo = { workspace: process.cwd(), config: { paths: { src: 'src', data: 'data' }, databases: [], schemas: [] } }
		if (source === undefined) {
			configInfo.configFile = this.getConfigFileName(configInfo.workspace)
		} else if (typeof source === 'string') {
			const lstat = fs.lstatSync(source)
			if (lstat.isFile()) {
				configInfo.configFile = path.basename(source)
				configInfo.workspace = path.dirname(source)
			} else {
				configInfo.workspace = source
				configInfo.configFile = this.getConfigFileName(configInfo.workspace)
			}
		} else {
			const config = source as Config
			if (config === undefined) {
				throw new Error(`Config: ${source} not supported`)
			}
			configInfo.config = config
		}

		if (configInfo.configFile !== undefined) {
			const configPath = path.join(configInfo.workspace, configInfo.configFile)
			if (path.extname(configInfo.configFile) === '.yaml' || path.extname(configInfo.configFile) === '.yml') {
				configInfo.config = await ConfigExtends.apply(configPath)
			} else if (path.extname(configInfo.configFile) === '.json') {
				const content = await Helper.readFile(configPath)
				if (content !== null) {
					configInfo.config = JSON.parse(content)
				} else {
					throw new Error(`Config file: ${configPath} empty`)
				}
			} else {
				throw new Error(`Config file: ${configPath} not supported`)
			}
		}

		if (configInfo.config.paths === undefined) {
			configInfo.config.paths = { src: 'src', data: 'data' }
		} else {
			if (configInfo.config.paths.src === undefined) {
				configInfo.config.paths.src = 'src'
			}
			if (configInfo.config.paths.data === undefined) {
				configInfo.config.paths.data = 'data'
			}
		}
		if (configInfo.config.databases === undefined) configInfo.config.databases = []
		if (configInfo.config.schemas === undefined) configInfo.config.schemas = []

		return configInfo
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

	public async writeConfig (configInfo: ConfigInfo): Promise<void> {
		if (configInfo.configFile !== undefined) {
			const configPath = path.join(configInfo.workspace, configInfo.configFile)
			if (path.extname(configPath) === '.yaml' || path.extname(configPath) === '.yml') {
				const content = yaml.dump(configInfo.config)
				await Helper.writeFile(configPath, content, true)
			} else if (path.extname(configPath) === '.json') {
				const content = JSON.stringify(configInfo.config, null, 2)
				await Helper.writeFile(configPath, content, true)
			} else {
				throw new Error(`Config file: ${configPath} not supported`)
			}
		} else {
			throw new Error('Config not defined')
		}
	}

	public completeConfig (configInfo: ConfigInfo, database: string, dialect?:string, connection?: any):Database {
		let db = configInfo.config.databases.find(p => p.name === database)
		if (db === undefined) {
			// si la base de datos no esta definida la crea
			if (connection === undefined) {
				connection = this.defaultConnection(dialect || 'mysql')
			}
			db = { name: database, dialect: dialect || 'mysql', schema: database, connection: connection }
			configInfo.config.databases.push(db)
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
		const schema = configInfo.config.schemas.find(p => p.name === db?.schema)
		if (schema === undefined) {
			configInfo.config.schemas.push({ name: db.schema, enums: [], entities: [] })
		}
		if (configInfo.configFile === undefined) {
			configInfo.configFile = 'lambdaorm.yaml'
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
