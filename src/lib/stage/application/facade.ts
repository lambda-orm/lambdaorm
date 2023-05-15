import { SchemaFacade } from '../../schema/application'
import { QueryFacade } from '../../expressions/application'
import { LanguagesService } from '../../language/application'
import { StageMappingService, StageModelService } from './services/stateService'
import { helper } from '../../shared/application'
import { QueryOptions } from '../../query/domain'
import { StageActionDDL } from './useCases/base/actionDDL'
import { StageClean } from './useCases/clean'
import { StageDelete } from './useCases/delete'
import { StageExport } from './useCases/export'
import { StageImport } from './useCases/import'
import { StageTruncate } from './useCases/truncate'
import { StageSync } from './useCases/sync'

export class StageFacade {
	private stageModelService: StageModelService
	private stageMappingService: StageMappingService

	constructor (private readonly schemaFacade: SchemaFacade,
		private readonly queryFacade: QueryFacade,
		private readonly languages: LanguagesService) {
		this.stageMappingService = new StageMappingService(schemaFacade)
		this.stageModelService = new StageModelService(schemaFacade)
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
		const _options = this.queryFacade.solveOptions(options)
		return new StageSync(this.queryFacade, this.stageModelService, this.schemaFacade, this.languages, _options)
	}

	public clean (options?:QueryOptions):StageActionDDL {
		const _options = this.queryFacade.solveOptions(options)
		return new StageClean(this.queryFacade, this.stageModelService, this.stageMappingService, this.schemaFacade, this.languages, _options)
	}

	public truncate (options?:QueryOptions):StageActionDDL {
		const _options = this.queryFacade.solveOptions(options)
		return new StageTruncate(this.queryFacade, this.stageModelService, this.schemaFacade, this.languages, _options)
	}

	public delete (options?:QueryOptions):StageDelete {
		const _options = this.queryFacade.solveOptions(options)
		return new StageDelete(this.stageMappingService, this.schemaFacade.model, this.queryFacade, _options)
	}

	public export (options?:QueryOptions):StageExport {
		const _options = this.queryFacade.solveOptions(options)
		return new StageExport(this.stageMappingService, this.schemaFacade.model, this.queryFacade, _options)
	}

	public import (options?:QueryOptions):StageImport {
		const _options = this.queryFacade.solveOptions(options)
		return new StageImport(this.stageMappingService, this.schemaFacade.model, this.queryFacade, _options)
	}
}
