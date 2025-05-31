import { Repository, IOrm } from 'lambdaorm'
import { PrPartyRole, QryPrPartyRole } from './model'
export class PrPartyRoleRepository extends Repository<PrPartyRole, QryPrPartyRole> {
	constructor (stage?: string, orm?:IOrm) {
		super('PrPartyRoles', stage, orm)
	}
	// Add your code here
}
