import { Query, OrmOptions } from '../contract'
import { SchemaManager, Routing, Executor, Languages } from '../manager'
import { StageModel } from './stageState'

export abstract class StageActionDDL {
	protected state: StageModel
	protected schema: SchemaManager
	protected routing: Routing
	protected languages: Languages
	protected executor: Executor
	protected options: OrmOptions
	constructor (state:StageModel, schema: SchemaManager, routing: Routing, languages: Languages, executor: Executor, options:OrmOptions) {
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
