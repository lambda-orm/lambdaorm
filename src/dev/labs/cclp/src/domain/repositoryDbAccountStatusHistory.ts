import { Repository, IOrm } from 'lambdaorm'
import { DbAccountStatusHistory, QryDbAccountStatusHistory } from './model'
export class DbAccountStatusHistoryRepository extends Repository<DbAccountStatusHistory, QryDbAccountStatusHistory> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbAccountStatusHistories', stage, orm)
	}
	// Add your code here
}
