import { Expressions } from '3xpr'
import { OperandFacade } from '../../operand/application'
import { SchemaState } from 'lambdaorm-base'
import { SentenceFacade, SentenceSerializerImp } from '../application'
import { MemoryCache } from 'h3lp'
import { OrmH3lp } from '../../shared/application'

export class SentenceFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly expressions:Expressions,
		private readonly helper:OrmH3lp) {}

	public build (schemaState: SchemaState, operand:OperandFacade): SentenceFacade {
		const sentenceCache = new MemoryCache<string, string>()
		const sentenceSerializer = new SentenceSerializerImp()
		return new SentenceFacade(schemaState, operand, this.expressions, sentenceCache, sentenceSerializer, this.helper)
	}
}
