import { Parameter, Query } from '../model'
import { Connection } from './connection'
import { Executor } from './executor'

export class Transaction extends Executor {
	private connection?:Connection

	public async begin ():Promise<void> {
		this.connection = await this.connectionManager.acquire(this.connectionName)
		await this.connection.beginTransaction()
	}

	public async select (query:Query, params:Parameter[]):Promise<any> {
		if (!this.connection) { throw new Error('Connection is closed') }
		return this.connection.select(query, params)
	}

	public async insert (query:Query, params:Parameter[]):Promise<number> {
		if (!this.connection) { throw new Error('Connection is closed') }
		return this.connection.insert(query, params)
	}

	public async bulkInsert (query:Query, array:any[], parameters:Parameter[]):Promise<number[]> {
		if (!this.connection) { throw new Error('Connection is closed') }
		return this.connection.bulkInsert(query, array, parameters)
	}

	public async update (query:Query, params:Parameter[]):Promise<number> {
		if (!this.connection) { throw new Error('Connection is closed') }
		return this.connection.update(query, params)
	}

	public async delete (query:Query, params:Parameter[]):Promise<number> {
		if (!this.connection) { throw new Error('Connection is closed') }
		return this.connection.delete(query, params)
	}

	public async execute (query:Query):Promise<any> {
		if (!this.connection) { throw new Error('Connection is closed') }
		return this.connection.execute(query)
	}

	public async commit ():Promise<void> {
		if (!this.connection) { throw new Error('Connection is closed') }
		await this.connection.commit()
		await this.connectionManager.release(this.connection)
	}

	public async rollback ():Promise<void> {
		if (!this.connection) { throw new Error('Connection is closed') }
		await this.connection.rollback()
		await this.connectionManager.release(this.connection)
	}
}
