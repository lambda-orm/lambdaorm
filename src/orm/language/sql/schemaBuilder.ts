/* eslint-disable @typescript-eslint/no-unused-vars */
import { Property, Relation, Index, Delta, Query } from './../../model'
import { ISchemaBuilder } from '../'
import { SchemaHelper } from '../../schema/schemaHelper'
import { DialectMetadata } from '../dialectMetadata'

export class SqlSchemaBuilder implements ISchemaBuilder {
	public sync (delta:Delta, metadata:DialectMetadata, schema:SchemaHelper):Query[] {
		const queries:Query[] = []
		// remove constraints for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'primaryKey') {
					if (!changed.delta) continue
					for (const n in changed.delta.remove) {
						const sentence = this.dropPk(entityChanged.old, metadata)
						queries.push(new Query('dropPk', [], metadata.name, sentence, entityChanged.name))
					}
					for (const c in changed.delta.changed) {
						const sentence = this.dropPk(entityChanged.old, metadata)
						queries.push(new Query('dropPk', [], metadata.name, sentence, entityChanged.name))
					}
				}
				if (changed.name === 'uniqueKey') {
					if (changed.delta) {
						for (const n in changed.delta.remove) {
							const sentence = this.dropUk(entityChanged.old, metadata)
							queries.push(new Query('dropUk', [], metadata.name, sentence, entityChanged.name))
						}
						for (const c in changed.delta.changed) {
							const sentence = this.dropUk(entityChanged.old, metadata)
							queries.push(new Query('dropUk', [], metadata.name, sentence, entityChanged.name))
						}
					}
				}
			}
		}
		// remove indexes and Fks for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'index') {
					if (!changed.delta) continue
					for (const c in changed.delta.changed) {
						const oldIndex = changed.delta.changed[c].old as Index
						const sentence = this.dropIndex(entityChanged.new, oldIndex, metadata)
						queries.push(new Query('dropIndex', [], metadata.name, sentence, entityChanged.name))
					}
					for (const r in changed.delta.remove) {
						const removeIndex = changed.delta.remove[r].old as Index
						const sentence = this.dropIndex(entityChanged.new, removeIndex, metadata)
						queries.push(new Query('dropIndex', [], metadata.name, sentence, entityChanged.name))
					}
				}
				if (changed.name === 'relation') {
					if (!changed.delta) continue
					for (const c in changed.delta.changed) {
						const newRelation = changed.delta.changed[c].new as Relation
						const oldRelation = changed.delta.changed[c].old as Relation
						if (this.changeRelation(oldRelation, newRelation)) {
							if (oldRelation.type === 'oneToMany' || oldRelation.type === 'oneToOne') {
								const sentence = this.dropFk(entityChanged.new, oldRelation, metadata)
								queries.push(new Query('dropFk', [], metadata.name, sentence, entityChanged.name))
							}
						}
					}
					for (const r in changed.delta.remove) {
						const removeRelation = changed.delta.remove[r].old as Relation
						const sentence = this.dropFk(entityChanged.new, removeRelation, metadata)
						queries.push(new Query('dropFk', [], metadata.name, sentence, entityChanged.name))
					}
				}
			}
		}
		// remove indexes and tables for removed entities
		for (const name in delta.remove) {
			const removeEntity = delta.remove[name].old
			if (removeEntity.index) {
				for (const indexName in removeEntity.index) {
					const sentence = this.dropIndex(removeEntity, removeEntity.index[indexName], metadata)
					queries.push(new Query('dropIndex', [], metadata.name, sentence, removeEntity.name))
				}
			}
			const sentence = this.dropTable(removeEntity, metadata)
			queries.push(new Query('dropTable', [], metadata.name, sentence, name))
		}
		// create tables
		for (const name in delta.new) {
			const newEntity = delta.new[name].new
			const sentence = this.createTable(newEntity, metadata)
			queries.push(new Query('createTable', [], metadata.name, sentence, name))
		}
		// add columns for entities changes
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'property') {
					if (!changed.delta) continue
					for (const n in changed.delta.new) {
						const newProperty = changed.delta.new[n].new as Property
						const sentence = this.addColumn(entityChanged.new, newProperty, metadata)
						queries.push(new Query('addColumn', [], metadata.name, sentence, entityChanged.name))
					}
					for (const n in changed.delta.changed) {
						const newProperty = changed.delta.changed[n].new as Property
						const oldProperty = changed.delta.changed[n].old as Property
						if (newProperty.mapping === oldProperty.mapping) {
							const sentence = this.alterColumn(entityChanged.new, newProperty, metadata)
							queries.push(new Query('alterColumn', [], metadata.name, sentence, entityChanged.name))
						}
					}
				}
			}
		}

		// TODO:
		// Solve rename column: se debe resolver en cascada los indexes, Fks, Uk and Pk que esten referenciando la columns
		// Solve rename table: se debe resolver en cascada los indexes, Fks, Uk and Pk que esten referenciando la columns
		// en ambos casos se debe resolver que se hara con los datos para que estos no se pierdan

		// remove columns for entities changes
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'property') {
					if (!changed.delta) continue
					for (const n in changed.delta.remove) {
						const oldProperty = changed.delta.remove[n].old as Property
						const sentence = this.dropColumn(entityChanged.old, oldProperty, metadata)
						queries.push(new Query('dropColumn', [], metadata.name, sentence, entityChanged.name))
					}
				}
			}
		}
		// create constraints for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'primaryKey') {
					if (!changed.delta) continue
					for (const n in changed.delta.new) {
						const newPrimaryKey = changed.delta.new[n].new as string[]
						const sentence = this.addPk(entityChanged.new, newPrimaryKey, metadata)
						queries.push(new Query('addPk', [], metadata.name, sentence, entityChanged.name))
					}
					for (const c in changed.delta.changed) {
						const changePrimaryKey = changed.delta.changed[c].new as string[]
						const sentence = this.addPk(entityChanged.new, changePrimaryKey, metadata)
						queries.push(new Query('addPk', [], metadata.name, sentence, entityChanged.name))
					}
				}
				if (changed.name === 'uniqueKey') {
					if (changed.delta) {
						for (const n in changed.delta.new) {
							const newUniqueKey = changed.delta.new[n].new as string[]
							const sentence = this.addUk(entityChanged.new, newUniqueKey, metadata)
							queries.push(new Query('addUk', [], metadata.name, sentence, entityChanged.name))
						}
						for (const c in changed.delta.changed) {
							const chanegUniqueKey = changed.delta.changed[c].new as string[]
							const sentence = this.addUk(entityChanged.new, chanegUniqueKey, metadata)
							queries.push(new Query('addUk', [], metadata.name, sentence, entityChanged.name))
						}
					}
				}
			}
		}
		// //create constraints for new entities
		// for(const name in delta.new){
		//     const newEntity = delta.new[name].new
		//     if(newEntity.primaryKey){
		//         sql.push(this.addPk(newEntity,newEntity.primaryKey,metadata))
		//     }
		//     if(newEntity.uniqueKey){
		//         sql.push(this.addUk(newEntity,newEntity.uniqueKey,metadata))
		//     }
		// }
		// create indexes and Fks for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'index') {
					if (!changed.delta) continue
					for (const n in changed.delta.new) {
						const newIndex = changed.delta.new[n].new as Index
						const sentence = this.createIndex(entityChanged.new, newIndex, metadata)
						queries.push(new Query('createIndex', [], metadata.name, sentence, entityChanged.name))
					}
					for (const c in changed.delta.changed) {
						const changeIndex = changed.delta.changed[c].new as Index
						const sentence = this.createIndex(entityChanged.new, changeIndex, metadata)
						queries.push(new Query('createIndex', [], metadata.name, sentence, entityChanged.name))
					}
					// for(const r in changed.delta.remove){
					//     let removeIndex=changed.delta.remove[r]
					// }
				}
				if (changed.name === 'relation') {
					if (changed.delta) {
						for (const n in changed.delta.new) {
							const newRelation = changed.delta.new[n].new as Relation
							if (newRelation.type === 'oneToMany' || newRelation.type === 'oneToOne') {
								const sentence = this.addFk(schema, entityChanged.new, newRelation, metadata)
								queries.push(new Query('addFk', [], metadata.name, sentence, entityChanged.name))
							}
						}
						for (const c in changed.delta.changed) {
							const newRelation = changed.delta.changed[c].new as Relation
							const oldRelation = changed.delta.changed[c].old as Relation
							if (this.changeRelation(oldRelation, newRelation)) {
								if (newRelation.type === 'oneToMany' || newRelation.type === 'oneToOne') {
									const sentence = this.addFk(schema, entityChanged.new, newRelation, metadata)
									queries.push(new Query('addFk', [], metadata.name, sentence, entityChanged.name))
								}
							}
						}
					}
				}
			}
		}
		// create indexes and Fks for new entities
		for (const name in delta.new) {
			const newEntity = delta.new[name].new
			if (newEntity.index) {
				for (const name in newEntity.index) {
					const sentence = this.createIndex(newEntity, newEntity.index[name], metadata)
					queries.push(new Query('createIndex', [], metadata.name, sentence, newEntity.name))
				}
			}
			if (newEntity.relation) {
				for (const name in newEntity.relation) {
					const relation = newEntity.relation[name] as Relation
					if (relation.type === 'oneToMany' || relation.type === 'oneToOne') {
						const sentence = this.addFk(schema, newEntity, newEntity.relation[name], metadata)
						queries.push(new Query('addFk', [], metadata.name, sentence, newEntity.name))
					}
				}
			}
		}
		return queries
	}

	public drop (metadata:DialectMetadata, schema:SchemaHelper):Query[] {
		const entities = schema.sortEntities().reverse()
		const queries:Query[] = []
		// drop all constraint
		for (const p in entities) {
			const entityName = entities[p]
			const entity = schema.entity[entityName]
			if (entity.relation) {
				for (const name in entity.relation) {
					const relation = entity.relation[name] as Relation
					if (relation.type === 'oneToMany' || relation.type === 'oneToOne') {
						const sentence = this.dropFk(entity, relation, metadata)
						queries.push(new Query('dropFK', [], metadata.name, sentence, entity))
					}
				}
			}
		}
		// drop indexes and tables
		for (const p in entities) {
			const entityName = entities[p]
			const entity = schema.entity[entityName]
			if (entity.index) {
				for (const name in entity.index) {
					const sentence = this.dropIndex(entity, entity.index[name], metadata)
					queries.push(new Query('dropIndex', [], metadata.name, sentence, entity))
				}
			}
			const sentence = this.dropTable(entity, metadata)
			queries.push(new Query('dropTable', [], metadata.name, sentence, entity))
		}
		return queries
	}

	public truncate (metadata:DialectMetadata, schema:SchemaHelper):Query[] {
		// const metadata = this.language.dialects[dialect] as DialectMetadata
		const queries:Query[] = []
		for (const name in schema.entity) {
			const entity = schema.entity[name]
			const sentence = this.truncateTable(entity, metadata)
			queries.push(new Query('truncate', [], metadata.name, sentence, entity))
		}
		return queries
	}

	private truncateTable (entity:any, metadata:DialectMetadata):string {
		let text = metadata.ddl('truncateTable')
		text = text.replace('{name}', metadata.delimiter(entity.mapping))
		return text
	}

	private createTable (entity:any, metadata:DialectMetadata):string {
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

		return (text)
	}

	private dropTable (entity:any, metadata:DialectMetadata):string {
		let text = metadata.ddl('dropTable')
		text = text.replace('{name}', metadata.delimiter(entity.mapping))
		return text
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

	private createFk (schema:SchemaHelper, entity:any, relation:Relation, metadata:DialectMetadata):string {
		const column = entity.property[relation.from]
		const fEntity = schema.getEntity(relation.entity)
		const fColumn = fEntity.property[relation.to]

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('createFk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', metadata.delimiter(column.mapping))
		text = text.replace('{fTable}', metadata.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', metadata.delimiter(fColumn.mapping))
		return alterEntity + ' ' + text
	}

	private createIndex (entity:any, index:Index, metadata:DialectMetadata):string {
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
		return text
	}

	private alterColumn (entity:any, property:Property, metadata:DialectMetadata):string {
		let type = metadata.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? metadata.other('notNullable') : ''

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = property.autoincrement ? metadata.ddl('incrementalColumDefine') : metadata.ddl('columnDefine')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		text = metadata.ddl('alterColumn').replace('{columnDefine}', text)
		return alterEntity + ' ' + text
	}

	private addColumn (entity:any, property:Property, metadata:DialectMetadata):string {
		let type = metadata.type(property.type)
		type = property.length ? type.replace('{0}', property.length.toString()) : type
		const nullable = property.nullable !== undefined && property.nullable === false ? metadata.other('notNullable') : ''

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = property.autoincrement ? metadata.ddl('incrementalColumDefine') : metadata.ddl('columnDefine')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		text = text.replace('{type}', type)
		text = text.replace('{nullable}', nullable)
		text = metadata.ddl('addColumn').replace('{columnDefine}', text)
		return alterEntity + ' ' + text
	}

	private addPk (entity:any, primaryKey:string[], metadata:DialectMetadata):string {
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
		return alterEntity + ' ' + text
	}

	private addUk (entity:any, uniqueKey:string[], metadata:DialectMetadata):string {
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
		return alterEntity + ' ' + text
	}

	private addFk (schema:SchemaHelper, entity:any, relation:Relation, metadata:DialectMetadata):string {
		const column = entity.property[relation.from]
		const fEntity = schema.getEntity(relation.entity)
		const fColumn = fEntity.property[relation.to]

		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('addFk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		text = text.replace('{column}', metadata.delimiter(column.mapping))
		text = text.replace('{fTable}', metadata.delimiter(fEntity.mapping))
		text = text.replace('{fColumn}', metadata.delimiter(fColumn.mapping))
		return alterEntity + ' ' + text
	}

	private dropColumn (entity:any, property:Property, metadata:DialectMetadata):string {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropColumn')
		text = text.replace('{name}', metadata.delimiter(property.mapping as string))
		return alterEntity + ' ' + text
	}

	private dropPk (entity:any, metadata:DialectMetadata):string {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropPk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_PK'))
		return alterEntity + ' ' + text
	}

	private dropUk (entity:any, metadata:DialectMetadata):string {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropUk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_UK'))
		return alterEntity + ' ' + text
	}

	private dropFk (entity:any, relation:Relation, metadata:DialectMetadata):string {
		const alterEntity = metadata.ddl('alterTable').replace('{name}', metadata.delimiter(entity.mapping))
		let text = metadata.ddl('dropFk')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + relation.name + '_FK'))
		return alterEntity + ' ' + text
	}

	private dropIndex (entity:any, index:Index, metadata:DialectMetadata):string {
		let text = metadata.ddl('dropIndex')
		text = text.replace('{name}', metadata.delimiter(entity.mapping + '_' + index.name))
		text = text.replace('{table}', metadata.delimiter(entity.mapping))
		return text
	}

	private changeRelation (a: Relation, b: Relation): boolean {
		return a.entity !== b.entity || a.from !== b.from || a.name !== b.name || a.to !== b.to || a.type !== b.type
	}
}
