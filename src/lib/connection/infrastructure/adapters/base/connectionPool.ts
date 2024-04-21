import { ConnectionConfig } from '../../../domain'
import { Connection, ConnectionPool } from '../../../application'
import { OrmH3lp } from '../../../../shared/infrastructure'
export abstract class ConnectionPoolAdapter implements ConnectionPool {
	public config:ConnectionConfig
	public connections:Connection[] = []
	constructor (config:ConnectionConfig, protected readonly helper:OrmH3lp) {
		this.config = config
	}

	public async acquire (): Promise<Connection> {
		const id = this.helper.uuid.uuidv4()
		const connection = await this.create(id)
		this.connections.push(connection)
		return connection
	}

	public async release (connection: Connection): Promise<void> {
		await connection.end()
		const index = this.connections.findIndex(p => p.id === connection.id)
		if (index > -1) {
			this.connections.splice(index, 1)
		}
	}

	public async end (): Promise<void> {
		for (const connection of this.connections) {
			await this.release(connection)
		}
	}

	public abstract init():Promise<void>
	protected abstract create(id:string):Promise<Connection>
}
