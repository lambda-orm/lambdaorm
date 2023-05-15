import { ConstBuilder, EvaluatorFactory, ExpressionNormalizer, ExpressionParse, OperandBuilder, ModelService, Operand, OperandComplete, OperandNormalize, OperandReduce, Expressions } from '3xpr'
import { ModelConfigService } from '../../../schema/application'
import { OrmOperandNormalizer } from './operandNormalizer'

export class OrmOperandBuilder implements OperandBuilder {
	private parse:ExpressionParse
	private normalizer:ExpressionNormalizer
	private operandNormalize:OperandNormalize
	private operandComplete:OperandComplete
	private operandReduce:OperandReduce
	private ormOperandNormalizer:OrmOperandNormalizer

	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly expressions: Expressions,
		private readonly modelConfigService: ModelConfigService
	) {
		this.ormOperandNormalizer = new OrmOperandNormalizer(this.modelConfigService)
		this.parse = new ExpressionParse(this.expressions)
		this.normalizer = new ExpressionNormalizer()
		this.operandNormalize = new OperandNormalize(this.expressions)
		this.operandComplete = new OperandComplete(this.expressions.getBuilder('sync').evaluatorFactory)
		this.operandReduce = new OperandReduce(this.expressions, this.expressions.constBuilder)
	}

	public get evaluatorFactory (): EvaluatorFactory {
		return this.expressions.getBuilder('sync').evaluatorFactory
	}

	public build (expression: string): Operand {
		const expressionNormalized = this.normalizer.normalize(expression)
		const operand = this.parse.parse(expressionNormalized)
		const normalized = this.operandNormalize.normalize(operand)
		const completed = this.operandComplete.complete(normalized)
		const reduced = this.operandReduce.reduce(completed)
		// reduced.returnType = this.typeService.getType(reduced)
		const ormNormalized = this.ormOperandNormalizer.normalize(reduced)
		return ormNormalized
	}
}
