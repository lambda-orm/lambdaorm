import { DDLBuilderService } from '../../../language/application'
import { ExecuteResult, Query } from '../../../query/domain'
import { StageActionDDL } from './base/actionDDL'

export class StageMatch extends StageActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.stageModelService.get(this.options.stage as string)
		return new DDLBuilderService(this.schemaState, this.languages, this.options.stage as string, this.helper).sync(state.mappings)
	}

	public async execute (): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		await this.stageModelService.update(this.options.stage as string, { mappings: this.schemaState.mapping.mappings })
		await this.stageModelService.ddl(this.options.stage as string, 'match', queries)
		return []
	}

	// public async execute (): Promise<any> {
	// const stageName = this.options.stage as string
	// const stage = this.schemaState.stage.get(stageName)
	// const state = await this.stageModelService.get(stageName)
	// for (const ruleDataSource of stage.sources) {
	// const source = this.schemaState.source.get(ruleDataSource.name)
	// const currentMapping = state.mappings.find(p => p.name === source.mapping)
	// if (currentMapping) {
	// if (currentMapping.entities === undefined) currentMapping.entities = []
	// await this.merge(source, currentMapping.entities)
	// }
	// }
	// const queries = new DDLBuilderService(this.schemaState, this.languages, this.options.stage as string, this.helper).sync(state.mappings)
	// await this.stageModelService.update(this.options.stage as string, { mappings: state.mappings })
	// await this.stageModelService.ddl(this.options.stage as string, 'match', queries)
	// }
}
