import { IOrmExpressions } from '../../shared/domain'
import { ClauseInfo, DataSourceRule, Schema, SchemaError } from '../domain'
import { FileSchemaReader } from '../infrastructure'
import { SchemaFileHelper } from '../infrastructure/schemaFileHelper'
import { DataSourceConfigService } from './services/config/dataSourceConfigService'
import { MappingsConfigService } from './services/config/mappingsConfigService'
import { ModelConfigService } from './services/config/modelConfigService'
import { StageConfigService } from './services/config/stageConfigService'
import { ViewsConfigService } from './services/config/viewsConfigService'
import { RouteService } from './services/routeService'
import { SchemaExtender } from './services/schemaExtender'
import { SchemaService } from './services/schemaService'
import { CompleteSchema } from './useCases/complete'
import { GetSchema } from './useCases/get'
import { LoadSchema } from './useCases/load'

export class SchemaFacade {
	public source = new DataSourceConfigService()
	public model = new ModelConfigService()
	public mapping = new MappingsConfigService()
	public stage = new StageConfigService()
	public view = new ViewsConfigService()
	private schemaService:SchemaService
	private routeService:RouteService
	private extender:SchemaExtender
	private loadSchema: LoadSchema
	private getSchema: GetSchema
	private completeSchema:CompleteSchema
	public schema: Schema

	constructor (public workspace:string, private readonly expressions: IOrmExpressions) {
		this.schemaService = new SchemaService()
		this.routeService = new RouteService(this.stage, this.expressions)
		this.extender = new SchemaExtender(this.expressions)
		this.loadSchema = new LoadSchema(this.source, this.model, this.mapping, this.stage, this.view, this.extender)
		// TODO: hay que pasarlo a Infraestructura como un Adapter
		this.getSchema = new GetSchema(new FileSchemaReader(new SchemaFileHelper()))
		this.completeSchema = new CompleteSchema(this.schemaService)
		this.schema = this.schemaService.newSchema()
	}

	public evalDataSourceRule (rule:DataSourceRule, clauseInfo: ClauseInfo):boolean {
		return this.routeService.eval(rule, clauseInfo)
	}

	public getSource (clauseInfo: ClauseInfo, stage?: string):string {
		return this.routeService.getSource(clauseInfo, stage)
	}

	public async initialize (source: string | Schema): Promise<Schema> {
		const schema = await this.getSchema.get(source)
		if (schema === null) {
			throw new SchemaError(`Schema: ${source} not supported`)
		}
		this.completeSchema.complete(schema)
		this.schema = this.loadSchema.load(schema)
		return this.schema
	}

	public complete (schema: Schema): void {
		this.extender.complete(schema)
	}
}
