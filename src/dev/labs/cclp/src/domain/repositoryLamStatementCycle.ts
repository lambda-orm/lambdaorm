import { Repository, IOrm } from 'lambdaorm'
import { LamStatementCycle, QryLamStatementCycle } from './model'
export class LamStatementCycleRepository extends Repository<LamStatementCycle, QryLamStatementCycle> {
	constructor (stage?: string, orm?:IOrm) {
		super('LamStatementCycles', stage, orm)
	}
	// Add your code here
}
