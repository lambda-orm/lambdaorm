import { DmlBuilderBase } from '../base/dmlBuilder'
import { Operand, OperandType } from '3xpr'
import {
	SchemaError, EntityMapping, Field, Sentence,
	From, Join, Map, Filter, GroupBy, Having, Sort, Page, Insert, Update, Delete, BulkInsert
} from 'lambdaorm-base'
import { Query } from '../../../../query/domain'

export class SqlDmlBuilder extends DmlBuilderBase {
	public override build (sentence: Sentence): Query {
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

	protected override buildSelectSentence (sentence: Sentence): string {
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

	protected override buildInsertSentence (sentence: Sentence): string {
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
		let template = this.dialect.dml(insert instanceof BulkInsert ? 'bulkInsert' : 'insert')
		const templateColumn = this.dialect.other('column')
		const fields: string[] = []
		const values: any[] = []
		const autoIncrement = this.mapping.getAutoIncrement(entity.name)
		if (autoIncrement && entity.sequence) {
			const templateSequenceNextVal = this.dialect.other('sequenceNextVal')
			fields.push(this.helper.str.replace(templateColumn, '{name}', this.dialect.delimiter(autoIncrement.mapping)))
			values.push(this.helper.str.replace(templateSequenceNextVal, '{name}', entity.sequence))
		}
		if (insert.children[0].type === OperandType.Obj) {
			const obj = insert.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p]
				const property = entity.properties?.find(q => q.name === keyVal.name)
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
		template = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entity.mapping || entity.name))
		template = this.helper.str.replace(template, '{fields}', fields.join(','))
		template = this.helper.str.replace(template, '{values}', values.join(','))
		template = this.helper.str.replace(template, '{autoIncrementField}', autoIncrement && autoIncrement.mapping ? autoIncrement.mapping : '0')
		return template.trim()
	}

	protected override buildUpdateSentence (sentence: Sentence): string {
		const update = sentence.children.find(p => p instanceof Update) as Update | undefined
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		const entity = this.mapping.getEntity(sentence.entity)
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		if (update === undefined) {
			throw new SchemaError('update operand not found')
		}
		let template = this.dialect.dml('update')
		const templateColumn = this.dialect.other('column')
		const templateAssign = this.dialect.operator('=', 2)
		const assigns: string[] = []
		if (update.children[0] instanceof Object) {
			const obj = update.children[0]
			for (const p in obj.children) {
				const keyVal = obj.children[p]
				let name: string
				const property = entity.properties?.find(q => q.name === keyVal.name)
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
		template = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entity.mapping || entity.name))
		template = this.helper.str.replace(template, '{alias}', update.alias)
		template = this.helper.str.replace(template, '{assigns}', assigns.join(','))
		let text = template.trim() + ' '
		if (filter) text = text + this.buildArrowFunction(filter) + ' '
		return text
	}

	protected override buildDeleteSentence (sentence: Sentence): string {
		const _delete = sentence.children.find(p => p instanceof Delete) as Delete | undefined
		const filter = sentence.children.find(p => p.name === 'filter') as Filter | undefined
		const entity = this.mapping.getEntity(sentence.entity)
		if (entity === undefined) {
			throw new SchemaError(`mapping undefined on ${sentence.entity} entity`)
		}
		if (_delete === undefined) {
			throw new SchemaError('delete operand not found')
		}
		let template = this.dialect.dml('delete')
		template = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entity.mapping || entity.name))
		template = this.helper.str.replace(template, '{alias}', _delete.alias)
		let text = template.trim() + ' '
		if (filter) text = text + this.buildArrowFunction(filter) + ' '
		return text
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

	protected buildJoins (_entity: EntityMapping, joins: Join[]): string {
		const list: string[] = []
		const template = this.dialect.dml('join')
		for (const join of joins) {
			const entity = this.mapping.getEntity(join.name)
			if (entity === undefined) {
				throw new SchemaError(`not found mapping for ${join.name}`)
			}
			let joinText = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entity.mapping || entity.name))
			joinText = this.helper.str.replace(joinText, '{alias}', join.alias)
			joinText = this.helper.str.replace(joinText, '{relation}', this.buildOperand(join.children[0])).trim()
			list.push(joinText)
		}
		return list.join(' ') + ' '
	}

	protected override buildField (field: Field): string {
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

	protected override buildObject (operand: Operand): string {
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
}
