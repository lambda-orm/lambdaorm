
import { Helper } from '../../helper'
import {
	Operand, Constant, Variable, Field, KeyValue, List, Obj, Operator, FunctionRef, ArrowFunction, Block,
	Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Delete
} from '../operands'
import { LanguageDMLBuilder } from '../../manager/dmlBuilder'
import { DialectMetadata } from '../dialectMetadata'
import { Query } from '../../model'
import { SchemaHelper } from '../../manager'
const SqlString = require('sqlstring')

export class SqlDMLBuilder extends LanguageDMLBuilder {
	public build (sentence: Sentence, schema:SchemaHelper, database: string, metadata: DialectMetadata): Query {
		const sqlSentence = this.buildSentence(sentence, schema, metadata as DialectMetadata)
		return new Query(sentence.name, database, metadata.name, sqlSentence, sentence.entity, sentence.columns, sentence.parameters)
	}

	private buildOperand (operand: Operand, schema: SchemaHelper, metadata: DialectMetadata): string {
		if (operand instanceof Sentence) {
			return this.buildSentence(operand, schema, metadata)
		// }
		// else if (operand instanceof Insert) {
		// return this.buildInsert(operand, schema, metadata)
		// } else if (operand instanceof Update) {
		// return this.buildUpdate(operand, schema, metadata)
		// } else if (operand instanceof Delete) {
		// return this.buildDelete(operand, metadata)
		} else if (operand instanceof Page) {
			return this.buildPage(operand, metadata)
		} else if (operand instanceof ArrowFunction) {
			return this.buildArrowFunction(operand, schema, metadata)
		} else if (operand instanceof FunctionRef) {
			return this.buildFunctionRef(operand, schema, metadata)
		} else if (operand instanceof Operator) {
			return this.buildOperator(operand, schema, metadata)
		} else if (operand instanceof Block) {
			return this.buildBlock(operand, schema, metadata)
		} else if (operand instanceof Obj) {
			return this.buildObject(operand, schema, metadata)
		} else if (operand instanceof List) {
			return this.buildList(operand, schema, metadata)
		} else if (operand instanceof KeyValue) {
			return this.buildKeyValue(operand, schema, metadata)
		} else if (operand instanceof Field) {
			return this.buildField(operand, metadata)
		} else if (operand instanceof Variable) {
			return this.buildVariable(operand, metadata)
		} else if (operand instanceof Constant) {
			return this.buildConstant(operand, metadata)
		} else {
			throw new Error(`Operand ${operand.type} ${operand.name} not supported`)
		}
	}

	private buildSentence (sentence:Sentence, schema:SchemaHelper, metadata:DialectMetadata):string {
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
			text = this.buildArrowFunction(map, schema, metadata) + ' ' + this.solveFrom(from, metadata) + ' ' + this.solveJoins(joins, schema, metadata)
		} else if (insert) text = this.buildInsert(insert, sentence.entity, schema, metadata)
		else if (update)text = this.buildUpdate(update, schema, metadata)
		else if (_delete)text = this.buildDelete(_delete, metadata)

