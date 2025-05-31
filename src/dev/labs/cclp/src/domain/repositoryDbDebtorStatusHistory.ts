import { Repository, IOrm } from 'lambdaorm'
import { DbDebtorStatusHistory, QryDbDebtorStatusHistory } from './model'
export class DbDebtorStatusHistoryRepository extends Repository<DbDebtorStatusHistory, QryDbDebtorStatusHistory> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbDebtorStatusHistories', stage, orm)
	}
	// Add your code here
}
