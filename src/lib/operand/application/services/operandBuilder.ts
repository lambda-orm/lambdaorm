import { ExpressionNormalizer, ExpressionParse, IOperandBuilder, Operand, OperandComplete, OperandNormalize, OperandReduce } from '3xpr'
import { ModelConfigService } from '../../../schema/application'
import { OrmOperandNormalizer } from './operandNormalizer'

export class OrmOperandBuilder implements IOperandBuilder {
	private parse = new ExpressionParse()
	private normalizer = new ExpressionNormalizer()
	private operandNormalize = new OperandNormalize()
	private operandComplete = new OperandComplete()
	private operandReduce = new OperandReduce()
	private ormOperandNormalizer:OrmOperandNormalizer

	// eslint-disable-next-line no-useless-constructor
	constructor (modelConfigService: ModelConfigService) {
		this.ormOperandNormalizer = new OrmOperandNormalizer(modelConfigService)
	}

	public build (expression: string): Operand {
		const expressionNormalized = this.normalizer.normalize(expression)
		const operand = this.parse.parse(expressionNormalized)
		const normalized = this.operandNormalize.normalize(operand)
		const completed = this.operandComplete.complete(normalized, 'sync')
		const reduced = this.operandReduce.reduce(completed)
		// reduced.returnType = this.typeService.getType(reduced)
		const ormNormalized = this.ormOperandNormalizer.normalize(reduced)
		return ormNormalized
	}
}
