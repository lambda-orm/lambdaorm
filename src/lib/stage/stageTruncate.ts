import { Query } from '../model/index'
import { StageActionDDL } from './stageActionDDL'
import { DDLBuilder } from '../manager'

export class StageTruncate extends StageActionDDL {
	public async queries (): Promise<Query[]> {
		return new DDLBuilder(this.schema, this.routing, this.languageManager, this.stage).truncate(this.schema.model.listEntities())
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.stage, queries, tryAllCan)
		return result
	}
}
