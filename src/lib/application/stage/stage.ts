import { Routing, Executor } from '..'
import { QueryManager } from '../query'
import { LanguagesService } from '../language'
import { StageMapping, StageModel } from './state'
import { StageSync } from './sync'
import { StageClean } from './clean'
import { StageExport } from './export'
import { StageTruncate } from './truncate'
import { StageImport } from './import'
import { StageDelete } from './delete'
import { helper } from '../../helper'
import { SchemaError, Stage, View, QueryOptions, ISchemaService } from '../../domain'

export class StageService {
	private stageModel: StageModel
	private stageMapping: StageMapping
	private schemaService: ISchemaService
	private routing: Routing
	protected languages: LanguagesService
	private queryManager: QueryManager
	private executor: Executor

	constructor (schemaService: ISchemaService, routing: Routing, queryManager: QueryManager, languages: LanguagesService, executor: Executor) {
		this.schemaService = schemaService
		this.routing = routing
		this.languages = languages
		this.queryManager = queryManager
		this.executor = executor
		this.stageMapping = new StageMapping(schemaService)
		this.stageModel = new StageModel(schemaService)
	}

	private getStage (name?: string): Stage {
		const stage = this.schemaService.stage.get(name)
		if (stage === undefined) {
			throw new SchemaError(`not exists ${name} stage`)
		}
		return stage
	}

	private getView (name?: string): View {
		const view = this.schemaService.view.get(name)
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
		const _options = this.schemaService.solveOptions(options)
		return new StageSync(this.stageModel, this.schemaService, this.routing, this.languages, this.executor, _options)
	}

	public clean (options?:QueryOptions):StageClean {
		const _options = this.schemaService.solveOptions(options)
		return new StageClean(this.stageModel, this.stageMapping, this.schemaService, this.routing, this.languages, this.executor, _options)
	}

	public truncate (options?:QueryOptions):StageTruncate {
		const _options = this.schemaService.solveOptions(options)
		return new StageTruncate(this.stageModel, this.schemaService, this.routing, this.languages, this.executor, _options)
	}

	public delete (options?:QueryOptions):StageDelete {
		const _options = this.schemaService.solveOptions(options)
		return new StageDelete(this.stageMapping, this.schemaService.model, this.queryManager, this.executor, _options)
	}

	public export (options?:QueryOptions):StageExport {
		const _options = this.schemaService.solveOptions(options)
		return new StageExport(this.stageMapping, this.schemaService.model, this.queryManager, this.executor, _options)
	}

	public import (options?:QueryOptions):StageImport {
		const _options = this.schemaService.solveOptions(options)
		return new StageImport(this.stageMapping, this.schemaService.model, this.queryManager, this.executor, _options)
	}
}
