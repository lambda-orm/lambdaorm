import { DDLBuilderService } from '../../../language/application'
import { ExecuteResult, Query } from '../../../query/domain'
import { StageActionDDL } from './base/actionDDL'

export class StagePull extends StageActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.stageModelService.get(this.options.stage as string)
		return new DDLBuilderService(this.schemaState, this.languages, this.options.stage as string, this.helper).sync(state.mappings)
	}

	public async execute (): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		await this.stageModelService.update(this.options.stage as string, { mappings: this.schemaState.mapping.mappings })
		await this.stageModelService.ddl(this.options.stage as string, 'pull', queries)
		return []
	}
}
