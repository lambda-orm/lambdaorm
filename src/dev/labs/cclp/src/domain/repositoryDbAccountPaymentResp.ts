import { Repository, IOrm } from 'lambdaorm'
import { DbAccountPaymentResp, QryDbAccountPaymentResp } from './model'
export class DbAccountPaymentRespRepository extends Repository<DbAccountPaymentResp, QryDbAccountPaymentResp> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbAccountPaymentResps', stage, orm)
	}
	// Add your code here
}
