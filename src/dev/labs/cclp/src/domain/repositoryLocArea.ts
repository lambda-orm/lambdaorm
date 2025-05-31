import { Repository, IOrm } from 'lambdaorm'
import { LocArea, QryLocArea } from './model'
export class LocAreaRepository extends Repository<LocArea, QryLocArea> {
	constructor (stage?: string, orm?:IOrm) {
		super('LocAreas', stage, orm)
	}
	// Add your code here
}
