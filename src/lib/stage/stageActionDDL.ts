import { Query } from '../model'
import { LanguageManager } from '../language'
import { SchemaManager, Routing, Executor } from '../manager'
import { StageState } from './stageState'

export abstract class StageActionDDL {
	protected state: StageState
	protected schema: SchemaManager
	protected routing: Routing
	protected languageManager: LanguageManager
	protected executor: Executor
	protected stage: string
	constructor (state:StageState, schema: SchemaManager, routing: Routing, languageManager: LanguageManager, executor: Executor, stage:string) {
		this.state = state
		this.schema = schema
		this.routing = routing
		this.languageManager = languageManager
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
