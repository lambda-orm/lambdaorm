import { Expressions } from '3xpr'
import { DataSourceConfigService, MappingsConfigService, ModelConfigService, SchemaFacade, StageConfigService, ViewsConfigService } from '../application'
import { SchemaService } from '../application/services/schemaService'
import { RouteService } from '../application/services/routeService'
import { SchemaExtender } from '../application/services/schemaExtender'
import { LoadSchema } from '../application/useCases/load'
import { FileSchemaReader } from './fileSchemaReader'
import { SchemaFileHelper } from './schemaFileHelper'
import { GetSchema } from '../application/useCases/get'
import { CompleteSchema } from '../application/useCases/complete'

export class SchemaFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly expressions: Expressions) {}

	public build (workspace:string):SchemaFacade {
		const source = new DataSourceConfigService()
		const model = new ModelConfigService()
		const mapping = new MappingsConfigService()
		const stage = new StageConfigService()
		const view = new ViewsConfigService()
		const schemaService = new SchemaService()
		const routeService = new RouteService(stage, this.expressions)
		const extender = new SchemaExtender(this.expressions)
		const loadSchema = new LoadSchema(source, model, mapping, stage, view, extender)
		const getSchema = new GetSchema(new FileSchemaReader(new SchemaFileHelper()))
		const completeSchema = new CompleteSchema(schemaService)
		return new SchemaFacade(workspace, source, model, mapping, stage, view, schemaService, routeService, extender, loadSchema, getSchema, completeSchema)
	}
}
