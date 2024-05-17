import { Connection } from '../../domain'
import { ConnectionPoolService } from '../services/connectionPoolService'

export class ReleaseConnection {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly poolService:ConnectionPoolService) {}

	public async release (connection:Connection):Promise<void> {
		await this.poolService.get(connection.config.name).release(connection)
	}
}
