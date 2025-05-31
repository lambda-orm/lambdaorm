import { Repository, IOrm } from 'lambdaorm'
import { PmOrganizationName, QryPmOrganizationName } from './model'
export class PmOrganizationNameRepository extends Repository<PmOrganizationName, QryPmOrganizationName> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmOrganizationNames', stage, orm)
	}
	// Add your code here
}
