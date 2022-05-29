import { Query, ExecuteResult } from '../model'
import { DDLBuilder } from '../manager/ddlBuilder'
import { StageActionDDL } from './stageActionDDL'

export class StageSync extends StageActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.state.get(this.options.stage as string)
		return new DDLBuilder(this.schema, this.routing, this.languages, this.options.stage as string).sync(state.mappings)
	}

	public async execute (tryAllCan = false): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.options, queries, tryAllCan)
		await this.state.updateModel(this.options.stage as string, this.schema.mapping.mappings)
		await this.state.ddl(this.options.stage as string, 'sync', queries)
		return result
	}
}
