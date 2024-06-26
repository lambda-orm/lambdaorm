/* eslint-disable @typescript-eslint/no-unused-vars */
import { SentenceAction, PropertyMapping, Property, Relation, Index, EntityMapping, SchemaError } from 'lambdaorm-base'
import { Query } from '../../../query/domain'
import { DdlBuilderBase } from './DdlBuilderBase'

export class SqlDdlBuilder extends DdlBuilderBase {
	public truncateEntity (entity: EntityMapping): Query | undefined {
		if (entity.mapping === undefined) {
			return undefined
		}
		let text = this.dialect.ddl('truncateEntity')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping))
		return this.createQuery(SentenceAction.truncateEntity, text, entity.name, `truncate table ${entity.mapping}`)
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
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		text = text.replace('{define}', define.join(','))
		return this.createQuery(SentenceAction.createEntity, text, entity.name, `create table ${entity.mapping}`)
	}

	private createColumn (entity: EntityMapping, property: PropertyMapping): string {
		let type = this.dialect.dbType(property.type || 'string')
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
			const property = entity.properties?.find(p => this.equal(p.name, primaryKeyItem))
			if (!property) {
				throw new SchemaError(`Property ${primaryKeyItem} not found in entity ${entity.name}`)
			}
			columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(property.mapping)))
		}
		let text = this.dialect.ddl('createPk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_PK'))
		text = text.replace('{columns}', columns.join(','))
		return text
	}

	public createFk (entity: EntityMapping, relation: Relation): Query | undefined {
		const column = entity.properties?.find(p => this.equal(p.name, relation.from)) as PropertyMapping
		const fEntity = this.mapping.getEntity(relation.entity) as EntityMapping
		const fColumn = fEntity.properties?.find(p => this.equal(p.name, relation.to)) as PropertyMapping
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		let text = this.dialect.ddl('createFk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', this.dialect.delimiter(column.mapping))
		text = text.replace('{fTable}', this.dialect.delimiter(fEntity.mapping || fEntity.name))
		text = text.replace('{fColumn}', this.dialect.delimiter(fColumn.mapping))
		text = `${alterEntity} ${text}`
		return this.createQuery(SentenceAction.addFk, text, entity.name, `create foreign key ${entity.mapping + '_' + relation.name + '_FK'}`)
	}

	public createSequence (entity: EntityMapping): Query | undefined {
		if (entity.sequence === undefined) {
			return undefined
		}
		let text = this.dialect.ddl('createSequence')
		text = text.replace('{name}', this.dialect.delimiter(entity.sequence))
		return this.createQuery(SentenceAction.createSequence, text, entity.name, `create sequence ${entity.sequence}`)
	}

	public createIndex (entity: EntityMapping, index: Index): Query | undefined {
		const columns: string[] = []
		const columnTemplate = this.dialect.other('column')
		for (const field of index.fields) {
			const propertyMapping = entity.properties?.find(p => this.equal(p.name, field))
			if (propertyMapping) {
				columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(propertyMapping.mapping)))
			}
		}
		let text = this.dialect.ddl('createIndex')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + index.name))
		text = text.replace('{table}', this.dialect.delimiter(entity.mapping || entity.name))
		text = text.replace('{columns}', columns.join(','))
		return this.createQuery(SentenceAction.createIndex, text, entity.name, `create index ${entity.mapping + '_' + index.name}`)
	}

	/**
	 * @deprecated This method is obsolete, since to alter a property you must call alterPropertyType or alterPropertyNullable
	 */
	public alterProperty (entity: EntityMapping, property: PropertyMapping): Query | undefined {
		let text = this.property(entity, property)
		text = this.dialect.ddl('alterProperty').replace('{columnDefine}', text)
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		text = `${alterEntity} ${text}`
		return this.createQuery(SentenceAction.alterProperty, text, entity.name, `alter property ${entity.name}.${property.name}`)
	}

	public alterPropertyType (entity: EntityMapping, property: PropertyMapping): Query | undefined {
		const propertyMapping = this.mapping.getProperty(entity.name, property.name)
		let type = this.dialect.dbType(property.type || 'string')
		if (type === undefined) {
			throw new SchemaError(`Undefined type for ${entity.name}.${property.name}`)
		}
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		let text = this.dialect.ddl('alterPropertyType')
		text = text.replace('{name}', this.dialect.delimiter(propertyMapping.mapping))
		text = text.replace('{type}', type)
		text = this.dialect.ddl('alterProperty').replace('{columnDefine}', text)
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		text = `${alterEntity} ${text}`
		return this.createQuery(SentenceAction.alterProperty, text, entity.name, `alter property ${entity.name}.${property.name}`)
	}

	public alterPropertyRequired (entity: EntityMapping, property: PropertyMapping): Query | undefined {
		const propertyMapping = this.mapping.getProperty(entity.name, property.name)
		let text = property.required ? this.dialect.ddl('alterPropertyNotNullable') : this.dialect.ddl('alterPropertyNullable')
		text = text.replace('{name}', this.dialect.delimiter(propertyMapping.mapping))
		text = this.dialect.ddl('alterProperty').replace('{columnDefine}', text)
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		text = `${alterEntity} ${text}`
		return this.createQuery(SentenceAction.alterProperty, text, entity.name, `alter property ${entity.name}.${property.name}`)
	}

	public addProperty (entity: EntityMapping, property: PropertyMapping): Query | undefined {
		let text = this.property(entity, property)
		text = this.dialect.ddl('addProperty').replace('{columnDefine}', text)
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		text = `${alterEntity} ${text}`
		return this.createQuery(SentenceAction.addProperty, text, entity.name, `add property ${entity.name}.${property.name}`)
	}

	private property (entity: EntityMapping, property: PropertyMapping):string {
		const propertyMapping = this.mapping.getProperty(entity.name, property.name)
		let type = property.dbType || this.dialect.dbType(property.type || 'string')
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
			const property = entity.properties?.find(p => this.equal(p.name, key))
			if (property) {
				columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(property.mapping)))
			}
		}
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		let text = this.dialect.ddl(ddl)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + suffix))
		text = text.replace('{columns}', columns.join(','))
		text = `${alterEntity} ${text}`
		return this.createQuery(ddl, text, entity.name, `add ${ddl} ${entity.mapping + suffix}`)
	}

	public addFk (entity: EntityMapping, relation: Relation): Query | undefined {
		const column = entity.properties?.find(p => this.equal(p.name, relation.from))
		if (!column) {
			throw new SchemaError(`Property ${relation.from} not found in entity ${entity.name}`)
		}
		const fEntity = this.mapping.getEntity(relation.entity)
		if (!fEntity) {
			throw new SchemaError(`Entity ${relation.entity} not found`)
		}
		const fColumn = fEntity.properties?.find(p => this.equal(p.name, relation.to))
		if (!fColumn) {
			throw new SchemaError(`Property ${relation.to} not found in entity ${fEntity.name}`)
		}
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		let text = this.dialect.ddl(SentenceAction.addFk)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', this.dialect.delimiter(column.mapping))
		text = text.replace('{fTable}', this.dialect.delimiter(fEntity.mapping || fEntity.name))
		text = text.replace('{fColumn}', this.dialect.delimiter(fColumn.mapping))
		text = `${alterEntity} ${text}`
		return this.createQuery(SentenceAction.addFk, text, entity.name, `add foreign key ${entity.mapping + '_' + relation.name + '_FK'}`)
	}

	public dropEntity (entity: EntityMapping): Query | undefined {
		let text = this.dialect.ddl(SentenceAction.dropEntity)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		return this.createQuery(SentenceAction.dropEntity, text, entity.name, `drop table ${entity.mapping}`)
	}

	public dropProperty (entity: EntityMapping, property: PropertyMapping): Query | undefined {
		const propertyMapping = this.mapping.getProperty(entity.name, property.name)
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		let text = this.dialect.ddl('dropProperty')
		text = text.replace('{name}', this.dialect.delimiter(propertyMapping.mapping))
		text = `${alterEntity} ${text}`
		return this.createQuery(SentenceAction.dropProperty, text, entity.name, `drop property ${entity.name}.${property.name}`)
	}

	public dropPk (entity: EntityMapping): Query | undefined {
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		let text = this.dialect.ddl(SentenceAction.dropPk)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_PK'))
		text = `${alterEntity} ${text}`
		return this.createQuery(SentenceAction.dropPk, text, entity.name, `drop primary key ${entity.mapping + '_PK'}`)
	}

	public dropUk (entity: EntityMapping): Query | undefined {
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		let text = this.dialect.ddl(SentenceAction.dropUk)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_UK'))
		text = `${alterEntity} ${text}`
		return this.createQuery(SentenceAction.dropUk, text, entity.name, `drop unique key ${entity.mapping + '_UK'}`)
	}

	public setNull (entity: EntityMapping, relation: Relation): Query | undefined {
		const alias = 'a'
		const templateColumn = this.dialect.other('column')
		const propertyFrom = entity.properties?.find(p => this.equal(p.name, relation.from))
		if (!propertyFrom) {
			throw new SchemaError(`not found relation form ${entity.name}.${relation.name}.${relation.from} `)
		}
		const column = templateColumn.replace('{name}', propertyFrom.mapping)
		const templateAssign = this.dialect.operator('=', 2)
		let assign = templateAssign.replace('{0}', column)
		const _null = this.dialect.other('null')
		assign = assign.replace('{1}', _null)
		let text = this.dialect.dml(SentenceAction.update)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		text = this.helper.str.replace(text, '{alias}', alias)
		text = text.replace('{assigns}', assign)
		const query = `${entity.name}.update(p => p.${relation.from} = null)`
		return this.createQuery(SentenceAction.update, text, entity.name, `set null ${relation.from} in ${entity.name}`, query)
	}

	public dropFk (entity: EntityMapping, relation: Relation): Query | undefined {
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name))
		let text = this.dialect.ddl(SentenceAction.dropFk)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = `${alterEntity} ${text}`
		return this.createQuery(SentenceAction.dropFk, text, entity.name, `drop foreign key ${entity.mapping + '_' + relation.name + '_FK'}`)
	}

	public dropIndex (entity: EntityMapping, index: Index): Query | undefined {
		let text = this.dialect.ddl(SentenceAction.dropIndex)
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + index.name))
		text = text.replace('{table}', this.dialect.delimiter(entity.mapping || entity.name))
		return this.createQuery(SentenceAction.dropIndex, text, entity.name, `drop index ${entity.mapping + '_' + index.name}`)
	}

	public dropSequence (entity: EntityMapping): Query | undefined {
		if (entity.sequence === undefined) {
			return undefined
		}
		let text = this.dialect.ddl(SentenceAction.dropSequence)
		text = text.replace('{name}', this.dialect.delimiter(entity.sequence))
		return this.createQuery(SentenceAction.dropSequence, text, entity.name, `drop sequence ${entity.sequence}`)
	}

	private equal (a:string, b:string): boolean {
		return this.helper.schema.equalName(a, b)
	}
}
