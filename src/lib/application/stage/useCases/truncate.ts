import { Query, ExecuteResult } from '../../../domain'
import { StageActionDDL } from './base/actionDDL'
import { DDLBuilder } from '../../query'

export class StageTruncate extends StageActionDDL {
	public override async queries (): Promise<Query[]> {
		const state = await this.stateService.get(this.options.stage as string)
		if (state && state.mappings) {
			return new DDLBuilder(this.schemaService, this.sentenceRoute, this.languages, this.options.stage as string).truncate(state.mappings)
		}
		return []
	}

	public override async execute (): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(queries, this.options)
		await this.stateService.ddl(this.options.stage as string, 'truncate', queries)
		return result
	}
}
