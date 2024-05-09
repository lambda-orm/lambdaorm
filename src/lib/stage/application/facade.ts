import { Mapping, QueryOptions, SchemaState } from 'lambdaorm-base'
import { ExpressionFacade } from '../../expressions/application'
import { LanguagesService } from '../../language/application'
import { StageMappingService, StageModelService } from './services/stateService'
import { OrmH3lp } from '../../shared/infrastructure'
import { StageActionDDL } from './useCases/base/actionDDL'
import { StageDrop } from './useCases/drop'
import { StageDelete } from './useCases/delete'
import { StageExport } from './useCases/export'
import { StageImport } from './useCases/import'
import { StageTruncate } from './useCases/truncate'
import { StagePush } from './useCases/push'
import { Executor } from '../../execution/domain'
import { StagePull } from './useCases/pull'
import { StageFetch } from './useCases/fetch'
import { StagePullOptions } from '../domain'
import { ExecuteResult } from '../../query/domain'

export class StageFacade {
	private stageModelService: StageModelService
	private stageMappingService: StageMappingService

	constructor (
		private readonly schemaState: SchemaState,
		private readonly expression: ExpressionFacade,
		private readonly executor: Executor,
		private readonly languages: LanguagesService,
		private readonly helper:OrmH3lp) {
		this.stageMappingService = new StageMappingService(schemaState, this.helper)
		this.stageModelService = new StageModelService(schemaState, this.helper)
	}

	/**
	 * Check if the stage exists
	 * @param name string
	 * @returns {Promise<boolean>}
	 */
	public async exists (name:string) : Promise<boolean> {
		const file = this.stageModelService.getFile(name)
		return this.helper.fs.exists(file)
	}

	/**
	 * Push the stage with sources
	 * @param options QueryOptions
	 * @returns {StageActionDDL}
	 */
	public push (options?:QueryOptions):StageActionDDL {
		const _options = this.expression.solveQueryOptions(options)
		return new StagePush(this.executor, this.stageModelService, this.schemaState, this.languages, _options, this.helper)
	}

	/**
	 * Drop source entities related to the stage
	 * @param options QueryOptions
	 * @returns {StageActionDDL}
	 */
	public drop (options?:QueryOptions):StageActionDDL {
		const _options = this.expression.solveQueryOptions(options)
		return new StageDrop(this.executor, this.stageModelService, this.stageMappingService, this.schemaState, this.languages, _options, this.helper)
	}

	/**
	 * Truncate source entities related to the stage
	 * @param options QueryOptions
	 * @returns {StageActionDDL}
	 */
	public truncate (options?:QueryOptions):StageActionDDL {
		const _options = this.expression.solveQueryOptions(options)
		return new StageTruncate(this.executor, this.stageModelService, this.schemaState, this.languages, _options, this.helper)
	}

	/**
	 * Delete source entities related to the stage
	 * @param options QueryOptions
	 * @returns {StageActionDDL}
	 */
	public delete (options?:QueryOptions):StageDelete {
		const _options = this.expression.solveQueryOptions(options)
		return new StageDelete(this.stageMappingService, this.schemaState.domain, this.expression, this.executor, _options)
	}

	/**
	 * Export source entities related to the stage
	 * @param options QueryOptions
	 * @returns {StageActionDDL}
	 */
	public export (options?:QueryOptions):StageExport {
		const _options = this.expression.solveQueryOptions(options)
		return new StageExport(this.stageMappingService, this.schemaState.domain, this.expression, this.executor, _options)
	}

	/**
	 * Import data into source entities related to the stage
	 * @param options QueryOptions
	 * @returns {StageActionDDL}
	 */
	public import (options?:QueryOptions):StageImport {
		const _options = this.expression.solveQueryOptions(options)
		return new StageImport(this.stageMappingService, this.schemaState.domain, this.expression, this.executor, _options)
	}

	/**
	 * Fetch all mappings from the stage
	 * @param options QueryOptions
	 * @returns {Promise<Mapping[]>}
	 */
	public async fetch (options?:QueryOptions): Promise<Mapping[]> {
		const _options = this.expression.solveQueryOptions(options)
		return await new StageFetch(this.executor, this.schemaState, this.languages, this.helper.schema, _options).execute()
	}

	/**
	 * Pull the stage with the sources
	 * @param options StagePullOptions
	 * @returns {Promise<void>}
	 */
	public async pull (options:StagePullOptions = { removeEntities: true, removeProperties: true, removeRelations: true }): Promise<ExecuteResult[]> {
		const _options = this.expression.solveQueryOptions(options) as StagePullOptions
		const mappings = await this.fetch(_options)
		await this.schemaState.match(mappings, _options)
		return await new StagePull(this.executor, this.stageModelService, this.schemaState, this.languages, _options, this.helper).execute()
	}

	/**
	 * Update and Push Schema with data
	 * @param data any|any[]
	 * @param name string
	 * @param options QueryOptions
	 * @returns {Promise<SchemaData>}
	 */
	public async introspect (data: any|any[], name:string, options?:QueryOptions): Promise<ExecuteResult[]> {
		await this.schemaState.introspect(data, name)
		return await this.push(options).execute()
	}

	/**
	 * Update and Push Schema and import data
	 * @param data any|any[]
	 * @param name string
	 * @param options QueryOptions
	 * @returns {Promise<SchemaData>}
	 */
	public async incorporate (data: any|any[], name:string, options?:QueryOptions): Promise<ExecuteResult[]> {
		const schemaData = await this.schemaState.introspect(data, name)
		const result = await this.push(options).execute()
		await this.import(options).execute(schemaData)
		return result
	}
}
