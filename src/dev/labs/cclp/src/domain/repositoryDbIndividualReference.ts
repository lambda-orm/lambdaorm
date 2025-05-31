import { Repository, IOrm } from 'lambdaorm'
import { DbIndividualReference, QryDbIndividualReference } from './model'
export class DbIndividualReferenceRepository extends Repository<DbIndividualReference, QryDbIndividualReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbIndividualReferences', stage, orm)
	}
	// Add your code here
}
