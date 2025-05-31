import { Repository, IOrm } from 'lambdaorm'
import { LamCreditor, QryLamCreditor } from './model'
export class LamCreditorRepository extends Repository<LamCreditor, QryLamCreditor> {
	constructor (stage?: string, orm?:IOrm) {
		super('LamCreditors', stage, orm)
	}
	// Add your code here
}
