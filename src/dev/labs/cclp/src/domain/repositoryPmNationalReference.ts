import { Repository, IOrm } from 'lambdaorm'
import { PmNationalReference, QryPmNationalReference } from './model'
export class PmNationalReferenceRepository extends Repository<PmNationalReference, QryPmNationalReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmNationalReferences', stage, orm)
	}
	// Add your code here
}
