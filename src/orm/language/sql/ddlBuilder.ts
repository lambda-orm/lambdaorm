/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropertyMapping, Entity, Property, Relation, Index, Query, EntityMapping } from '../../model'
import { LanguageDDLBuilder } from '..'

export class SqlDDLBuilder extends LanguageDDLBuilder {
	public truncateEntity (entity:Entity):Query {
		let text = this.metadata.ddl('truncateTable')
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		text = text.replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		return new Query('truncate', this.dialect, this.dataSource, text, entity.name)
	}

	public createEntity (entity:Entity):Query {
		const define: string[] = []
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		for (const i in entityMapping.properties) {
			const property = entityMapping.properties[i]
			define.push(this.createColumn(property))
		}
		if (entity.primaryKey && entity.primaryKey.length > 0) {
			define.push(this.createPk(entityMapping, entityMapping.primaryKey))
		}
		if (entity.uniqueKey && entity.uniqueKey.length > 0) {
			define.push(this.createUk(entityMapping, entity.uniqueKey))
		}
		let text = this.metadata.ddl('createTable')
		text = text.replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		text = text.replace('{define}', define.join(','))

		return new Query('createTable', this.dialect, this.dataSource, text, entityMapping.name)
	}

	private createColumn (property:PropertyMapping):string {
		let type = this.metadata.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? this.metadata.other('notNullable') : ''

		let text = property.autoincrement ? this.metadata.ddl('incrementalColumDefine') : this.metadata.ddl('columnDefine')
		text = text.replace('{name}', this.metadata.delimiter(property.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		return text
	}

	private createPk (entity:EntityMapping, primaryKey:string[]):string {
		const columns:string[] = []
		const columnTemplate = this.metadata.other('column')
		for (let i = 0; i < primaryKey.length; i++) {
			const property = entity.properties.find(p => p.name === primaryKey[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', this.metadata.delimiter(property.mapping)))
		}
		let text = this.metadata.ddl('createPk')
		text = text.replace('{name}', this.metadata.delimiter(entity.mapping + '_PK'))
		text = text.replace('{columns}', columns.join(','))
		return text
	}

	private createUk (entity:EntityMapping, uniqueKey:string[]):string {
		const columns:string[] = []
		const columnTemplate = this.metadata.other('column')
		for (let i = 0; i < uniqueKey.length; i++) {
			const property = entity.properties.find(p => p.name === uniqueKey[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', this.metadata.delimiter(property.mapping)))
		}
		let text = this.metadata.ddl('createUk')
		text = text.replace('{name}', this.metadata.delimiter(entity.mapping + '_UK'))
		text = text.replace('{columns}', columns.join(','))
		return text
	}

	public createFk (entity: Entity, relation: Relation): Query {
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		const column = entity.properties.find(p => p.name === relation.from) as PropertyMapping
		const fEntity = this.mapping.getEntity(relation.entity) as EntityMapping
		const fColumn = fEntity.properties.find(p => p.name === relation.to) as PropertyMapping
		const alterEntity = this.metadata.ddl('alterTable').replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		let text = this.metadata.ddl('createFk')
		text = text.replace('{name}', this.metadata.delimiter(entityMapping.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', this.metadata.delimiter(column.mapping))
		text = text.replace('{fTable}', this.metadata.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', this.metadata.delimiter(fColumn.mapping))
		return new Query('addFk', this.dialect, this.dataSource, alterEntity + ' ' + text, entity.name)
	}

	public createIndex (entity:Entity, index:Index):Query {
		const columns: string[] = []
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		const columnTemplate = this.metadata.other('column')
		for (let i = 0; i < index.fields.length; i++) {
			const property = entity.properties.find(p => p.name === index.fields[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', this.metadata.delimiter(property.mapping)))
		}
		let text = this.metadata.ddl('createIndex')
		text = text.replace('{name}', this.metadata.delimiter(entityMapping.mapping + '_' + index.name))
		text = text.replace('{table}', this.metadata.delimiter(entityMapping.mapping))
		text = text.replace('{columns}', columns.join(','))
		return new Query('createIndex', this.dialect, this.dataSource, text, entityMapping.name)
	}

	public alterColumn (entity: Entity, property: Property): Query {
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		const propertyMapping = this.mapping.getProperty(entity.name, property.name) as PropertyMapping
		let type = this.metadata.type(propertyMapping.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? this.metadata.other('notNullable') : ''

		const alterEntity = this.metadata.ddl('alterTable').replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		let text = property.autoincrement ? this.metadata.ddl('incrementalColumDefine') : this.metadata.ddl('columnDefine')
		text = text.replace('{name}', this.metadata.delimiter(propertyMapping.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		text = this.metadata.ddl('alterColumn').replace('{columnDefine}', text)
		return new Query('alterColumn', this.dialect, this.dataSource, alterEntity + ' ' + text, entity.name)
	}

	public addColumn (entity: Entity, property: Property): Query {
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		const propertyMapping = this.mapping.getProperty(entity.name, property.name) as PropertyMapping
		let type = this.metadata.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? this.metadata.other('notNullable') : ''

		const alterEntity = this.metadata.ddl('alterTable').replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		let text = property.autoincrement ? this.metadata.ddl('incrementalColumDefine') : this.metadata.ddl('columnDefine')
		text = text.replace('{name}', this.metadata.delimiter(propertyMapping.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		text = this.metadata.ddl('addColumn').replace('{columnDefine}', text)
		return new Query('addColumn', this.dialect, this.dataSource, alterEntity + ' ' + text, entity.name)
	}

	public addPk (entity: Entity, primaryKey: string[]): Query {
		const columns:string[] = []
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		const columnTemplate = this.metadata.other('column')
		for (let i = 0; i < primaryKey.length; i++) {
			const property = entity.properties.find(p => p.name === primaryKey[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', this.metadata.delimiter(property.mapping)))
		}
		const alterEntity = this.metadata.ddl('alterTable').replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		let text = this.metadata.ddl('addPk')
		text = text.replace('{name}', this.metadata.delimiter(entityMapping.mapping + '_PK'))
		text = text.replace('{columns}', columns.join(','))
		return new Query('addPk', this.dialect, this.dataSource, alterEntity + ' ' + text, entity.name)
	}

	public addUk (entity:Entity, uniqueKey:string[]):Query {
		const columns: string[] = []
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		const columnTemplate = this.metadata.other('column')
		for (let i = 0; i < uniqueKey.length; i++) {
			const property = entity.properties.find(p => p.name === uniqueKey[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', this.metadata.delimiter(property.mapping)))
		}
		const alterEntity = this.metadata.ddl('alterTable').replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		let text = this.metadata.ddl('addUk')
		text = text.replace('{name}', this.metadata.delimiter(entityMapping.mapping + '_UK'))
		text = text.replace('{columns}', columns.join(','))
		return new Query('addUk', this.dialect, this.dataSource, alterEntity + ' ' + text, entity.name)
	}

	public addFk (entity:Entity, relation:Relation):Query {
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		const column = entity.properties.find(p => p.name === relation.from) as PropertyMapping
		const fEntity = this.mapping.getEntity(relation.entity) as EntityMapping
		const fColumn = fEntity.properties.find(p => p.name === relation.to) as PropertyMapping
		const alterEntity = this.metadata.ddl('alterTable').replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		let text = this.metadata.ddl('addFk')
		text = text.replace('{name}', this.metadata.delimiter(entityMapping.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', this.metadata.delimiter(column.mapping))
		text = text.replace('{fTable}', this.metadata.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', this.metadata.delimiter(fColumn.mapping))
		return new Query('addFk', this.dialect, this.dataSource, alterEntity + ' ' + text, entity.name)
	}

	public dropEntity (entity: Entity): Query {
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		let text = this.metadata.ddl('dropTable')
		text = text.replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		return new Query('dropTable', this.dialect, this.dataSource, text, entity.name)
	}

	public dropColumn (entity: Entity, property: Property): Query {
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		const propertyMapping = this.mapping.getProperty(entity.name, property.name) as PropertyMapping
		const alterEntity = this.metadata.ddl('alterTable').replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		let text = this.metadata.ddl('dropColumn')
		text = text.replace('{name}', this.metadata.delimiter(propertyMapping.mapping as string))
		return new Query('dropColumn', this.dialect, this.dataSource, alterEntity + ' ' + text, entity.name)
	}

	public dropPk (entity: Entity): Query {
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		const alterEntity = this.metadata.ddl('alterTable').replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		let text = this.metadata.ddl('dropPk')
		text = text.replace('{name}', this.metadata.delimiter(entityMapping.mapping + '_PK'))
		return new Query('dropPk', this.dialect, this.dataSource, alterEntity + ' ' + text, entity.name)
	}

	public dropUk (entity: Entity): Query {
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		const alterEntity = this.metadata.ddl('alterTable').replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		let text = this.metadata.ddl('dropUk')
		text = text.replace('{name}', this.metadata.delimiter(entityMapping.mapping + '_UK'))
		return new Query('dropUk', this.dialect, this.dataSource, alterEntity + ' ' + text, entity.name)
	}

	public dropFk (entity: Entity, relation: Relation): Query {
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		const alterEntity = this.metadata.ddl('alterTable').replace('{name}', this.metadata.delimiter(entityMapping.mapping))
		let text = this.metadata.ddl('dropFk')
		text = text.replace('{name}', this.metadata.delimiter(entityMapping.mapping + '_' + relation.name + '_FK'))
		return new Query('dropFK', this.dialect, this.dataSource, alterEntity + ' ' + text, entity.name)
	}

	public dropIndex (entity: Entity, index: Index): Query {
		const entityMapping = this.mapping.getEntity(entity.name) as EntityMapping
		let text = this.metadata.ddl('dropIndex')
		text = text.replace('{name}', this.metadata.delimiter(entityMapping.mapping + '_' + index.name))
		text = text.replace('{table}', this.metadata.delimiter(entityMapping.mapping))
		return new Query('dropIndex', this.dialect, this.dataSource, text, entity.name)
	}
}
