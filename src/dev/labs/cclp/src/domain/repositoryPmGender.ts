import { Repository, IOrm } from 'lambdaorm'
import { PmGender, QryPmGender } from './model'
export class PmGenderRepository extends Repository<PmGender, QryPmGender> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmGenders', stage, orm)
	}
	// Add your code here
}
