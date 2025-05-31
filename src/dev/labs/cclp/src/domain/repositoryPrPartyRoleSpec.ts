import { Repository, IOrm } from 'lambdaorm'
import { PrPartyRoleSpec, QryPrPartyRoleSpec } from './model'
export class PrPartyRoleSpecRepository extends Repository<PrPartyRoleSpec, QryPrPartyRoleSpec> {
	constructor (stage?: string, orm?:IOrm) {
		super('PrPartyRoleSpecs', stage, orm)
	}
	// Add your code here
}
