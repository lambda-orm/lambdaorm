import { Database, Query } from '../model'
import { ExecutionResult } from './../connection'
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

	protected async _execute (tryAllCan = false):Promise<ExecutionResult> {
		// const results: ExecutionSentenceResult[] = []
		const queries = await this.queries()
		return await this.executor.executeList(this.database, queries, tryAllCan)

		// await this.orm.transaction(this.database.name, async (tr) => {
		// let query:Query
		// if (tryAllCan) {
		// for (let i = 0; i < queries.length; i++) {
		// query = queries[i]
		// try {
		// const result = await tr.execute(query)
		// results.push({ result: result, sentence: query.sentence })
		// } catch (error) {
		// results.push({ error: error, sentence: query.sentence })
		// }
		// }
		// } else {
		// try {
		// for (let i = 0; i < queries.length; i++) {
		// query = queries[i]
		// const result = await tr.execute(query)
		// results.push({ result: result, sentence: query.sentence })
		// }
		// } catch (error: any) {
		// throw new Error(`error: ${error.toString()}`)
		// }
		// }
		// })
		// return { results: results }
	}
}
