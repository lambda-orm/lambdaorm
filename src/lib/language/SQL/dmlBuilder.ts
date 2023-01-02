
import { DmlBuilder } from '../dmlBuilder'
import { Operand, Type } from '3xpr'
const SqlString = require('sqlstring')

export class SqlDMLBuilder extends DmlBuilder {
	protected override buildConstant (operand: Operand): string {
		switch (operand.returnType) {
		case Type.string:
			return SqlString.escape(operand.name)
		case Type.boolean:
			return this.dialect.other(operand.name)
		case Type.number:
			return operand.name
		default:
			return SqlString.escape(operand.name)
		}
	}
}
