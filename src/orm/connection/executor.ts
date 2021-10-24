import { Parameter, Query } from '../model'
import { ConnectionManager } from './connectionManager'

export class Executor {
	protected connectionManager:ConnectionManager
	public connectionName:string
	constructor (connectionManager:ConnectionManager, connectionName:string) {
		this.connectionManager = connectionManager
		this.connectionName = connectionName
	}

	public async select (query:Query, params:Parameter[]):Promise<any> {
		const connection = await this.connectionManager.acquire(this.connectionName)
		const result = await connection.select(query, params)
		await this.connectionManager.release(connection)
		return result
	}

	public async insert (query:Query, params:Parameter[]):Promise<number> {
		const connection = await this.connectionManager.acquire(this.connectionName)
		const result = await connection.insert(query, params)
		await this.connectionManager.release(connection)
		return result
	}

	public async bulkInsert (query:Query, array:any[], parameters:Parameter[]):Promise<number[]> {
		const connection = await this.connectionManager.acquire(this.connectionName)
		const result = await connection.bulkInsert(query, array, parameters)
		await this.connectionManager.release(connection)
		return result
	}

	public async update (query:Query, params:Parameter[]):Promise<number> {
		const connection = await this.connectionManager.acquire(this.connectionName)
		const result = await connection.update(query, params)
		await this.connectionManager.release(connection)
		return result
	}

	public async delete (query:Query, params:Parameter[]):Promise<number> {
		const connection = await this.connectionManager.acquire(this.connectionName)
		const result = await connection.delete(query, params)
		await this.connectionManager.release(connection)
		return result
	}

	// protected async _execute (query:Query, context:Context, metadata:DialectMetadata, executor:Executor):Promise<any> {
	// let result:any
	// switch (query.name) {
	// case 'select': result = await this.select(query, context, metadata, executor); break
	// case 'insert': result = await this.insert(query, context, metadata, executor); break
	// case 'update': result = await this.update(query, context, metadata, executor); break
	// case 'delete': result = await this.delete(query, context, metadata, executor); break
	// case 'bulkInsert': result = await this.bulkInsert(query, context, metadata, executor); break
	// default: throw new Error(`sentence ${query.name} not implemented`)
	// }
	// return result
	// }

	public async execute (query:Query):Promise<any> {
		const connection = await this.connectionManager.acquire(this.connectionName)
		const result = await connection.execute(query)
		await this.connectionManager.release(connection)
		return result
	}
}
