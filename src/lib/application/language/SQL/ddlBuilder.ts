/* eslint-disable @typescript-eslint/no-unused-vars */
import { SentenceAction, PropertyMapping, Property, Relation, Index, Query, EntityMapping, SchemaError } from '../../../domain'
import { helper } from '../../../helper'
import { LanguageDDLBuilder } from '../../query'

export class SqlDDLBuilder extends LanguageDDLBuilder {
	public truncateEntity (entity: EntityMapping): Query | undefined {
		let text = this.dialect.ddl('truncateEntity')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping))
		return new Query({ action: SentenceAction.truncateEntity, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: entity.name })
	}

	public createEntity (entity: EntityMapping): Query | undefined {
		const define: string[] = []

		for (const i in entity.properties) {
			const property = entity.properties[i]
			if (!property.view) {
				define.push(this.createColumn(entity, property))
			}
		}
		if (entity.primaryKey && entity.primaryKey.length > 0) {
			define.push(this.createPk(entity, entity.primaryKey))
		}
		let text = this.dialect.ddl('createEntity')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping))
		text = text.replace('{define}', define.join(','))

		return new Query({ action: SentenceAction.createEntity, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: entity.name })
	}

	private createColumn (entity: EntityMapping, property: PropertyMapping): string {
		let type = this.dialect.type(property.type)
		if (type === undefined) {
			throw new SchemaError(`Undefined type for ${entity.name}.${property.name}`)
		}
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const required = property.required ? this.dialect.other('notNullable') : ''

		let text = property.autoIncrement ? this.dialect.ddl('incrementalColumDefine') : this.dialect.ddl('columnDefine')
		text = text.replace('{name}', this.dialect.delimiter(property.mapping))
		text = text.replace('{type}', type)
		text = text.replace('{required}', required)
		return text
	}

	private createPk (entity: EntityMapping, primaryKey: string[]): string {
		const columns: string[] = []
		const columnTemplate = this.dialect.other('column')
		for (const primaryKeyItem of primaryKey) {
			const property = entity.properties.find(p => p.name === primaryKeyItem) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(property.mapping)))
		}
		let text = this.dialect.ddl('createPk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_PK'))
		text = text.replace('{columns}', columns.join(','))
		return text
	}

	public createFk (entity: EntityMapping, relation: Relation): Query | undefined {
		const column = entity.properties.find(p => p.name === relation.from) as PropertyMapping
		const fEntity = this.mapping.getEntity(relation.entity) as EntityMapping
		const fColumn = fEntity.properties.find(p => p.name === relation.to) as PropertyMapping
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl('createFk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', this.dialect.delimiter(column.mapping))
		text = text.replace('{fTable}', this.dialect.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', this.dialect.delimiter(fColumn.mapping))
		return new Query({ action: SentenceAction.addFk, dialect: this.source.dialect, source: this.source.name, sentence: alterEntity + ' ' + text, entity: entity.name })
	}

	public createSequence (entity: EntityMapping): Query | undefined {
		let text = this.dialect.ddl('createSequence')
		text = text.replace('{name}', this.dialect.delimiter(entity.sequence))
		return new Query({ action: SentenceAction.createSequence, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: entity.name })
	}

	public createIndex (entity: EntityMapping, index: Index): Query | undefined {
		const columns: string[] = []
		const columnTemplate = this.dialect.other('column')
		for (const field of index.fields) {
			const propertyMapping = entity.properties.find(p => p.name === field)
			if (propertyMapping) {
				columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(propertyMapping.mapping)))
			}
		}
		let text = this.dialect.ddl('createIndex')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + index.name))
		text = text.replace('{table}', this.dialect.delimiter(entity.mapping))
		text = text.replace('{columns}', columns.join(','))
		return new Query({ action: SentenceAction.createIndex, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: entity.name })
	}

	public alterProperty (entity: EntityMapping, property: Property): Query | undefined {
		let text = this.property(entity, property)
		text = this.dialect.ddl('alterProperty').replace('{columnDefine}', text)
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		return new Query({ action: SentenceAction.alterProperty, dialect: this.source.dialect, source: this.source.name, sentence: alterEntity + ' ' + text, entity: entity.name })
	}

	public addProperty (entity: EntityMapping, property: Property): Query | undefined {
		let text = this.property(entity, property)
		text = this.dialect.ddl('addProperty').replace('{columnDefine}', text)
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		return new Query({ action: SentenceAction.addProperty, dialect: this.source.dialect, source: this.source.name, sentence: alterEntity + ' ' + text, entity: entity.name })
	}

	private property (entity: EntityMapping, property: Property):string {
		const propertyMapping = this.mapping.getProperty(entity.name, property.name)
		let type = this.dialect.type(property.type)
		if (type === undefined) {
			throw new SchemaError(`Undefined type for ${entity.name}.${property.name}`)
		}
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const required = property.required ? this.dialect.other('notNullable') : ''

		let text = property.autoIncrement ? this.dialect.ddl('incrementalColumDefine') : this.dialect.ddl('columnDefine')
		text = text.replace('{name}', this.dialect.delimiter(propertyMapping.mapping))
		text = text.replace('{type}', type)
		return text.replace('{required}', required)
	}

	public addPk (entity: EntityMapping, primaryKeys: string[]): Query | undefined {
		return this.addKeys(entity, SentenceAction.addPk, '_PK', primaryKeys)
	}

	public addUk (entity: EntityMapping, uniqueKeys: string[]): Query | undefined {
		return this.addKeys(entity, SentenceAction.addUk, '_UK', uniqueKeys)
	}

	private addKeys (entity: EntityMapping, ddl:SentenceAction, suffix:string, keys: string[]): Query | undefined {
		const columns: string[] = []
		const columnTemplate = this.dialect.other('column')
		for (const key of keys) {
			const property = entity.properties.find(p => p.name === key)
			if (property) {
				columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(property.mapping)))
			}
		}
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl(ddl)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + suffix))
		text = text.replace('{columns}', columns.join(','))
		return new Query({ action: ddl, dialect: this.source.dialect, source: this.source.name, sentence: alterEntity + ' ' + text, entity: entity.name })
	}

	public addFk (entity: EntityMapping, relation: Relation): Query | undefined {
		const column = entity.properties.find(p => p.name === relation.from)
		if (!column) {
			throw new SchemaError(`Property ${relation.from} not found in entity ${entity.name}`)
		}
		const fEntity = this.mapping.getEntity(relation.entity)
		if (!fEntity) {
			throw new SchemaError(`Entity ${relation.entity} not found`)
		}
		const fColumn = fEntity.properties.find(p => p.name === relation.to)
		if (!fColumn) {
			throw new SchemaError(`Property ${relation.to} not found in entity ${fEntity.name}`)
		}
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl(SentenceAction.addFk)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', this.dialect.delimiter(column.mapping))
		text = text.replace('{fTable}', this.dialect.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', this.dialect.delimiter(fColumn.mapping))
		return new Query({ action: SentenceAction.addFk, dialect: this.source.dialect, source: this.source.name, sentence: alterEntity + ' ' + text, entity: entity.name })
	}

	public dropEntity (entity: EntityMapping): Query | undefined {
		let text = this.dialect.ddl(SentenceAction.dropEntity)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping))
		return new Query({ action: SentenceAction.dropEntity, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: entity.name })
	}

	public dropProperty (entity: EntityMapping, property: Property): Query | undefined {
		const propertyMapping = this.mapping.getProperty(entity.name, property.name)
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl('dropProperty')
		text = text.replace('{name}', this.dialect.delimiter(propertyMapping.mapping))
		return new Query({ action: SentenceAction.dropProperty, dialect: this.source.dialect, source: this.source.name, sentence: alterEntity + ' ' + text, entity: entity.name })
	}

	public dropPk (entity: EntityMapping): Query | undefined {
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl(SentenceAction.dropPk)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_PK'))
		return new Query({ action: SentenceAction.dropPk, dialect: this.source.dialect, source: this.source.name, sentence: alterEntity + ' ' + text, entity: entity.name })
	}

	public dropUk (entity: EntityMapping): Query | undefined {
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl(SentenceAction.dropUk)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_UK'))
		return new Query({ action: SentenceAction.dropUk, dialect: this.source.dialect, source: this.source.name, sentence: alterEntity + ' ' + text, entity: entity.name })
	}

	public setNull (entity: EntityMapping, relation: Relation): Query | undefined {
		const alias = 'a'
		const templateColumn = this.dialect.other('column')
		const propertyFrom = entity.properties.find(p => p.name === relation.from)
		if (!propertyFrom) {
			throw new SchemaError(`not found relation form ${entity.name}.${relation.name}.${relation.from} `)
		}
		const column = templateColumn.replace('{name}', propertyFrom.mapping)
		const templateAssign = this.dialect.operator('=', 2)
		let assign = templateAssign.replace('{0}', column)
		const _null = this.dialect.other('null')
		assign = assign.replace('{1}', _null)
		let text = this.dialect.dml(SentenceAction.update)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping))
		text = helper.str.replace(text, '{alias}', alias)
		text = text.replace('{assigns}', assign)
		return new Query({ action: SentenceAction.update, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: entity.name })
	}

	public dropFk (entity: EntityMapping, relation: Relation): Query | undefined {
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl(SentenceAction.dropFk)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		return new Query({ action: SentenceAction.dropFk, dialect: this.source.dialect, source: this.source.name, sentence: alterEntity + ' ' + text, entity: entity.name })
	}

	public dropIndex (entity: EntityMapping, index: Index): Query | undefined {
		let text = this.dialect.ddl(SentenceAction.dropIndex)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + index.name))
		text = text.replace('{table}', this.dialect.delimiter(entity.mapping))
		return new Query({ action: SentenceAction.dropIndex, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: entity.name })
	}

	public dropSequence (entity: EntityMapping): Query | undefined {
		let text = this.dialect.ddl(SentenceAction.dropSequence)
		text = text.replace('{name}', this.dialect.delimiter(entity.sequence))
		return new Query({ action: SentenceAction.dropSequence, dialect: this.source.dialect, source: this.source.name, sentence: text, entity: entity.name })
	}
}
