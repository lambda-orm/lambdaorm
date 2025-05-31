import { Repository, IOrm } from 'lambdaorm'
import { PmParty, QryPmParty } from './model'
export class PmPartyRepository extends Repository<PmParty, QryPmParty> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmParties', stage, orm)
	}
	// Add your code here
}
