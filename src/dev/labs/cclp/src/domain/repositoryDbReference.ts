import { Repository, IOrm } from 'lambdaorm'
import { DbReference, QryDbReference } from './model'
export class DbReferenceRepository extends Repository<DbReference, QryDbReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbReferences', stage, orm)
	}
	// Add your code here
}
