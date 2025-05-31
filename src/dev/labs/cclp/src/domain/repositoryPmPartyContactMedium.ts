import { Repository, IOrm } from 'lambdaorm'
import { PmPartyContactMedium, QryPmPartyContactMedium } from './model'
export class PmPartyContactMediumRepository extends Repository<PmPartyContactMedium, QryPmPartyContactMedium> {
	constructor (stage?: string, orm?:IOrm) {
		super('PmPartyContactMediums', stage, orm)
	}
	// Add your code here
}
