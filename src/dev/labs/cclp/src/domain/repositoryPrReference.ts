import { Repository, IOrm } from 'lambdaorm'
import { PrReference, QryPrReference } from './model'
export class PrReferenceRepository extends Repository<PrReference, QryPrReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('PrReferences', stage, orm)
	}
	// Add your code here
}
