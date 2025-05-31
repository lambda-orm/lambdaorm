import { Repository, IOrm } from 'lambdaorm'
import { LamAccountStatusHistory, QryLamAccountStatusHistory } from './model'
export class LamAccountStatusHistoryRepository extends Repository<LamAccountStatusHistory, QryLamAccountStatusHistory> {
	constructor (stage?: string, orm?:IOrm) {
		super('LamAccountStatusHistories', stage, orm)
	}
	// Add your code here
}
