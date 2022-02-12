import { Mapping, SchemaState, Query } from '../model'
import { SchemaManager } from '../manager'
import { Helper } from '../manager/helper'
const path = require('path')

export class StageState {
	private schema: SchemaManager
	constructor (schema:SchemaManager) {
		this.schema = schema
	}

	public async get (name:string):Promise<SchemaState> {
		const file = this.getFile(name)
		const exists = await Helper.existsPath(file)
		if (exists) {
			const content = await Helper.readFile(file)
			if (content) {
				return JSON.parse(content)
			}
		}
		return { mappings: [], mappingData: {}, pendingData: [] }
	}

	public async updateModel (name:string, mappings:Mapping[]):Promise<void> {
		const stateFile = this.getFile(name)
		const state = await this.get(name)
		state.mappings = mappings
		await Helper.writeFile(stateFile, JSON.stringify(state))
	}

	public async ddl (stage: string, action: string, queries: Query[]): Promise<void> {
		const dataSources: any[] = []
		for (const i in queries) {
			const query = queries[i]
			const dataSource = dataSources.find(p => p.name === query.dataSource)
			if (dataSource === undefined) {
				dataSources.push({ name: query.dataSource, queries: [query] })
			} else {
				dataSource.queries.push(query)
			}
		}
		for (const i in dataSources) {
			const dataSource = dataSources[i]
			const logFile = this.ddlFile(stage, action, dataSource.name)
			const data = dataSource.queries.map((p: Query) => p.sentence).join(';\n') + ';'
			await Helper.writeFile(logFile, data)
		}
	}

	public async updateData (name:string, mappingData:any, pendingData:any[]):Promise<void> {
		const stateFile = this.getFile(name)
		const state = await this.get(name)
		state.mappingData = mappingData
		state.pendingData = pendingData
		await Helper.writeFile(stateFile, JSON.stringify(state))
	}

	public async remove (name:string):Promise<any> {
		const file = this.getFile(name)
		await Helper.removeFile(file)
	}

	public getFile (name: string) {
		return path.join(this.schema.workspace, this.schema.schema.app.data, `${name}-state.json`)
	}

	private ddlFile (stage: string, action:string, dataSource:string) {
		let date = new Date().toISOString()
		date = Helper.replace(date, ':', '')
		date = Helper.replace(date, '.', '')
		date = Helper.replace(date, '-', '')
		return path.join(this.schema.workspace, this.schema.schema.app.data, `${stage}-ddl-${date}-${action}-${dataSource}.txt`)
	}
}
