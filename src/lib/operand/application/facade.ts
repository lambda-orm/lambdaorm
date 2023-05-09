import { IOperandBuilder, Operand } from '3xpr'
import { SchemaService } from '../../schema/application'
import { OperandBuilderCacheDecorator } from './services/operandBuilderCacheDecorator'
import { OrmOperandBuilder } from './services/operandBuilder'
import { OperandNormalize } from './usesCases/normalize'
import { OrmOperandHelper } from './services/operandHelper'

export class OperandFacade {
	private helper:OrmOperandHelper
	private builder:IOperandBuilder
	private operandNormalize:OperandNormalize
	constructor (private readonly schemaService:SchemaService) {
		this.helper = new OrmOperandHelper()
		this.builder = new OperandBuilderCacheDecorator(new OrmOperandBuilder(this.schemaService.model))
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
