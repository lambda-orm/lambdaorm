
import { Parameter, Query } from '../model'
import { ConnectionConfig } from './connectionConfig'

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

	public abstract select(query:Query, params:Parameter[]):Promise<any>
	public abstract insert(query:Query, params:Parameter[]):Promise<number>
	public abstract update(query:Query, params:Parameter[]):Promise<number>
	public abstract delete(query: Query, params: Parameter[]): Promise<number>
	public abstract execute(query:Query):Promise<any>
	public abstract bulkInsert(query: Query, array: any[], parameters: Parameter[]): Promise<number[]>

	public abstract executeSentence(sentence:any):Promise<any>

	public abstract beginTransaction():Promise<void>
	public abstract commit():Promise<void>
	public abstract rollback():Promise<void>
}
