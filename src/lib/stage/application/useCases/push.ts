import { Query, ExecuteResult } from '../../../query/domain'
import { DDLBuilderService } from '../../../language/application'
import { StageActionDDL } from './base/actionDDL'

export class StagePush extends StageActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.stageModelService.get(this.options.stage as string)
		return new DDLBuilderService(this.schemaState, this.languages, this.options.stage as string, this.helper).sync(state.mappings)
	}

	public async execute (): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(queries, this.options)
		await this.stageModelService.update(this.options.stage as string, { mappings: this.schemaState.mapping.mappings })
		await this.stageModelService.ddl('push', queries)
		return result
	}
}
