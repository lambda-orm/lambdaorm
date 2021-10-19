import path from 'path'
import { Config, Database, Schema, Entity, IOrm } from '../model'
import { Helper } from '../helper'
const ConfigExtends = require('config-extends')
const yaml = require('js-yaml')

export class LibManager {
	private orm:IOrm
	constructor (orm:IOrm) {
		this.orm = orm
	}

	public async getConfig (source?: string): Promise<Config> {
		let workspace : string
		let configFile: string|undefined
		workspace = process.cwd()

		if (source === undefined) {
			configFile = await this.getConfigFileName(workspace)
		} else if (typeof source === 'string') {
			const lstat = await Helper.lstat(source)
			if (lstat.isFile()) {
				configFile = path.basename(source)
				workspace = path.dirname(source)
			} else {
				workspace = source
				configFile = await this.getConfigFileName(workspace)
			}
		} else {
			throw new Error(`Config: ${source} not supported`)
		}

		let config: Config = { app: { configFile: configFile, src: 'src', data: 'data', models: 'models' }, databases: [], schemas: [] }
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
			config.app = { configFile: configFile, src: 'src', data: 'data', models: 'models' }
		} else {
			if (config.app.configFile === undefined) {
				config.app.configFile = configFile
			}
			if (config.app.src === undefined) {
				config.app.src = 'src'
			}
			if (config.app.data === undefined) {
				config.app.data = 'data'
			}
			if (config.app.models === undefined) {
				config.app.models = 'models'
			}
		}
		if (config.databases === undefined) config.databases = []
		if (config.schemas === undefined) config.schemas = []

