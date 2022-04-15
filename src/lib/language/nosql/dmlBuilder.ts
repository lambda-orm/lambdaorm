
import { Helper } from '../../manager/helper'
import { Operand, Constant, Variable, KeyValue, List, Obj, Operator, FunctionRef, ArrowFunction, Block, Expressions } from 'js-expressions'
import { Field, Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Query, SintaxisError, SchemaError, DataSource, EntityMapping, NoSqlSentence } from '../../model'
import { MappingConfig, Dialect } from '../../manager'

const SqlString = require('sqlstring')

export class NoSqlDMLBuilder {
	protected dataSource: DataSource
	protected mapping: MappingConfig
	protected dialect: Dialect
	protected expressions:Expressions

	constructor (dataSource: DataSource, mapping: MappingConfig, dialect: Dialect, expressions:Expressions) {
		this.dataSource = dataSource
		this.mapping = mapping
		this.expressions = expressions
		this.dialect = dialect
	}

	public build (sentence: Sentence): Query {
		const nosqlSentence = this.buildSentence(sentence)
		return new Query(sentence.name, this.dataSource.dialect, this.dataSource.name, nosqlSentence, sentence.entity, sentence.columns, sentence.parameters, sentence.constraints, sentence.values, sentence.defaults)
	}

	private buildSentence (sentence:Sentence):NoSqlSentence {
		const map = sentence.children.find(p => p.name === 'map')as Map|undefined
		const insert = sentence.children.find(p => p instanceof Insert) as Insert|undefined
		const update = sentence.children.find(p => p instanceof Update) as Update|undefined
		// const _delete = sentence.children.find(p => p instanceof Delete) as Delete|undefined
		const filter = sentence.children.find(p => p.name === 'filter') as Filter|undefined
		const groupBy = sentence.children.find(p => p.name === 'groupBy')as GroupBy|undefined
		const having = sentence.children.find(p => p.name === 'having')as Having|undefined
		const sort = sentence.children.find(p => p.name === 'sort')as Sort|undefined
		const page = sentence.children.find(p => p.name === 'page') as Page | undefined

		const entity = this.mapping.getEntity(sentence.entity)
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		const nosqlSentence:NoSqlSentence = {}
		if (map) {
			const from = sentence.children.find(p => p instanceof From) as Operand
			const joins = sentence.children.filter(p => p instanceof Join)
			nosqlSentence.map = this.buildMap(map, entity)
			nosqlSentence.from = this.buildFrom(from)
			nosqlSentence.joins = this.buildJoins(joins)
		} else if (insert) nosqlSentence.insert = this.buildInsert(insert, entity)
		else if (update)nosqlSentence.update = this.buildUpdate(update, entity)
		// else if (_delete) nosqlSentence.delete = this.buildDelete(_delete)
		if (filter)nosqlSentence.filter = this.buildArrowFunction(filter)
		if (groupBy)nosqlSentence.groupBy = this.buildArrowFunction(groupBy)
		if (having)nosqlSentence.having = this.buildArrowFunction(having)
		if (sort) nosqlSentence.sort = `{ ${this.buildArrowFunction(sort)} }`
		if (page)nosqlSentence.page = this.buildPage(page)
		return nosqlSentence
	}

