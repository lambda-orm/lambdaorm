
import { Helper } from '../../manager/helper'
import { Operand, Constant, Variable, KeyValue, List, Obj, Operator, FunctionRef, ArrowFunction, Block } from 'js-expressions'
import { Field, Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Delete } from '../../model/operands'
import { LanguageDMLBuilder } from '../../manager/dmlBuilder'
import { Query, SintaxisError, SchemaError, EntityMapping, DataSource } from '../../model'
import { MappingConfig, ViewConfig, Dialect } from './../../manager'

const SqlString = require('sqlstring')

export class SqlDMLBuilder extends LanguageDMLBuilder {
	public build (dataSource: DataSource, mapping: MappingConfig, view:ViewConfig, dialect: Dialect, sentence: Sentence): Query {
		const sqlSentence = this.buildSentence(dialect, mapping, sentence)
		return new Query(sentence.name, dataSource.dialect, dataSource.name, sqlSentence, sentence.entity, sentence.columns, sentence.parameters, sentence.constraints, sentence.values, sentence.defaults)
	}

	private buildOperand (dialect: Dialect, mapping: MappingConfig, operand: Operand): string {
		if (operand instanceof Sentence) {
			return this.buildSentence(dialect, mapping, operand)
		} else if (operand instanceof Page) {
			return this.buildPage(dialect, operand)
		} else if (operand instanceof ArrowFunction) {
			return this.buildArrowFunction(dialect, mapping, operand)
		} else if (operand instanceof FunctionRef) {
			return this.buildFunctionRef(dialect, mapping, operand)
		} else if (operand instanceof Operator) {
			return this.buildOperator(dialect, mapping, operand)
		} else if (operand instanceof Block) {
			return this.buildBlock(dialect, mapping, operand)
		} else if (operand instanceof Obj) {
			return this.buildObject(dialect, mapping, operand)
		} else if (operand instanceof List) {
			return this.buildList(dialect, mapping, operand)
		} else if (operand instanceof KeyValue) {
			return this.buildKeyValue(dialect, mapping, operand)
		} else if (operand instanceof Field) {
			return this.buildField(dialect, mapping, operand)
		} else if (operand instanceof Variable) {
			return this.buildVariable(dialect, operand)
		} else if (operand instanceof Constant) {
			return this.buildConstant(dialect, operand)
		} else {
			throw new SintaxisError(`Operand ${operand.type} ${operand.name} not supported`)
		}
	}

	private buildSentence (dialect: Dialect, mapping: MappingConfig, sentence:Sentence):string {
		const map = sentence.children.find(p => p.name === 'map')as Map|undefined
		const insert = sentence.children.find(p => p instanceof Insert) as Insert|undefined
		const update = sentence.children.find(p => p instanceof Update) as Update|undefined
		const _delete = sentence.children.find(p => p instanceof Delete) as Delete|undefined
		let filter = sentence.children.find(p => p.name === 'filter') as Filter|undefined
		const groupBy = sentence.children.find(p => p.name === 'groupBy')as GroupBy|undefined
		const having = sentence.children.find(p => p.name === 'having')as Having|undefined
		const sort = sentence.children.find(p => p.name === 'sort')as Sort|undefined
		const page = sentence.children.find(p => p.name === 'page')as Page|undefined
		const entity = mapping.getEntity(sentence.entity) as EntityMapping

		let text = ''
		if (map) {
			const from = sentence.children.find(p => p instanceof From) as Operand
			const joins = sentence.children.filter(p => p instanceof Join)
			text = this.buildArrowFunction(dialect, mapping, map) + ' ' + this.solveFrom(dialect, mapping, from) + ' ' + this.solveJoins(dialect, mapping, joins)
		} else if (insert) text = this.buildInsert(dialect, mapping, insert, sentence.entity)
		else if (update)text = this.buildUpdate(dialect, mapping, update)
		else if (_delete) text = this.buildDelete(dialect, mapping, _delete)
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
		if (filter) text = text + this.buildArrowFunction(dialect, mapping, filter) + ' '
		if (groupBy)text = text + this.buildArrowFunction(dialect, mapping, groupBy) + ' '
		if (having)text = text + this.buildArrowFunction(dialect, mapping, having) + ' '
		if (sort) {
			text = text + this.buildArrowFunction(dialect, mapping, sort) + ' '
		}
		if (page)text = text + this.buildPage(dialect, page) + ' '
		return text
	}

