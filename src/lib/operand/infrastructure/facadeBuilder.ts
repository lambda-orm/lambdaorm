import { MemoryCache } from 'h3lp'
import { SchemaState } from 'lambdaorm-base'
import { OperandFacade, OrmOperandHelper } from '../application'
import { Expressions, OperandSerializerImpl } from '3xpr'
import { Helper } from '../../shared/application'

export class OperandFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly expressions: Expressions
		, private readonly helper: Helper
	) { }

	public build (schemaState:SchemaState):OperandFacade {
		const operandCache = new MemoryCache<string, string>()
		const operandSerializer = new OperandSerializerImpl()
		const operandHelper = new OrmOperandHelper(this.helper.operand)
		return new OperandFacade(this.expressions, schemaState, operandCache, operandSerializer, operandHelper, this.helper)
	}
}
