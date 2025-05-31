import { Repository, IOrm } from 'lambdaorm'
import { PmIndustryType, QryPmIndustryType } from './model'
export class PmIndustryTypeRepository extends Repository<PmIndustryType, QryPmIndustryType> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmIndustryTypes', stage, orm)
	}
	// Add your code here
}
