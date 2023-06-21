import { MemoryCache } from 'h3lp'
import { SchemaFacade } from '../../schema/application'
import { OperandFacade, OrmOperandHelper } from '../application'
import { Expressions, OperandSerializerImpl } from '3xpr'
import { Helper } from '../../shared/application'

export class OperandFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly expressions: Expressions
		, private readonly helper: Helper
	) { }

	public build (schema:SchemaFacade):OperandFacade {
		const operandCache = new MemoryCache<string, string>()
		const operandSerializer = new OperandSerializerImpl()
		const operandHelper = new OrmOperandHelper(this.helper.operand)
		return new OperandFacade(this.expressions, schema, operandCache, operandSerializer, operandHelper, this.helper)
	}
}
