import { Repository, IOrm } from 'lambdaorm'
import { LamAccountHolderReference, QryLamAccountHolderReference } from './model'
export class LamAccountHolderReferenceRepository extends Repository<LamAccountHolderReference, QryLamAccountHolderReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('LamAccountHolderReferences', stage, orm)
	}
	// Add your code here
}
