import { Query } from '../model/index'
import { DatabaseActionDDL } from './databaseActionDDL'
import { DDLBuilder } from '../manager/ddlBuilder'
import { SchemaHelper } from '../manager/schemaHelper'
export class DatabaseClean extends DatabaseActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.state.get(this.database.name)
		if (state && state.schema) {
			const schema = this.configManager.schema.transform(state.schema)
			const schemaHelper = new SchemaHelper(schema)
			return new DDLBuilder(this.configManager, this.languageManager, this.database).drop(schemaHelper)
		}
		return []
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.database, queries, tryAllCan)
		await this.state.remove(this.database.name)
		return result
	}
}
