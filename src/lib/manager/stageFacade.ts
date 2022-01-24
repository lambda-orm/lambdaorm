import { SchemaManager, Executor, Routing, ExpressionManager } from '.'
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
	private schemaManager: SchemaManager
	private routing: Routing
	protected languageManager: LanguageManager
	private expressionManager: ExpressionManager
	private executor: Executor

	constructor (schemaManager: SchemaManager, routing: Routing, expressionManager: ExpressionManager, languageManager: LanguageManager, executor: Executor) {
		this.schemaManager = schemaManager
		this.routing = routing
		this.languageManager = languageManager
		this.expressionManager = expressionManager
		this.executor = executor
		this.state = new StageState(schemaManager)
	}

	private getStage (name: string): Stage {
		const stage = this.schemaManager.stage.get(name)
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
		return new StageSync(this.state, this.schemaManager, this.routing, this.languageManager, this.executor, stage.name)
	}

	public clean (name:string):StageClean {
		const stage = this.getStage(name)
		return new StageClean(this.state, this.schemaManager, this.routing, this.languageManager, this.executor, stage.name)
	}

	public truncate (name:string):StageClean {
		const stage = this.getStage(name)
		return new StageTruncate(this.state, this.schemaManager, this.routing, this.languageManager, this.executor, stage.name)
	}

	public export (name:string):StageExport {
		const stage = this.getStage(name)
		return new StageExport(this.state, this.schemaManager.model, this.expressionManager, this.executor, stage.name)
	}

	public import (name:string):StageImport {
		const stage = this.getStage(name)
		return new StageImport(this.state, this.schemaManager.model, this.expressionManager, this.executor, stage.name)
	}
}
