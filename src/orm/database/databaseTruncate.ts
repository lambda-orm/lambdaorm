import { Query, Schema } from '../model/index'
import { SchemaHelper } from '../manager/schemaHelper'
import { DatabaseActionDDL } from './databaseActionDDL'
import { DDLBuilder } from '../manager/ddlBuilder'

export class DatabaseTruncate extends DatabaseActionDDL {
	public async queries (): Promise<Query[]> {
		const current = this.configManager.schema.get(this.database.schema) as Schema
		const schema = this.configManager.schema.transform(current)
		const schemaHelper = new SchemaHelper(schema)
		return new DDLBuilder(this.configManager, this.languageManager, this.database).truncate(schemaHelper)
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.database, queries, tryAllCan)
		return result
	}
}
