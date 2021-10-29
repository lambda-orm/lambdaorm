import { ConfigManager, Executor, ExpressionManager } from './../manager'
import { LanguageManager } from './../language'
import { DatabaseState } from './databaseState'
import { DatabaseSync } from './databaseSync'
import { DatabaseClean } from './databaseClean'
import { DatabaseExport } from './databaseExport'
import { DatabaseTruncate } from './databaseTruncate'
import { DatabaseImport } from './databaseImport'
import { Helper } from './../helper'

export class DatabaseFacade {
	private state: DatabaseState
	private configManager: ConfigManager
	private expressionManager: ExpressionManager
	protected languageManager: LanguageManager
	private executor: Executor

	constructor (configManager: ConfigManager, expressionManager: ExpressionManager, languageManager: LanguageManager, executor: Executor) {
		this.configManager = configManager
		this.expressionManager = expressionManager
		this.languageManager = languageManager
		this.executor = executor
		this.state = new DatabaseState(configManager)
	}

	public async exists (name:string) {
		const file = this.state.getFile(name)
		return await Helper.existsPath(file)
	}

	public sync (name:string):DatabaseSync {
		const database = this.configManager.database.get(name)
		return new DatabaseSync(this.state, this.configManager, this.expressionManager, this.languageManager, this.executor, database)
	}

	public clean (name:string):DatabaseClean {
		const database = this.configManager.database.get(name)
		return new DatabaseClean(this.state, this.configManager, this.expressionManager, this.languageManager, this.executor, database)
	}

	public truncate (name:string):DatabaseClean {
		const database = this.configManager.database.get(name)
		return new DatabaseTruncate(this.state, this.configManager, this.expressionManager, this.languageManager, this.executor, database)
	}

	public export (name:string):DatabaseExport {
		const database = this.configManager.database.get(name)
		return new DatabaseExport(this.state, this.configManager, this.expressionManager, this.executor, database)
	}

	public import (name:string):DatabaseImport {
		const database = this.configManager.database.get(name)
		return new DatabaseImport(this.state, this.configManager, this.expressionManager, this.executor, database)
	}
}
