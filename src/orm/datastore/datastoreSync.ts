import { Mapping, Query, Datastore } from '../model/index'
import { Helper } from '../helper'
import { DDLBuilder } from '../manager/ddlBuilder'
import { DatastoreActionDDL } from './datastoreActionDDL'
import { LanguageManager } from '../language'
import { ConfigManager, ExpressionManager, Executor } from '../manager'
import { DatastoreState } from './datastoreState'

export class DatastoreSync extends DatastoreActionDDL {
	private currenMapping: Mapping
	constructor (state:DatastoreState, config: ConfigManager, expressionManager: ExpressionManager, languageManager: LanguageManager, executor: Executor, datastore:Datastore) {
		super(state, config, expressionManager, languageManager, executor, datastore)
		this.currenMapping = { entities: [], name: '' }
	}

	public async queries (): Promise<Query[]> {
		this.currenMapping = this.config.mapping.get(this.datastore.mapping) as Mapping
		const state = await this.state.get(this.datastore.name)

		const _old = state && state.mapping ? state.mapping : null
		const delta = Helper.deltaWithSimpleArrays(this.currenMapping.entities, _old?.entities)
		return new DDLBuilder(this.config, this.expressionManager, this.languageManager, this.datastore).sync(delta)
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.datastore, queries, tryAllCan)
		await this.state.updateMapping(this.datastore.name, this.currenMapping)
		return result
	}
}
