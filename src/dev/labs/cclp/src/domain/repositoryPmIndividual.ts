import { Repository, IOrm } from 'lambdaorm'
import { PmIndividual, QryPmIndividual } from './model'
export class PmIndividualRepository extends Repository<PmIndividual, QryPmIndividual> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmIndividuals', stage, orm)
	}
	// Add your code here
}
