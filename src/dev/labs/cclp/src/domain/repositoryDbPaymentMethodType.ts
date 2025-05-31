import { Repository, IOrm } from 'lambdaorm'
import { DbPaymentMethodType, QryDbPaymentMethodType } from './model'
export class DbPaymentMethodTypeRepository extends Repository<DbPaymentMethodType, QryDbPaymentMethodType> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbPaymentMethodTypes', stage, orm)
	}
	// Add your code here
}
