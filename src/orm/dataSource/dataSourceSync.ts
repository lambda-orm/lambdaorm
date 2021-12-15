import { Mapping, Query, DataSource } from '../model/index'
import { Helper } from '../helper'
import { DDLBuilder } from '../manager/ddlBuilder'
import { DataSourceActionDDL } from './dataSourceActionDDL'
import { LanguageManager } from '../language'
import { SchemaConfig, ExpressionManager, Executor } from '../manager'
import { DataSourceState } from './dataSourceState'

export class DataSourceSync extends DataSourceActionDDL {
	private currenMapping: Mapping
	constructor (state:DataSourceState, schema: SchemaConfig, expressionManager: ExpressionManager, languageManager: LanguageManager, executor: Executor, dataSource:DataSource) {
		super(state, schema, expressionManager, languageManager, executor, dataSource)
		this.currenMapping = { entities: [], name: '' }
	}

	public async queries (): Promise<Query[]> {
		this.currenMapping = this.schema.mapping.get(this.dataSource.mapping) as Mapping
		const state = await this.state.get(this.dataSource.name)

		const _old = state && state.mapping ? state.mapping : null
		const delta = Helper.deltaWithSimpleArrays(this.currenMapping.entities, _old?.entities)
		return new DDLBuilder(this.schema, this.expressionManager, this.languageManager, this.dataSource).sync(delta)
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.dataSource, queries, tryAllCan)
		await this.state.updateMapping(this.dataSource.name, this.currenMapping)
		return result
	}
}
