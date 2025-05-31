import { Repository, IOrm } from 'lambdaorm'
import { LocCountry, QryLocCountry } from './model'
export class LocCountryRepository extends Repository<LocCountry, QryLocCountry> {
	constructor (stage?: string, orm?:IOrm) {
		super('LocCountries', stage, orm)
	}
	// Add your code here
}
