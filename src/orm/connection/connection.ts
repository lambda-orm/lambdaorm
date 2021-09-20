
import { Parameter } from '../model'
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

	public abstract select(sql:string, params:Parameter[]):Promise<any>
	public abstract insert(sql:string, params:Parameter[]):Promise<number>
	public abstract update(sql:string, params:Parameter[]):Promise<number>
	public abstract delete(sql:string, params:Parameter[]):Promise<number>
	public abstract execute(sql:string):Promise<any>
	public abstract bulkInsert(sql:string, array:any[], parameters:Parameter[], fieldId?:string):Promise<number[]>
	public abstract beginTransaction():Promise<void>
	public abstract commit():Promise<void>
	public abstract rollback():Promise<void>
}
