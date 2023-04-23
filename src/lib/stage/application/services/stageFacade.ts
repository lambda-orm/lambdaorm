import { RouteService } from '../../../core/application'
import { SchemaService } from '../../../schema/application'
import { QueryService } from '../../../expressions/application'
import { LanguagesService } from '../../../language/application'
import { StageMappingService, StageModelService } from './stateService'
import { helper } from '../../../commons/application'
// import { SchemaError, Stage, View } from '../../../schema/domain'
import { QueryOptions } from '../../../query/domain'
import { StageActionDDL } from '../useCases/base/actionDDL'
import { StageClean } from '../useCases/clean'
import { StageDelete } from '../useCases/delete'
import { StageExport } from '../useCases/export'
import { StageImport } from '../useCases/import'
import { StageTruncate } from '../useCases/truncate'
import { StageSync } from '../useCases/sync'
import { SentenceService } from '../../../sentence/application'

export class StageFacade {
	private stageModelService: StageModelService
	private stageMappingService: StageMappingService
	private schemaService: SchemaService
	private sentenceRoute: RouteService
	protected languages: LanguagesService
	private queryService: QueryService
	// private executor: Executor
	private sentenceService: SentenceService

	constructor (schemaService: SchemaService, sentenceRoute: RouteService, queryService: QueryService, languages: LanguagesService, sentenceService: SentenceService) {
		this.schemaService = schemaService
		this.sentenceRoute = sentenceRoute
		this.languages = languages
		this.queryService = queryService
		// this.executor = executor
		this.sentenceService = sentenceService
		this.stageMappingService = new StageMappingService(schemaService)
		this.stageModelService = new StageModelService(schemaService)
	}

	// private getStage (name?: string): Stage {
	// const stage = this.schemaService.stage.get(name)
	// if (stage === undefined) {
	// throw new SchemaError(`not exists ${name} stage`)
	// }
	// return stage
	// }

	// private getView (name?: string): View {
	// const view = this.schemaService.view.get(name)
	// if (view === undefined) {
	// throw new SchemaError(`not exists ${name} stage`)
	// }
	// return view
	// }

	public async exists (name:string) {
		const file = this.stageModelService.getFile(name)
		return helper.fs.exists(file)
	}

	public sync (options?:QueryOptions):StageActionDDL {
		const _options = this.queryService.solveOptions(options)
		return new StageSync(this.queryService, this.stageModelService, this.schemaService, this.sentenceRoute, this.languages, _options)
	}

	public clean (options?:QueryOptions):StageActionDDL {
		const _options = this.queryService.solveOptions(options)
		return new StageClean(this.queryService, this.stageModelService, this.stageMappingService, this.schemaService, this.sentenceRoute, this.languages, _options)
	}

	public truncate (options?:QueryOptions):StageActionDDL {
		const _options = this.queryService.solveOptions(options)
		return new StageTruncate(this.queryService, this.stageModelService, this.schemaService, this.sentenceRoute, this.languages, _options)
	}

	public delete (options?:QueryOptions):StageDelete {
		const _options = this.queryService.solveOptions(options)
		return new StageDelete(this.stageMappingService, this.schemaService.model, this.queryService, this.sentenceService, _options)
	}

	public export (options?:QueryOptions):StageExport {
		const _options = this.queryService.solveOptions(options)
		return new StageExport(this.stageMappingService, this.schemaService.model, this.queryService, this.sentenceService, _options)
	}

	public import (options?:QueryOptions):StageImport {
		const _options = this.queryService.solveOptions(options)
		return new StageImport(this.stageMappingService, this.schemaService.model, this.queryService, this.sentenceService, _options)
	}
}
