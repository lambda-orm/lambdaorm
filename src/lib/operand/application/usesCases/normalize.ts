
import { SintaxisError } from '../../../shared/domain'
import { IOperandBuilder } from '3xpr'
import { OrmOperandHelper } from '../services/operandHelper'

export class OperandNormalize {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly operandBuilder:IOperandBuilder,
		private readonly operandHelper:OrmOperandHelper) {}

	public normalize (expression: string): string {
		try {
			const operand = this.operandBuilder.build(expression)
			return this.operandHelper.toExpression(operand)
		} catch (error: any) {
			throw new SintaxisError('normalize expression: ' + expression + ' error: ' + error.toString())
		}
	}
}
