import { Query, ExecuteResult, QueryOptions } from '../../../query/domain'
import { SchemaFacade } from '../../../schema/application'
import { LanguagesService, DDLBuilderService } from '../../../language/application'
import { StageMappingService, StageModelService } from '../services/stateService'
import { StageActionDDL } from './base/actionDDL'
import { QueryFacade } from '../../../expressions/application'

export class StageClean extends StageActionDDL {
	private mappingService: StageMappingService
	constructor (queryFacade:QueryFacade, stateService:StageModelService, mappingService:StageMappingService, schemaFacade: SchemaFacade, languages: LanguagesService, options:QueryOptions) {
		super(queryFacade, stateService, schemaFacade, languages, options)
		this.mappingService = mappingService
	}

	public override async queries (): Promise<Query[]> {
		const state = await this.stageModelService.get(this.options.stage as string)
		if (state && state.mappings) {
			return new DDLBuilderService(this.schemaFacade, this.languages, this.options.stage as string).drop(state.mappings)
		}
		return []
	}

	public override async execute (): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		const result = await this.queryFacade.executeList(queries, this.options)
		await this.stageModelService.remove(this.options.stage as string)
		await this.mappingService.remove(this.options.stage as string)
		await this.stageModelService.ddl(this.options.stage as string, 'clean', queries)
		return result
	}
}
