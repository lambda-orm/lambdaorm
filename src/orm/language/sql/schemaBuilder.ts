/* eslint-disable @typescript-eslint/no-unused-vars */
import { Property, Relation, Index, Delta, Query } from './../../model'
import { LanguageSchemaBuilder } from '../'
import { SchemaHelper } from '../../schema/schemaHelper'
import { DialectMetadata } from '../dialectMetadata'

export class SqlSchemaBuilder extends LanguageSchemaBuilder {
	// public drop (metadata:DialectMetadata, schema:SchemaHelper):Query[] {
	// const entities = schema.sortEntities().reverse()
	// const queries:Query[] = []
	// // drop all constraint
	// for (const p in entities) {
	// const entityName = entities[p]
	// const entity = schema.entity[entityName]
	// if (entity.relation) {
	// for (const name in entity.relation) {
	// const relation = entity.relation[name] as Relation
	// if (relation.type === 'oneToMany' || relation.type === 'oneToOne') {
	// const sentence = this.dropFk(entity, relation, metadata)
	// queries.push(new Query('dropFK', [], metadata.name, sentence, entity))
	// }
	// }
	// }
	// }
	// // drop indexes and tables
	// for (const p in entities) {
	// const entityName = entities[p]
	// const entity = schema.entity[entityName]
	// if (entity.index) {
	// for (const name in entity.index) {
	// const sentence = this.dropIndex(entity, entity.index[name], metadata)
	// queries.push(new Query('dropIndex', [], metadata.name, sentence, entity))
	// }
	// }
	// const sentence = this.dropEntity(entity, metadata)
	// queries.push(new Query('dropTable', [], metadata.name, sentence, entity))
	// }
	// return queries
	// }

	// public truncate (metadata:DialectMetadata, schema:SchemaHelper):Query[] {
	// // const metadata = this.language.dialects[dialect] as DialectMetadata
	// const queries:Query[] = []
	// for (const name in schema.entity) {
	// const entity = schema.entity[name]
	// const sentence = this.truncateTable(entity, metadata)
	// queries.push(new Query('truncate', [], metadata.name, sentence, entity))
	// }
	// return queries
	// }

	public truncateEntity (database:string, entity:any, metadata:DialectMetadata):Query {
		let text = metadata.ddl('truncateTable')
		text = text.replace('{name}', metadata.delimiter(entity.mapping))
		return new Query('truncate', database, metadata.name, text, entity)
	}

	public createEntity (database:string, entity:any, metadata:DialectMetadata):Query {
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

		return new Query('createTable', database, metadata.name, text, entity.name)
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

	public createFk (database:string, schema:SchemaHelper, entity:any, relation:Relation, metadata:DialectMetadata):Query {
		const column = entity.property[relation.from]
		const fEntity = schema.getEntity(relation.entity)
		const fColumn = fEntity.property[relation.to]

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('createFk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', metadata.delimiter(column.mapping))
		text = text.replace('{fTable}', metadata.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', metadata.delimiter(fColumn.mapping))
		return new Query('addFk', database, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public createIndex (database:string, entity:any, index:Index, metadata:DialectMetadata):Query {
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
		return new Query('createIndex', database, metadata.name, text, entity.name)
	}

	public alterColumn (database:string, entity:any, property:Property, metadata:DialectMetadata):Query {
		let type = metadata.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? metadata.other('notNullable') : ''

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = property.autoincrement ? metadata.ddl('incrementalColumDefine') : metadata.ddl('columnDefine')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		text = metadata.ddl('alterColumn').replace('{columnDefine}', text)
		return new Query('alterColumn', database, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public addColumn (database:string, entity:any, property:Property, metadata:DialectMetadata):Query {
		let type = metadata.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? metadata.other('notNullable') : ''

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = property.autoincrement ? metadata.ddl('incrementalColumDefine') : metadata.ddl('columnDefine')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		text = metadata.ddl('addColumn').replace('{columnDefine}', text)
		return new Query('addColumn', database, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public addPk (database:string, entity:any, primaryKey:string[], metadata:DialectMetadata):Query {
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
		return new Query('addPk', database, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public addUk (database:string, entity:any, uniqueKey:string[], metadata:DialectMetadata):Query {
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
		return new Query('addUk', database, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public addFk (database:string, schema:SchemaHelper, entity:any, relation:Relation, metadata:DialectMetadata):Query {
		const column = entity.property[relation.from]
		const fEntity = schema.getEntity(relation.entity)
		const fColumn = fEntity.property[relation.to]

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('addFk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', metadata.delimiter(column.mapping))
		text = text.replace('{fTable}', metadata.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', metadata.delimiter(fColumn.mapping))
		return new Query('addFk', database, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropEntity (database:string, entity:any, metadata:DialectMetadata):Query {
		let text = metadata.ddl('dropTable')
		text = text.replace('{name}', metadata.delimiter(entity.mapping))
		return new Query('dropTable', database, metadata.name, text, entity)
	}

	public dropColumn (database:string, entity:any, property:Property, metadata:DialectMetadata):Query {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropColumn')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		return new Query('dropColumn', database, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropPk (database:string, entity:any, metadata:DialectMetadata):Query {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropPk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_PK'))
		return new Query('dropPk', database, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropUk (database:string, entity:any, metadata:DialectMetadata):Query {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropUk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_UK'))
		return new Query('dropUk', database, metadata.name, alterEntity + ' ' + text, entity.name)
	}

	public dropFk (database:string, entity:any, relation:Relation, metadata:DialectMetadata):Query {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropFk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		return new Query('dropFK', database, metadata.name, alterEntity + ' ' + text, entity)
	}

	public dropIndex (database:string, entity:any, index:Index, metadata:DialectMetadata):Query {
		let text = metadata.ddl('dropIndex')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + index.name))
		text = text.replace('{table}', metadata.delimiter(entity.mapping))
		return new Query('dropIndex', database, metadata.name, text, entity)
	}
}
