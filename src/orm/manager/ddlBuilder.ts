import { ConfigManager, SchemaConfig } from '.'
import { LanguageManager, DialectMetadata } from '../language'
import { Query, Delta, Index, Datastore, Relation, EntityMapping, PropertyMapping, IEvaluator } from '../model'

export class DDLBuilder {
	private languageManager: LanguageManager
	private config: ConfigManager
	private evaluator:IEvaluator
	public datastore: Datastore
	constructor (config: ConfigManager, evaluator:IEvaluator, languageManager:LanguageManager, datastore: Datastore) {
		this.config = config
		this.evaluator = evaluator
		this.languageManager = languageManager
		this.datastore = datastore
	}

	public async drop (schema:SchemaConfig):Promise<Query[]> {
		const entities = schema.sortEntities(schema.listEntities()).reverse()
		const queries:Query[] = []
		// drop all constraint
		for (const p in entities) {
			const entityName = entities[p]
			const entity = schema.getEntity(entityName) as EntityMapping
			const datastore = await this.getDatabase(entityName)
			const metadata = this.languageManager.dialectMetadata(datastore.dialect)
			if (entity.relations) {
				for (const q in entity.relations) {
					const relation = entity.relations[q] as Relation

					const relatedDatabase = await this.getDatabase(relation.entity)
					if (relatedDatabase.name !== datastore.name) continue

					if (relation.type === 'oneToMany' || relation.type === 'oneToOne') {
						const query = this.builder(datastore.dialect).dropFk(datastore.name, entity, relation, metadata)
						queries.push(query)
					}
				}
			}
		}
		// drop indexes and tables
		for (const i in entities) {
			const entityName = entities[i]
			const entity = schema.getEntity(entityName) as EntityMapping
			const datastore = await this.getDatabase(entityName)
			const metadata = this.languageManager.dialectMetadata(datastore.dialect)
			if (entity.indexes) {
				for (const j in entity.indexes) {
					const index = entity.indexes[j]
					const query = this.builder(datastore.dialect).dropIndex(datastore.name, entity, index, metadata)
					queries.push(query)
				}
			}
			const query = this.builder(datastore.dialect).dropEntity(datastore.name, entity, metadata)
			queries.push(query)
		}
		return queries
	}

