import { Repository, IOrm } from 'lambdaorm'
import { DbBank, QryDbBank } from './model'
export class DbBankRepository extends Repository<DbBank, QryDbBank> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbBanks', stage, orm)
	}
	// Add your code here
}
