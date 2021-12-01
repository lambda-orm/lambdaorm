/* eslint-disable @typescript-eslint/no-unused-vars */
import { PropertyMapping, EntityMapping, Relation, Index, Delta, Query } from '../../model'
import { LanguageDDLBuilder } from '..'
import { SchemaConfig } from '../../manager'
import { DialectMetadata } from '../dialectMetadata'

export class SqlDDLBuilder extends LanguageDDLBuilder {
	public truncateEntity (datastore:string, entity:EntityMapping, metadata:DialectMetadata):Query {
		let text = metadata.ddl('truncateTable')
		text = text.replace('{name}', metadata.delimiter(entity.mapping))
		return new Query(datastore, 'truncate', metadata.name, text, entity.name)
	}

	public createEntity (datastore:string, entity:EntityMapping, metadata:DialectMetadata):Query {
		const define:string[] = []
		for (const i in entity.properties) {
			const property = entity.properties[i]
			define.push(this.createColumn(datastore, property, metadata))
		}
		if (entity.primaryKey && entity.primaryKey.length > 0) {
			define.push(this.createPk(datastore, entity, entity.primaryKey, metadata))
		}
		if (entity.uniqueKey && entity.uniqueKey.length > 0) {
			define.push(this.createUk(datastore, entity, entity.uniqueKey, metadata))
		}
		let text = metadata.ddl('createTable')
		text = text.replace('{name}', metadata.delimiter(entity.mapping))
		text = text.replace('{define}', define.join(','))

		return new Query(datastore, 'createTable', metadata.name, text, entity.name)
	}

	private createColumn (datastore:string, property:PropertyMapping, metadata:DialectMetadata):string {
		let type = metadata.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? metadata.other('notNullable') : ''

		let text = property.autoincrement ? metadata.ddl('incrementalColumDefine') : metadata.ddl('columnDefine')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		return text
	}

