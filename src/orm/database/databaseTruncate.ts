import { Query, Schema } from '../model/index'
import { SchemaHelper } from './schemaHelper'
import { ExecutionResult } from '../connection'
import { DatabaseActionDDL } from './databaseActionDDL'
import { SchemaBuilder } from 'orm/language'

export class DatabaseTruncate extends DatabaseActionDDL {
	public async queries (): Promise<Query[]> {
		const current = this.configManager.schema.get(this.database.schema) as Schema
		const schema = this.configManager.schema.transform(current)
		const schemaHelper = new SchemaHelper(schema)
		return new SchemaBuilder(this.configManager, this.languageManager, this.database).truncate(schemaHelper)
	}

	public async execute (tryAllCan = false): Promise<ExecutionResult> {
		const result = await this._execute(tryAllCan)
		return result
	}
}
