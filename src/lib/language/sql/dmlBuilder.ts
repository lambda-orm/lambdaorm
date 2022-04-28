
import { DmlBuilder } from '../dmlBuilder'
import { Constant } from 'js-expressions'
const SqlString = require('sqlstring')

export class SqlDMLBuilder extends DmlBuilder {

	protected override buildConstant(operand: Constant): string {
		switch (operand.type) {
			case 'string':
				return SqlString.escape(operand.name)
			case 'boolean':
				return this.dialect.other(operand.name)
			case 'number':
				return operand.name
			default:
				return SqlString.escape(operand.name)
		}
	}
}
