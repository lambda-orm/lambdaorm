import { Datastore, Query } from '../model'
import { LanguageManager } from '../language'
import { ConfigManager, ExpressionManager, Executor } from '../manager'
import { DatastoreState } from './datastoreState'

export abstract class DatastoreActionDDL {
	protected state: DatastoreState
	protected configManager: ConfigManager
	protected expressionManager: ExpressionManager
	protected languageManager: LanguageManager
	protected executor: Executor
	protected datastore: Datastore
	constructor (state:DatastoreState, configManager: ConfigManager, expressionManager: ExpressionManager, languageManager: LanguageManager, executor: Executor, datastore:Datastore) {
		this.state = state
		this.configManager = configManager
		this.expressionManager = expressionManager
		this.languageManager = languageManager
		this.executor = executor
		this.datastore = datastore
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
