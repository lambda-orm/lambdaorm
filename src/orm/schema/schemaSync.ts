import { Delta, IOrm } from '../model/index'
import { SchemaHelper } from './schemaHelper'
import { SchemaActionDDL } from './schemaActionDDL'
import { ExecutionSyncResult } from './executionSyncResult'

export class SchemaSync extends SchemaActionDDL {
	protected delta:Delta
	constructor (orm:IOrm, schema:SchemaHelper, delta:Delta) {
		super(orm, schema)
		this.delta = delta
	}

	public serialize ():Delta {
		return this.delta
	}

	public sentence (dialect:string):any[] {
		return this.orm.language.sync(dialect, this.delta, this.schema)
	}

	public async execute (database:string):Promise<ExecutionSyncResult> {
		const result = await super.execute(database)
		return { results: result.results, delta: this.delta }
	}
}
