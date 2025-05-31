import { Repository, IOrm } from 'lambdaorm'
import { LamAccount, QryLamAccount } from './model'
export class LamAccountRepository extends Repository<LamAccount, QryLamAccount> {
	constructor (stage?: string, orm?:IOrm) {
		super('LamAccounts', stage, orm)
	}
	// Add your code here
}
