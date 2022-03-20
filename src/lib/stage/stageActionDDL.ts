import { Query } from '../model'
import { SchemaManager, Routing, Executor, Languages } from '../manager'
import { StageState } from './stageState'

export abstract class StageActionDDL {
	protected state: StageState
	protected schema: SchemaManager
	protected routing: Routing
	protected languages: Languages
	protected executor: Executor
	protected stage: string
	constructor (state:StageState, schema: SchemaManager, routing: Routing, languages: Languages, executor: Executor, stage:string) {
		this.state = state
		this.schema = schema
		this.routing = routing
		this.languages = languages
		this.executor = executor
		this.stage = stage
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
