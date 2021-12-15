
import { Helper } from '../../helper'
import {
	Operand, Constant, Variable, Field, KeyValue, List, Obj, Operator, FunctionRef, ArrowFunction, Block,
	Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Delete
} from '../operands'
import { LanguageDMLBuilder } from '../../manager/dmlBuilder'
import { Query } from '../../model'
const SqlString = require('sqlstring')

export class SqlDMLBuilder extends LanguageDMLBuilder {
	public build (sentence: Sentence): Query {
		const sqlSentence = this.buildSentence(sentence)
		return new Query(sentence.name, this.dialect, this.dataSource, sqlSentence, sentence.entity, sentence.columns, sentence.parameters)
	}

	private buildOperand (operand: Operand): string {
		if (operand instanceof Sentence) {
			return this.buildSentence(operand)
		} else if (operand instanceof Page) {
			return this.buildPage(operand)
		} else if (operand instanceof ArrowFunction) {
			return this.buildArrowFunction(operand)
		} else if (operand instanceof FunctionRef) {
			return this.buildFunctionRef(operand)
		} else if (operand instanceof Operator) {
			return this.buildOperator(operand)
		} else if (operand instanceof Block) {
			return this.buildBlock(operand)
		} else if (operand instanceof Obj) {
			return this.buildObject(operand)
		} else if (operand instanceof List) {
			return this.buildList(operand)
		} else if (operand instanceof KeyValue) {
			return this.buildKeyValue(operand)
		} else if (operand instanceof Field) {
			return this.buildField(operand)
		} else if (operand instanceof Variable) {
			return this.buildVariable(operand)
		} else if (operand instanceof Constant) {
			return this.buildConstant(operand)
		} else {
			throw new Error(`Operand ${operand.type} ${operand.name} not supported`)
		}
	}

	private buildSentence (sentence:Sentence):string {
		const map = sentence.children.find(p => p.name === 'map')as Map|undefined
		const insert = sentence.children.find(p => p instanceof Insert) as Insert|undefined
		const update = sentence.children.find(p => p instanceof Update) as Update|undefined
		const _delete = sentence.children.find(p => p instanceof Delete) as Delete|undefined
		const filter = sentence.children.find(p => p.name === 'filter') as Filter|undefined
		const groupBy = sentence.children.find(p => p.name === 'groupBy')as GroupBy|undefined
		const having = sentence.children.find(p => p.name === 'having')as Having|undefined
		const sort = sentence.children.find(p => p.name === 'sort')as Sort|undefined
		const page = sentence.children.find(p => p.name === 'page')as Page|undefined

		let text = ''
		if (map) {
			const from = sentence.children.find(p => p instanceof From) as Operand
			const joins = sentence.children.filter(p => p instanceof Join)
			text = this.buildArrowFunction(map) + ' ' + this.solveFrom(from) + ' ' + this.solveJoins(joins)
		} else if (insert) text = this.buildInsert(insert, sentence.entity)
		else if (update)text = this.buildUpdate(update)
		else if (_delete)text = this.buildDelete(_delete)

		if (filter)text = text + this.buildArrowFunction(filter) + ' '
		if (groupBy)text = text + this.buildArrowFunction(groupBy) + ' '
		if (having)text = text + this.buildArrowFunction(having) + ' '
		if (sort) {
			text = text + this.buildArrowFunction(sort) + ' '
		}
		if (page)text = text + this.buildPage(page) + ' '
		return text
	}

	private solveJoins (joins:Operand[]):string {
		const list:string[] = []
		const template = this.metadata.dml('join')
		for (let i = 0; i < joins.length; i++) {
			const join = joins[i]
			const parts = join.name.split('.')
			const entityMapping = this.mapping.entityMapping(parts[0])
			if (entityMapping === undefined) {
				throw new Error(`not found mapping for ${parts[0]}`)
			}
			let joinText = template.replace('{name}', this.metadata.delimiter(entityMapping))
			joinText = joinText.replace('{alias}', parts[1])
			joinText = joinText.replace('{relation}', this.buildOperand(join.children[0])).trim()
			list.push(joinText)
		}
		return list.join(' ') + ' '
	}

