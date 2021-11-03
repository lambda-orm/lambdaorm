import { Database, Query } from '../model'
import { LanguageManager } from './../language'
import { ConfigManager, ExpressionManager, Executor } from './../manager'
import { DatabaseState } from './databaseState'

export abstract class DatabaseActionDDL {
	protected state: DatabaseState
	protected configManager: ConfigManager
	protected expressionManager: ExpressionManager
	protected languageManager: LanguageManager
	protected executor: Executor
	protected database: Database
	constructor (state:DatabaseState, configManager: ConfigManager, expressionManager: ExpressionManager, languageManager: LanguageManager, executor: Executor, database:Database) {
		this.state = state
		this.configManager = configManager
		this.expressionManager = expressionManager
		this.languageManager = languageManager
		this.executor = executor
		this.database = database
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
