import { Connection } from '../../domain'
import { ConnectionPoolService } from '../services/connectionPoolService'

export class AcquireConnection {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly poolService:ConnectionPoolService) {}

	public async acquire (name:string):Promise<Connection> {
		return this.poolService.get(name).acquire()
	}
}
