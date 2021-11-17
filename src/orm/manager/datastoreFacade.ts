import { ConfigManager, Executor, ExpressionManager } from '.'
import { LanguageManager } from '../language'
import { DatastoreState } from '../datastore/datastoreState'
import { DatastoreSync } from '../datastore/datastoreSync'
import { DatastoreClean } from '../datastore/datastoreClean'
import { DatastoreExport } from '../datastore/datastoreExport'
import { DatastoreTruncate } from '../datastore/datastoreTruncate'
import { DatastoreImport } from '../datastore/datastoreImport'
import { Helper } from '../helper'

export class DatastoreFacade {
	private state: DatastoreState
	private configManager: ConfigManager
	private expressionManager: ExpressionManager
	protected languageManager: LanguageManager
	private executor: Executor

	constructor (configManager: ConfigManager, expressionManager: ExpressionManager, languageManager: LanguageManager, executor: Executor) {
		this.configManager = configManager
		this.expressionManager = expressionManager
		this.languageManager = languageManager
		this.executor = executor
		this.state = new DatastoreState(configManager)
	}

	public async exists (name:string) {
		const file = this.state.getFile(name)
		return await Helper.existsPath(file)
	}

	public sync (name:string):DatastoreSync {
		const datastore = this.configManager.datastore.get(name)
		if (datastore === undefined) {
			throw new Error(`not exists ${name} datastore`)
		}
		return new DatastoreSync(this.state, this.configManager, this.expressionManager, this.languageManager, this.executor, datastore)
	}

	public clean (name:string):DatastoreClean {
		const datastore = this.configManager.datastore.get(name)
		if (datastore === undefined) {
			throw new Error(`not exists ${name} datastore`)
		}
		return new DatastoreClean(this.state, this.configManager, this.expressionManager, this.languageManager, this.executor, datastore)
	}

	public truncate (name:string):DatastoreClean {
		const datastore = this.configManager.datastore.get(name)
		if (datastore === undefined) {
			throw new Error(`not exists ${name} datastore`)
		}
		return new DatastoreTruncate(this.state, this.configManager, this.expressionManager, this.languageManager, this.executor, datastore)
	}

	public export (name:string):DatastoreExport {
		const datastore = this.configManager.datastore.get(name)
		if (datastore === undefined) {
			throw new Error(`not exists ${name} datastore`)
		}
		return new DatastoreExport(this.state, this.configManager, this.expressionManager, this.executor, datastore)
	}

	public import (name:string):DatastoreImport {
		const datastore = this.configManager.datastore.get(name)
		if (datastore === undefined) {
			throw new Error(`not exists ${name} datastore`)
		}
		return new DatastoreImport(this.state, this.configManager, this.expressionManager, this.executor, datastore)
	}
}