	private createPk (datastore:string, entity:EntityMapping, primaryKey:string[], metadata:DialectMetadata):string {
		const columns:string[] = []
		const columnTemplate = metadata.other('column')
		for (let i = 0; i < primaryKey.length; i++) {
			const property = entity.properties.find(p => p.name === primaryKey[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', metadata.delimiter(property.mapping)))
		}
		let text = metadata.ddl('createPk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_PK'))
		text = text.replace('{columns}', columns.join(','))
		return text
	}

	private createUk (datastore:string, entity:EntityMapping, uniqueKey:string[], metadata:DialectMetadata):string {
		const columns:string[] = []
		const columnTemplate = metadata.other('column')
		for (let i = 0; i < uniqueKey.length; i++) {
			const property = entity.properties.find(p => p.name === uniqueKey[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', metadata.delimiter(property.mapping)))
		}
		let text = metadata.ddl('createUk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_UK'))
		text = text.replace('{columns}', columns.join(','))
		return text
	}

	public createFk (datastore:string, schema:SchemaConfig, entity:EntityMapping, relation:Relation, metadata:DialectMetadata):Query {
		const column = entity.properties.find(p => p.name === relation.from) as PropertyMapping
		const fEntity = schema.getEntity(relation.entity) as EntityMapping
		const fColumn = fEntity.properties.find(p => p.name === relation.to) as PropertyMapping
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('createFk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', metadata.delimiter(column.mapping))
		text = text.replace('{fTable}', metadata.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', metadata.delimiter(fColumn.mapping))
		return new Query(datastore, 'addFk', metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public createIndex (datastore:string, entity:EntityMapping, index:Index, metadata:DialectMetadata):Query {
		const columns:string[] = []
		const columnTemplate = metadata.other('column')
		for (let i = 0; i < index.fields.length; i++) {
			const property = entity.properties.find(p => p.name === index.fields[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', metadata.delimiter(property.mapping)))
		}
		let text = metadata.ddl('createIndex')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + index.name))
		text = text.replace('{table}', metadata.delimiter(entity.mapping))
		text = text.replace('{columns}', columns.join(','))
		return new Query(datastore, 'createIndex', metadata.name, text, entity.name)
	}

	public alterColumn (datastore:string, entity:EntityMapping, property:PropertyMapping, metadata:DialectMetadata):Query {
		let type = metadata.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? metadata.other('notNullable') : ''

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = property.autoincrement ? metadata.ddl('incrementalColumDefine') : metadata.ddl('columnDefine')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		text = metadata.ddl('alterColumn').replace('{columnDefine}', text)
		return new Query(datastore, 'alterColumn', metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public addColumn (datastore:string, entity:EntityMapping, property:PropertyMapping, metadata:DialectMetadata):Query {
		let type = metadata.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? metadata.other('notNullable') : ''

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = property.autoincrement ? metadata.ddl('incrementalColumDefine') : metadata.ddl('columnDefine')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		text = metadata.ddl('addColumn').replace('{columnDefine}', text)
		return new Query(datastore, 'addColumn', metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public addPk (datastore:string, entity:EntityMapping, primaryKey:string[], metadata:DialectMetadata):Query {
		const columns:string[] = []
		const columnTemplate = metadata.other('column')
		for (let i = 0; i < primaryKey.length; i++) {
			const property = entity.properties.find(p => p.name === primaryKey[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', metadata.delimiter(property.mapping)))
		}
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('addPk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_PK'))
		text = text.replace('{columns}', columns.join(','))
		return new Query(datastore, 'addPk', metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public addUk (datastore:string, entity:EntityMapping, uniqueKey:string[], metadata:DialectMetadata):Query {
		const columns:string[] = []
		const columnTemplate = metadata.other('column')
		for (let i = 0; i < uniqueKey.length; i++) {
			const property = entity.properties.find(p => p.name === uniqueKey[i]) as PropertyMapping
			columns.push(columnTemplate.replace('{name}', metadata.delimiter(property.mapping)))
		}
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('addUk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_UK'))
		text = text.replace('{columns}', columns.join(','))
		return new Query(datastore, 'addUk', metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public addFk (datastore:string, schema:SchemaConfig, entity:EntityMapping, relation:Relation, metadata:DialectMetadata):Query {
		const column = entity.properties.find(p => p.name === relation.from) as PropertyMapping
		const fEntity = schema.getEntity(relation.entity) as EntityMapping
		const fColumn = fEntity.properties.find(p => p.name === relation.to) as PropertyMapping
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('addFk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', metadata.delimiter(column.mapping))
		text = text.replace('{fTable}', metadata.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', metadata.delimiter(fColumn.mapping))
		return new Query(datastore, 'addFk', metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropEntity (datastore:string, entity:EntityMapping, metadata:DialectMetadata):Query {
		let text = metadata.ddl('dropTable')
		text = text.replace('{name}', metadata.delimiter(entity.mapping))
		return new Query(datastore, 'dropTable', metadata.name, text, entity.name)
	}

	public dropColumn (datastore:string, entity:EntityMapping, property:PropertyMapping, metadata:DialectMetadata):Query {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropColumn')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		return new Query(datastore, 'dropColumn', metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropPk (datastore:string, entity:EntityMapping, metadata:DialectMetadata):Query {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropPk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_PK'))
		return new Query(datastore, 'dropPk', metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropUk (datastore:string, entity:EntityMapping, metadata:DialectMetadata):Query {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropUk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_UK'))
		return new Query(datastore, 'dropUk', metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropFk (datastore:string, entity:EntityMapping, relation:Relation, metadata:DialectMetadata):Query {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropFk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		return new Query(datastore, 'dropFK', metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropIndex (datastore:string, entity:EntityMapping, index:Index, metadata:DialectMetadata):Query {
		let text = metadata.ddl('dropIndex')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + index.name))
		text = text.replace('{table}', metadata.delimiter(entity.mapping))
		return new Query(datastore, 'dropIndex', metadata.name, text, entity.name)
	}
}
