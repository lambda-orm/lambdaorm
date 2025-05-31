import { Repository, IOrm } from 'lambdaorm'
import { PmReference, QryPmReference } from './model'
export class PmReferenceRepository extends Repository<PmReference, QryPmReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmReferences', stage, orm)
	}
	// Add your code here
}
