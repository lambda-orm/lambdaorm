import { Repository, IOrm } from 'lambdaorm'
import { DbAddressReference, QryDbAddressReference } from './model'
export class DbAddressReferenceRepository extends Repository<DbAddressReference, QryDbAddressReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbAddressReferences', stage, orm)
	}
	// Add your code here
}
