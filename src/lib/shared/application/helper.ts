import { H3lp, IStringHelper } from 'h3lp'
import { expressions, OperandHelper } from '3xpr'
// import { QueryInfo } from './domain'
const { DateTime } = require('luxon')
const SqlString = require('sqlstring')

export class QueryHelper {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly str:IStringHelper) {}

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

export class Helper extends H3lp {
	public query:QueryHelper
	constructor (public readonly operand: OperandHelper, h3lp: H3lp) {
		super(h3lp.utils, h3lp.val, h3lp.fs, h3lp.http, h3lp.obj, h3lp.str, h3lp.test, h3lp.array)
		this.operand = new OperandHelper(expressions.constBuilder)
		this.query = new QueryHelper(this.str)
	}
}
