import { Repository, IOrm } from 'lambdaorm'
import { DbUserReference, QryDbUserReference } from './model'
export class DbUserReferenceRepository extends Repository<DbUserReference, QryDbUserReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbUserReferences', stage, orm)
	}
	// Add your code here
}
