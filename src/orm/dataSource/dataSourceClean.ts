import { Query } from '../model/index'
import { DataSourceActionDDL } from './dataSourceActionDDL'
import { DDLBuilder } from '../manager/ddlBuilder'
import { MappingConfig } from '../manager'
export class DataSourceClean extends DataSourceActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.state.get(this.dataSource.name)
		if (state && state.mapping) {
			const schemaConfig = new MappingConfig(state.mapping)
			return new DDLBuilder(this.schema, this.expressionManager, this.languageManager, this.dataSource).drop(schemaConfig.listEntities())
		}
		return []
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.dataSource, queries, tryAllCan)
		await this.state.remove(this.dataSource.name)
		return result
	}
}
