
import { ConnectionConfig, ConnectionError } from '../../domain'
import { ConnectionPoolPort } from '../ports/connectionPoolPort'
import { ConnectionPort } from '../ports/connectionPort'

export class ConnectionService {
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
			throw new ConnectionError(`Connection to ${config.name} whit dialect ${config.dialect} not supported`)
		}
		const pool = new DialectPool(config) as ConnectionPoolPort
		this.pools[config.name] = pool
	}

	protected pool (name:string):ConnectionPoolPort {
		const pool = this.pools[name] as ConnectionPoolPort
		if (!pool) {
			throw new ConnectionError(`connection ${name} not found`)
		}
		return pool
	}

	public async end ():Promise<void> {
		for (const k in this.pools) {
			const pool = this.pools[k] as ConnectionPoolPort
			await pool.end()
		}
	}

	public get (name:string):ConnectionConfig {
		return this.pool(name).config
	}

	public async acquire (name:string):Promise<ConnectionPort> {
		const pool = this.pools[name] as ConnectionPoolPort
		if (!pool) { throw new ConnectionError(`connection ${name} not found`) }

		return this.pool(name).acquire()
	}

	public async release (connection:ConnectionPort):Promise<void> {
		await this.pool(connection.config.name).release(connection)
	}
}
