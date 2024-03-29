import { Operand, OperandType } from '3xpr'
import { Primitive } from 'typ3s'
import {
	SentenceCrudAction, Source, SchemaError, EntityMapping, SintaxisError, Field, Sentence,
	From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Delete, BulkInsert, MappingConfigService
} from 'lambdaorm-base'
import { Query } from '../../../../query/domain'
import { Helper } from '../../../../shared/application'
import { DialectService } from '../../../../language/application'
import { DmlBuilderPort } from '../../../application'

const SqlString = require('sqlstring')

export abstract class DmlBuilderAdapter implements DmlBuilderPort {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		protected readonly source: Source,
		protected readonly mapping: MappingConfigService,
		protected readonly dialect: DialectService,
		protected readonly helper:Helper) {}

	public build (sentence: Sentence): Query {
		return new Query({
			action: sentence.action,
			dialect: this.source.dialect,
			source: this.source.name,
			sentence: this.buildSentence(sentence),
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
			return this.buildSelectSentence(sentence)
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

	protected buildSelectSentence (sentence: Sentence): string {
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
		if (filter) {
			text = text + this.buildArrowFunction(filter) + ' '
		}
		if (groupBy) {
			text = text + this.buildArrowFunction(groupBy) + ' '
		}
		if (having) {
			text = text + this.buildArrowFunction(having) + ' '
		}
		if (sort) {
			text = text + this.buildArrowFunction(sort) + ' '
		}
		if (page) {
			text = this.buildPage(text, page)
		}
		return text
	}

	protected buildInsertSentence (sentence: Sentence): string {
		const insert = sentence.action === 'bulkInsert'
			? sentence.children.find(p => p instanceof BulkInsert) as BulkInsert | undefined
			: sentence.children.find(p => p instanceof Insert) as Insert | undefined
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
			let joinText = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entity.mapping))
			joinText = this.helper.str.replace(joinText, '{alias}', join.alias)
			joinText = this.helper.str.replace(joinText, '{relation}', this.buildOperand(join.children[0])).trim()
			list.push(joinText)
		}
		return list.join(' ') + ' '
	}

	protected buildFrom (from: From): string {
		let template = this.dialect.dml('from')
		const entityMapping = this.mapping.entityMapping(from.entity)
		if (entityMapping === undefined) {
			throw new SchemaError(`not found mapping for ${from.entity}`)
		}
		template = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entityMapping))
		template = this.helper.str.replace(template, '{alias}', from.alias)
		return template.trim()
	}

	protected buildInsert (operand: Insert|BulkInsert, entity: EntityMapping): string {
		let template = this.dialect.dml(operand instanceof BulkInsert ? 'bulkInsert' : 'insert')
		const templateColumn = this.dialect.other('column')
		const fields: string[] = []
		const values: any[] = []
		const autoIncrement = this.mapping.getAutoIncrement(entity.name)
		if (autoIncrement && entity.sequence) {
			const templateSequenceNextVal = this.dialect.other('sequenceNextVal')
			fields.push(this.helper.str.replace(templateColumn, '{name}', this.dialect.delimiter(autoIncrement.mapping)))
			values.push(this.helper.str.replace(templateSequenceNextVal, '{name}', entity.sequence))
		}
		if (operand.children[0].type === OperandType.Obj) {
			const obj = operand.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p]
				const property = entity.properties.find(q => q.name === keyVal.name)
				let name: string
				if (property) {
					name = property.mapping
				} else {
					name = keyVal.name
				}
				fields.push(this.helper.str.replace(templateColumn, '{name}', this.dialect.delimiter(name)))
				values.push(this.buildOperand(keyVal.children[0]))
			}
		}
		template = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entity.mapping))
		template = this.helper.str.replace(template, '{fields}', fields.join(','))
		template = this.helper.str.replace(template, '{values}', values.join(','))
		template = this.helper.str.replace(template, '{autoIncrementField}', autoIncrement && autoIncrement.mapping ? autoIncrement.mapping : '0')
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
				const keyVal = obj.children[p]
				let name: string
				const property = entity.properties.find(q => q.name === keyVal.name)
				if (property) {
					name = property.mapping
				} else {
					name = keyVal.name
				}
				const column = this.helper.str.replace(templateColumn, '{name}', this.dialect.delimiter(name))
				const value = this.buildOperand(keyVal.children[0])
				let assign = this.helper.str.replace(templateAssign, '{0}', column)
				assign = this.helper.str.replace(assign, '{1}', value)
				assigns.push(assign)
			}
		}
		template = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entity.mapping))
		template = this.helper.str.replace(template, '{alias}', operand.alias)
		template = this.helper.str.replace(template, '{assigns}', assigns.join(','))
		return template.trim() + ' '
	}

	protected buildDelete (operand: Delete, entity: EntityMapping): string {
		let template = this.dialect.dml('delete')
		template = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entity.mapping))
		template = this.helper.str.replace(template, '{alias}', operand.alias)
		return template.trim() + ' '
	}

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

	protected buildObject (operand: Operand): string {
		let text = ''
		const template = this.dialect.function('as').template
		for (let i = 0; i < operand.children.length; i++) {
			const value = this.buildOperand(operand.children[i])
			const forceDelimiter = ['PostgreSQL', 'Oracle'].includes(this.dialect.name)
			const alias = this.dialect.delimiter(operand.children[i].name, forceDelimiter)
			let fieldText = this.helper.str.replace(template, '{value}', value)
			fieldText = this.helper.str.replace(fieldText, '{alias}', alias)
			text += (i > 0 ? ', ' : '') + fieldText
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

	protected buildField (field: Field): string {
		if (this.mapping.existsProperty(field.entity, field.fieldName())) {
			const property = this.mapping.getProperty(field.entity, field.fieldName())
			if (field.alias === undefined) {
				return this.helper.str.replace(this.dialect.other('column'), '{name}', this.dialect.delimiter(property.mapping, true))
			} else {
				let text = this.dialect.other('field')
				text = this.helper.str.replace(text, '{entityAlias}', field.alias)
				text = this.helper.str.replace(text, '{name}', this.dialect.delimiter(property.mapping))
				return text
			}
		} else {
			const forceDelimiter = ['PostgreSQL', 'Oracle'].includes(this.dialect.name)
			return this.helper.str.replace(this.dialect.other('column'), '{name}', this.dialect.delimiter(field.name, forceDelimiter))
		}
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
			return SqlString.escape(operand.name)
		}
		switch (operand.returnType.primitive) {
		case Primitive.string:
			return SqlString.escape(operand.name)
		case Primitive.boolean:
			return this.dialect.other(operand.name.toString())
		case Primitive.integer:
			return parseInt(operand.name).toString()
		case Primitive.number:
		case Primitive.decimal:
			return parseFloat(operand.name).toString()
		default:
			return SqlString.escape(operand.name)
		}
	}
}
