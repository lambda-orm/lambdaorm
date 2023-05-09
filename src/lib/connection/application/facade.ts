
import { ConnectionConfig } from '../domain'
import { Connection } from './ports/connection'
import { ConnectionPoolService } from './services/connectionPoolService'
import { DialectPoolService } from './services/dialectPoolService'
import { AcquireConnection } from './useCases/acquire'
import { ReleaseConnection } from './useCases/release'

export class ConnectionFacade {
	private dialectService:DialectPoolService
	private poolService:ConnectionPoolService
	private acquireConnection:AcquireConnection
	private releaseConnection:ReleaseConnection
	constructor () {
		this.dialectService = new DialectPoolService()
		this.poolService = new ConnectionPoolService(this.dialectService)
		this.acquireConnection = new AcquireConnection(this.poolService)
		this.releaseConnection = new ReleaseConnection(this.poolService)
	}

	public addDialect (dialect:string, classConnectionPool:any):void {
		this.dialectService.add(dialect, classConnectionPool)
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
