import { OperandBuilder, Operand, OperandSerializer, Expressions } from '3xpr'
import { SchemaState } from 'lambdaorm-base'
import { OperandBuilderCacheDecorator } from './services/operandBuilderCacheDecorator'
import { OrmOperandBuilder } from './services/operandBuilder'
import { OperandNormalize } from './usesCases/normalize'
import { ICache } from 'h3lp'
import { OrmOperandHelper } from './services/operandHelper'
import { OrmH3lp } from '../../shared/application'

export class OperandFacade {
	private builder:OperandBuilder
	private operandNormalize:OperandNormalize
	constructor (private readonly expressions: Expressions,
		private readonly schemaState:SchemaState,
		cache: ICache<string, string>,
		operandSerializer:OperandSerializer,
		private readonly operandHelper:OrmOperandHelper,
		private readonly helper:OrmH3lp
	) {
		this.builder = new OperandBuilderCacheDecorator(
			new OrmOperandBuilder(this.expressions, this.schemaState.domain, this.helper),
			cache,
			operandSerializer, this.helper)
		this.operandNormalize = new OperandNormalize(this.builder, operandHelper)
	}

	public build (expression: string): Operand {
		return this.builder.build(expression)
	}

	public normalize (expression: string): string {
		return this.operandNormalize.normalize(expression)
	}

	public getClauses (operand: Operand): any {
		return this.operandHelper.getClauses(operand)
	}
}
