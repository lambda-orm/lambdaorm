import { Query, ExecuteResult, QueryOptions } from '../../../domain'
import { StageActionDDL } from './base/actionDDL'
import { DDLBuilder } from '../../query/useCases/build/ddlBuilder'
import { SentenceRoute, Executor, LanguagesService, SchemaService, StageModelService, StageMappingService } from '../..'

export class StageClean extends StageActionDDL {
	private mappingService: StageMappingService
	constructor (stateService:StageModelService, mappingService:StageMappingService, schema: SchemaService, sentenceRoute: SentenceRoute, languages: LanguagesService, executor: Executor, options:QueryOptions) {
		super(stateService, schema, sentenceRoute, languages, executor, options)
		this.mappingService = mappingService
	}

	public override async queries (): Promise<Query[]> {
		const state = await this.stateService.get(this.options.stage as string)
		if (state && state.mappings) {
			return new DDLBuilder(this.schemaService, this.sentenceRoute, this.languages, this.options.stage as string).drop(state.mappings)
		}
		return []
	}

	public override async execute (): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(queries, this.options)
		await this.stateService.remove(this.options.stage as string)
		await this.mappingService.remove(this.options.stage as string)
		await this.stateService.ddl(this.options.stage as string, 'clean', queries)
		return result
	}
}
