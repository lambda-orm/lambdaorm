import { DataSource, Query } from '../model'
import { LanguageManager } from '../language'
import { ConfigManager, ExpressionManager, Executor } from '../manager'
import { DataSourceState } from './dataSourceState'

export abstract class DataSourceActionDDL {
	protected state: DataSourceState
	protected config: ConfigManager
	protected expressionManager: ExpressionManager
	protected languageManager: LanguageManager
	protected executor: Executor
	protected dataSource: DataSource
	constructor (state:DataSourceState, config: ConfigManager, expressionManager: ExpressionManager, languageManager: LanguageManager, executor: Executor, dataSource:DataSource) {
		this.state = state
		this.config = config
		this.expressionManager = expressionManager
		this.languageManager = languageManager
		this.executor = executor
		this.dataSource = dataSource
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
