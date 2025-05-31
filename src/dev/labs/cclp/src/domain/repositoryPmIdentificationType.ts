import { Repository, IOrm } from 'lambdaorm'
import { PmIdentificationType, QryPmIdentificationType } from './model'
export class PmIdentificationTypeRepository extends Repository<PmIdentificationType, QryPmIdentificationType> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmIdentificationTypes', stage, orm)
	}
	// Add your code here
}
