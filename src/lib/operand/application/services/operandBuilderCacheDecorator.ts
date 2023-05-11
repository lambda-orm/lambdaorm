
import { IOperandBuilder, Operand, OperandSerializer } from '3xpr'
import { ICache, Autowired, IUtils } from 'h3lp'

export class OperandBuilderCacheDecorator implements IOperandBuilder {
	private serializer = new OperandSerializer()
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly operandBuilder: IOperandBuilder, private readonly cache: ICache<string, string>) {}

	@Autowired('h3lp.utils')
	public utils!: IUtils

	public build (expression: string): Operand {
		try {
			const key = this.utils.hashCode(expression).toString()
			const value = this.cache.get(key)
			if (!value) {
				const operand = this.operandBuilder.build(expression)
				this.cache.set(key, this.serializer.serialize(operand))
				return operand
			} else {
				return this.serializer.deserialize(value)
			}
		} catch (error: any) {
			throw new Error('expression: ' + expression + ' error: ' + error.toString())
		}
	}
}
