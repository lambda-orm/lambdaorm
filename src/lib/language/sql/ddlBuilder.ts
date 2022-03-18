/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropertyMapping, Property, Relation, Index, Query, EntityMapping } from '../../model'
import { LanguageDDLBuilder } from '..'

export class SqlDDLBuilder extends LanguageDDLBuilder {
	public truncateEntity (entity:EntityMapping):Query {
		let text = this.dialect.ddl('truncateTable')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping))
		return new Query('truncate', this.dataSource.dialect, this.dataSource.name, text, entity.name)
	}

	public createEntity (entity:EntityMapping):Query {
		const define: string[] = []

		for (const i in entity.properties) {
			const property = entity.properties[i]
			if (!property.view) {
				define.push(this.createColumn(property))
			}
		}
		if (entity.primaryKey && entity.primaryKey.length > 0) {
			define.push(this.createPk(entity, entity.primaryKey))
		}
		if (entity.uniqueKey && entity.uniqueKey.length > 0) {
			define.push(this.createUk(entity, entity.uniqueKey))
		}
		let text = this.dialect.ddl('createTable')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping))
		text = text.replace('{define}', define.join(','))

		return new Query('createTable', this.dataSource.dialect, this.dataSource.name, text, entity.name)
	}

	private createColumn (property:PropertyMapping):string {
		let type = this.dialect.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? this.dialect.other('notNullable') : ''

		let text = property.autoincrement ? this.dialect.ddl('incrementalColumDefine') : this.dialect.ddl('columnDefine')
		text = text.replace('{name}', this.dialect.delimiter(property.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		return text
	}

	private createPk (entity:EntityMapping, primaryKey:string[]):string {
		const columns:string[] = []
		const columnTemplate = this.dialect.other('column')
		for (let i = 0; i < primaryKey.length; i++) {
			const property = entity.properties.find(p => p.name === primaryKey[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(property.mapping)))
		}
		let text = this.dialect.ddl('createPk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_PK'))
		text = text.replace('{columns}', columns.join(','))
		return text
	}

	private createUk (entity:EntityMapping, uniqueKey:string[]):string {
		const columns:string[] = []
		const columnTemplate = this.dialect.other('column')
		for (let i = 0; i < uniqueKey.length; i++) {
			const property = entity.properties.find(p => p.name === uniqueKey[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(property.mapping)))
		}
		let text = this.dialect.ddl('createUk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_UK'))
		text = text.replace('{columns}', columns.join(','))
		return text
	}

	public createFk (entity: EntityMapping, relation: Relation): Query {
		const column = entity.properties.find(p => p.name === relation.from) as PropertyMapping
		const fEntity = this.mapping.getEntity(relation.entity) as EntityMapping
		const fColumn = fEntity.properties.find(p => p.name === relation.to) as PropertyMapping
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl('createFk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', this.dialect.delimiter(column.mapping))
		text = text.replace('{fTable}', this.dialect.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', this.dialect.delimiter(fColumn.mapping))
		return new Query('addFk', this.dataSource.dialect, this.dataSource.name, alterEntity + ' ' + text, entity.name)
	}

	public createIndex (entity:EntityMapping, index:Index):Query {
		const columns: string[] = []
		const columnTemplate = this.dialect.other('column')
		for (let i = 0; i < index.fields.length; i++) {
			const propertyMapping = entity.properties.find(p => p.name === index.fields[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(propertyMapping.mapping)))
		}
		let text = this.dialect.ddl('createIndex')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + index.name))
		text = text.replace('{table}', this.dialect.delimiter(entity.mapping))
		text = text.replace('{columns}', columns.join(','))
		return new Query('createIndex', this.dataSource.dialect, this.dataSource.name, text, entity.name)
	}

	public alterColumn (entity: EntityMapping, property: Property): Query {
		const propertyMapping = this.mapping.getProperty(entity.name, property.name) as PropertyMapping
		let type = this.dialect.type(propertyMapping.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? this.dialect.other('notNullable') : ''

		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = property.autoincrement ? this.dialect.ddl('incrementalColumDefine') : this.dialect.ddl('columnDefine')
		text = text.replace('{name}', this.dialect.delimiter(propertyMapping.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		text = this.dialect.ddl('alterColumn').replace('{columnDefine}', text)
		return new Query('alterColumn', this.dataSource.dialect, this.dataSource.name, alterEntity + ' ' + text, entity.name)
	}

	public addColumn (entity: EntityMapping, property: Property): Query {
		const propertyMapping = this.mapping.getProperty(entity.name, property.name) as PropertyMapping
		let type = this.dialect.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? this.dialect.other('notNullable') : ''

		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = property.autoincrement ? this.dialect.ddl('incrementalColumDefine') : this.dialect.ddl('columnDefine')
		text = text.replace('{name}', this.dialect.delimiter(propertyMapping.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		text = this.dialect.ddl('addColumn').replace('{columnDefine}', text)
		return new Query('addColumn', this.dataSource.dialect, this.dataSource.name, alterEntity + ' ' + text, entity.name)
	}

	public addPk (entity: EntityMapping, primaryKey: string[]): Query {
		const columns:string[] = []
		const columnTemplate = this.dialect.other('column')
		for (let i = 0; i < primaryKey.length; i++) {
			const property = entity.properties.find(p => p.name === primaryKey[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(property.mapping)))
		}
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl('addPk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_PK'))
		text = text.replace('{columns}', columns.join(','))
		return new Query('addPk', this.dataSource.dialect, this.dataSource.name, alterEntity + ' ' + text, entity.name)
	}

	public addUk (entity:EntityMapping, uniqueKey:string[]):Query {
		const columns: string[] = []
		const columnTemplate = this.dialect.other('column')
		for (let i = 0; i < uniqueKey.length; i++) {
			const property = entity.properties.find(p => p.name === uniqueKey[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(property.mapping)))
		}
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl('addUk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_UK'))
		text = text.replace('{columns}', columns.join(','))
		return new Query('addUk', this.dataSource.dialect, this.dataSource.name, alterEntity + ' ' + text, entity.name)
	}

	public addFk (entity:EntityMapping, relation:Relation):Query {
		const column = entity.properties.find(p => p.name === relation.from) as PropertyMapping
		const fEntity = this.mapping.getEntity(relation.entity) as EntityMapping
		const fColumn = fEntity.properties.find(p => p.name === relation.to) as PropertyMapping
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl('addFk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', this.dialect.delimiter(column.mapping))
		text = text.replace('{fTable}', this.dialect.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', this.dialect.delimiter(fColumn.mapping))
		return new Query('addFk', this.dataSource.dialect, this.dataSource.name, alterEntity + ' ' + text, entity.name)
	}

	public dropEntity (entity: EntityMapping): Query {
		let text = this.dialect.ddl('dropTable')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping))
		return new Query('dropTable', this.dataSource.dialect, this.dataSource.name, text, entity.name)
	}

	public dropColumn (entity: EntityMapping, property: Property): Query {
		const propertyMapping = this.mapping.getProperty(entity.name, property.name) as PropertyMapping
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl('dropColumn')
		text = text.replace('{name}', this.dialect.delimiter(propertyMapping.mapping as string))
		return new Query('dropColumn', this.dataSource.dialect, this.dataSource.name, alterEntity + ' ' + text, entity.name)
	}

	public dropPk (entity: EntityMapping): Query {
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl('dropPk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_PK'))
		return new Query('dropPk', this.dataSource.dialect, this.dataSource.name, alterEntity + ' ' + text, entity.name)
	}

	public dropUk (entity: EntityMapping): Query {
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl('dropUk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_UK'))
		return new Query('dropUk', this.dataSource.dialect, this.dataSource.name, alterEntity + ' ' + text, entity.name)
	}

	public setNull (entity: EntityMapping, relation: Relation): Query {
		const alias = 'a'
		const templateColumn = this.dialect.other('column')
		const column = templateColumn.replace('{name}', relation.from)
		const templateAssing = this.dialect.operator('=', 2)
		let assing = templateAssing.replace('{0}', column)
		const _null = this.dialect.other('null')
		assing = assing.replace('{1}', _null)
		let text = this.dialect.dml('update')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping))
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping))
		text = text.replace('{alias}', alias)
		text = text.replace('{assings}', assing)
		return new Query('update', this.dataSource.dialect, this.dataSource.name, text, entity.name)
	}

	public dropFk (entity: EntityMapping, relation: Relation): Query {
		const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping))
		let text = this.dialect.ddl('dropFk')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		return new Query('dropFK', this.dataSource.dialect, this.dataSource.name, alterEntity + ' ' + text, entity.name)
	}

	public dropIndex (entity: EntityMapping, index: Index): Query {
		let text = this.dialect.ddl('dropIndex')
		text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + index.name))
		text = text.replace('{table}', this.dialect.delimiter(entity.mapping))
		return new Query('dropIndex', this.dataSource.dialect, this.dataSource.name, text, entity.name)
	}
}
