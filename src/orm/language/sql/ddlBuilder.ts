/* eslint-disable @typescript-eslint/no-unused-vars */
import { Property, Relation, Index, Delta, Query } from '../../model'
import { LanguageDDLBuilder } from '..'
import { SchemaHelper } from '../../manager'
import { DialectMetadata } from '../dialectMetadata'

export class SqlDDLBuilder extends LanguageDDLBuilder {
	public truncateEntity (datastore:string, entity:any, metadata:DialectMetadata):Query {
		let text = metadata.ddl('truncateTable')
		text = text.replace('{name}', metadata.delimiter(entity.mapping))
		return new Query('truncate', datastore, metadata.name, text, entity)
	}

	public createEntity (datastore:string, entity:any, metadata:DialectMetadata):Query {
		const define:string[] = []
		for (const name in entity.property) {
			define.push(this.createColumn(entity.property[name], metadata))
		}
		if (entity.primaryKey && entity.primaryKey.length > 0) {
			define.push(this.createPk(entity, entity.primaryKey, metadata))
		}
		if (entity.uniqueKey && entity.uniqueKey.length > 0) {
			define.push(this.createUk(entity, entity.uniqueKey, metadata))
		}
		let text = metadata.ddl('createTable')
		text = text.replace('{name}', metadata.delimiter(entity.mapping))
		text = text.replace('{define}', define.join(','))

		return new Query('createTable', datastore, metadata.name, text, entity.name)
	}

	private createColumn (property:Property, metadata:DialectMetadata):string {
		let type = metadata.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? metadata.other('notNullable') : ''

		let text = property.autoincrement ? metadata.ddl('incrementalColumDefine') : metadata.ddl('columnDefine')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		return text
	}

	private createPk (entity:any, primaryKey:string[], metadata:DialectMetadata):string {
		const columns:string[] = []
		const columnTemplate = metadata.other('column')
		for (let i = 0; i < primaryKey.length; i++) {
			const column = entity.property[primaryKey[i]]
			columns.push(columnTemplate.replace('{name}', metadata.delimiter(column.mapping)))
		}
		let text = metadata.ddl('createPk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_PK'))
		text = text.replace('{columns}', columns.join(','))
		return text
	}

	private createUk (entity:any, uniqueKey:string[], metadata:DialectMetadata):string {
		const columns:string[] = []
		const columnTemplate = metadata.other('column')
		for (let i = 0; i < uniqueKey.length; i++) {
			const column = entity.property[uniqueKey[i]]
			columns.push(columnTemplate.replace('{name}', metadata.delimiter(column.mapping)))
		}
		let text = metadata.ddl('createUk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_UK'))
		text = text.replace('{columns}', columns.join(','))
		return text
	}

	public createFk (datastore:string, schema:SchemaHelper, entity:any, relation:Relation, metadata:DialectMetadata):Query {
		const column = entity.property[relation.from]
		const fEntity = schema.getEntity(relation.entity)
		const fColumn = fEntity.property[relation.to]

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('createFk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', metadata.delimiter(column.mapping))
		text = text.replace('{fTable}', metadata.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', metadata.delimiter(fColumn.mapping))
		return new Query('addFk', datastore, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public createIndex (datastore:string, entity:any, index:Index, metadata:DialectMetadata):Query {
		const columns:string[] = []
		const columnTemplate = metadata.other('column')
		for (let i = 0; i < index.fields.length; i++) {
			const column = entity.property[index.fields[i]]
			columns.push(columnTemplate.replace('{name}', metadata.delimiter(column.mapping)))
		}
		let text = metadata.ddl('createIndex')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + index.name))
		text = text.replace('{table}', metadata.delimiter(entity.mapping))
		text = text.replace('{columns}', columns.join(','))
		return new Query('createIndex', datastore, metadata.name, text, entity.name)
	}

	public alterColumn (datastore:string, entity:any, property:Property, metadata:DialectMetadata):Query {
		let type = metadata.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? metadata.other('notNullable') : ''

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = property.autoincrement ? metadata.ddl('incrementalColumDefine') : metadata.ddl('columnDefine')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		text = metadata.ddl('alterColumn').replace('{columnDefine}', text)
		return new Query('alterColumn', datastore, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public addColumn (datastore:string, entity:any, property:Property, metadata:DialectMetadata):Query {
		let type = metadata.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? metadata.other('notNullable') : ''

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = property.autoincrement ? metadata.ddl('incrementalColumDefine') : metadata.ddl('columnDefine')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		text = metadata.ddl('addColumn').replace('{columnDefine}', text)
		return new Query('addColumn', datastore, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public addPk (datastore:string, entity:any, primaryKey:string[], metadata:DialectMetadata):Query {
		const columns:string[] = []
		const columnTemplate = metadata.other('column')
		for (let i = 0; i < primaryKey.length; i++) {
			const column = entity.property[primaryKey[i]]
			columns.push(columnTemplate.replace('{name}', metadata.delimiter(column.mapping)))
		}
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('addPk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_PK'))
		text = text.replace('{columns}', columns.join(','))
		return new Query('addPk', datastore, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public addUk (datastore:string, entity:any, uniqueKey:string[], metadata:DialectMetadata):Query {
		const columns:string[] = []
		const columnTemplate = metadata.other('column')
		for (let i = 0; i < uniqueKey.length; i++) {
			const column = entity.property[uniqueKey[i]]
			columns.push(columnTemplate.replace('{name}', metadata.delimiter(column.mapping)))
		}
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('addUk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_UK'))
		text = text.replace('{columns}', columns.join(','))
		return new Query('addUk', datastore, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public addFk (datastore:string, schema:SchemaHelper, entity:any, relation:Relation, metadata:DialectMetadata):Query {
		const column = entity.property[relation.from]
		const fEntity = schema.getEntity(relation.entity)
		const fColumn = fEntity.property[relation.to]

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('addFk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', metadata.delimiter(column.mapping))
		text = text.replace('{fTable}', metadata.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', metadata.delimiter(fColumn.mapping))
		return new Query('addFk', datastore, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropEntity (datastore:string, entity:any, metadata:DialectMetadata):Query {
		let text = metadata.ddl('dropTable')
		text = text.replace('{name}', metadata.delimiter(entity.mapping))
		return new Query('dropTable', datastore, metadata.name, text, entity)
	}

	public dropColumn (datastore:string, entity:any, property:Property, metadata:DialectMetadata):Query {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropColumn')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		return new Query('dropColumn', datastore, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropPk (datastore:string, entity:any, metadata:DialectMetadata):Query {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropPk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_PK'))
		return new Query('dropPk', datastore, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropUk (datastore:string, entity:any, metadata:DialectMetadata):Query {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropUk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_UK'))
		return new Query('dropUk', datastore, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropFk (datastore:string, entity:any, relation:Relation, metadata:DialectMetadata):Query {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropFk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		return new Query('dropFK', datastore, metadata.name, alterEntity + ' ' + text, entity)
	}

	public dropIndex (datastore:string, entity:any, index:Index, metadata:DialectMetadata):Query {
		let text = metadata.ddl('dropIndex')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + index.name))
		text = text.replace('{table}', metadata.delimiter(entity.mapping))
		return new Query('dropIndex', datastore, metadata.name, text, entity)
	}
}
