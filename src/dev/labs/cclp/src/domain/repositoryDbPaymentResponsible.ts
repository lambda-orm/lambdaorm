import { Repository, IOrm } from 'lambdaorm'
import { DbPaymentResponsible, QryDbPaymentResponsible } from './model'
export class DbPaymentResponsibleRepository extends Repository<DbPaymentResponsible, QryDbPaymentResponsible> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbPaymentResponsibles', stage, orm)
	}
	// Add your code here
}
