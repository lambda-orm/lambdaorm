
import { ConnectionConfig, ConnectionPoolPort, ConnectionPort } from '../../domain'

export abstract class ConnectionPoolAdapter implements ConnectionPoolPort {
	public config:ConnectionConfig
	constructor (config:ConnectionConfig) {
		this.config = config
	}

	public abstract init():Promise<void>
	public abstract acquire():Promise<ConnectionPort>
	public abstract release(connection: ConnectionPort): Promise<void>
	public abstract end():Promise<void>
}
