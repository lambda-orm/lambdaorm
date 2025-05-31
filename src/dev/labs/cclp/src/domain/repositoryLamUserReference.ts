import { Repository, IOrm } from 'lambdaorm'
import { LamUserReference, QryLamUserReference } from './model'
export class LamUserReferenceRepository extends Repository<LamUserReference, QryLamUserReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('LamUserReferences', stage, orm)
	}
	// Add your code here
}
