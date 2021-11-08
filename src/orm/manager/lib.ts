import path from 'path'
import { Config, Database, Schema } from './../model'
import { Helper } from './../helper'
const yaml = require('js-yaml')

export class LibManager {
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
				const content = await Helper.readFile(configPath)
				if (content !== null) {
					config = yaml.load(content)
				} else {
					throw new Error(`Config file: ${configPath} empty`)
				}
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
			config.app = { src: 'src', data: 'data', models: 'models' }
		} else {
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

	public getModel (config: Config): Schema[] {
		const targets:Schema[] = []
		for (const k in config.schemas) {
			const source = config.schemas[k]
			if (source.excludeModel === true) continue
			const target: Schema = { name: source.name, excludeModel: source.excludeModel, enums: source.enums, entities: [] }
			if (source.entities !== undefined) {
				for (let i = 0; i < source.entities.length; i++) {
					const sourceEntity = source.entities[i]
					if (sourceEntity.excludeModel === true) continue
					target.entities.push(sourceEntity)
				}
			}
			targets.push(target)
		}
		return targets
	}
}
