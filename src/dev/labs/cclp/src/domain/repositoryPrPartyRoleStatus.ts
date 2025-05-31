import { Repository, IOrm } from 'lambdaorm'
import { PrPartyRoleStatus, QryPrPartyRoleStatus } from './model'
export class PrPartyRoleStatusRepository extends Repository<PrPartyRoleStatus, QryPrPartyRoleStatus> {
	constructor (stage?: string, orm?:IOrm) {
		super('PrPartyRoleStatuses', stage, orm)
	}
	// Add your code here
}
