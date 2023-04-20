import { ConnectionConfig } from '../../../domain'
import { ConnectionPort } from './connectionPort'

export interface ConnectionPoolPort {
	config:ConnectionConfig
	init():Promise<void>
	acquire():Promise<ConnectionPort>
	release(connection: ConnectionPort): Promise<void>
	end():Promise<void>
}
