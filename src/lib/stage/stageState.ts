import { Model, ModelState } from '../model'
import { SchemaConfig } from '../manager'
import { Helper } from '../manager/helper'
const path = require('path')

export class StageState {
	private schema: SchemaConfig
	constructor (schema:SchemaConfig) {
		this.schema = schema
	}

	public async get (name:string):Promise<ModelState> {
		const file = this.getFile(name)
		const exists = await Helper.existsPath(file)
		if (exists) {
			const content = await Helper.readFile(file)
			if (content) {
				return JSON.parse(content)
			}
		}
		return { model: { entities: [], enums: [] }, mappingData: {}, pendingData: [] }
	}

	public async updateModel (name:string, model:Model):Promise<void> {
		const stateFile = this.getFile(name)
		const state = await this.get(name)
		state.model = model
		await Helper.writeFile(stateFile, JSON.stringify(state))
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
}
