import { Repository, IOrm } from 'lambdaorm'
import { DbDebtor, QryDbDebtor } from './model'
export class DbDebtorRepository extends Repository<DbDebtor, QryDbDebtor> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbDebtors', stage, orm)
	}
	// Add your code here
}
