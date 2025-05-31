import { Repository, IOrm } from 'lambdaorm'
import { PrOrganizationReference, QryPrOrganizationReference } from './model'
export class PrOrganizationReferenceRepository extends Repository<PrOrganizationReference, QryPrOrganizationReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('PrOrganizationReferences', stage, orm)
	}
	// Add your code here
}
