import { Query, Mapping } from '../model/index'
import { DatastoreActionDDL } from './datastoreActionDDL'
import { DDLBuilder, MappingConfig } from '../manager'

export class DatastoreTruncate extends DatastoreActionDDL {
	public async queries (): Promise<Query[]> {
		const current = this.config.mapping.get(this.datastore.mapping) as Mapping
		const mappingConfig = new MappingConfig(current)
		return new DDLBuilder(this.config, this.expressionManager, this.languageManager, this.datastore).truncate(mappingConfig.listEntities())
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.datastore, queries, tryAllCan)
		return result
	}
}
