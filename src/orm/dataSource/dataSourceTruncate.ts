import { Query, Mapping } from '../model/index'
import { DataSourceActionDDL } from './dataSourceActionDDL'
import { DDLBuilder, MappingConfig } from '../manager'

export class DataSourceTruncate extends DataSourceActionDDL {
	public async queries (): Promise<Query[]> {
		const current = this.config.mapping.get(this.dataSource.mapping) as Mapping
		const mappingConfig = new MappingConfig(current)
		return new DDLBuilder(this.config, this.expressionManager, this.languageManager, this.dataSource).truncate(mappingConfig.listEntities())
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.dataSource, queries, tryAllCan)
		return result
	}
}
