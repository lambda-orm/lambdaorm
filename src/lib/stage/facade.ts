import { SchemaManager, Routing, helper, Executor } from '../manager'
import { QueryManager } from '../query'
import { Languages } from '../language'
import { StageMapping, StageModel } from './state'
import { StageSync } from './sync'
import { StageClean } from './clean'
import { StageExport } from './export'
import { StageTruncate } from './truncate'
import { StageImport } from './import'
import { StageDelete } from './delete'
import { SchemaError, Stage, View, QueryOptions } from '../contract'

export class StageFacade {
	private stageModel: StageModel
	private stageMapping: StageMapping
	private schemaManager: SchemaManager
	private routing: Routing
	protected languages: Languages
	private queryManager: QueryManager
	private executor: Executor

	constructor (schemaManager: SchemaManager, routing: Routing, queryManager: QueryManager, languages: Languages, executor: Executor) {
		this.schemaManager = schemaManager
		this.routing = routing
		this.languages = languages
		this.queryManager = queryManager
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
		return helper.fs.exists(file)
	}

	public sync (options?:QueryOptions):StageSync {
		const _options = this.schemaManager.solveOptions(options)
		return new StageSync(this.stageModel, this.schemaManager, this.routing, this.languages, this.executor, _options)
	}

	public clean (options?:QueryOptions):StageClean {
		const _options = this.schemaManager.solveOptions(options)
		return new StageClean(this.stageModel, this.stageMapping, this.schemaManager, this.routing, this.languages, this.executor, _options)
	}

	public truncate (options?:QueryOptions):StageTruncate {
		const _options = this.schemaManager.solveOptions(options)
		return new StageTruncate(this.stageModel, this.schemaManager, this.routing, this.languages, this.executor, _options)
	}

	public delete (options?:QueryOptions):StageDelete {
		const _options = this.schemaManager.solveOptions(options)
		return new StageDelete(this.stageMapping, this.schemaManager.model, this.queryManager, this.executor, _options)
	}

	public export (options?:QueryOptions):StageExport {
		const _options = this.schemaManager.solveOptions(options)
		return new StageExport(this.stageMapping, this.schemaManager.model, this.queryManager, this.executor, _options)
	}

	public import (options?:QueryOptions):StageImport {
		const _options = this.schemaManager.solveOptions(options)
		return new StageImport(this.stageMapping, this.schemaManager.model, this.queryManager, this.executor, _options)
	}
}
