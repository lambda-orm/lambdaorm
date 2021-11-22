import { ConfigManager, SchemaConfig } from '.'
import { LanguageManager, DialectMetadata } from '../language'
import { Query, Delta, Index, Datastore, Relation, PropertyMapping, IEvaluator, EntityMapping } from '../model'

export class DDLBuilder {
	private languageManager: LanguageManager
	private config: ConfigManager
	private evaluator:IEvaluator
	public dialect: string
	constructor (config: ConfigManager, evaluator:IEvaluator, languageManager:LanguageManager, dialect: string) {
		this.config = config
		this.evaluator = evaluator
		this.languageManager = languageManager
		this.dialect = dialect
	}

	public async drop (schema:SchemaConfig):Promise<Query[]> {
		const entities = schema.sortEntities(schema.listEntities()).reverse()
		const queries:Query[] = []
		// drop all constraint
		for (const p in entities) {
			const entityName = entities[p]
			const entity = schema.getEntity(entityName) as EntityMapping

			const metadata = this.languageManager.dialectMetadata(this.dialect)
			if (entity.relations) {
				for (const q in entity.relations) {
					const relation = entity.relations[q] as Relation

					if (relation.type === 'oneToMany' || relation.type === 'oneToOne') {
						const query = this.builder(this.dialect).dropFk(entity, relation, metadata)
						queries.push(query)
					}
				}
			}
		}
		// drop indexes and tables
		for (const i in entities) {
			const entityName = entities[i]
			const entity = schema.getEntity(entityName) as EntityMapping

			const metadata = this.languageManager.dialectMetadata(this.dialect)
			if (entity.indexes) {
				for (const j in entity.indexes) {
					const index = entity.indexes[j]
					const query = this.builder(this.dialect).dropIndex(entity, index, metadata)
					queries.push(query)
				}
			}
			const query = this.builder(this.dialect).dropEntity(entity, metadata)
			queries.push(query)
		}
		return queries
	}

	public async truncate (schema:SchemaConfig):Promise<Query[]> {
		const queries:Query[] = []
		for (const i in schema.entities) {
			const entity = schema.entities[i]

			const metadata = this.languageManager.dialectMetadata(this.dialect)
			const query = this.builder(this.dialect).truncateEntity(entity, metadata)
			queries.push(query)
		}
		return queries
	}

