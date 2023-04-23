import { ConnectionConfig } from '../../domain/connection'
import { ConnectionPort } from './connectionPort'

export interface ConnectionPoolPort {
	config:ConnectionConfig
	init():Promise<void>
	acquire():Promise<ConnectionPort>
	release(connection: ConnectionPort): Promise<void>
	end():Promise<void>
}