	private buildMap (operand:Map, entity:EntityMapping):string {
		const template = this.dialect.dml('map')
		const templateColumn = this.dialect.other('column')
		const columns: string[] = []
		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				let name:string
				if (keyVal.property !== undefined) {
					const property = entity.properties.find(p => p.name === keyVal.property)
					if (property === undefined) {
						throw new SchemaError(`not found property ${entity.name}.${keyVal.property}`)
					}
					name = property.mapping
				} else {
					name = keyVal.name
				}
				const column = templateColumn.replace('{name}', this.dialect.delimiter(name))
				columns.push(column)
			}
		}
		return template.replace('{0}', columns.join(','))
	}

	private buildFrom (from:Operand):string {
		const parts = from.name.split('.')
		const entityMapping = this.mapping.entityMapping(parts[0])
		if (entityMapping === undefined) {
			throw new SchemaError(`not found mapping for ${parts[0]}`)
		}
		return this.dialect.delimiter(entityMapping)
	}

	private buildJoins (joins:Operand[]):string[] {
		// Example: https://www.w3schools.com/nodejs/nodejs_mongodb_join.asp
		// Example: https://stackoverflow.com/questions/69097870/how-to-join-multiple-collection-in-mongodb
		const list:string[] = []
		const template = this.dialect.dml('join')
		for (let i = 0; i < joins.length; i++) {
			const join = joins[i]
			const parts = join.name.split('.')
			const entity = this.mapping.getEntity(parts[0])
			if (entity === undefined) {
				throw new SchemaError(`not found mapping for ${parts[0]}`)
			}
			const localField = join.children[0].children[0] as Field
			const foreignField = join.children[0].children[1] as Field
			let joinTemplate = template.replace('{name}', this.dialect.delimiter(entity.mapping))
			joinTemplate = joinTemplate.replace('{fromProperty}', this.getFieldName(localField))
			joinTemplate = joinTemplate.replace('{toProperty}', this.getFieldName(foreignField))
			joinTemplate = joinTemplate.replace('{alias}', parts[1])
			list.push(joinTemplate)
		}
		return list
	}

	private buildInsert (operand:Insert, entity:EntityMapping):string {
		const assings: string[] = []
		const template = this.dialect.dml('insert')
		const templateAssing = this.dialect.operator('=', 2)
		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				let name:string
				if (keyVal.property !== undefined) {
					const property = entity.properties.find(p => p.name === keyVal.property)
					if (property === undefined) {
						throw new SchemaError(`not found property ${entity.name}.${keyVal.property}`)
					}
					name = property.mapping
				} else {
					name = keyVal.name
				}
				const field = this.dialect.delimiter(name)
				const value = this.buildOperand(keyVal.children[0])
				let assing = templateAssing.replace('{0}', field)
				assing = assing.replace('{1}', value)
				assings.push(assing)
			}
		}
		return template.replace('{assings}', assings.join(','))
	}

	private buildUpdate (operand:Update, entity:EntityMapping):string {
		const template = this.dialect.dml('update')
		const templateAssing = this.dialect.operator('=', 2)
		const assings: string[] = []

		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				let name:string
				if (keyVal.property !== undefined) {
					const property = entity.properties.find(p => p.name === keyVal.property)
					if (property === undefined) {
						throw new SchemaError(`not found property ${entity.name}.${keyVal.property}`)
					}
					name = property.mapping
				} else {
					name = keyVal.name
				}
				const field = this.dialect.delimiter(name)
				const value = this.buildOperand(keyVal.children[0])
				let assing = templateAssing.replace('{0}', field)
				assing = assing.replace('{1}', value)
				assings.push(assing)
			}
		}
		return template.replace('{assings}', assings.join(','))
	}

	private buildPage (operand:Page):string {
		let template = this.dialect.dml('page')
		let page = parseInt(operand.children[1].name)
		const records = parseInt(operand.children[2].name)
		if (page < 1) page = 1
		// template = template.replace('{sentence}', sentence)
		template = template.replace('{offset}', ((page - 1) * records).toString())
		template = Helper.replace(template, '{records}', records.toString())
		return template.trim() + ' '
	}

	private buildOperand (operand: Operand): any {
		if (operand instanceof Sentence) {
			return this.buildSentence(operand)
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

	private buildArrowFunction (operand:ArrowFunction):string {
		let template = this.dialect.dml(operand.name)
		for (let i = 0; i < operand.children.length; i++) {
			const text = this.buildOperand(operand.children[i])
			template = Helper.replace(template, '{' + i + '}', text)
		}
		return template.trim()
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

	private getFieldName (operand: Field): string {
		if (this.mapping.existsProperty(operand.entity, operand.name)) {
			const property = this.mapping.getProperty(operand.entity, operand.name)
			if (operand.alias === undefined) {
				return this.dialect.delimiter(property.mapping, true)
			} else {
				return `${operand.alias}.${this.dialect.delimiter(property.mapping)}`
			}
		} else {
			return this.dialect.delimiter(operand.name)
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
