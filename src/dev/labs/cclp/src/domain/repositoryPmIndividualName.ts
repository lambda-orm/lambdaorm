import { Repository, IOrm } from 'lambdaorm'
import { PmIndividualName, QryPmIndividualName } from './model'
export class PmIndividualNameRepository extends Repository<PmIndividualName, QryPmIndividualName> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmIndividualNames', stage, orm)
	}
	// Add your code here
}
