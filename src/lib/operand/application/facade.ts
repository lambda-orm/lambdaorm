import { OperandBuilder, Operand, OperandSerializer, Expressions } from '3xpr'
import { SchemaFacade } from '../../schema/application'
import { OperandBuilderCacheDecorator } from './services/operandBuilderCacheDecorator'
import { OrmOperandBuilder } from './services/operandBuilder'
import { OperandNormalize } from './usesCases/normalize'
import { OrmOperandHelper } from './services/operandHelper'
import { ICache } from 'h3lp'

export class OperandFacade {
	private helper:OrmOperandHelper
	private builder:OperandBuilder
	private operandNormalize:OperandNormalize
	constructor (private readonly expressions: Expressions,
		private readonly schema:SchemaFacade,
		private readonly cache: ICache<string, string>,
		private readonly operandSerializer:OperandSerializer
	) {
		this.helper = new OrmOperandHelper()
		this.builder = new OperandBuilderCacheDecorator(
			new OrmOperandBuilder(this.expressions, this.schema.model),
			cache,
			operandSerializer)
		this.operandNormalize = new OperandNormalize(this.builder, this.helper)
	}

	public build (expression: string): Operand {
		return this.builder.build(expression)
	}

	public normalize (expression: string): string {
		return this.operandNormalize.normalize(expression)
	}

	public getClauses (operand: Operand): any {
		return this.getClauses(operand)
	}
}
