import { Respository, IOrm } from 'lambdaorm'
import { Country, QryCountry } from './model'
export class CountryRespository extends Respository<Country, QryCountry> {
	constructor (database?: string, Orm?:IOrm) {
		super('Countries', database, Orm)
	}
	// Add your code here
}
