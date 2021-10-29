import { Schema, Query } from '../model/index'
import { SchemaHelper } from './schemaHelper'
import { ExecutionResult } from '../connection'
import { Helper } from './../helper'
import { SchemaBuilder } from 'orm/language'
import { DatabaseActionDDL } from './databaseActionDDL'

export class DatabaseSync extends DatabaseActionDDL {
	public async queries (): Promise<Query[]> {
		const current = this.configManager.schema.get(this.database.schema) as Schema
		const state = await this.state.get(this.database.name) as Schema
		const schema = this.configManager.schema.transform(current)
		const schemaHelper = new SchemaHelper(schema)
		const _current = schema.entity
		const _old = state ? this.configManager.schema.transform(state).entity : null
		const delta = Helper.deltaWithSimpleArrays(_current, _old)
		return new SchemaBuilder(this.configManager, this.languageManager, this.database).sync(delta, schemaHelper)
	}

	public async execute (tryAllCan = false):Promise<ExecutionResult> {
		const current = this.configManager.schema.get(this.database.schema) as Schema
		const result = await this._execute(tryAllCan)
		await this.state.updateSchema(this.database.name, current)
		return result
	}
}
