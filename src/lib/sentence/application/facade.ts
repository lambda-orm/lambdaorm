import { Source } from '../../schema/domain'
import { OperandFacade } from '../../operand/application'
import { SchemaFacade, ViewConfigService } from '../../schema/application'
import { ISentenceBuilder, ISentenceCompleteBuilder, Metadata, MetadataConstraint, MetadataModel, MetadataParameter, Sentence, SentenceSerializer } from '../domain'
import { SentenceBuilder } from './services/sentenceBuilder'
import { SentenceCompleteBuilder } from './services/sentenceCompleteBuilder'
import { SentenceCompleteBuilderCacheDecorator } from './services/sentenceCompleteBuilderCacheDecorator'
import { SentenceHelper } from './services/sentenceHelper'
import { GetConstraints } from './useCases/getConstraints'
import { GetMetadata } from './useCases/getMetadata'
import { GetModel } from './useCases/getModel'
import { GetParameters } from './useCases/getParameters'
import { ICache } from 'h3lp'
import { Expressions } from '3xpr'
import { Helper } from '../../shared/application'

export class SentenceFacade {
	private getConstraints: GetConstraints
	private builder: ISentenceBuilder
	private builderComplete: ISentenceCompleteBuilder
	private getMetadata:GetMetadata
	private getModel:GetModel
	private getParameters:GetParameters
	private sentenceHelper:SentenceHelper

	constructor (private readonly schemaFacade: SchemaFacade,
		private readonly operandFacade:OperandFacade,
		private readonly expressions:Expressions,
		cache: ICache<string, string>,
		serializer:SentenceSerializer,
		helper:Helper
	) {
		this.sentenceHelper = new SentenceHelper(this.schemaFacade)
		this.builder = new SentenceBuilder(this.schemaFacade, this.operandFacade, this.expressions)
		this.builderComplete = new SentenceCompleteBuilderCacheDecorator(
			new SentenceCompleteBuilder(this.builder, this.schemaFacade, this.sentenceHelper, this.expressions), cache, serializer, helper)
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

	public getSource (sentence: Sentence, stage: string): Source {
		return this.sentenceHelper.getSource(sentence, stage)
	}
}
