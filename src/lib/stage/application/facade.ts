import { Mapping, QueryOptions, SchemaData, SchemaState } from 'lambdaorm-base'
import { ExpressionFacade } from '../../expressions/application'
import { LanguagesService } from '../../language/application'
import { StageMappingService, StageModelService } from './services/stateService'
import { OrmH3lp } from '../../shared/application'
import { StageActionDDL } from './useCases/base/actionDDL'
import { StageDrop } from './useCases/drop'
import { StageDelete } from './useCases/delete'
import { StageExport } from './useCases/export'
import { StageImport } from './useCases/import'
import { StageTruncate } from './useCases/truncate'
import { StageSync } from './useCases/sync'
import { Executor } from '../../execution/domain'
import { StageMatch } from './useCases/match'
import { StageIntrospect } from './useCases/introspect'
import { StageMatchOptions } from '../domain'

export class StageFacade {
	private stageModelService: StageModelService
	private stageMappingService: StageMappingService

	constructor (workspace: string,
		private readonly schemaState: SchemaState,
		private readonly expression: ExpressionFacade,
		private readonly executor: Executor,
		private readonly languages: LanguagesService,
		private readonly helper:OrmH3lp) {
		this.stageMappingService = new StageMappingService(workspace, schemaState, this.helper)
		this.stageModelService = new StageModelService(workspace, schemaState, this.helper)
	}

	public async exists (name:string) {
		const file = this.stageModelService.getFile(name)
		return this.helper.fs.exists(file)
	}

	public sync (options?:QueryOptions):StageActionDDL {
		const _options = this.expression.solveQueryOptions(options)
		return new StageSync(this.executor, this.stageModelService, this.schemaState, this.languages, _options, this.helper)
	}

	public drop (options?:QueryOptions):StageActionDDL {
		const _options = this.expression.solveQueryOptions(options)
		return new StageDrop(this.executor, this.stageModelService, this.stageMappingService, this.schemaState, this.languages, _options, this.helper)
	}

	public truncate (options?:QueryOptions):StageActionDDL {
		const _options = this.expression.solveQueryOptions(options)
		return new StageTruncate(this.executor, this.stageModelService, this.schemaState, this.languages, _options, this.helper)
	}

	public delete (options?:QueryOptions):StageDelete {
		const _options = this.expression.solveQueryOptions(options)
		return new StageDelete(this.stageMappingService, this.schemaState.domain, this.expression, this.executor, _options)
	}

	public export (options?:QueryOptions):StageExport {
		const _options = this.expression.solveQueryOptions(options)
		return new StageExport(this.stageMappingService, this.schemaState.domain, this.expression, this.executor, _options)
	}

	public import (options?:QueryOptions):StageImport {
		const _options = this.expression.solveQueryOptions(options)
		return new StageImport(this.stageMappingService, this.schemaState.domain, this.expression, this.executor, _options)
	}

	public async introspect (options?:QueryOptions): Promise<Mapping[]> {
		const _options = this.expression.solveQueryOptions(options)
		return await new StageIntrospect(this.executor, this.schemaState, this.languages, this.helper.schema, _options).execute()
	}

	public async match (options:StageMatchOptions = { removeEntities: true, removeProperties: true, removeRelations: true }): Promise<void> {
		const _options = this.expression.solveQueryOptions(options) as StageMatchOptions
		const mappings = await this.introspect(_options)
		await this.schemaState.updateFromMapping(mappings, _options)
		await new StageMatch(this.executor, this.stageModelService, this.schemaState, this.languages, _options, this.helper).execute()
	}

	public async syncAndImport (data: any|any[], name:string, options?:QueryOptions): Promise<SchemaData> {
		const schemaData = await this.schemaState.updateFromData(data, name)
		await this.sync(options).execute()
		await this.import(options).execute(schemaData)
		return schemaData
	}
}
