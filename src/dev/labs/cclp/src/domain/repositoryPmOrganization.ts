import { Repository, IOrm } from 'lambdaorm'
import { PmOrganization, QryPmOrganization } from './model'
export class PmOrganizationRepository extends Repository<PmOrganization, QryPmOrganization> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmOrganizations', stage, orm)
	}
	// Add your code here
}
