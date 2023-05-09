
import { ConnectionConfig } from '../../../domain'
import { Connection, ConnectionPool } from '../../../application'
export abstract class ConnectionPoolAdapter implements ConnectionPool {
	public config:ConnectionConfig
	constructor (config:ConnectionConfig) {
		this.config = config
	}

	public abstract init():Promise<void>
	public abstract acquire():Promise<Connection>
	public abstract release(connection: Connection): Promise<void>
	public abstract end():Promise<void>
}
