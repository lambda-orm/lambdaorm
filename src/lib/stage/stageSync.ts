import { Query, ExecuteResult } from '../model'
import { DDLBuilder } from '../manager/ddlBuilder'
import { StageActionDDL } from './stageActionDDL'

export class StageSync extends StageActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.state.get(this.stage)
		return new DDLBuilder(this.schema, this.routing, this.languages, this.stage).sync(state.mappings)
	}

	public async execute (tryAllCan = false): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.stage, undefined, queries, tryAllCan)
		await this.state.updateModel(this.stage, this.schema.mapping.mappings)
		await this.state.ddl(this.stage, 'sync', queries)
		return result
	}
}
