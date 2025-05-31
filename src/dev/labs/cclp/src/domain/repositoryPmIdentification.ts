import { Repository, IOrm } from 'lambdaorm'
import { PmIdentification, QryPmIdentification } from './model'
export class PmIdentificationRepository extends Repository<PmIdentification, QryPmIdentification> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmIdentifications', stage, orm)
	}
	// Add your code here
}
