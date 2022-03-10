
import { Parameter, Query } from '../model'
import { ConnectionConfig } from './connectionConfig'
import { MappingConfig } from '../manager'

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

	public abstract select(mapping:MappingConfig, query:Query, params:Parameter[]):Promise<any>
	public abstract insert(mapping:MappingConfig, query:Query, params:Parameter[]):Promise<any>
	public abstract update(mapping:MappingConfig, query:Query, params:Parameter[]):Promise<number>
	public abstract delete(mapping:MappingConfig, query: Query, params: Parameter[]): Promise<number>
	public abstract bulkInsert(mapping:MappingConfig, query: Query, array: any[], parameters: Parameter[]): Promise<any[]>
	public abstract execute(query:Query):Promise<any>

	public abstract executeSentence(sentence:any):Promise<any>

	public abstract beginTransaction():Promise<void>
	public abstract commit():Promise<void>
	public abstract rollback():Promise<void>
}