	public async sync (delta:Delta, schema:SchemaConfig):Promise<Query[]> {
		const queries:Query[] = []
		// remove constraints for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue

			const metadata = this.languageManager.dialectMetadata(this.dialect)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'primaryKey') {
					if (!changed.delta) continue
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					for (const n in changed.delta.remove) {
						const query = this.builder(this.dialect).dropPk(entityChanged.old, metadata)
						queries.push(query)
						// const sentence = this.dropPk(entityChanged.old, metadata)
						// queries.push(new Query('dropPk', [], metadata.name, sentence, entityChanged.name))
					}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					for (const c in changed.delta.changed) {
						const query = this.builder(this.dialect).dropPk(entityChanged.old, metadata)
						queries.push(query)
						// const sentence = this.dropPk(entityChanged.old, metadata)
						// queries.push(new Query('dropPk', [], metadata.name, sentence, entityChanged.name))
					}
				}
				if (changed.name === 'uniqueKey') {
					if (changed.delta) {
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						for (const n in changed.delta.remove) {
							const query = this.builder(this.dialect).dropUk(entityChanged.old, metadata)
							queries.push(query)
							// const sentence = this.dropUk(entityChanged.old, metadata)
							// queries.push(new Query('dropUk', [], metadata.name, sentence, entityChanged.name))
						}
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						for (const c in changed.delta.changed) {
							const query = this.builder(this.dialect).dropUk(entityChanged.old, metadata)
							queries.push(query)
							// const sentence = this.dropUk(entityChanged.old, metadata)
							// queries.push(new Query('dropUk', [], metadata.name, sentence, entityChanged.name))
						}
					}
				}
			}
		}
		// remove indexes and Fks for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue

			const metadata = this.languageManager.dialectMetadata(this.dialect)

			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'index') {
					if (!changed.delta) continue
					for (const c in changed.delta.changed) {
						const oldIndex = changed.delta.changed[c].old as Index
						const query = this.builder(this.dialect).dropIndex(entityChanged.new, oldIndex, metadata)
						queries.push(query)
						// const sentence = this.dropIndex(entityChanged.new, oldIndex, metadata)
						// queries.push(new Query('dropIndex', [], metadata.name, sentence, entityChanged.name))
					}
					for (const r in changed.delta.remove) {
						const removeIndex = changed.delta.remove[r].old as Index
						const query = this.builder(this.dialect).dropIndex(entityChanged.new, removeIndex, metadata)
						queries.push(query)
						// const sentence = this.dropIndex(entityChanged.new, removeIndex, metadata)
						// queries.push(new Query('dropIndex', [], metadata.name, sentence, entityChanged.name))
					}
				}
				if (changed.name === 'relation') {
					if (!changed.delta) continue
					for (const c in changed.delta.changed) {
						const newRelation = changed.delta.changed[c].new as Relation
						const oldRelation = changed.delta.changed[c].old as Relation

						if (this.changeRelation(oldRelation, newRelation)) {
							if (oldRelation.type === 'oneToMany' || oldRelation.type === 'oneToOne') {
								const query = this.builder(this.dialect).dropFk(entityChanged.new, oldRelation, metadata)
								queries.push(query)
								// const sentence = this.dropFk(entityChanged.new, oldRelation, metadata)
								// queries.push(new Query('dropFk', [], metadata.name, sentence, entityChanged.name))
							}
						}
					}
					for (const r in changed.delta.remove) {
						const removeRelation = changed.delta.remove[r].old as Relation

						const query = this.builder(this.dialect).dropFk(entityChanged.new, removeRelation, metadata)
						queries.push(query)
						// const sentence = this.dropFk(entityChanged.new, removeRelation, metadata)
						// queries.push(new Query('dropFk', [], metadata.name, sentence, entityChanged.name))
					}
				}
			}
		}
		// remove indexes and tables for removed entities
		for (const name in delta.remove) {
			const removeEntity = delta.remove[name].old

			const metadata = this.languageManager.dialectMetadata(this.dialect)

			if (removeEntity.index) {
				for (const indexName in removeEntity.index) {
					const query = this.builder(this.dialect).dropIndex(removeEntity, removeEntity.index[indexName], metadata)
					queries.push(query)
					// const sentence = this.dropIndex(removeEntity, removeEntity.index[indexName], metadata)
					// queries.push(new Query('dropIndex', [], metadata.name, sentence, removeEntity.name))
				}
			}
			const query = this.builder(this.dialect).dropEntity(removeEntity, metadata)
			queries.push(query)
			// const sentence = this.dropEntity(removeEntity, metadata)
			// queries.push(new Query('dropTable', [], metadata.name, sentence, name))
		}
		// create tables
		for (const name in delta.new) {
			const newEntity = delta.new[name].new

			const metadata = this.languageManager.dialectMetadata(this.dialect)
			const query = this.builder(this.dialect).createEntity(newEntity, metadata)
			queries.push(query)
			// const sentence = this.createTable(newEntity, metadata)
			// queries.push(new Query('createTable', [], metadata.name, sentence, name))
		}
		// add columns for entities changes
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue

			const metadata = this.languageManager.dialectMetadata(this.dialect)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'property') {
					if (!changed.delta) continue
					for (const n in changed.delta.new) {
						const newProperty = changed.delta.new[n].new as PropertyMapping
						const query = this.builder(this.dialect).addColumn(entityChanged.new, newProperty, metadata)
						queries.push(query)
						// const sentence = this.addColumn(entityChanged.new, newProperty, metadata)
						// queries.push(new Query('addColumn', [], metadata.name, sentence, entityChanged.name))
					}
					for (const n in changed.delta.changed) {
						const newProperty = changed.delta.changed[n].new as PropertyMapping
						const oldProperty = changed.delta.changed[n].old as PropertyMapping
						if (newProperty.mapping === oldProperty.mapping) {
							const query = this.builder(this.dialect).alterColumn(entityChanged.new, newProperty, metadata)
							queries.push(query)
							// const sentence = this.alterColumn(entityChanged.new, newProperty, metadata)
							// queries.push(new Query('alterColumn', [], metadata.name, sentence, entityChanged.name))
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

			const metadata = this.languageManager.dialectMetadata(this.dialect)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'property') {
					if (!changed.delta) continue
					for (const n in changed.delta.remove) {
						const oldProperty = changed.delta.remove[n].old as PropertyMapping
						const query = this.builder(this.dialect).dropColumn(entityChanged.old, oldProperty, metadata)
						queries.push(query)
						// const sentence = this.dropColumn(entityChanged.old, oldProperty, metadata)
						// queries.push(new Query('dropColumn', [], metadata.name, sentence, entityChanged.name))
					}
				}
			}
		}
		// create constraints for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue

			const metadata = this.languageManager.dialectMetadata(this.dialect)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'primaryKey') {
					if (!changed.delta) continue
					for (const n in changed.delta.new) {
						const newPrimaryKey = changed.delta.new[n].new as string[]
						const query = this.builder(this.dialect).addPk(entityChanged.new, newPrimaryKey, metadata)
						queries.push(query)
						// const sentence = this.addPk(entityChanged.new, newPrimaryKey, metadata)
						// queries.push(new Query('addPk', [], metadata.name, sentence, entityChanged.name))
					}
					for (const c in changed.delta.changed) {
						const changePrimaryKey = changed.delta.changed[c].new as string[]
						const query = this.builder(this.dialect).addPk(entityChanged.new, changePrimaryKey, metadata)
						queries.push(query)
						// const sentence = this.addPk(entityChanged.new, changePrimaryKey, metadata)
						// queries.push(new Query('addPk', [], metadata.name, sentence, entityChanged.name))
					}
				}
				if (changed.name === 'uniqueKey') {
					if (changed.delta) {
						for (const n in changed.delta.new) {
							const newUniqueKey = changed.delta.new[n].new as string[]
							const query = this.builder(this.dialect).addUk(entityChanged.new, newUniqueKey, metadata)
							queries.push(query)
							// const sentence = this.addUk(entityChanged.new, newUniqueKey, metadata)
							// queries.push(new Query('addUk', [], metadata.name, sentence, entityChanged.name))
						}
						for (const c in changed.delta.changed) {
							const chanegUniqueKey = changed.delta.changed[c].new as string[]
							const query = this.builder(this.dialect).addUk(entityChanged.new, chanegUniqueKey, metadata)
							queries.push(query)
							// const sentence = this.addUk(entityChanged.new, chanegUniqueKey, metadata)
							// queries.push(new Query('addUk', [], metadata.name, sentence, entityChanged.name))
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

			const metadata = this.languageManager.dialectMetadata(this.dialect)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'index') {
					if (!changed.delta) continue
					for (const n in changed.delta.new) {
						const newIndex = changed.delta.new[n].new as Index
						const query = this.builder(this.dialect).createIndex(entityChanged.new, newIndex, metadata)
						queries.push(query)
						// const sentence = this.createIndex(entityChanged.new, newIndex, metadata)
						// queries.push(new Query('createIndex', [], metadata.name, sentence, entityChanged.name))
					}
					for (const c in changed.delta.changed) {
						const changeIndex = changed.delta.changed[c].new as Index
						const query = this.builder(this.dialect).createIndex(entityChanged.new, changeIndex, metadata)
						queries.push(query)
						// const sentence = this.createIndex(entityChanged.new, changeIndex, metadata)
						// queries.push(new Query('createIndex', [], metadata.name, sentence, entityChanged.name))
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
								const query = this.builder(this.dialect).addFk(schema, entityChanged.new, newRelation, metadata)
								queries.push(query)
								// const sentence = this.addFk(schema, entityChanged.new, newRelation, metadata)
								// queries.push(new Query('addFk', [], metadata.name, sentence, entityChanged.name))
							}
						}
						for (const c in changed.delta.changed) {
							const newRelation = changed.delta.changed[c].new as Relation
							const oldRelation = changed.delta.changed[c].old as Relation

							if (this.changeRelation(oldRelation, newRelation)) {
								if (newRelation.type === 'oneToMany' || newRelation.type === 'oneToOne') {
									const query = this.builder(this.dialect).addFk(schema, entityChanged.new, newRelation, metadata)
									queries.push(query)
									// const sentence = this.addFk(schema, entityChanged.new, newRelation, metadata)
									// queries.push(new Query('addFk', [], metadata.name, sentence, entityChanged.name))
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

			const metadata = this.languageManager.dialectMetadata(this.dialect)
			if (newEntity.index) {
				for (const name in newEntity.index) {
					const query = this.builder(this.dialect).createIndex(newEntity, newEntity.index[name], metadata)
					queries.push(query)
					// const sentence = this.createIndex(newEntity, newEntity.index[name], metadata)
					// queries.push(new Query('createIndex', [], metadata.name, sentence, newEntity.name))
				}
			}
			if (newEntity.relation) {
				for (const name in newEntity.relation) {
					const relation = newEntity.relation[name] as Relation

					if (relation.type === 'oneToMany' || relation.type === 'oneToOne') {
						const query = this.builder(this.dialect).addFk(schema, newEntity, newEntity.relation[name], metadata)
						queries.push(query)
						// const sentence = this.addFk(schema, newEntity, newEntity.relation[name], metadata)
						// queries.push(new Query('addFk', [], metadata.name, sentence, newEntity.name))
					}
				}
			}
		}
		return queries
	}

	private builder (dialect:string):LanguageDDLBuilder {
		return this.languageManager.ddlBuilder(dialect)
	}

	private changeRelation (a: Relation, b: Relation): boolean {
		return a.entity !== b.entity || a.from !== b.from || a.name !== b.name || a.to !== b.to || a.type !== b.type
	}
}

export abstract class LanguageDDLBuilder {
	abstract truncateEntity(entity: any, metadata: DialectMetadata): Query
	abstract dropFk(entity: any, relation: Relation, metadata: DialectMetadata): Query
	abstract dropIndex(entity: any, index: Index, metadata: DialectMetadata): Query
	abstract dropEntity(entity: any, metadata: DialectMetadata): Query
	abstract dropPk(entity: any, metadata: DialectMetadata): Query
	abstract dropUk(entity: any, metadata: DialectMetadata): Query
	abstract createEntity(entity: any, metadata: DialectMetadata): Query
	abstract addColumn(entity: any, property: PropertyMapping, metadata: DialectMetadata): Query
	abstract alterColumn(entity: any, property: PropertyMapping, metadata: DialectMetadata): Query
	abstract dropColumn(entity: any, property: PropertyMapping, metadata: DialectMetadata): Query
	abstract addPk(entity: any, primaryKey: string[], metadata: DialectMetadata): Query
	abstract addUk(entity: any, uniqueKey: string[], metadata: DialectMetadata): Query
	abstract addFk(schema: SchemaConfig, entity: any, relation: Relation, metadata: DialectMetadata): Query
	abstract createFk(schema: SchemaConfig, entity: any, relation: Relation, metadata: DialectMetadata): Query
	abstract createIndex (entity:any, index:Index, metadata:DialectMetadata):Query
}
