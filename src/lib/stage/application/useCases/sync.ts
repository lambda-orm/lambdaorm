import { Query, ExecuteResult } from '../../../query/domain'
import { DDLBuilderService } from '../../../language/application'
import { StageActionDDL } from './base/actionDDL'

export class StageSync extends StageActionDDL {
	public async queries (): Promise<Query[]> {
		const state = await this.stateService.get(this.options.stage as string)
		return new DDLBuilderService(this.schemaService, this.sentenceRoute, this.languages, this.options.stage as string).sync(state.mappings)
	}

	public async execute (): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		const result = await this.queryService.executeList(queries, this.options)
		await this.stateService.update(this.options.stage as string, { mappings: this.schemaService.mapping.mappings })
		await this.stateService.ddl(this.options.stage as string, 'sync', queries)
		return result
	}
}
