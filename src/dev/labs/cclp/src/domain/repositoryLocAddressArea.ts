import { Repository, IOrm } from 'lambdaorm'
import { LocAddressArea, QryLocAddressArea } from './model'
export class LocAddressAreaRepository extends Repository<LocAddressArea, QryLocAddressArea> {
	constructor (stage?: string, orm?:IOrm) {
		super('LocAddressAreas', stage, orm)
	}
	// Add your code here
}
