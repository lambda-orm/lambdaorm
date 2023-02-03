import { H3lp } from 'h3lp'
import { OperandHelper } from '3xpr'
import { StringHelper } from 'h3lp'
import { QueryInfo } from '../index'
const { DateTime } = require('luxon')
const SqlString = require('sqlstring')

export class QueryHelper {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly str:StringHelper) {}

	public toArray (sentence:QueryInfo):string[] {
		const sentences:string[] = []
		sentences.push(sentence.sentence)
		if (sentence.children) {
			sentence.children.forEach(p => this.toArray(p).forEach(p => sentences.push(p)))
		}
		return sentences
	}

	public dateFormat (value:any, format:string):string {
		const iso = new Date(value).toISOString()
		if (format === 'ISO') {
			return DateTime.fromISO(iso).toISO()
		} else {
			return DateTime.fromISO(iso).toFormat(format)
		}
	}

	public escape (value:string):string {
		return SqlString.escape(value)
	}

	public transformParameter (name:string) {
		return this.str.replace(name, '.', '_')
		// con la siguiente opción falla cuando se hace value=Helper.str.replace(value,"\\'","\\''")
		// return string.replace(new RegExp(search, 'g'), replace)
	}	
}

export class ExpressionHelper {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly str:StringHelper) {}

	// eslint-disable-next-line @typescript-eslint/ban-types
	public clearLambda (func:Function):string {
		let str = func.toString().trim()
		let index = str.indexOf('=>') + 2
		str = str.substring(index, str.length).trim()
		index = str.indexOf('(')
		if (index > -1) {
			// Example: xxx.Products.map()
			const form = str.substring(0, index).trim()
			const parts = form.split('.')
			if (parts.length > 2) {
				return this.str.replace(str, parts[0] + '.', '')
			}
		} else {
			// Example: xxx.Products
			const parts = str.split('.')
			if (parts.length > 1) {
				return this.str.replace(str, parts[0] + '.', '')
			}
		}
		return str
	}
}

export class Helper extends H3lp {
	public query:QueryHelper
	public operand: OperandHelper
	public expression: ExpressionHelper

	constructor () {
		super()
		this.operand = new OperandHelper()
		this.query = new QueryHelper(this.str)
		this.expression = new ExpressionHelper(this.str)
	}
}
