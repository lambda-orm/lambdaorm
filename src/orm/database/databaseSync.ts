import { Delta, IOrm, Database, Schema } from '../model/index'
import { ExecutionSyncResult } from '../schema'

export class DatabaseSync {
	protected orm:IOrm
	protected database:Database
	constructor (orm:IOrm, database:Database) {
		this.orm = orm
		this.database = database
	}

	public async serialize ():Promise<Delta> {
		const current = this.orm.schema.get(this.database.schema) as Schema
		const state = await this.orm.database.getState(this.database.name)
		const schemaSync = await this.orm.schema.sync(current, state.schema)
		return await schemaSync.serialize()
	}

	public async sentence ():Promise<any[]> {
		const current = this.orm.schema.get(this.database.schema) as Schema
		const state = await this.orm.database.getState(this.database.name)
		const schemaSync = await this.orm.schema.sync(current, state.schema)
		return await schemaSync.sentence(this.database.dialect)
	}

	public async execute ():Promise<ExecutionSyncResult> {
		const current = this.orm.schema.get(this.database.schema) as Schema
		const state = await this.orm.database.getState(this.database.name)
		const schemaSync = await this.orm.schema.sync(current, state.schema)
		const result = await schemaSync.execute(this.database.name)
		await this.orm.database.updateSchemaState(this.database.name, current)
		return result
	}
}
