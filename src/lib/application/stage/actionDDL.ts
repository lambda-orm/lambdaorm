import { Query, QueryOptions, ISchemaService } from '../../domain'
import { Routing, Executor } from '../'
import { LanguagesService } from '../language'
import { StageModel } from './state'

export abstract class StageActionDDL {
	protected state: StageModel
	protected schema: ISchemaService
	protected routing: Routing
	protected languages: LanguagesService
	protected executor: Executor
	protected options: QueryOptions
	constructor (state:StageModel, schema: ISchemaService, routing: Routing, languages: LanguagesService, executor: Executor, options:QueryOptions) {
		this.state = state
		this.schema = schema
		this.routing = routing
		this.languages = languages
		this.executor = executor
		this.options = options
	}

	abstract queries(): Promise<Query[]>
	public async sentence (): Promise<any[]> {
		const sentences: any[] = []
		const queries = await this.queries()
		for (const p in queries) {
			sentences.push(queries[p].sentence)
		}
		return sentences
	}
}