		return config
	}

	public async createStructure (config: Config) {
		// create initial structure
		await Helper.createIfNotExists(path.join(this.orm.workspace, config.app.src))
		await Helper.createIfNotExists(path.join(this.orm.workspace, config.app.data))

		// if the sintaxis.d.ts does not exist create it
		const sintaxisPath = path.join(this.orm.workspace, config.app.src, 'sintaxis.d.ts')
		if (!await Helper.existsPath(sintaxisPath)) {
			await Helper.copyFile(path.join(__dirname, './../sintaxis.d.ts'), sintaxisPath)
		}

		// if the package.json does not exist create it
		const packagePath = path.join(this.orm.workspace, 'package.json')
		if (!await Helper.existsPath(packagePath)) {
			await Helper.writeFile(packagePath, JSON.stringify({ dependencies: {} }, null, 2))
		}

		// if there is no tsconfig.json create it
		const tsconfigPath = path.join(this.orm.workspace, 'tsconfig.json')
		if (!await Helper.existsPath(tsconfigPath)) {
			const tsconfigContent = this.getTypescriptContent()
			await Helper.writeFile(tsconfigPath, JSON.stringify(tsconfigContent, null, 2))
		}

		// install typescript if not installed.
		const typescriptLib = await this.getLocalPackage('typescript', this.orm.workspace)
		if (typescriptLib === '') {
			await Helper.exec('npm install typescript -D', this.orm.workspace)
		}

		// install lambdaorm if it is not installed.
		const lambdaormLib = await this.getLocalPackage('lambdaorm', this.orm.workspace)
		if (lambdaormLib === '') {
			await Helper.exec('npm install lambdaorm', this.orm.workspace)
		}
	}

	public async addDialects (config: Config) {
		for (const p in config.databases) {
			const database = config.databases[p]
			// if the library is not installed locally corresponding to the dialect it will be installed
			const libs = this.getLibs(database.dialect)
			for (const p in libs) {
				const lib = libs[p]
				const localLib = await this.getLocalPackage(lib, this.orm.workspace)
				if (localLib === '') {
					await Helper.exec(`npm install ${lib}`, this.orm.workspace)
				}
				// if the library is not installed locally corresponding to the dialect it will be installed
				const globalLib = await this.getGlobalPackage(lib)
				if (globalLib === '') {
					await Helper.exec(`npm install ${globalLib} -g`, this.orm.workspace)
				}
			}
		}
	}

	public async getConfigFileName (workspace:string):Promise<string|undefined> {
		if (await Helper.existsPath(path.join(workspace, 'lambdaorm.yaml'))) {
			return 'lambdaorm.yaml'
		} else if (await Helper.existsPath(path.join(workspace, 'lambdaorm.yml'))) {
			return 'lambdaorm.yml'
		} else if (await Helper.existsPath(path.join(workspace, 'lambdaorm.json'))) {
			return 'lambdaorm.json'
		} else {
			return undefined
		}
	}

	public async writeConfig (config: Config): Promise<void> {
		if (config.app.configFile !== undefined) {
			const configPath = path.join(this.orm.workspace, config.app.configFile)
			if (path.extname(configPath) === '.yaml' || path.extname(configPath) === '.yml') {
				const content = yaml.dump(config)
				await Helper.writeFile(configPath, content)
			} else if (path.extname(configPath) === '.json') {
				const content = JSON.stringify(config, null, 2)
				await Helper.writeFile(configPath, content)
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

	public getLibs (dialect: string): string[] {
		switch (dialect) {
		case 'mysql':
		case 'mariadb':
			return ['mysql2']
		case 'sqlite':
			return ['sqlite3']
		case 'better-sqlite3':
			return ['better-sqlite3']
		case 'postgres':
			return ['pg']
		case 'mssql':
			return ['tedious']
		case 'oracle':
			return ['oracledb']
		case 'mongodb':
			return ['mongodb']
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

	public async writeModel (config: Config) {
		const references: string[] = []
		for (const p in config.schemas) {
			const schema = config.schemas[p] as Schema
			const content = this.getModelContent(schema)
			const modelsPath = path.join(this.orm.workspace, config.app.src, config.app.models, schema.name)
			Helper.createIfNotExists(modelsPath)
			const schemaPath = path.join(modelsPath, 'model.ts')
			references.push('model')
			await Helper.writeFile(schemaPath, content)
			for (const q in schema.entities) {
				const entity = schema.entities[q]
				const singular = entity.singular ? entity.singular : Helper.singular(entity.name)
				const repositoryPath = path.join(modelsPath, `repository${singular}.ts`)
				references.push(`repository${singular}`)
				if (!await Helper.existsPath(repositoryPath)) {
					const repositoryContent = this.getRepositoryContent(entity)
					await Helper.writeFile(repositoryPath, repositoryContent)
				}
			}
			const lines:string[] = []
			for (const p in references) {
				const reference = references[p]
				lines.push(`export * from './${reference}'`)
			}
			await Helper.writeFile(path.join(modelsPath, 'index.ts'), lines.join('\n') + '\n')
		}
	}

	private getRepositoryContent (entity: Entity): string {
		const lines: string[] = []
		const singular = entity.singular ? entity.singular : Helper.singular(entity.name)
		lines.push('import { Respository } from \'lambdaorm\'')
		lines.push(`import { Qry${singular} } from './model'`)
		lines.push(`export class ${singular}Respository extends Respository<Qry${singular}> {`)
		lines.push('\tconstructor (database: string) {')
		lines.push(`\t\tsuper('${entity.name}', database)`)
		lines.push('\t}')
		lines.push('\t// Add your code here')
		lines.push('}')
		return lines.join('\n') + '\n'
	}

	private getModelContent (source:Schema):string {
		const lines: string[] = []
		lines.push('/* eslint-disable no-use-before-define */')
		lines.push('import { Queryable } from \'lambdaorm\'')
		for (const p in source.entities) {
			const entity = source.entities[p]
			const singular = entity.singular ? entity.singular : Helper.singular(entity.name)

			// create class
			lines.push(`export class ${singular} {`)

			if (entity.relations && entity.relations.some(p => p.type === 'manyToOne')) {
				lines.push('\tconstructor () {')
				for (const q in entity.relations) {
					const relation = entity.relations[q]
					if (relation.type === 'manyToOne') {
						lines.push(`\t\tthis.${relation.name}=[]`)
					}
				}
				lines.push('\t}')
			}

			for (const q in entity.properties) {
				const property = entity.properties[q]
				const type = Helper.tsType(property.type)
				if (property.nullable === undefined || property.nullable === true) {
					lines.push(`\t${property.name}?: ${type}`)
				} else {
					lines.push(`\t${property.name}?: ${type}`)
				}
			}
			for (const q in entity.relations) {
				const relation = entity.relations[q]
				const relationEntity = source.entities.find(p => p.name === relation.entity) as Entity
				const relationEntitySingularName = relationEntity.singular ? relationEntity.singular : Helper.singular(relationEntity.name)
				// const relationEntity = Helper.singular(relation.entity)
				switch (relation.type) {
				case 'oneToMany':
				case 'oneToOne':
					lines.push(`\t${relation.name}?: ${relationEntitySingularName}`)
					break
				case 'manyToOne':
					lines.push(`\t${relation.name}: ${relationEntitySingularName}[]`)
					break
				}
			}
			lines.push('}')

			// create interface
			lines.push(`export interface Qry${singular} {`)
			for (const q in entity.properties) {
				const property = entity.properties[q]
				const type = Helper.tsType(property.type)
				lines.push(`\t${property.name}: ${type}`)
			}
			for (const q in entity.relations) {
				const relation = entity.relations[q]
				const relationEntity = source.entities.find(p => p.name === relation.entity) as Entity
				const relationEntitySingularName = relationEntity.singular ? relationEntity.singular : Helper.singular(relationEntity.name)
				// const relationEntity = Helper.singular(relation.entity)
				switch (relation.type) {
				case 'oneToMany':
					lines.push(`\t${relation.name}: ${relationEntitySingularName} & OneToMany<${relationEntitySingularName}> & ${relationEntitySingularName}`)
					break
				case 'oneToOne':
					lines.push(`\t${relation.name}: ${relationEntitySingularName} & OneToOne<${relationEntitySingularName}> & ${relationEntitySingularName}`)
					break
				case 'manyToOne':
					lines.push(`\t${relation.name}: ManyToOne<${relationEntitySingularName}> & ${relationEntitySingularName}[]`)
					break
				}
			}
			lines.push('}')
		}
		for (const p in source.entities) {
			const entity = source.entities[p]
			const singular = entity.singular ? entity.singular : Helper.singular(entity.name)
			lines.push(`\texport let ${entity.name}: Queryable<Qry${singular}>`)
		}
		return lines.join('\n') + '\n'
	}
}
