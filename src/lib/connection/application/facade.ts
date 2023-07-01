import { ConnectionConfig } from '../domain'
import { Connection } from './ports/connection'
import { ConnectionPoolService } from './services/connectionPoolService'
import { DialectPoolService } from './services/dialectPoolService'
import { AcquireConnection } from './useCases/acquire'
import { ReleaseConnection } from './useCases/release'

export class ConnectionFacade {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly dialectService:DialectPoolService,
	private readonly poolService:ConnectionPoolService,
	private readonly acquireConnection:AcquireConnection,
	private readonly releaseConnection:ReleaseConnection
	) {}

	public addDialect (dialect:string, classConnectionPool:any):ConnectionFacade {
		this.dialectService.add(dialect, classConnectionPool)
		return this
	}

	public load (config:ConnectionConfig):void {
		this.poolService.load(config)
	}

	public getConfig (name:string):ConnectionConfig {
		return this.poolService.get(name).config
	}

	public async end ():Promise<void> {
		this.poolService.endAll()
	}

	public async acquire (name:string):Promise<Connection> {
		return this.acquireConnection.acquire(name)
	}

	public async release (connection:Connection):Promise<void> {
		await this.releaseConnection.release(connection)
	}
}
