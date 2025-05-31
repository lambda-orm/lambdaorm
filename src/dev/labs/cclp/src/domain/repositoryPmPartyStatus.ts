import { Repository, IOrm } from 'lambdaorm'
import { PmPartyStatus, QryPmPartyStatus } from './model'
export class PmPartyStatusRepository extends Repository<PmPartyStatus, QryPmPartyStatus> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmPartyStatuses', stage, orm)
	}
	// Add your code here
}
