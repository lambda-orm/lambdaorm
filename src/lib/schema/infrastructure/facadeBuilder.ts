import { Expressions } from '3xpr'
import {
	DataSourceConfigService, MappingsConfigService, DomainConfigService, SchemaFacade, StageConfigService, ViewsConfigService,
	SchemaService, RouteService, SchemaExtender, LoadSchema, CreateSchema, GetSchema, CompleteSchema
} from '../application'
import { FileSchemaReader } from './fileSchemaReader'
import { SchemaFileHelper } from './schemaFileHelper'
import { Helper } from '../../shared/application/helper'

export class SchemaFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly expressions: Expressions,
		private readonly helper: Helper
	) {}

	public build (workspace:string):SchemaFacade {
		const source = new DataSourceConfigService()
		const model = new DomainConfigService()
		const mapping = new MappingsConfigService()
		const stage = new StageConfigService()
		const view = new ViewsConfigService()
		const schemaService = new SchemaService()
		const routeService = new RouteService(stage, this.expressions)
		const extender = new SchemaExtender(this.expressions, this.helper)
		const loadSchema = new LoadSchema(source, model, mapping, stage, view, extender, this.helper)
		const createSchema = new CreateSchema(schemaService)
		const getSchema = new GetSchema(new FileSchemaReader(new SchemaFileHelper(this.helper), this.helper))
		const completeSchema = new CompleteSchema(schemaService)
		return new SchemaFacade(workspace, source, model, mapping, stage, view, schemaService, routeService, extender, createSchema, loadSchema, getSchema, completeSchema)
	}
}
