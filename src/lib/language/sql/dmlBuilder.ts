
import { Helper } from '../../manager/helper'
import { Operand, Constant, Variable, KeyValue, List, Obj, Operator, FunctionRef, ArrowFunction, Block } from 'js-expressions'
import { Field, Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Delete } from '../../model/operands'
import { LanguageDMLBuilder } from '../../manager/dmlBuilder'
import { Query, SintaxisError, SchemaError, EntityMapping } from '../../model'

const SqlString = require('sqlstring')

export class SqlDMLBuilder extends LanguageDMLBuilder {
	public build (sentence: Sentence): Query {
		const sqlSentence = this.buildSentence(sentence)
		return new Query(sentence.name, this.dataSource.dialect, this.dataSource.name, sqlSentence, sentence.entity, sentence.columns, sentence.parameters, sentence.constraints, sentence.values, sentence.defaults)
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
			throw new SintaxisError(`Operand ${operand.type} ${operand.name} not supported`)
		}
	}

	private buildSentence (sentence:Sentence):string {
		const map = sentence.children.find(p => p.name === 'map')as Map|undefined
		const insert = sentence.children.find(p => p instanceof Insert) as Insert|undefined
		const update = sentence.children.find(p => p instanceof Update) as Update|undefined
		const _delete = sentence.children.find(p => p instanceof Delete) as Delete|undefined
		let filter = sentence.children.find(p => p.name === 'filter') as Filter|undefined
		const groupBy = sentence.children.find(p => p.name === 'groupBy')as GroupBy|undefined
		const having = sentence.children.find(p => p.name === 'having')as Having|undefined
		const sort = sentence.children.find(p => p.name === 'sort')as Sort|undefined
		const page = sentence.children.find(p => p.name === 'page')as Page|undefined
		const entity = this.mapping.getEntity(sentence.entity) as EntityMapping

		let text = ''
		if (map) {
			const from = sentence.children.find(p => p instanceof From) as Operand
			const joins = sentence.children.filter(p => p instanceof Join)
			text = this.buildArrowFunction(map) + ' ' + this.solveFrom(from) + ' ' + this.solveJoins(joins)
		} else if (insert) text = this.buildInsert(insert, sentence.entity)
		else if (update)text = this.buildUpdate(update)
		else if (_delete) text = this.buildDelete(_delete)
		// filter
		if (entity.filter) {
			const _filter = this.expressions.parse(entity.filter)
			this.replaceVar4Field(entity, sentence.alias, _filter)
			if (filter) {
				filter.children[0] = new Operator('&&', [filter.children[0], _filter])
			} else {
				filter = new ArrowFunction('filter', [_filter])
			}
		}
		if (filter) text = text + this.buildArrowFunction(filter) + ' '
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
		const template = this.dialect.dml('join')
		for (let i = 0; i < joins.length; i++) {
			const join = joins[i]
			const parts = join.name.split('.')
			const entity = this.mapping.getEntity(parts[0])
			if (entity === undefined) {
				throw new SchemaError(`not found mapping for ${parts[0]}`)
			}
			if (entity.filter) {
				const _filter = this.expressions.parse(entity.filter)
				this.replaceVar4Field(entity, parts[1], _filter)
				join.children[0] = new Operator('&&', [join.children[0], _filter])
			}
			let joinText = template.replace('{name}', this.dialect.delimiter(entity.mapping))
			joinText = joinText.replace('{alias}', parts[1])
			joinText = joinText.replace('{relation}', this.buildOperand(join.children[0])).trim()
			list.push(joinText)
		}
		return list.join(' ') + ' '
	}

	private solveFrom (from:Operand):string {
		let template = this.dialect.dml('from')
		const parts = from.name.split('.')
		const entityMapping = this.mapping.entityMapping(parts[0])
		if (entityMapping === undefined) {
			throw new SchemaError(`not found mapping for ${parts[0]}`)
		}
		template = template.replace('{name}', this.dialect.delimiter(entityMapping))
		template = Helper.replace(template, '{alias}', parts[1])
		return template.trim()
	}

	private replaceVar4Field (entity:EntityMapping, alias:string, operand:Operand) {
		for (const i in operand.children) {
			const child = operand.children[i]
			if (child instanceof Variable) {
				const property = entity.properties.find(p => p.name === child.name)
				if (property) {
					operand.children[i] = new Field(entity.name, child.name, property.type, alias)
				}
			} else if (child.children && child.children.length > 0) {
				this.replaceVar4Field(entity, alias, child)
			}
		}
	}

	private buildInsert (operand:Insert, entity:string):string {
		let template = this.dialect.dml(operand.clause)
		const templateColumn = this.dialect.other('column')
		const fields:string[] = []
		const values: any[] = []
		const autoincrement = this.mapping.getAutoincrement(entity)
		const entityMapping = this.mapping.entityMapping(entity)
		if (entityMapping === undefined) {
			throw new SchemaError(`mapping undefined on ${entity} entity`)
		}

		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue

				let name:string
				if (keyVal.property !== undefined) {
					const property = this.mapping.getProperty(entity, keyVal.property)
					name = property.mapping
				} else {
					name = keyVal.name
				}
				fields.push(templateColumn.replace('{name}', this.dialect.delimiter(name)))
				values.push(this.buildOperand(keyVal.children[0]))
			}
		}
		template = template.replace('{name}', this.dialect.delimiter(entityMapping))
		template = template.replace('{fields}', fields.join(','))
		template = template.replace('{values}', values.join(','))
		template = template.replace('{autoincrementField}', autoincrement && autoincrement.mapping ? autoincrement.mapping : '0')
		return template.trim()
	}

	private buildUpdate (operand:Update):string {
		let template = this.dialect.dml('update')
		const templateColumn = this.dialect.other('column')
		const templateAssing = this.dialect.operator('=', 2)
		const assings: string[] = []
		const parts = operand.name.split('.')
		const entity = parts[0]
		const alias = parts[1]
		const entityMapping = this.mapping.entityMapping(entity)
		if (entityMapping === undefined) {
			throw new SchemaError(`mapping undefined on ${entity} entity`)
		}

		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				let name:string
				if (keyVal.property !== undefined) {
					const property = this.mapping.getProperty(entity, keyVal.property)
					name = property.mapping
				} else {
					name = keyVal.name
				}
				// const name = keyVal.property ? this.mapping.getProperty(entity, keyVal.property).mapping : keyVal.name

				const column = templateColumn.replace('{name}', this.dialect.delimiter(name))
				const value = this.buildOperand(keyVal.children[0])
				let assing = templateAssing.replace('{0}', column)
				assing = assing.replace('{1}', value)
				assings.push(assing)
			}
		}
		template = Helper.replace(template, '{name}', this.dialect.delimiter(entityMapping))
		template = Helper.replace(template, '{alias}', alias)
		template = template.replace('{assings}', assings.join(','))
		return template.trim() + ' '
	}

	private buildDelete (operand:Delete):string {
		let template = this.dialect.dml('delete')
		const parts = operand.name.split('.')
		const entity = parts[0]
		const alias = parts[1]
		const entityMapping = this.mapping.entityMapping(entity)
		if (entityMapping === undefined) {
			throw new SchemaError(`mapping undefined on ${entity} entity`)
		}
		template = Helper.replace(template, '{name}', this.dialect.delimiter(entityMapping))
		template = Helper.replace(template, '{alias}', alias)
		return template.trim() + ' '
	}

	private buildPage (operand:Page):string {
		let template = this.dialect.dml('page')
		let page = parseInt(operand.children[1].name)
		const records = parseInt(operand.children[2].name)
		if (page < 1)page = 1
		template = template.replace('{offset}', ((page - 1) * records).toString())
		template = Helper.replace(template, '{records}', records.toString())
		return template.trim() + ' '
	}

	private buildArrowFunction (operand:ArrowFunction):string {
		let template = this.dialect.dml(operand.name)
		for (let i = 0; i < operand.children.length; i++) {
			const text = this.buildOperand(this.solveReadField(operand.children[i]))
			// template = template.replace('{' + i + '}', text)
			template = Helper.replace(template, '{' + i + '}', text) // template.replace('{' + i + '}', text)
		}
		return template.trim()
	}

	private solveReadField (operand:Operand): Operand {
		if (operand instanceof Field) {
			const field = operand as Field
			const alias = field.alias
			const entity = this.mapping.getEntity(field.entity)
			const property = entity?.properties.find(p => p.name === field.name)
			let _operand = operand as Operand
			if (entity && property) {
				if (property.readMappingExp) {
					_operand = this.expressions.parse(property.readMappingExp)
					this.replaceVar4Field(entity, alias as string, _operand)
				}
				if (property.readExp) {
					_operand = this.expressions.parse(property.readExp)
					this.replaceVar4Field(entity, field.alias as string, _operand)
				}
				// const viewPorperty = this.view.getProperty(entity.name, property.name)
				// if (viewPorperty && viewPorperty.readExp) {
				// _operand = this.expressions.parse(viewPorperty.readExp)
				// this.replaceVar4Field(entity, field.alias as string, _operand)
				// }
			}
			return _operand
		} else if (operand.children && operand.children.length > 0) {
			for (const i in operand.children) {
				operand.children[i] = this.solveReadField(operand.children[i])
			}
		}
		return operand
	}

	private buildFunctionRef (operand:FunctionRef):string {
		const funcData = this.dialect.function(operand.name)
		if (!funcData) throw new SintaxisError('Function ' + operand.name + ' not found')
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
		let text = this.dialect.operator(operand.name, operand.children.length)
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
		const template = this.dialect.function('as').template
		for (let i = 0; i < operand.children.length; i++) {
			const value = this.buildOperand(operand.children[i])
			const alias = this.dialect.delimiter(operand.children[i].name, true)
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
				return this.dialect.other('column').replace('{name}', this.dialect.delimiter(property.mapping, true))
			} else {
				let text = this.dialect.other('field')
				text = text.replace('{entityAlias}', operand.alias)
				text = text.replace('{name}', this.dialect.delimiter(property.mapping))
				return text
			}
		} else {
			return this.dialect.other('column').replace('{name}', this.dialect.delimiter(operand.name))
		}
	}

	private buildVariable (operand:Variable):string {
		const number = operand.number ? operand.number : 0
		let text = this.dialect.other('variable')
		text = text.replace('{name}', operand.name)
		text = text.replace('{number}', number.toString())
		return text
	}

	private buildConstant (operand:Constant):string {
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
