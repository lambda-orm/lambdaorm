import { Repository, IOrm } from 'lambdaorm'
import { DbDebtorAccount, QryDbDebtorAccount } from './model'
export class DbDebtorAccountRepository extends Repository<DbDebtorAccount, QryDbDebtorAccount> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbDebtorAccounts', stage, orm)
	}
	// Add your code here
}
