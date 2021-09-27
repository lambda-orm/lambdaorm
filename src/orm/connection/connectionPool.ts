/* eslint-disable linebreak-style */
import { ConnectionConfig } from './connectionConfig'
import { Connection } from './connection'

export abstract class ConnectionPool {
	public config:ConnectionConfig
	constructor (config:ConnectionConfig) {
		this.config = config
	}

	public abstract acquire():Promise<Connection>
	public abstract release(connection: Connection): Promise<void>
	public abstract end():Promise<void>
}
