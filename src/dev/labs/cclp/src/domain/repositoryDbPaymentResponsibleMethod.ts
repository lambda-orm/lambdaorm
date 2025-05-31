import { Repository, IOrm } from 'lambdaorm'
import { DbPaymentResponsibleMethod, QryDbPaymentResponsibleMethod } from './model'
export class DbPaymentResponsibleMethodRepository extends Repository<DbPaymentResponsibleMethod, QryDbPaymentResponsibleMethod> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbPaymentResponsibleMethods', stage, orm)
	}
	// Add your code here
}
