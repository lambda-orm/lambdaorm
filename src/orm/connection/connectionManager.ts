
import { Connection } from './connection'
import { ConnectionPool } from './connectionPool'
import { Executor } from './executor'
import { Transaction } from './transaction'
import { ConnectionConfig } from './connectionConfig'

// const genericPool = require('generic-pool')

export class ConnectionManager {
	private dialectsPool:any
	private pools:any
	constructor () {
		this.dialectsPool = {}
		this.pools = {}
	}

	public addType (name:string, value:any) {
		this.dialectsPool[name] = value
	}

	public load (config:ConnectionConfig):void {
		const DialectPool = this.dialectsPool[config.dialect]
		if (DialectPool === undefined) {
			throw new Error(`Connection to ${config.dialect} not supported`)
		}
		const pool = new DialectPool(config) as ConnectionPool
		this.pools[config.name] = pool
	}

	protected pool (name:string):ConnectionPool {
		const pool = this.pools[name] as ConnectionPool
		if (!pool) { throw new Error(`connection ${name} not found`) }
		return pool
	}

	public async init ():Promise<void> {
		for (const k in this.pools) {
			const pool = this.pools[k] as ConnectionPool
			await pool.init()
		}
	}

	public async end ():Promise<void> {
		for (const k in this.pools) {
			const pool = this.pools[k] as ConnectionPool
			await pool.end()
		}
	}

	public get (name:string):ConnectionConfig {
		return this.pool(name).config
	}

	public async acquire (name:string):Promise<Connection> {
		const pool = this.pools[name] as ConnectionPool
		if (!pool) { throw new Error(`connection ${name} not found`) }

		return await this.pool(name).acquire()
	}

	public async release (connection:Connection):Promise<void> {
		await this.pool(connection.config.name).release(connection)
	}

	public createExecutor (connectionName:string):Executor {
		return new Executor(this, connectionName)
	}

	public createTransaction (connectionName:string):Transaction {
		return new Transaction(this, connectionName)
	}
}
