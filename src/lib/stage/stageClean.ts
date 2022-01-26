import { Query } from '../model/index'
import { StageActionDDL } from './stageActionDDL'
import { DDLBuilder } from '../manager/ddlBuilder'
export class StageClean extends StageActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.state.get(this.stage)
		if (state && state.mappings) {
			return new DDLBuilder(this.schema, this.routing, this.languageManager, this.stage).drop(state.mappings)
		}
		return []
	}

	public async execute (tryAllCan = false): Promise<any[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(this.stage, queries, tryAllCan)
		await this.state.remove(this.stage)
		return result
	}
}
