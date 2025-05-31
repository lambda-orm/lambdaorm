import { Repository, IOrm } from 'lambdaorm'
import { PrIndividualReference, QryPrIndividualReference } from './model'
export class PrIndividualReferenceRepository extends Repository<PrIndividualReference, QryPrIndividualReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('PrIndividualReferences', stage, orm)
	}
	// Add your code here
}
