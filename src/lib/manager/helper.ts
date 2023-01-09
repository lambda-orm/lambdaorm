import { H3lp } from 'h3lp'
import { OperandHelper } from '3xpr'
import { SentenceHelper } from '../sentence'

export class Helper extends H3lp {
	public sentence:SentenceHelper
	public operand: OperandHelper

	constructor () {
		super()
		this.operand = new OperandHelper()
		this.sentence = new SentenceHelper(this.str)
	}
}
