
import { Parameter, Query } from '../model'
import { ConnectionConfig } from './connectionConfig'
import { SchemaHelper } from './../manager'

export abstract class Connection {
	public cnx:any
	public pool:any
	public inTransaction:boolean
	constructor (cnx:any, pool:any) {
		this.cnx = cnx
		this.pool = pool
		this.inTransaction = false
	}

	public get config ():ConnectionConfig {
		return this.pool.config
	}

	public abstract select(schema:SchemaHelper, query:Query, params:Parameter[]):Promise<any>
	public abstract insert(schema:SchemaHelper, query:Query, params:Parameter[]):Promise<number>
	public abstract update(schema:SchemaHelper, query:Query, params:Parameter[]):Promise<number>
	public abstract delete(schema: SchemaHelper, query: Query, params: Parameter[]): Promise<number>
	public abstract bulkInsert(schema:SchemaHelper, query: Query, array: any[], parameters: Parameter[]): Promise<number[]>
	public abstract execute(query:Query):Promise<any>

	public abstract executeSentence(sentence:any):Promise<any>

	public abstract beginTransaction():Promise<void>
	public abstract commit():Promise<void>
	public abstract rollback():Promise<void>
}
