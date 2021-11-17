import { Query } from '../model/index'
import { DatastoreActionDDL } from './datastoreActionDDL'
import { DDLBuilder } from '../manager/ddlBuilder'
import { SchemaHelper } from '../manager/schemaHelper'
export class DatastoreClean extends DatastoreActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.state.get(this.datastore.name)
		if (state && state.schema) {
			const schema = this.configManager.schema.transform(state.schema)
			const schemaHelper = new SchemaHelper(schema)
			return new DDLBuilder(this.configManager, this.languageManager, this.datastore).drop(schemaHelper)
		}
		return []
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.datastore, queries, tryAllCan)
		await this.state.remove(this.datastore.name)
		return result
	}
}