	private solveJoins (dialect: Dialect, mapping: MappingConfig, joins:Operand[]):string {
		const list:string[] = []
		const template = dialect.dml('join')
		for (let i = 0; i < joins.length; i++) {
			const join = joins[i]
			const parts = join.name.split('.')
			const entity = mapping.getEntity(parts[0])
			if (entity === undefined) {
				throw new SchemaError(`not found mapping for ${parts[0]}`)
			}
			if (entity.filter) {
				const _filter = this.expressions.parse(entity.filter)
				this.replaceVar4Field(entity, parts[1], _filter)
				join.children[0] = new Operator('&&', [join.children[0], _filter])
			}
			let joinText = template.replace('{name}', dialect.delimiter(entity.mapping))
			joinText = joinText.replace('{alias}', parts[1])
			joinText = joinText.replace('{relation}', this.buildOperand(dialect, mapping, join.children[0])).trim()
			list.push(joinText)
		}
		return list.join(' ') + ' '
	}

	private solveFrom (dialect: Dialect, mapping: MappingConfig, from:Operand):string {
		let template = dialect.dml('from')
		const parts = from.name.split('.')
		const entityMapping = mapping.entityMapping(parts[0])
		if (entityMapping === undefined) {
			throw new SchemaError(`not found mapping for ${parts[0]}`)
		}
		template = template.replace('{name}', dialect.delimiter(entityMapping))
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

	private buildInsert (dialect: Dialect, mapping: MappingConfig, operand:Insert, entity:string):string {
		let template = dialect.dml(operand.clause)
		const templateColumn = dialect.other('column')
		const fields:string[] = []
		const values: any[] = []
		const autoincrement = mapping.getAutoincrement(entity)
		const entityMapping = mapping.entityMapping(entity)
		if (entityMapping === undefined) {
			throw new SchemaError(`mapping undefined on ${entity} entity`)
		}

		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue

				let name:string
				if (keyVal.property !== undefined) {
					const property = mapping.getProperty(entity, keyVal.property)
					name = property.mapping
				} else {
					name = keyVal.name
				}
				fields.push(templateColumn.replace('{name}', dialect.delimiter(name)))
				values.push(this.buildOperand(dialect, mapping, keyVal.children[0]))
			}
		}
		template = template.replace('{name}', dialect.delimiter(entityMapping))
		template = template.replace('{fields}', fields.join(','))
		template = template.replace('{values}', values.join(','))
		template = template.replace('{autoincrementField}', autoincrement && autoincrement.mapping ? autoincrement.mapping : '0')
		return template.trim()
	}

	private buildUpdate (dialect: Dialect, mapping: MappingConfig, operand:Update):string {
		let template = dialect.dml('update')
		const templateColumn = dialect.other('column')
		const templateAssing = dialect.operator('=', 2)
		const assings: string[] = []
		const parts = operand.name.split('.')
		const entity = parts[0]
		const alias = parts[1]
		const entityMapping = mapping.entityMapping(entity)
		if (entityMapping === undefined) {
			throw new SchemaError(`mapping undefined on ${entity} entity`)
		}

		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				let name:string
				if (keyVal.property !== undefined) {
					const property = mapping.getProperty(entity, keyVal.property)
					name = property.mapping
				} else {
					name = keyVal.name
				}
				// const name = keyVal.property ? this.mapping.getProperty(entity, keyVal.property).mapping : keyVal.name

				const column = templateColumn.replace('{name}', dialect.delimiter(name))
				const value = this.buildOperand(dialect, mapping, keyVal.children[0])
				let assing = templateAssing.replace('{0}', column)
				assing = assing.replace('{1}', value)
				assings.push(assing)
			}
		}
		template = Helper.replace(template, '{name}', dialect.delimiter(entityMapping))
		template = Helper.replace(template, '{alias}', alias)
		template = template.replace('{assings}', assings.join(','))
		return template.trim() + ' '
	}

	private buildDelete (dialect: Dialect, mapping: MappingConfig, operand:Delete):string {
		let template = dialect.dml('delete')
		const parts = operand.name.split('.')
		const entity = parts[0]
		const alias = parts[1]
		const entityMapping = mapping.entityMapping(entity)
		if (entityMapping === undefined) {
			throw new SchemaError(`mapping undefined on ${entity} entity`)
		}
		template = Helper.replace(template, '{name}', dialect.delimiter(entityMapping))
		template = Helper.replace(template, '{alias}', alias)
		return template.trim() + ' '
	}

	private buildPage (dialect: Dialect, operand:Page):string {
		let template = dialect.dml('page')
		let page = parseInt(operand.children[1].name)
		const records = parseInt(operand.children[2].name)
		if (page < 1)page = 1
		template = template.replace('{offset}', ((page - 1) * records).toString())
		template = Helper.replace(template, '{records}', records.toString())
		return template.trim() + ' '
	}

	private buildArrowFunction (dialect: Dialect, mapping: MappingConfig, operand:ArrowFunction):string {
		let template = dialect.dml(operand.name)
		for (let i = 0; i < operand.children.length; i++) {
			const text = this.buildOperand(dialect, mapping, this.solveReadField(mapping, operand.children[i]))
			// template = template.replace('{' + i + '}', text)
			template = Helper.replace(template, '{' + i + '}', text) // template.replace('{' + i + '}', text)
		}
		return template.trim()
	}

	private solveReadField (mapping: MappingConfig, operand:Operand): Operand {
		if (operand instanceof Field) {
			const field = operand as Field
			const alias = field.alias
			const entity = mapping.getEntity(field.entity)
			const property = entity?.properties.find(p => p.name === field.name)
			const _operand = operand as Operand
			if (entity && property) {
				// if (property.readMappingExp) {
				// _operand = this.expressions.parse(property.readMappingExp)
				// this.replaceVar4Field(entity, alias as string, _operand)
				// }
				// if (property.readExp) {
				// _operand = this.expressions.parse(property.readExp)
				// this.replaceVar4Field(entity, field.alias as string, _operand)
				// }
				// // const viewPorperty = this.view.getProperty(entity.name, property.name)
				// // if (viewPorperty && viewPorperty.readExp) {
				// // _operand = this.expressions.parse(viewPorperty.readExp)
				// // this.replaceVar4Field(entity, field.alias as string, _operand)
				// // }
			}
			return _operand
		} else if (operand.children && operand.children.length > 0) {
			for (const i in operand.children) {
				operand.children[i] = this.solveReadField(mapping, operand.children[i])
			}
		}
		return operand
	}

	private buildFunctionRef (dialect: Dialect, mapping: MappingConfig, operand:FunctionRef):string {
		const funcData = dialect.function(operand.name)
		if (!funcData) throw new SintaxisError('Function ' + operand.name + ' not found')
		let text = ''
		if (funcData.type === 'multiple') {
			const template = funcData.template
			text = this.buildOperand(dialect, mapping, operand.children[0])
			for (let i = 1; i < operand.children.length; i++) {
				text = Helper.replace(template, '{acumulated}', text)
				text = Helper.replace(text, '{value}', this.buildOperand(dialect, mapping, operand.children[i]))
			}
		} else {
			text = funcData.template
			for (let i = 0; i < operand.children.length; i++) {
				text = Helper.replace(text, '{' + i + '}', this.buildOperand(dialect, mapping, operand.children[i]))
			}
		}
		return text
	}

	private buildOperator (dialect: Dialect, mapping: MappingConfig, operand:Operator):string {
		let text = dialect.operator(operand.name, operand.children.length)
		for (let i = 0; i < operand.children.length; i++) {
			text = text.replace('{' + i + '}', this.buildOperand(dialect, mapping, operand.children[i]))
		}
		return text
	}

	private buildBlock (dialect: Dialect, mapping: MappingConfig, operand:Block):string {
		let text = ''
		for (let i = 0; i < operand.children.length; i++) {
			text += (this.buildOperand(dialect, mapping, operand.children[i]) + '')
		}
		return text
	}

	private buildObject (dialect: Dialect, mapping: MappingConfig, operand:Obj):string {
		let text = ''
		const template = dialect.function('as').template
		for (let i = 0; i < operand.children.length; i++) {
			const value = this.buildOperand(dialect, mapping, operand.children[i])
			const alias = dialect.delimiter(operand.children[i].name, true)
			let fieldText = template.replace('{value}', value)
			fieldText = fieldText.replace('{alias}', alias)
			text += (i > 0 ? ', ' : '') + fieldText
		}
		return text
	}

	private buildList (dialect: Dialect, mapping: MappingConfig, operand:List):string {
		let text = ''
		for (let i = 0; i < operand.children.length; i++) {
			text += (i > 0 ? ', ' : '') + this.buildOperand(dialect, mapping, operand.children[i])
		}
		return text
	}

	private buildKeyValue (dialect: Dialect, mapping: MappingConfig, operand:KeyValue):string {
		return this.buildOperand(dialect, mapping, operand.children[0])
	}

	private buildField (dialect: Dialect, mapping: MappingConfig, operand: Field): string {
		if (mapping.existsProperty(operand.entity, operand.name)) {
			const property = mapping.getProperty(operand.entity, operand.name)
			if (operand.alias === undefined) {
				return dialect.other('column').replace('{name}', dialect.delimiter(property.mapping, true))
			} else {
				let text = dialect.other('field')
				text = text.replace('{entityAlias}', operand.alias)
				text = text.replace('{name}', dialect.delimiter(property.mapping))
				return text
			}
		} else {
			return dialect.other('column').replace('{name}', dialect.delimiter(operand.name))
		}
	}

	private buildVariable (dialect: Dialect, operand:Variable):string {
		const number = operand.number ? operand.number : 0
		let text = dialect.other('variable')
		text = text.replace('{name}', operand.name)
		text = text.replace('{number}', number.toString())
		return text
	}

	private buildConstant (dialect: Dialect, operand:Constant):string {
		switch (operand.type) {
		case 'string':
			return SqlString.escape(operand.name)
		case 'boolean':
			return dialect.other(operand.name)
		case 'number':
			return operand.name
		default:
			return SqlString.escape(operand.name)
		}
	}
}
