import path from 'path'
import { Schema, DataSource } from './../model'
import { Helper } from './../helper'
const yaml = require('js-yaml')

export class LibManager {
	public async getConfig (source?: string): Promise<Schema> {
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
			throw new Error(`Schema: ${source} not supported`)
		}

		let schema: Schema = { app: { src: 'src', data: 'data', model: 'model' }, model: { entities: [], enums: [] }, dataSources: [], mappings: [], stages: [] }
		if (configFile !== undefined) {
			const configPath = path.join(workspace, configFile)
			if (path.extname(configFile) === '.yaml' || path.extname(configFile) === '.yml') {
				const content = await Helper.readFile(configPath)
				if (content !== null) {
					schema = yaml.load(content)
				} else {
					throw new Error(`Schema file: ${configPath} empty`)
				}
			} else if (path.extname(configFile) === '.json') {
				const content = await Helper.readFile(configPath)
				if (content !== null) {
					schema = JSON.parse(content)
				} else {
					throw new Error(`Schema file: ${configPath} empty`)
				}
			} else {
				throw new Error(`Schema file: ${configPath} not supported`)
			}
		}

		if (schema.app === undefined) {
			schema.app = { src: 'src', data: 'data', model: 'model' }
		} else {
			if (schema.app.src === undefined) {
				schema.app.src = 'src'
			}
			if (schema.app.data === undefined) {
				schema.app.data = 'data'
			}
			if (schema.app.model === undefined) {
				schema.app.model = 'model'
			}
		}
		if (schema.dataSources === undefined) schema.dataSources = []
		return schema
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

// public getDatastore (dataSource:string|undefined, schema:Schema):DataSource {
// // get dataSource
// let db:DataSource|undefined
// if (dataSource === undefined) {
// if (schema.dataSources.length === 1) {
// db = schema.dataSources[0]
// } else if (schema.dataSources.length > 1 && schema.defaultDatastore !== undefined) {
// db = schema.dataSources.find(p => p.name === schema.defaultDatastore)
// if (db === undefined) {
// throw new Error(`dataSource: ${schema.defaultDatastore} not found in schema`)
// }
// } else {
// throw new Error('the name argument with the name of the dataSource is required')
// }
// } else {
// db = schema.dataSources.find(p => p.name === dataSource)
// if (db === undefined) {
// throw new Error(`dataSource: ${dataSource} not found in schema`)
// }
// }
// return db
// }
}
