import { SchemaManager, Executor, Routing, ExpressionManager } from '.'
import { Languages } from '../manager'
import { StageState } from '../stage/stageState'
import { StageSync } from '../stage/stageSync'
import { StageClean } from '../stage/stageClean'
import { StageExport } from '../stage/stageExport'
import { StageTruncate } from '../stage/stageTruncate'
import { StageImport } from '../stage/stageImport'
import { StageDelete } from '../stage/stageDelete'
import { Helper } from './helper'
import { SchemaError, Stage, View, OrmOptions } from './../model'

export class StageFacade {
	private state: StageState
	private schemaManager: SchemaManager
	private routing: Routing
	protected languages: Languages
	private expressionManager: ExpressionManager
	private executor: Executor

	constructor (schemaManager: SchemaManager, routing: Routing, expressionManager: ExpressionManager, languages: Languages, executor: Executor) {
		this.schemaManager = schemaManager
		this.routing = routing
		this.languages = languages
		this.expressionManager = expressionManager
		this.executor = executor
		this.state = new StageState(schemaManager)
	}

	private getStage (name?: string): Stage {
		const stage = this.schemaManager.stage.get(name)
		if (stage === undefined) {
			throw new SchemaError(`not exists ${name} stage`)
		}
		return stage
	}

	private getView (name?: string): View {
		const view = this.schemaManager.view.get(name)
		if (view === undefined) {
			throw new SchemaError(`not exists ${name} stage`)
		}
		return view
	}

	public async exists (name:string) {
		const file = this.state.getFile(name)
		return await Helper.existsPath(file)
	}

	public sync (options?:OrmOptions):StageSync {
		const _options = this.solveOptions(options)
		return new StageSync(this.state, this.schemaManager, this.routing, this.languages, this.executor, _options)
	}

	public clean (options?:OrmOptions):StageClean {
		const _options = this.solveOptions(options)
		return new StageClean(this.state, this.schemaManager, this.routing, this.languages, this.executor, _options)
	}

	public truncate (options?:OrmOptions):StageClean {
		const _options = this.solveOptions(options)
		return new StageTruncate(this.state, this.schemaManager, this.routing, this.languages, this.executor, _options)
	}

	public delete (options?:OrmOptions):StageDelete {
		const _options = this.solveOptions(options)
		return new StageDelete(this.state, this.schemaManager.model, this.expressionManager, this.executor, _options)
	}

	public export (options?:OrmOptions):StageExport {
		const _options = this.solveOptions(options)
		return new StageExport(this.state, this.schemaManager.model, this.expressionManager, this.executor, _options)
	}

	public import (options?:OrmOptions):StageImport {
		const _options = this.solveOptions(options)
		return new StageImport(this.state, this.schemaManager.model, this.expressionManager, this.executor, _options)
	}

	private solveOptions (options?: OrmOptions):OrmOptions {
		if (!options) {
			options = {}
		}
		if (!options.stage) {
			const _stage = this.schemaManager.stage.get()
			options.stage = _stage.name
		}
		if (!options.view) {
			const _view = this.schemaManager.view.get()
			options.view = _view.name
		}
		return options
	}
}
