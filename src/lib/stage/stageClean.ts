import { Query, ExecuteResult } from '../model'
import { StageActionDDL } from './stageActionDDL'
import { DDLBuilder } from '../manager/ddlBuilder'
export class StageClean extends StageActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.state.get(this.options.stage as string)
		if (state && state.mappings) {
			return new DDLBuilder(this.schema, this.routing, this.languages, this.options.stage as string).drop(state.mappings)
		}
		return []
	}

	public async execute (): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.options, queries)
		await this.state.remove(this.options.stage as string)
		await this.state.ddl(this.options.stage as string, 'clean', queries)
		return result
	}
}
