import { ConnectionConfig } from '../../domain/connection'
import { Connection } from './connection'

export interface ConnectionPool {
	config:ConnectionConfig
	init():Promise<void>
	acquire():Promise<Connection>
	release(connection: Connection): Promise<void>
	end():Promise<void>
}
