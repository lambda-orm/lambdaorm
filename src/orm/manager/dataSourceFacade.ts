import { ConfigManager, Executor, ExpressionManager } from '.'
import { LanguageManager } from '../language'
import { DataSourceState } from '../dataSource/dataSourceState'
import { DataSourceSync } from '../dataSource/dataSourceSync'
import { DataSourceClean } from '../dataSource/dataSourceClean'
import { DataSourceExport } from '../dataSource/dataSourceExport'
import { DataSourceTruncate } from '../dataSource/dataSourceTruncate'
import { DataSourceImport } from '../dataSource/dataSourceImport'
import { Helper } from '../helper'

export class DataSourceFacade {
	private state: DataSourceState
	private configManager: ConfigManager
	private expressionManager: ExpressionManager
	protected languageManager: LanguageManager
	private executor: Executor

	constructor (configManager: ConfigManager, expressionManager: ExpressionManager, languageManager: LanguageManager, executor: Executor) {
		this.configManager = configManager
		this.expressionManager = expressionManager
		this.languageManager = languageManager
		this.executor = executor
		this.state = new DataSourceState(configManager)
	}

	public async exists (name:string) {
		const file = this.state.getFile(name)
		return await Helper.existsPath(file)
	}

	public sync (name:string):DataSourceSync {
		const dataSource = this.configManager.dataSource.get(name)
		if (dataSource === undefined) {
			throw new Error(`not exists ${name} dataSource`)
		}
		return new DataSourceSync(this.state, this.configManager, this.expressionManager, this.languageManager, this.executor, dataSource)
	}

	public clean (name:string):DataSourceClean {
		const dataSource = this.configManager.dataSource.get(name)
		if (dataSource === undefined) {
			throw new Error(`not exists ${name} dataSource`)
		}
		return new DataSourceClean(this.state, this.configManager, this.expressionManager, this.languageManager, this.executor, dataSource)
	}

	public truncate (name:string):DataSourceClean {
		const dataSource = this.configManager.dataSource.get(name)
		if (dataSource === undefined) {
			throw new Error(`not exists ${name} dataSource`)
		}
		return new DataSourceTruncate(this.state, this.configManager, this.expressionManager, this.languageManager, this.executor, dataSource)
	}

	public export (name:string):DataSourceExport {
		const dataSource = this.configManager.dataSource.get(name)
		if (dataSource === undefined) {
			throw new Error(`not exists ${name} dataSource`)
		}
		return new DataSourceExport(this.state, this.configManager.model, this.expressionManager, this.executor, dataSource)
	}

	public import (name:string):DataSourceImport {
		const dataSource = this.configManager.dataSource.get(name)
		if (dataSource === undefined) {
			throw new Error(`not exists ${name} dataSource`)
		}
		return new DataSourceImport(this.state, this.configManager.model, this.expressionManager, this.executor, dataSource)
	}
}
