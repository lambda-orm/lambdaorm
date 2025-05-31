import { Repository, IOrm } from 'lambdaorm'
import { DbAccountService, QryDbAccountService } from './model'
export class DbAccountServiceRepository extends Repository<DbAccountService, QryDbAccountService> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbAccountServices', stage, orm)
	}
	// Add your code here
}
