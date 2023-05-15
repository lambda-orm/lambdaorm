import { MemoryCache } from 'h3lp'
import { SchemaFacade } from '../../schema/application'
import { OperandFacade } from '../application'
import { Expressions, OperandSerializerImpl } from '3xpr'

export class OperandFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly expressions: Expressions) { }

	public build (schema:SchemaFacade):OperandFacade {
		const operandCache = new MemoryCache<string, string>()
		const operandSerializer = new OperandSerializerImpl()
		return new OperandFacade(this.expressions, schema, operandCache, operandSerializer)
	}
}