	private solveFrom (from:Operand):string {
		let template = this.metadata.dml('from')
		const parts = from.name.split('.')
		const entityMapping = this.mapping.entityMapping(parts[0])
		if (entityMapping === undefined) {
			throw new Error(`not found mapping for ${parts[0]}`)
		}
		template = template.replace('{name}', this.metadata.delimiter(entityMapping))
		template = Helper.replace(template, '{alias}', parts[1])
		return template.trim()
	}

	private buildInsert (operand:Insert, entity:string):string {
		let template = this.metadata.dml(operand.clause)
		const templateColumn = this.metadata.other('column')
		const fields:string[] = []
		const values: any[] = []
		const autoincrement = this.mapping.getAutoincrement(entity)
		const entityMapping = this.mapping.entityMapping(entity)
		if (entityMapping === undefined) {
			throw new Error(`mapping undefined on ${entity} entity`)
		}

		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue

				let field = ''
				if (keyVal.property !== undefined) {
					field = this.mapping.getProperty(entity, keyVal.property).mapping
				} else {
					field = keyVal.name
				}

				fields.push(templateColumn.replace('{name}', this.metadata.delimiter(field)))
				values.push(this.buildOperand(keyVal.children[0]))
			}
		}
		template = template.replace('{name}', this.metadata.delimiter(entityMapping))
		template = template.replace('{fields}', fields.join(','))
		template = template.replace('{values}', values.join(','))
		template = template.replace('{autoincrementField}', autoincrement && autoincrement.mapping ? autoincrement.mapping : '0')
		return template.trim()
	}

	private buildUpdate (operand:Update):string {
		let template = this.metadata.dml('update')
		const templateColumn = this.metadata.other('column')
		const templateAssing = this.metadata.operator('=', 2)
		const assings: string[] = []
		const parts = operand.name.split('.')
		const entity = parts[0]
		const alias = parts[1]
		const entityMapping = this.mapping.entityMapping(entity)
		if (entityMapping === undefined) {
			throw new Error(`mapping undefined on ${entity} entity`)
		}

		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				const name = keyVal.property ? this.mapping.getProperty(entity, keyVal.property).mapping : keyVal.name

				const column = templateColumn.replace('{name}', this.metadata.delimiter(name))
				const value = this.buildOperand(keyVal.children[0])
				let assing = templateAssing.replace('{0}', column)
				assing = assing.replace('{1}', value)
				assings.push(assing)
			}
		}
		template = Helper.replace(template, '{name}', this.metadata.delimiter(entityMapping))
		template = Helper.replace(template, '{alias}', alias)
		template = template.replace('{assings}', assings.join(','))
		return template.trim() + ' '
	}

	private buildDelete (operand:Delete):string {
		let template = this.metadata.dml('delete')
		const parts = operand.name.split('.')
		const entity = parts[0]
		const alias = parts[1]
		const entityMapping = this.mapping.entityMapping(entity)
		if (entityMapping === undefined) {
			throw new Error(`mapping undefined on ${entity} entity`)
		}
		template = Helper.replace(template, '{name}', this.metadata.delimiter(entityMapping))
		template = Helper.replace(template, '{alias}', alias)
		return template.trim() + ' '
	}

	private buildPage (operand:Page):string {
		let template = this.metadata.dml('page')
		let page = parseInt(operand.children[1].name)
		const records = parseInt(operand.children[2].name)
		if (page < 1)page = 1
		template = template.replace('{offset}', ((page - 1) * records).toString())
		template = Helper.replace(template, '{records}', records.toString())
		return template.trim() + ' '
	}

	private buildArrowFunction (operand:ArrowFunction):string {
		let template = this.metadata.dml(operand.name)
		for (let i = 0; i < operand.children.length; i++) {
			const text = this.buildOperand(operand.children[i])
			// template = template.replace('{' + i + '}', text)
			template = Helper.replace(template, '{' + i + '}', text) // template.replace('{' + i + '}', text)
		}
		return template.trim()
	}

	private buildFunctionRef (operand:FunctionRef):string {
		const funcData = this.metadata.function(operand.name)
		if (!funcData) throw new Error('Function ' + operand.name + ' not found')
		let text = ''
		if (funcData.type === 'multiple') {
			const template = funcData.template
			text = this.buildOperand(operand.children[0])
			for (let i = 1; i < operand.children.length; i++) {
				text = Helper.replace(template, '{acumulated}', text)
				text = Helper.replace(text, '{value}', this.buildOperand(operand.children[i]))
			}
		} else {
			text = funcData.template
			for (let i = 0; i < operand.children.length; i++) {
				text = Helper.replace(text, '{' + i + '}', this.buildOperand(operand.children[i]))
			}
		}
		return text
	}

	private buildOperator (operand:Operator):string {
		let text = this.metadata.operator(operand.name, operand.children.length)
		for (let i = 0; i < operand.children.length; i++) {
			text = text.replace('{' + i + '}', this.buildOperand(operand.children[i]))
		}
		return text
	}

	private buildBlock (operand:Block):string {
		let text = ''
		for (let i = 0; i < operand.children.length; i++) {
			text += (this.buildOperand(operand.children[i]) + '')
		}
		return text
	}

	private buildObject (operand:Obj):string {
		let text = ''
		const template = this.metadata.function('as').template
		for (let i = 0; i < operand.children.length; i++) {
			const value = this.buildOperand(operand.children[i])
			const alias = this.metadata.delimiter(operand.children[i].name, true)
			let fieldText = template.replace('{value}', value)
			fieldText = fieldText.replace('{alias}', alias)
			text += (i > 0 ? ', ' : '') + fieldText
		}
		return text
	}

	private buildList (operand:List):string {
		let text = ''
		for (let i = 0; i < operand.children.length; i++) {
			text += (i > 0 ? ', ' : '') + this.buildOperand(operand.children[i])
		}
		return text
	}

	private buildKeyValue (operand:KeyValue):string {
		return this.buildOperand(operand.children[0])
	}

	private buildField (operand: Field): string {
		if (this.mapping.existsProperty(operand.entity, operand.name)) {
			const property = this.mapping.getProperty(operand.entity, operand.name)
			if (operand.alias === undefined) {
				return this.metadata.other('column').replace('{name}', this.metadata.delimiter(property.mapping, true))
			} else {
				let text = this.metadata.other('field')
				text = text.replace('{entityAlias}', operand.alias)
				text = text.replace('{name}', this.metadata.delimiter(property.mapping))
				return text
			}
		} else {
			return this.metadata.other('column').replace('{name}', this.metadata.delimiter(operand.name))
		}

		// const parts = operand.mapping.split('.')
		// if (parts.length === 1) {
		// const name = parts[0]
		// return metadata.other('column').replace('{name}', metadata.delimiter(name, true))
		// } else {
		// const aliasEntity = parts[0]
		// const name = parts[1]
		// let text = metadata.other('field')
		// text = text.replace('{entityAlias}', aliasEntity)
		// text = text.replace('{name}', metadata.delimiter(name))
		// return text
		// }
	}

	private buildVariable (operand:Variable):string {
		const number = operand.number ? operand.number : 0
		let text = this.metadata.other('variable')
		text = text.replace('{name}', operand.name)
		text = text.replace('{number}', number.toString())
		return text
	}

	private buildConstant (operand:Constant):string {
		switch (operand.type) {
		case 'string':
			return SqlString.escape(operand.name)
		case 'boolean':
			return this.metadata.other(operand.name)
		case 'number':
			return operand.name
		default:
			return SqlString.escape(operand.name)
		}
	}
}
