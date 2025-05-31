import { Repository, IOrm } from 'lambdaorm'
import { LamCurrencyReference, QryLamCurrencyReference } from './model'
export class LamCurrencyReferenceRepository extends Repository<LamCurrencyReference, QryLamCurrencyReference> {
	constructor (stage?: string, orm?:IOrm) {
		super('LamCurrencyReferences', stage, orm)
	}
	// Add your code here
}
