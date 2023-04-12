import { Query, ExecuteResult, QueryOptions, ISchemaService, IStageActionDDL } from '../../domain'
import { StageActionDDL } from './actionDDL'
import { DDLBuilder } from '../query/ddlBuilder'
import { Routing, Executor } from '..'
import { LanguagesService } from '../language'
import { StageModel, StageMapping } from './state'

export class StageClean extends StageActionDDL implements IStageActionDDL {
	private mapping: StageMapping
	constructor (state:StageModel, mapping:StageMapping, schema: ISchemaService, routing: Routing, languages: LanguagesService, executor: Executor, options:QueryOptions) {
		super(state, schema, routing, languages, executor, options)
		this.mapping = mapping
	}

	public async queries (): Promise<Query[]> {
		const state = await this.state.get(this.options.stage as string)
		if (state && state.mappings) {
			return new DDLBuilder(this.schema, this.routing, this.languages, this.options.stage as string).drop(state.mappings)
		}
		return []
	}

	public async execute (): Promise<ExecuteResult[]> {
		const queries = await this.queries()
		const result = await this.executor.executeList(queries, this.options)
		await this.state.remove(this.options.stage as string)
		await this.mapping.remove(this.options.stage as string)
		await this.state.ddl(this.options.stage as string, 'clean', queries)
		return result
	}
}