	public async truncate (schema:SchemaConfig):Promise<Query[]> {
		const queries:Query[] = []
		for (const i in schema.entities) {
			const entity = schema.entities[i] as EntityMapping
			const datastore = await this.getDatabase(entity.name)
			const metadata = this.languageManager.dialectMetadata(datastore.dialect)
			const query = this.builder(datastore.dialect).truncateEntity(datastore.name, entity, metadata)
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
			const datastore = await this.getDatabase(entityChanged.name)
			const metadata = this.languageManager.dialectMetadata(datastore.dialect)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'primaryKey') {
					if (!changed.delta) continue
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					for (const n in changed.delta.remove) {
						const query = this.builder(datastore.dialect).dropPk(datastore.name, entityChanged.old, metadata)
						queries.push(query)
					}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					for (const c in changed.delta.changed) {
						const query = this.builder(datastore.dialect).dropPk(datastore.name, entityChanged.old, metadata)
						queries.push(query)
					}
				}
				if (changed.name === 'uniqueKey') {
					if (changed.delta) {
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						for (const n in changed.delta.remove) {
							const query = this.builder(datastore.dialect).dropUk(datastore.name, entityChanged.old, metadata)
							queries.push(query)
						}
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						for (const c in changed.delta.changed) {
							const query = this.builder(datastore.dialect).dropUk(datastore.name, entityChanged.old, metadata)
							queries.push(query)
						}
					}
				}
			}
		}
		// remove indexes and Fks for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			const datastore = await this.getDatabase(entityChanged.name)
			const metadata = this.languageManager.dialectMetadata(datastore.dialect)

			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'index') {
					if (!changed.delta) continue
					for (const c in changed.delta.changed) {
						const oldIndex = changed.delta.changed[c].old as Index
						const query = this.builder(datastore.dialect).dropIndex(datastore.name, entityChanged.new, oldIndex, metadata)
						queries.push(query)
					}
					for (const r in changed.delta.remove) {
						const removeIndex = changed.delta.remove[r].old as Index
						const query = this.builder(datastore.dialect).dropIndex(datastore.name, entityChanged.new, removeIndex, metadata)
						queries.push(query)
					}
				}
				if (changed.name === 'relation') {
					if (!changed.delta) continue
					for (const c in changed.delta.changed) {
						const newRelation = changed.delta.changed[c].new as Relation
						const oldRelation = changed.delta.changed[c].old as Relation

						const relatedDatabase = await this.getDatabase(newRelation.entity)
						if (relatedDatabase.name !== datastore.name) continue

						if (this.changeRelation(oldRelation, newRelation)) {
							if (oldRelation.type === 'oneToMany' || oldRelation.type === 'oneToOne') {
								const query = this.builder(datastore.dialect).dropFk(datastore.name, entityChanged.new, oldRelation, metadata)
								queries.push(query)
							}
						}
					}
					for (const r in changed.delta.remove) {
						const removeRelation = changed.delta.remove[r].old as Relation

						const relatedDatabase = await this.getDatabase(removeRelation.entity)
						if (relatedDatabase.name !== datastore.name) continue

						const query = this.builder(datastore.dialect).dropFk(datastore.name, entityChanged.new, removeRelation, metadata)
						queries.push(query)
					}
				}
			}
		}
		// remove indexes and tables for removed entities
		for (const name in delta.remove) {
			const removeEntity = delta.remove[name].old as EntityMapping
			const datastore = await this.getDatabase(removeEntity.name)
			const metadata = this.languageManager.dialectMetadata(datastore.dialect)

			if (removeEntity.indexes) {
				for (const i in removeEntity.indexes) {
					const index = removeEntity.indexes[i]
					const query = this.builder(datastore.dialect).dropIndex(datastore.name, removeEntity, index, metadata)
					queries.push(query)
				}
			}
			const query = this.builder(datastore.dialect).dropEntity(datastore.name, removeEntity, metadata)
			queries.push(query)
		}
		// create tables
		for (const name in delta.new) {
			const newEntity = delta.new[name].new as EntityMapping
			const datastore = await this.getDatabase(newEntity.name)
			const metadata = this.languageManager.dialectMetadata(datastore.dialect)
			const query = this.builder(datastore.dialect).createEntity(datastore.name, newEntity, metadata)
			queries.push(query)
		}
		// add columns for entities changes
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			const datastore = await this.getDatabase(entityChanged.name)
			const metadata = this.languageManager.dialectMetadata(datastore.dialect)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'property') {
					if (!changed.delta) continue
					for (const n in changed.delta.new) {
						const newProperty = changed.delta.new[n].new as PropertyMapping
						const query = this.builder(datastore.dialect).addColumn(datastore.name, entityChanged.new, newProperty, metadata)
						queries.push(query)
					}
					for (const n in changed.delta.changed) {
						const newProperty = changed.delta.changed[n].new as PropertyMapping
						const oldProperty = changed.delta.changed[n].old as PropertyMapping
						if (newProperty.mapping === oldProperty.mapping) {
							const query = this.builder(datastore.dialect).alterColumn(datastore.name, entityChanged.new, newProperty, metadata)
							queries.push(query)
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
			const datastore = await this.getDatabase(entityChanged.name)
			const metadata = this.languageManager.dialectMetadata(datastore.dialect)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'property') {
					if (!changed.delta) continue
					for (const n in changed.delta.remove) {
						const oldProperty = changed.delta.remove[n].old as PropertyMapping
						const query = this.builder(datastore.dialect).dropColumn(datastore.name, entityChanged.old, oldProperty, metadata)
						queries.push(query)
					}
				}
			}
		}
		// create constraints for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			const datastore = await this.getDatabase(entityChanged.name)
			const metadata = this.languageManager.dialectMetadata(datastore.dialect)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'primaryKey') {
					if (!changed.delta) continue
					for (const n in changed.delta.new) {
						const newPrimaryKey = changed.delta.new[n].new as string[]
						const query = this.builder(datastore.dialect).addPk(datastore.name, entityChanged.new, newPrimaryKey, metadata)
						queries.push(query)
					}
					for (const c in changed.delta.changed) {
						const changePrimaryKey = changed.delta.changed[c].new as string[]
						const query = this.builder(datastore.dialect).addPk(datastore.name, entityChanged.new, changePrimaryKey, metadata)
						queries.push(query)
					}
				}
				if (changed.name === 'uniqueKey') {
					if (changed.delta) {
						for (const n in changed.delta.new) {
							const newUniqueKey = changed.delta.new[n].new as string[]
							const query = this.builder(datastore.dialect).addUk(datastore.name, entityChanged.new, newUniqueKey, metadata)
							queries.push(query)
						}
						for (const c in changed.delta.changed) {
							const chanegUniqueKey = changed.delta.changed[c].new as string[]
							const query = this.builder(datastore.dialect).addUk(datastore.name, entityChanged.new, chanegUniqueKey, metadata)
							queries.push(query)
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
			const datastore = await this.getDatabase(entityChanged.name)
			const metadata = this.languageManager.dialectMetadata(datastore.dialect)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'index') {
					if (!changed.delta) continue
					for (const n in changed.delta.new) {
						const newIndex = changed.delta.new[n].new as Index
						const query = this.builder(datastore.dialect).createIndex(datastore.name, entityChanged.new, newIndex, metadata)
						queries.push(query)
					}
					for (const c in changed.delta.changed) {
						const changeIndex = changed.delta.changed[c].new as Index
						const query = this.builder(datastore.dialect).createIndex(datastore.name, entityChanged.new, changeIndex, metadata)
						queries.push(query)
					}
					// for(const r in changed.delta.remove){
					//     let removeIndex=changed.delta.remove[r]
					// }
				}
				if (changed.name === 'relation') {
					if (changed.delta) {
						for (const n in changed.delta.new) {
							const newRelation = changed.delta.new[n].new as Relation

							const relatedDatabase = await this.getDatabase(newRelation.entity)
							if (relatedDatabase.name !== datastore.name) continue

							if (newRelation.type === 'oneToMany' || newRelation.type === 'oneToOne') {
								const query = this.builder(datastore.dialect).addFk(datastore.name, schema, entityChanged.new, newRelation, metadata)
								queries.push(query)
							}
						}
						for (const c in changed.delta.changed) {
							const newRelation = changed.delta.changed[c].new as Relation
							const oldRelation = changed.delta.changed[c].old as Relation

							const relatedDatabase = await this.getDatabase(newRelation.entity)
							if (relatedDatabase.name !== datastore.name) continue

							if (this.changeRelation(oldRelation, newRelation)) {
								if (newRelation.type === 'oneToMany' || newRelation.type === 'oneToOne') {
									const query = this.builder(datastore.dialect).addFk(datastore.name, schema, entityChanged.new, newRelation, metadata)
									queries.push(query)
								}
							}
						}
					}
				}
			}
		}
		// create indexes and Fks for new entities
		for (const name in delta.new) {
			const newEntity = delta.new[name].new as EntityMapping
			const datastore = await this.getDatabase(newEntity.name)
			const metadata = this.languageManager.dialectMetadata(datastore.dialect)
			if (newEntity.indexes) {
				for (const i in newEntity.indexes) {
					const index = newEntity.indexes[i]
					const query = this.builder(datastore.dialect).createIndex(datastore.name, newEntity, index, metadata)
					queries.push(query)
				}
			}
			if (newEntity.relations) {
				for (const p in newEntity.relations) {
					const relation = newEntity.relations[p]
					const relatedDatabase = await this.getDatabase(relation.entity)
					if (relatedDatabase.name !== datastore.name) continue

					if (relation.type === 'oneToMany' || relation.type === 'oneToOne') {
						const query = this.builder(datastore.dialect).addFk(datastore.name, schema, newEntity, relation, metadata)
						queries.push(query)
					}
				}
			}
		}
		return queries
	}

	private async getDatabase (entity: string): Promise<Datastore> {
		const context = { entity: entity, action: 'ddl' }
		for (const i in this.datastore.rules) {
			const rule = this.datastore.rules[i]
			if (await this.evaluator.eval(rule.rule, context) === true) {
				return this.config.datastore.get(rule.datastore)
			}
		}
		return this.datastore
	}

	// private getDatabase (schema:SchemaConfig, entity: string): Datastore {
	// if (entity !== undefined) {
	// const _entity = schema.getEntity(entity) as Entity
	// if (_entity.datastore !== undefined && _entity.datastore !== this.datastore.name) {
	// return this.config.datastore.get(_entity.datastore)
	// }
	// }
	// return this.datastore
	// }

	private builder (dialect:string):LanguageDDLBuilder {
		return this.languageManager.ddlBuilder(dialect)
	}

	private changeRelation (a: Relation, b: Relation): boolean {
		return a.entity !== b.entity || a.from !== b.from || a.name !== b.name || a.to !== b.to || a.type !== b.type
	}
}

