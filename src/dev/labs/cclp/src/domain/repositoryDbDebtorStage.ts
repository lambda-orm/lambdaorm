import { Repository, IOrm } from 'lambdaorm'
import { DbDebtorStage, QryDbDebtorStage } from './model'
export class DbDebtorStageRepository extends Repository<DbDebtorStage, QryDbDebtorStage> {
	constructor (stage?: string, orm?:IOrm) {
		super('DbDebtorStages', stage, orm)
	}
	// Add your code here
}
