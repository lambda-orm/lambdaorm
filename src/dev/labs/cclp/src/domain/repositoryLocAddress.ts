import { Repository, IOrm } from 'lambdaorm'
import { LocAddress, QryLocAddress } from './model'
export class LocAddressRepository extends Repository<LocAddress, QryLocAddress> {
	constructor (stage?: string, orm?:IOrm) {
		super('LocAddresses', stage, orm)
	}
	// Add your code here
}
