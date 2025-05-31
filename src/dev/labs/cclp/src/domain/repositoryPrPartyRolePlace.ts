import { Repository, IOrm } from 'lambdaorm'
import { PrPartyRolePlace, QryPrPartyRolePlace } from './model'
export class PrPartyRolePlaceRepository extends Repository<PrPartyRolePlace, QryPrPartyRolePlace> {
	constructor (stage?: string, orm?:IOrm) {
		super('PrPartyRolePlaces', stage, orm)
	}
	// Add your code here
}
