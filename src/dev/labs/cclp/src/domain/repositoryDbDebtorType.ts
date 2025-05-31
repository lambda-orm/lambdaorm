import { Repository, IOrm } from 'lambdaorm'
import { DbDebtorType, QryDbDebtorType } from './model'
export class DbDebtorTypeRepository extends Repository<DbDebtorType, QryDbDebtorType> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbDebtorTypes', stage, orm)
	}
	// Add your code here
}
