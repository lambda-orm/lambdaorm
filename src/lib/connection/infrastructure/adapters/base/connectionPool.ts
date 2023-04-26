
import { ConnectionConfig } from '../../../domain'
import { ConnectionPort, ConnectionPoolPort } from '../../../application'
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
