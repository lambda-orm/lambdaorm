import { Query, Schema } from '../model/index'

import { DatastoreActionDDL } from './datastoreActionDDL'
import { DDLBuilder, SchemaConfig } from '../manager'

export class DatastoreTruncate extends DatastoreActionDDL {
	public async queries (): Promise<Query[]> {
		const current = this.config.schema.get(this.datastore.schema) as Schema
		// const schema = this.config.schema.transform(current)
		// const schemaHelper = new SchemaConfig(schema)
		const schemaConfig = new SchemaConfig(current)
		return new DDLBuilder(this.config, this.expressionManager, this.languageManager, this.datastore).truncate(schemaConfig)
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.datastore, queries, tryAllCan)
		return result
	}
}