export abstract class LanguageDDLBuilder {
	abstract truncateEntity(datastore: string, entity: EntityMapping, metadata: DialectMetadata): Query
	abstract dropFk(datastore: string, entity: EntityMapping, relation: Relation, metadata: DialectMetadata): Query
	abstract dropIndex(datastore: string, entity: EntityMapping, index: Index, metadata: DialectMetadata): Query
	abstract dropEntity(datastore: string, entity: EntityMapping, metadata: DialectMetadata): Query
	abstract dropPk(datastore: string, entity: EntityMapping, metadata: DialectMetadata): Query
	abstract dropUk(datastore: string, entity: EntityMapping, metadata: DialectMetadata): Query
	abstract createEntity(datastore: string, entity: EntityMapping, metadata: DialectMetadata): Query
	abstract addColumn(datastore: string, entity: EntityMapping, property: PropertyMapping, metadata: DialectMetadata): Query
	abstract alterColumn(datastore: string, entity: EntityMapping, property: PropertyMapping, metadata: DialectMetadata): Query
	abstract dropColumn(datastore: string, entity: EntityMapping, property: PropertyMapping, metadata: DialectMetadata): Query
	abstract addPk(datastore: string, entity: EntityMapping, primaryKey: string[], metadata: DialectMetadata): Query
	abstract addUk(datastore: string, entity: EntityMapping, uniqueKey: string[], metadata: DialectMetadata): Query
	abstract addFk(datastore: string, schema: SchemaConfig, entity: EntityMapping, relation: Relation, metadata: DialectMetadata): Query
	abstract createFk(datastore: string, schema: SchemaConfig, entity: EntityMapping, relation: Relation, metadata: DialectMetadata): Query
	abstract createIndex (datastore:string, entity:EntityMapping, index:Index, metadata:DialectMetadata):Query
}
