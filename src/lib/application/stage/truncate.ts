import { Query, ExecuteResult, IStageActionDDL } from '../../domain'
import { StageActionDDL } from './actionDDL'
import { DDLBuilder } from '../query'

export class StageTruncate extends StageActionDDL implements IStageActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.state.get(this.options.stage as string)
		if (state && state.mappings) {
			return new DDLBuilder(this.schema, this.routing, this.languages, this.options.stage as string).truncate(state.mappings)
		}
		return []
	}

	public async execute (): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(queries, this.options)
		await this.state.ddl(this.options.stage as string, 'truncate', queries)
		return result
	}
}
