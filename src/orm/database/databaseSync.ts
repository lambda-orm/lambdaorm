import { Schema, Query, Database } from '../model/index'
import { SchemaHelper } from './schemaHelper'
import { Helper } from './../helper'
import { SchemaBuilder } from './../manager/schemaBuilder'
import { DatabaseActionDDL } from './databaseActionDDL'
import { LanguageManager } from './../language'
import { ConfigManager, ExpressionManager, Executor } from './../manager'
import { DatabaseState } from './databaseState'

export class DatabaseSync extends DatabaseActionDDL {
	private currenSchema: Schema
	constructor (state:DatabaseState, configManager: ConfigManager, expressionManager: ExpressionManager, languageManager: LanguageManager, executor: Executor, database:Database) {
		super(state, configManager, expressionManager, languageManager, executor, database)
		this.currenSchema = { enums: [], entities: [], name: '' }
	}

	public async queries (): Promise<Query[]> {
		this.currenSchema = this.configManager.schema.get(this.database.schema) as Schema
		const state = await this.state.get(this.database.name)
		const current = this.configManager.schema.transform(this.currenSchema)
		const schemaHelper = new SchemaHelper(current)
		const _old = state && state.schema ? this.configManager.schema.transform(state.schema) : null
		const delta = Helper.deltaWithSimpleArrays(current.entity, _old.entity)
		return new SchemaBuilder(this.configManager, this.languageManager, this.database).sync(delta, schemaHelper)
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.database, queries, tryAllCan)
		await this.state.updateSchema(this.database.name, this.currenSchema)
		return result
	}
}
