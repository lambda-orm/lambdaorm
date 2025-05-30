import { Query, ExecuteResult } from '../../../query/domain'
import { DDLBuilderService } from '../../../language/application'
import { StageActionDDL } from './base/actionDDL'
export class StageTruncate extends StageActionDDL {
	public override async queries (): Promise<Query[]> {
		const state = await this.stageModelService.get(this.options.stage as string)
		if (state && state.mappings) {
			return new DDLBuilderService(this.schemaState, this.languages, this.options.stage as string, this.helper).truncate(state.mappings)
		}
		return []
	}

	public override async execute (): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(queries, this.options)
		await this.stageModelService.ddl('trunc', queries)
		return result
	}
}