		if (filter)text = text + this.buildArrowFunction(filter, schema, metadata) + ' '
		if (groupBy)text = text + this.buildArrowFunction(groupBy, schema, metadata) + ' '
		if (having)text = text + this.buildArrowFunction(having, schema, metadata) + ' '
		if (sort)text = text + this.buildArrowFunction(sort, schema, metadata) + ' '
		if (page)text = text + this.buildPage(page, metadata) + ' '
		return text
	}

	private solveJoins (joins:Operand[], schema:SchemaHelper, metadata:DialectMetadata):string {
		const list:string[] = []
		const template = metadata.dml('join')
		for (let i = 0; i < joins.length; i++) {
			const join = joins[i]
			const parts = join.name.split('.')
			let joinText = template.replace('{name}', metadata.delimiter(parts[0]))
			joinText = joinText.replace('{alias}', parts[1])
			joinText = joinText.replace('{relation}', this.buildOperand(join.children[0], schema, metadata)).trim()
			list.push(joinText)
		}
		return list.join(' ') + ' '
	}

	private solveFrom (from:Operand, metadata:DialectMetadata):string {
		let template = metadata.dml('from')
		const parts = from.name.split('.')
		template = template.replace('{name}', metadata.delimiter(parts[0]))
		template = Helper.replace(template, '{alias}', parts[1])
		return template.trim()
	}

	private buildInsert (operand:Insert, entity:string, schema:SchemaHelper, metadata:DialectMetadata):string {
		let template = metadata.dml(operand.clause)
		const templateColumn = metadata.other('column')
		const fields:string[] = []
		const values: any[] = []
		const autoincrement = schema.getAutoincrement(entity)

		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				fields.push(templateColumn.replace('{name}', metadata.delimiter(keyVal.mapping ? keyVal.mapping : keyVal.name)))
				values.push(this.buildOperand(keyVal.children[0], schema, metadata))
			}
		}

		template = template.replace('{name}', metadata.delimiter(operand.name))
		template = template.replace('{fields}', fields.join(','))
		template = template.replace('{values}', values.join(','))
		template = template.replace('{autoincrementField}', autoincrement && autoincrement.mapping ? autoincrement.mapping : '0')
		return template.trim()
	}

	private buildUpdate (operand:Update, schema:SchemaHelper, metadata:DialectMetadata):string {
		let template = metadata.dml('update')
		const templateColumn = metadata.other('column')
		const templateAssing = metadata.operator('=', 2)
		const assings:string[] = []

		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				const column = templateColumn.replace('{name}', metadata.delimiter(keyVal.mapping ? keyVal.mapping : keyVal.name))
				const value = this.buildOperand(keyVal.children[0], schema, metadata)
				let assing = templateAssing.replace('{0}', column)
				assing = assing.replace('{1}', value)
				assings.push(assing)
			}
		}
		const parts = operand.name.split('.')
		template = Helper.replace(template, '{name}', metadata.delimiter(parts[0]))
		template = Helper.replace(template, '{alias}', parts[1])
		template = template.replace('{assings}', assings.join(','))
		return template.trim() + ' '
	}

	private buildDelete (operand:Delete, metadata:DialectMetadata):string {
		let template = metadata.dml('delete')
		const parts = operand.name.split('.')
		template = Helper.replace(template, '{name}', metadata.delimiter(parts[0]))
		template = Helper.replace(template, '{alias}', parts[1])
		return template.trim() + ' '
	}

	private buildPage (operand:Page, metadata:DialectMetadata):string {
		let template = metadata.dml('page')
		let page = parseInt(operand.children[1].name)
		const records = parseInt(operand.children[2].name)
		if (page < 1)page = 1
		template = template.replace('{offset}', ((page - 1) * records).toString())
		template = Helper.replace(template, '{records}', records.toString())
		return template.trim() + ' '
	}

	private buildArrowFunction (operand:ArrowFunction, schema:SchemaHelper, metadata:DialectMetadata):string {
		let template = metadata.dml(operand.name)
		for (let i = 0; i < operand.children.length; i++) {
			const text = this.buildOperand(operand.children[i], schema, metadata)
			// template = template.replace('{' + i + '}', text)
			template = Helper.replace(template, '{' + i + '}', text) // template.replace('{' + i + '}', text)
		}
		return template.trim()
	}

	private buildFunctionRef (operand:FunctionRef, schema:SchemaHelper, metadata:DialectMetadata):string {
		const funcData = metadata.function(operand.name)
		if (!funcData) throw new Error('Function ' + operand.name + ' not found')
		let text = ''
		if (funcData.type === 'multiple') {
			const template = funcData.template
			text = this.buildOperand(operand.children[0], schema, metadata)
			for (let i = 1; i < operand.children.length; i++) {
				text = Helper.replace(template, '{acumulated}', text)
				text = Helper.replace(text, '{value}', this.buildOperand(operand.children[i], schema, metadata))
			}
		} else {
			text = funcData.template
			for (let i = 0; i < operand.children.length; i++) {
				text = Helper.replace(text, '{' + i + '}', this.buildOperand(operand.children[i], schema, metadata))
			}
		}
		return text
	}

	private buildOperator (operand:Operator, schema:SchemaHelper, metadata:DialectMetadata):string {
		let text = metadata.operator(operand.name, operand.children.length)
		for (let i = 0; i < operand.children.length; i++) {
			text = text.replace('{' + i + '}', this.buildOperand(operand.children[i], schema, metadata))
		}
		return text
	}

	private buildBlock (operand:Block, schema:SchemaHelper, metadata:DialectMetadata):string {
		let text = ''
		for (let i = 0; i < operand.children.length; i++) {
			text += (this.buildOperand(operand.children[i], schema, metadata) + '')
		}
		return text
	}

	private buildObject (operand:Obj, schema:SchemaHelper, metadata:DialectMetadata):string {
		let text = ''
		const template = metadata.function('as').template
		for (let i = 0; i < operand.children.length; i++) {
			const value = this.buildOperand(operand.children[i], schema, metadata)
			const alias = metadata.delimiter(operand.children[i].name, true)
			let fieldText = template.replace('{value}', value)
			fieldText = fieldText.replace('{alias}', alias)
			text += (i > 0 ? ', ' : '') + fieldText
		}
		return text
	}

	private buildList (operand:List, schema:SchemaHelper, metadata:DialectMetadata):string {
		let text = ''
		for (let i = 0; i < operand.children.length; i++) {
			text += (i > 0 ? ', ' : '') + this.buildOperand(operand.children[i], schema, metadata)
		}
		return text
	}

	private buildKeyValue (operand:KeyValue, schema:SchemaHelper, metadata:DialectMetadata):string {
		return this.buildOperand(operand.children[0], schema, metadata)
	}

	private buildField (operand:Field, metadata:DialectMetadata):string {
		const parts = operand.mapping.split('.')
		if (parts.length === 1) {
			const name = parts[0]
			return metadata.other('column').replace('{name}', metadata.delimiter(name, true))
		} else {
			const aliasEntity = parts[0]
			const name = parts[1]
			let text = metadata.other('field')
			text = text.replace('{entityAlias}', aliasEntity)
			text = text.replace('{name}', metadata.delimiter(name))
			return text
		}
	}

	private buildVariable (operand:Variable, metadata:DialectMetadata):string {
		const number = operand.number ? operand.number : 0
		let text = metadata.other('variable')
		text = text.replace('{name}', operand.name)
		text = text.replace('{number}', number.toString())
		return text
	}

	private buildConstant (operand:Constant, metadata:DialectMetadata):string {
		switch (operand.type) {
		case 'string':
			return SqlString.escape(operand.name)
		case 'boolean':
			return metadata.other(operand.name)
		case 'number':
			return operand.name
		default:
			return SqlString.escape(operand.name)
		}
	}
}
