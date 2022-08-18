
import { Operand, Constant, Variable, KeyValue, List, Obj, Operator, FunctionRef, ArrowFunction, Block, Expressions } from 'js-expressions'
import { SentenceCrudAction, EntityMapping, Field, Sentence, From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Delete, Query, SintaxisError, SchemaError, DataSource } from '../model'
import { MappingConfig, Dialect, Helper } from '../manager'

export abstract class DmlBuilder {
	protected dataSource: DataSource
	protected mapping: MappingConfig
	protected dialect: Dialect
	protected expressions: Expressions

	constructor (dataSource: DataSource, mapping: MappingConfig, dialect: Dialect, expressions: Expressions) {
		this.dataSource = dataSource
		this.mapping = mapping
		this.expressions = expressions
		this.dialect = dialect
	}

	public build (sentence: Sentence): Query {
		const sqlSentence = this.buildSentence(sentence)
		return new Query({
			action: sentence.action,
			dialect: this.dataSource.dialect,
			dataSource: this.dataSource.name,
			sentence: sqlSentence,
			entity: sentence.entity,
			columns: sentence.columns,
			parameters: sentence.parameters,
			constraints: sentence.constraints,
			values: sentence.values,
			defaults: sentence.defaults
		})
	}

	protected buildSentence (sentence: Sentence): string {
		switch (sentence.crudAction) {
		case SentenceCrudAction.select:
			return this.buildMapSentence(sentence)
		case SentenceCrudAction.insert:
			return this.buildInsertSentence(sentence)
		case SentenceCrudAction.update:
			return this.buildUpdateSentence(sentence)
		case SentenceCrudAction.delete:
			return this.buildDeleteSentence(sentence)
		default:
			throw new SintaxisError(`sentence crud action ${sentence.crudAction} not found`)
		}
	}

	protected buildMapSentence (sentence: Sentence): string {
		const map = sentence.children.find(p => p.name === 'map') as Map | undefined
		const from = sentence.children.find(p => p instanceof From) as From | undefined
		const joins = sentence.children.filter(p => p instanceof Join) as Join[]
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		const groupBy = sentence.children.find(p => p.name === 'groupBy') as GroupBy | undefined
		const having = sentence.children.find(p => p.name === 'having') as Having | undefined
		const sort = sentence.children.find(p => p.name === 'sort') as Sort | undefined
		const page = sentence.children.find(p => p.name === 'page') as Page | undefined
		const entity = this.mapping.getEntity(sentence.entity)
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		if (map === undefined) {
			throw new SchemaError('map operand not found')
		}
		if (from === undefined) {
			throw new SchemaError('from operand not found')
		}

		let text = this.buildArrowFunction(map) + ' ' + this.buildFrom(from) + ' ' + this.buildJoins(entity, joins)
		if (filter) text = text + this.buildArrowFunction(filter) + ' '
		if (groupBy) text = text + this.buildArrowFunction(groupBy) + ' '
		if (having) text = text + this.buildArrowFunction(having) + ' '
		if (sort) text = text + this.buildArrowFunction(sort) + ' '
		if (page) text = this.buildPage(text, page)
		return text
	}

	protected buildInsertSentence (sentence: Sentence): string {
		const insert = sentence.children.find(p => p instanceof Insert) as Insert | undefined
		const entity = this.mapping.getEntity(sentence.entity)
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		if (insert === undefined) {
			throw new SchemaError('insert operand not found')
		}
		return this.buildInsert(insert, entity)
	}

	protected buildUpdateSentence (sentence: Sentence): string {
		const update = sentence.children.find(p => p instanceof Update) as Update | undefined
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		const entity = this.mapping.getEntity(sentence.entity)
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		if (update === undefined) {
			throw new SchemaError('update operand not found')
		}
		let text = this.buildUpdate(update, entity)
		if (filter) text = text + this.buildArrowFunction(filter) + ' '
		return text
	}

	protected buildDeleteSentence (sentence: Sentence): string {
		const _delete = sentence.children.find(p => p instanceof Delete) as Delete | undefined
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		const entity = this.mapping.getEntity(sentence.entity)
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		if (_delete === undefined) {
			throw new SchemaError('delete operand not found')
		}
		let text = this.buildDelete(_delete, entity)
		if (filter) text = text + this.buildArrowFunction(filter) + ' '
		return text
	}

	protected buildJoins (_entity: EntityMapping, joins: Join[]): string {
		const list: string[] = []
		const template = this.dialect.dml('join')
		for (const join of joins) {
			const entity = this.mapping.getEntity(join.name)
			if (entity === undefined) {
				throw new SchemaError(`not found mapping for ${join.name}`)
			}
			let joinText = template.replace('{name}', this.dialect.delimiter(entity.mapping))
			joinText = joinText.replace('{alias}', join.alias)
			joinText = joinText.replace('{relation}', this.buildOperand(join.children[0])).trim()
			list.push(joinText)
		}
		return list.join(' ') + ' '
	}

	protected buildFrom (from: From): string {
		let template = this.dialect.dml('from')
		const entityMapping = this.mapping.entityMapping(from.name)
		if (entityMapping === undefined) {
			throw new SchemaError(`not found mapping for ${from.name}`)
		}
		template = template.replace('{name}', this.dialect.delimiter(entityMapping))
		template = Helper.replace(template, '{alias}', from.alias)
		return template.trim()
	}

