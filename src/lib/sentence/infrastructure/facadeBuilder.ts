import { Expressions } from '3xpr'
import { OperandFacade } from '../../operand/application'
import { SchemaFacade } from '../../schema/application'
import { SentenceFacade, SentenceSerializerImp } from '../application'
import { MemoryCache } from 'h3lp'
import { Helper } from '../../shared/application'

export class SentenceFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly expressions:Expressions,
		private readonly helper:Helper) {}

	public build (schema: SchemaFacade, operand:OperandFacade): SentenceFacade {
		const sentenceCache = new MemoryCache<string, string>()
		const sentenceSerializer = new SentenceSerializerImp()
		return new SentenceFacade(schema, operand, this.expressions, sentenceCache, sentenceSerializer, this.helper)
	}
}
