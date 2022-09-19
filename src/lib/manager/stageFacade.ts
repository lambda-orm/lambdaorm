import { SchemaManager, Executor, Routing, ExpressionManager } from '.'
import { Languages } from '../manager'
import { StageMapping, StageModel } from '../stage/stageState'
import { StageSync } from '../stage/stageSync'
import { StageClean } from '../stage/stageClean'
import { StageExport } from '../stage/stageExport'
import { StageTruncate } from '../stage/stageTruncate'
import { StageImport } from '../stage/stageImport'
import { StageDelete } from '../stage/stageDelete'
import { Helper } from './'
import { SchemaError, Stage, View, OrmOptions } from './../model'

export class StageFacade {
	private stageModel: StageModel
	private stageMapping: StageMapping
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
		this.stageMapping = new StageMapping(schemaManager)
		this.stageModel = new StageModel(schemaManager)
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
		const file = this.stageModel.getFile(name)
		return Helper.existsPath(file)
	}

	public sync (options?:OrmOptions):StageSync {
		const _options = this.schemaManager.solveOptions(options)
		return new StageSync(this.stageModel, this.schemaManager, this.routing, this.languages, this.executor, _options)
	}

	public clean (options?:OrmOptions):StageClean {
		const _options = this.schemaManager.solveOptions(options)
		return new StageClean(this.stageModel, this.stageMapping, this.schemaManager, this.routing, this.languages, this.executor, _options)
	}

	public truncate (options?:OrmOptions):StageTruncate {
		const _options = this.schemaManager.solveOptions(options)
		return new StageTruncate(this.stageModel, this.schemaManager, this.routing, this.languages, this.executor, _options)
	}

	public delete (options?:OrmOptions):StageDelete {
		const _options = this.schemaManager.solveOptions(options)
		return new StageDelete(this.stageMapping, this.schemaManager.model, this.expressionManager, this.executor, _options)
	}

	public export (options?:OrmOptions):StageExport {
		const _options = this.schemaManager.solveOptions(options)
		return new StageExport(this.stageMapping, this.schemaManager.model, this.expressionManager, this.executor, _options)
	}

	public import (options?:OrmOptions):StageImport {
		const _options = this.schemaManager.solveOptions(options)
		return new StageImport(this.stageMapping, this.schemaManager.model, this.expressionManager, this.executor, _options)
	}
}
