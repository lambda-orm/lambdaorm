import { Query, Schema } from '../model/index'
import { ExecutionResult } from '../connection'
import { DatabaseActionDDL } from './databaseActionDDL'
import { SchemaBuilder } from './../manager/schemaBuilder'
import { SchemaHelper } from './schemaHelper'
export class DatabaseClean extends DatabaseActionDDL {
	public async queries (): Promise<Query[]> {
		const current = this.configManager.schema.get(this.database.schema) as Schema
		const schema = this.configManager.schema.transform(current)
		const schemaHelper = new SchemaHelper(schema)
		return new SchemaBuilder(this.configManager, this.languageManager, this.database).drop(schemaHelper)
	}

	public async execute (tryAllCan = false): Promise<ExecutionResult> {
		const result = await this._execute(tryAllCan)
		await this.state.remove(this.database.name)
		return result
	}
}
