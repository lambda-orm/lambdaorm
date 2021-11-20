import { Schema, Query, Datastore } from '../model/index'
import { SchemaHelper } from '../manager/schemaHelper'
import { Helper } from '../helper'
import { DDLBuilder } from '../manager/ddlBuilder'
import { DatastoreActionDDL } from './datastoreActionDDL'
import { LanguageManager } from '../language'
import { ConfigManager, ExpressionManager, Executor } from '../manager'
import { DatastoreState } from './datastoreState'

export class DatastoreSync extends DatastoreActionDDL {
	private currenSchema: Schema
	constructor (state:DatastoreState, config: ConfigManager, expressionManager: ExpressionManager, languageManager: LanguageManager, executor: Executor, datastore:Datastore) {
		super(state, config, expressionManager, languageManager, executor, datastore)
		this.currenSchema = { entities: [], name: '' }
	}

	public async queries (): Promise<Query[]> {
		this.currenSchema = this.config.schema.get(this.datastore.schema) as Schema
		const state = await this.state.get(this.datastore.name)
		const current = this.config.schema.transform(this.currenSchema)
		const schemaHelper = new SchemaHelper(current)
		const _old = state && state.schema ? this.config.schema.transform(state.schema) : null
		const delta = Helper.deltaWithSimpleArrays(current.entity, _old.entity)
		return new DDLBuilder(this.config, this.expressionManager, this.languageManager, this.datastore).sync(delta, schemaHelper)
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.datastore, queries, tryAllCan)
		await this.state.updateSchema(this.datastore.name, this.currenSchema)
		return result
	}
}
