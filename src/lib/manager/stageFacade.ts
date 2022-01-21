import { SchemaConfig, Executor, Routing, ExpressionManager } from '.'
import { LanguageManager } from '../language'
import { StageState } from '../stage/stageState'
import { StageSync } from '../stage/stageSync'
import { StageClean } from '../stage/stageClean'
import { StageExport } from '../stage/stageExport'
import { StageTruncate } from '../stage/stageTruncate'
import { StageImport } from '../stage/stageImport'
import { Helper } from './helper'
import { Stage } from 'lib'

export class StageFacade {
	private state: StageState
	private schemaConfig: SchemaConfig
	private routing: Routing
	protected languageManager: LanguageManager
	private expressionManager: ExpressionManager
	private executor: Executor

	constructor (schemaConfig: SchemaConfig, routing: Routing, expressionManager: ExpressionManager, languageManager: LanguageManager, executor: Executor) {
		this.schemaConfig = schemaConfig
		this.routing = routing
		this.languageManager = languageManager
		this.expressionManager = expressionManager
		this.executor = executor
		this.state = new StageState(schemaConfig)
	}

	private getStage (name: string): Stage {
		const stage = this.schemaConfig.stage.get(name)
		if (stage === undefined) {
			throw new Error(`not exists ${name} stage`)
		}
		return stage
	}

	public async exists (name:string) {
		const file = this.state.getFile(name)
		return await Helper.existsPath(file)
	}

	public sync (name:string):StageSync {
		const stage = this.getStage(name)
		return new StageSync(this.state, this.schemaConfig, this.routing, this.languageManager, this.executor, stage.name)
	}

	public clean (name:string):StageClean {
		const stage = this.getStage(name)
		return new StageClean(this.state, this.schemaConfig, this.routing, this.languageManager, this.executor, stage.name)
	}

	public truncate (name:string):StageClean {
		const stage = this.getStage(name)
		return new StageTruncate(this.state, this.schemaConfig, this.routing, this.languageManager, this.executor, stage.name)
	}

	public export (name:string):StageExport {
		const stage = this.getStage(name)
		return new StageExport(this.state, this.schemaConfig.model, this.expressionManager, this.executor, stage.name)
	}

	public import (name:string):StageImport {
		const stage = this.getStage(name)
		return new StageImport(this.state, this.schemaConfig.model, this.expressionManager, this.executor, stage.name)
	}
}
