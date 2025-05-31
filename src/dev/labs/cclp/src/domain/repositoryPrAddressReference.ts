import { Repository, IOrm } from 'lambdaorm'
import { PrAddressReference, QryPrAddressReference } from './model'
export class PrAddressReferenceRepository extends Repository<PrAddressReference, QryPrAddressReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('PrAddressReferences', stage, orm)
	}
	// Add your code here
}
