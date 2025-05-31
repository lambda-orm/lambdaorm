import { Repository, IOrm } from 'lambdaorm'
import { PmContactMediumType, QryPmContactMediumType } from './model'
export class PmContactMediumTypeRepository extends Repository<PmContactMediumType, QryPmContactMediumType> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmContactMediumTypes', stage, orm)
	}
	// Add your code here
}
