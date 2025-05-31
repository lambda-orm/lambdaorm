import { Repository, IOrm } from 'lambdaorm'
import { DbLedgerAccountReference, QryDbLedgerAccountReference } from './model'
export class DbLedgerAccountReferenceRepository extends Repository<DbLedgerAccountReference, QryDbLedgerAccountReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbLedgerAccountReferences', stage, orm)
	}
	// Add your code here
}
