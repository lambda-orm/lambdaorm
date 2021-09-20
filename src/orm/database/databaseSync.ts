import { Delta, IOrm, Database, Schema } from '../model/index'
import { SchemaSync, ExecutionSyncResult } from '../schema'

export class DatabaseSync {
	protected orm:IOrm
	protected database:Database
	constructor (orm:IOrm, database:Database) {
		this.orm = orm
		this.database = database
	}

	public async serialize ():Promise<Delta> {
		const current = this.orm.schema.get(this.database.schema) as Schema
		return (await this.schemaSync(current)).serialize()
	}

	public async sentence ():Promise<any[]> {
		const current = this.orm.schema.get(this.database.schema) as Schema
		const connection = this.orm.connection.get(this.database.name)
		return (await this.schemaSync(current)).sentence(connection.dialect)
	}

	public async execute ():Promise<ExecutionSyncResult> {
		const current = this.orm.schema.get(this.database.schema) as Schema
		const result = await (await this.schemaSync(current)).execute(this.database.name)
		await this.orm.database.updateSchemaState(this.database.name, current)
		return result
	}

	protected async schemaSync (current:Schema):Promise<SchemaSync> {
		const state = await this.orm.database.getState(this.database.name)
		return this.orm.schema.sync(current, state.schema)
	}
}
