
import { ConnectionConfig, ConnectionError } from '../../domain'
import { ConnectionPool } from '../ports/connectionPool'
import { DialectPoolService } from './dialectPoolService'

export class ConnectionPoolService {
	private pools:any = {}
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly dialectPoolService:DialectPoolService) {}

	public load (config:ConnectionConfig):void {
		this.pools[config.name] = this.dialectPoolService.create(config)
	}

	public get (name:string):ConnectionPool {
		const pool = this.pools[name] as ConnectionPool
		if (!pool) {
			throw new ConnectionError(`connection ${name} not found`)
		}
		return pool
	}

	public async end (name:string):Promise<void> {
		const pool = this.pools[name] as ConnectionPool
		if (pool) {
			await pool.end()
		}
	}

	public async endAll ():Promise<void> {
		for (const k in this.pools) {
			const pool = this.pools[k] as ConnectionPool
			await pool.end()
		}
	}
}