	protected buildInsert (operand: Insert, entity: EntityMapping): string {
		let template = this.dialect.dml(operand.clause)
		const templateColumn = this.dialect.other('column')
		const fields: string[] = []
		const values: any[] = []

		const autoIncrement = this.mapping.getAutoIncrement(entity.name)

		if (autoIncrement && entity.sequence) {
			const templateSequenceNextVal = this.dialect.other('sequenceNextVal')
			fields.push(templateColumn.replace('{name}', this.dialect.delimiter(autoIncrement.mapping)))
			values.push(templateSequenceNextVal.replace('{name}', entity.sequence))
		}
		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue

				let name: string
				if (keyVal.property !== undefined) {
					const property = entity.properties.find(q => q.name === keyVal.property)
					if (property === undefined) {
						throw new SchemaError(`not found property ${entity.name}.${keyVal.property}`)
					}
					name = property.mapping
				} else {
					name = keyVal.name
				}
				fields.push(templateColumn.replace('{name}', this.dialect.delimiter(name)))
				values.push(this.buildOperand(keyVal.children[0]))
			}
		}
		template = template.replace('{name}', this.dialect.delimiter(entity.mapping))
		template = template.replace('{fields}', fields.join(','))
		template = template.replace('{values}', values.join(','))
		template = template.replace('{autoIncrementField}', autoIncrement && autoIncrement.mapping ? autoIncrement.mapping : '0')
		return template.trim()
	}

	protected buildUpdate (operand: Update, entity: EntityMapping): string {
		let template = this.dialect.dml('update')
		const templateColumn = this.dialect.other('column')
		const templateAssign = this.dialect.operator('=', 2)
		const assigns: string[] = []
		if (operand.children[0] instanceof Object) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p] as KeyValue
				let name: string
				if (keyVal.property !== undefined) {
					const property = entity.properties.find(q => q.name === keyVal.property)
					if (property === undefined) {
						throw new SchemaError(`not found property ${entity.name}.${keyVal.property}`)
					}
					name = property.mapping
				} else {
					name = keyVal.name
				}
				const column = templateColumn.replace('{name}', this.dialect.delimiter(name))
				const value = this.buildOperand(keyVal.children[0])
				let assign = templateAssign.replace('{0}', column)
				assign = assign.replace('{1}', value)
				assigns.push(assign)
			}
		}
		template = Helper.replace(template, '{name}', this.dialect.delimiter(entity.mapping))
		template = Helper.replace(template, '{alias}', operand.alias)
		template = template.replace('{assigns}', assigns.join(','))
		return template.trim() + ' '
	}

	protected buildDelete (operand: Delete, entity: EntityMapping): string {
		let template = this.dialect.dml('delete')
		template = Helper.replace(template, '{name}', this.dialect.delimiter(entity.mapping))
		template = Helper.replace(template, '{alias}', operand.alias)
		return template.trim() + ' '
	}

	protected buildPage (sentence: string, operand: Page): string {
		let template = this.dialect.dml('page')
		let page = parseInt(operand.children[0].name)
		const records = parseInt(operand.children[1].name)
		if (page < 1) page = 1
		template = template.replace('{sentence}', sentence)
		template = template.replace('{offset}', ((page - 1) * records).toString())
		template = Helper.replace(template, '{records}', records.toString())
		return template.trim() + ' '
	}

	protected buildOperand (operand: Operand): string {
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

	protected buildArrowFunction (operand: ArrowFunction): string {
		let template = this.dialect.dml(operand.name)
		for (let i = 0; i < operand.children.length; i++) {
			const text = this.buildOperand(operand.children[i])
			template = Helper.replace(template, '{' + i + '}', text)
		}
		return template.trim()
	}

	protected buildFunctionRef (operand: FunctionRef): string {
		const funcData = this.dialect.function(operand.name)
		if (!funcData) throw new SintaxisError('Function ' + operand.name + ' not found')
		let text = ''
		if (funcData.type === 'multiple') {
			const template = funcData.template
			text = this.buildOperand(operand.children[0])
			for (let i = 1; i < operand.children.length; i++) {
				text = Helper.replace(template, '{accumulated}', text)
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

	protected buildOperator (operand: Operator): string {
		let text = this.dialect.operator(operand.name, operand.children.length)
		for (let i = 0; i < operand.children.length; i++) {
			text = text.replace('{' + i + '}', this.buildOperand(operand.children[i]))
		}
		return text
	}

	protected buildBlock (operand: Block): string {
		let text = ''
		for (const child of operand.children) {
			text += (this.buildOperand(child) + '')
		}
		return text
	}

	protected buildObject (operand: Obj): string {
		let text = ''
		const template = this.dialect.function('as').template
		for (let i = 0; i < operand.children.length; i++) {
			const value = this.buildOperand(operand.children[i])
			const forceDelimiter = ['PostgreSQL', 'Oracle'].includes(this.dialect.name)
			const alias = this.dialect.delimiter(operand.children[i].name, forceDelimiter)
			let fieldText = template.replace('{value}', value)
			fieldText = fieldText.replace('{alias}', alias)
			text += (i > 0 ? ', ' : '') + fieldText
		}
		return text
	}

	protected buildList (operand: List): string {
		let text = ''
		for (let i = 0; i < operand.children.length; i++) {
			text += (i > 0 ? ', ' : '') + this.buildOperand(operand.children[i])
		}
		return text
	}

	protected buildKeyValue (operand: KeyValue): string {
		return this.buildOperand(operand.children[0])
	}

	protected buildField (operand: Field): string {
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
			const forceDelimiter = ['PostgreSQL', 'Oracle'].includes(this.dialect.name)
			return this.dialect.other('column').replace('{name}', this.dialect.delimiter(operand.name, forceDelimiter))
		}
	}

	protected buildVariable (operand: Variable): string {
		const number = operand.number ? operand.number : 0
		let text = this.dialect.other('variable')
		text = text.replace('{name}', Helper.transformParameter(operand.name))
		text = text.replace('{number}', number.toString())
		return text
	}

	protected buildConstant (operand: Constant): string {
		return operand.name
	}
}
