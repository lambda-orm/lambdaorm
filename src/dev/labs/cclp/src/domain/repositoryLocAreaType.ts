import { Repository, IOrm } from 'lambdaorm'
import { LocAreaType, QryLocAreaType } from './model'
export class LocAreaTypeRepository extends Repository<LocAreaType, QryLocAreaType> {
	constructor (stage?: string, orm?:IOrm) {
		super('LocAreaTypes', stage, orm)
	}
	// Add your code here
}
