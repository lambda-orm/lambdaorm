import { Repository, IOrm } from 'lambdaorm'
import { PmMaritalStatus, QryPmMaritalStatus } from './model'
export class PmMaritalStatusRepository extends Repository<PmMaritalStatus, QryPmMaritalStatus> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmMaritalStatuses', stage, orm)
	}
	// Add your code here
}
