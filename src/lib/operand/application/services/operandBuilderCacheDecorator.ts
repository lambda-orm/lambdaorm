import { OperandBuilder, Operand, OperandSerializer, EvaluatorFactory } from '3xpr'
import { ICache } from 'h3lp'
import { Helper } from '../../../shared/application'

export class OperandBuilderCacheDecorator implements OperandBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly operandBuilder: OperandBuilder,
		private readonly cache: ICache<string, string>,
		private readonly serializer :OperandSerializer,
		private readonly helper:Helper
	) {}

	public get evaluatorFactory (): EvaluatorFactory {
		return this.operandBuilder.evaluatorFactory
	}

	public build (expression: string): Operand {
		try {
			if (expression === undefined || expression === null || expression.trim() === '') {
				throw new Error('undefined expression')
			}
			const key = this.helper.utils.hashCode(expression).toString()
			const value = this.cache.get(key)
			if (!value) {
				const operand = this.operandBuilder.build(expression)
				const serialized = this.serializer.serialize(operand)
				this.cache.set(key, serialized)
				return operand
			} else {
				return this.serializer.deserialize(value)
			}
		} catch (error: any) {
			throw new Error('expression: ' + expression + ' error: ' + error.toString())
		}
	}
}
