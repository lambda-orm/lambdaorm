import { Repository, IOrm } from 'lambdaorm'
import { LamAccountType, QryLamAccountType } from './model'
export class LamAccountTypeRepository extends Repository<LamAccountType, QryLamAccountType> {
	constructor (stage?: string, orm?:IOrm) {
		super('LamAccountTypes', stage, orm)
	}
	// Add your code here
}
