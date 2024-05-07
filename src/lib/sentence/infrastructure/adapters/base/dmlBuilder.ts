import { Operand, OperandType } from '3xpr'
import { Primitive } from 'typ3s'
import { SentenceCategory, Source, SintaxisError, Field, Sentence, Page, MappingConfigService } from 'lambdaorm-base'
import { Query } from '../../../../query/domain'
import { OrmH3lp } from '../../../../shared/infrastructure'
import { DialectService, DmlBuilder } from '../../../../language/application'

export abstract class DmlBuilderBase implements DmlBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		protected readonly source: Source,
		protected readonly mapping: MappingConfigService,
		protected readonly dialect: DialectService,
		protected readonly helper:OrmH3lp) {}

		public abstract build (sentence: Sentence): Query

		protected buildSentence (sentence: Sentence): string {
			const info = this.helper.query.getInfo(sentence.action, sentence.entity)
			switch (info.category) {
			case SentenceCategory.select:
				return this.buildSelectSentence(sentence)
			case SentenceCategory.insert:
				return this.buildInsertSentence(sentence)
			case SentenceCategory.update:
				return this.buildUpdateSentence(sentence)
			case SentenceCategory.delete:
				return this.buildDeleteSentence(sentence)
			default:
				throw new SintaxisError(`sentence ${info.category} category not supported`)
			}
		}

		protected abstract buildSelectSentence (sentence: Sentence): string
		protected abstract buildInsertSentence (sentence: Sentence): string
		protected abstract buildUpdateSentence (sentence: Sentence): string
		protected abstract buildDeleteSentence (sentence: Sentence): string

		protected buildOperand (operand: Operand): string {
			if (operand instanceof Sentence) {
				return this.buildSentence(operand)
			} else if (operand.type === OperandType.Arrow) {
				return this.buildArrowFunction(operand)
			} else if (operand.type === OperandType.CallFunc || operand.type === OperandType.ChildFunc) {
				return this.buildFunctionRef(operand)
			} else if (operand.type === OperandType.Operator) {
				return this.buildOperator(operand)
			} else if (operand.type === OperandType.Block) {
				return this.buildBlock(operand)
			} else if (operand.type === OperandType.Obj) {
				return this.buildObject(operand)
			} else if (operand.type === OperandType.List) {
				return this.buildList(operand)
			} else if (operand.type === OperandType.KeyVal) {
				return this.buildKeyValue(operand)
			} else if (operand instanceof Field) {
				return this.buildField(operand)
			} else if (operand.type === OperandType.Var) {
				return this.buildVariable(operand)
			} else if (operand.type === OperandType.Const) {
				return this.buildConstant(operand)
			} else {
				throw new SintaxisError(`Operand ${operand.type} ${operand.name} not supported`)
			}
		}

		protected abstract buildField (field: Field): string
		protected abstract buildObject (operand: Operand): string

		protected buildPage (sentence: string, operand: Page): string {
			let template = this.dialect.dml('page')
			let page = 1
			let records = 10
			if (operand.children.length === 2) {
				page = parseInt(operand.children[0].name)
				records = parseInt(operand.children[1].name)
			} else if (operand.children.length === 3) {
				page = parseInt(operand.children[1].name)
				records = parseInt(operand.children[2].name)
			}
			if (page < 1) page = 1
			template = this.helper.str.replace(template, '{sentence}', sentence)
			template = this.helper.str.replace(template, '{offset}', ((page - 1) * records).toString())
			template = this.helper.str.replace(template, '{records}', records.toString())
			return template.trim() + ' '
		}

		protected buildArrowFunction (operand: Operand): string {
			let template = this.dialect.dml(operand.name)
			for (let i = 0; i < operand.children.length; i++) {
				const text = this.buildOperand(operand.children[i])
				template = this.helper.str.replace(template, '{' + i + '}', text)
			}
			return template.trim()
		}

		protected buildFunctionRef (operand: Operand): string {
			const funcData = this.dialect.function(operand.name)
			if (!funcData) throw new SintaxisError('Function ' + operand.name + ' not found')
			let text = ''
			if (['startWith', 'startsWith', 'like'].includes(operand.name) && operand.children.length === 2) {
				text = funcData.template
				const firstOperand = this.buildOperand(operand.children[0])
				const secondOperand = this.helper.str.replace(this.buildOperand(operand.children[1]), '\'', '')
				text = this.helper.str.replace(text, '{0}', firstOperand)
				text = this.helper.str.replace(text, '{1}', secondOperand)
			} else if (funcData.type === 'multiple') {
				const template = funcData.template
				text = this.buildOperand(operand.children[0])
				for (let i = 1; i < operand.children.length; i++) {
					text = this.helper.str.replace(template, '{accumulated}', text)
					text = this.helper.str.replace(text, '{value}', this.buildOperand(operand.children[i]))
				}
			} else {
				text = funcData.template
				for (let i = 0; i < operand.children.length; i++) {
					const value = this.buildOperand(operand.children[i])
					text = this.helper.str.replace(text, '{' + i + '}', value)
				}
			}
			return text
		}

		protected buildOperator (operand: Operand): string {
			let text = this.dialect.operator(operand.name, operand.children.length)
			for (let i = 0; i < operand.children.length; i++) {
				text = this.helper.str.replace(text, '{' + i + '}', this.buildOperand(operand.children[i]))
			}
			return text
		}

		protected buildBlock (operand: Operand): string {
			let text = ''
			for (const child of operand.children) {
				text += (this.buildOperand(child) + '')
			}
			return text
		}

		protected buildList (operand: Operand): string {
			let text = ''
			for (let i = 0; i < operand.children.length; i++) {
				text += (i > 0 ? ', ' : '') + this.buildOperand(operand.children[i])
			}
			return text
		}

		protected buildKeyValue (operand: Operand): string {
			return this.buildOperand(operand.children[0])
		}

		protected buildVariable (operand: Operand): string {
			const number = operand.number ? operand.number : 0
			let text = this.dialect.other('variable')
			text = this.helper.str.replace(text, '{name}', this.helper.query.transformParameter(operand.name))
			text = this.helper.str.replace(text, '{number}', number.toString())
			return text
		}

		protected buildConstant (operand: Operand): string {
			if (operand.returnType === undefined) {
				return this.helper.query.escape(operand.name)
			}
			switch (operand.returnType.primitive) {
			case Primitive.string:
				return this.helper.query.escape(operand.name)
			case Primitive.boolean:
				return this.dialect.other(operand.name.toString())
			case Primitive.integer:
				return parseInt(operand.name).toString()
			case Primitive.number:
			case Primitive.decimal:
				return parseFloat(operand.name).toString()
			default:
				return this.helper.query.escape(operand.name)
			}
		}
}
