import { OperandFacade } from '../../operand/application'
import { SchemaService, ViewConfigService } from '../../schema/application'
import { ISentenceBuilder, ISentenceCompleteBuilder, Metadata, MetadataConstraint, MetadataModel, MetadataParameter, Sentence } from '../domain'
import { SentenceBuilder } from './services/sentenceBuilder'
import { SentenceCompleteBuilder } from './services/sentenceCompleteBuilder'
import { SentenceCompleteBuilderCacheDecorator } from './services/sentenceCompleteBuilderCacheDecorator'
import { SentenceHelper } from './services/sentenceHelper'
import { GetConstraints } from './useCases/getConstraints'
import { GetMetadata } from './useCases/getMetadata'
import { GetModel } from './useCases/getModel'
import { GetParameters } from './useCases/getParameters'

export class SentenceFacade {
	private getConstraints: GetConstraints
	private builder: ISentenceBuilder
	private builderComplete: ISentenceCompleteBuilder
	private getMetadata:GetMetadata
	private getModel:GetModel
	private getParameters:GetParameters

	constructor (private readonly schemaService: SchemaService, private readonly operandFacade:OperandFacade) {
		this.builder = new SentenceBuilder(this.schemaService, this.operandFacade)
		this.builderComplete = new SentenceCompleteBuilderCacheDecorator(
			new SentenceCompleteBuilder(this.builder,
				this.schemaService,
				new SentenceHelper(this.schemaService)
			)
		)
		this.getConstraints = new GetConstraints(this.builder)
		this.getMetadata = new GetMetadata(this.builder)
		this.getModel = new GetModel(this.builder)
		this.getParameters = new GetParameters(this.builder)
	}

	public build (expression: string, view: ViewConfigService, stage:string): Sentence {
		return this.builderComplete.build(expression, view, stage)
	}

	public constraints (expression: string): MetadataConstraint {
		return this.getConstraints.constraints(expression)
	}

	public metadata (expression: string): Metadata {
		return this.getMetadata.metadata(expression)
	}

	public model (expression: string): MetadataModel[] {
		return this.getModel.model(expression)
	}

	public parameters (expression: string): MetadataParameter[] {
		return this.getParameters.parameters(expression)
	}
}
