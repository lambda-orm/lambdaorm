import { Repository, IOrm } from 'lambdaorm'
import { LamReference, QryLamReference } from './model'
export class LamReferenceRepository extends Repository<LamReference, QryLamReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('LamReferences', stage, orm)
	}
	// Add your code here
}
