import { SentenceRoute, Executor, SchemaService } from '../..'
import { QueryService } from '../../query'
import { LanguagesService } from '../../language'
import { StageMappingService, StageModelService } from './stateService'
import { helper } from '../../helper'
import { SchemaError, Stage, View, QueryOptions } from '../../../domain'
import { StageActionDDL, StageDelete, StageImport, StageTruncate, StageExport, StageClean, StageSync } from '../index'

export class StageService {
	private stageModelService: StageModelService
	private stageMappingService: StageMappingService
	private schemaService: SchemaService
	private sentenceRoute: SentenceRoute
	protected languages: LanguagesService
	private queryService: QueryService
	private executor: Executor

	constructor (schemaService: SchemaService, sentenceRoute: SentenceRoute, queryService: QueryService, languages: LanguagesService, executor: Executor) {
		this.schemaService = schemaService
		this.sentenceRoute = sentenceRoute
		this.languages = languages
		this.queryService = queryService
		this.executor = executor
		this.stageMappingService = new StageMappingService(schemaService)
		this.stageModelService = new StageModelService(schemaService)
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
		const file = this.stageModelService.getFile(name)
		return helper.fs.exists(file)
	}

	public sync (options?:QueryOptions):StageActionDDL {
		const _options = this.schemaService.solveOptions(options)
		return new StageSync(this.stageModelService, this.schemaService, this.sentenceRoute, this.languages, this.executor, _options)
	}

	public clean (options?:QueryOptions):StageActionDDL {
		const _options = this.schemaService.solveOptions(options)
		return new StageClean(this.stageModelService, this.stageMappingService, this.schemaService, this.sentenceRoute, this.languages, this.executor, _options)
	}

	public truncate (options?:QueryOptions):StageActionDDL {
		const _options = this.schemaService.solveOptions(options)
		return new StageTruncate(this.stageModelService, this.schemaService, this.sentenceRoute, this.languages, this.executor, _options)
	}

	public delete (options?:QueryOptions):StageDelete {
		const _options = this.schemaService.solveOptions(options)
		return new StageDelete(this.stageMappingService, this.schemaService.model, this.queryService, this.executor, _options)
	}

	public export (options?:QueryOptions):StageExport {
		const _options = this.schemaService.solveOptions(options)
		return new StageExport(this.stageMappingService, this.schemaService.model, this.queryService, this.executor, _options)
	}

	public import (options?:QueryOptions):StageImport {
		const _options = this.schemaService.solveOptions(options)
		return new StageImport(this.stageMappingService, this.schemaService.model, this.queryService, this.executor, _options)
	}
}
