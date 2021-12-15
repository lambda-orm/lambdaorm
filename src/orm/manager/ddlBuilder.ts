import { ConfigManager, ModelConfig, MappingConfig } from '.'
import { LanguageManager, DialectMetadata } from '../language'
import { Query, Delta, Index, DataSource, Relation, Entity, EntityMapping, PropertyMapping, IEvaluator } from '../model'

export class DDLBuilder {
	private languageManager: LanguageManager
	private config: ConfigManager
	private model:ModelConfig
	private evaluator:IEvaluator
	public dataSource: DataSource
	constructor (config: ConfigManager, evaluator:IEvaluator, languageManager:LanguageManager, dataSource: DataSource) {
		this.config = config
		this.model = config.model
		this.evaluator = evaluator
		this.languageManager = languageManager
		this.dataSource = dataSource
	}

	public async drop (entities: string[]): Promise<Query[]> {
		const queries:Query[] = []
		const sortedEntities = this.model.sortEntities(entities).reverse()
		// drop all constraint
		for (const p in sortedEntities) {
			const entityName = sortedEntities[p]
			const entity = this.model.getEntity(entityName) as Entity
			const dataSource = await this.getDatastore(entityName)

			if (entity.relations) {
				for (const q in entity.relations) {
					const relation = entity.relations[q] as Relation

					const relatedDatabase = await this.getDatastore(relation.entity)
					if (relatedDatabase.name !== dataSource.name) continue

					if (relation.type === 'oneToMany' || relation.type === 'oneToOne') {
						const query = this.builder(dataSource).dropFk(entity, relation)
						queries.push(query)
					}
				}
			}
		}
		// drop indexes and tables
		for (const i in sortedEntities) {
			const entityName = sortedEntities[i]
			const entity = this.model.getEntity(entityName) as Entity
			const dataSource = await this.getDatastore(entityName)
			if (entity.indexes) {
				for (const j in entity.indexes) {
					const index = entity.indexes[j]
					const query = this.builder(dataSource).dropIndex(entity, index)
					queries.push(query)
				}
			}
			const query = this.builder(dataSource).dropEntity(entity)
			queries.push(query)
		}
		return queries
	}

	public async truncate (entities: string[]):Promise<Query[]> {
		const queries:Query[] = []
		for (const i in entities) {
			const entityName = entities[i]
			const entity = this.model.getEntity(entityName) as Entity
			const dataSource = await this.getDatastore(entity.name)
			const query = this.builder(dataSource).truncateEntity(entity)
			queries.push(query)
		}
		return queries
	}

	public async sync (delta:Delta):Promise<Query[]> {
		const queries:Query[] = []
		// remove constraints for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			const dataSource = await this.getDatastore(entityChanged.name)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'primaryKey') {
					if (!changed.delta) continue
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					for (const n in changed.delta.remove) {
						const query = this.builder(dataSource).dropPk(entityChanged.old)
						queries.push(query)
					}
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
					for (const c in changed.delta.changed) {
						const query = this.builder(dataSource).dropPk(entityChanged.old)
						queries.push(query)
					}
				}
				if (changed.name === 'uniqueKey') {
					if (changed.delta) {
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						for (const n in changed.delta.remove) {
							const query = this.builder(dataSource).dropUk(entityChanged.old)
							queries.push(query)
						}
						// eslint-disable-next-line @typescript-eslint/no-unused-vars
						for (const c in changed.delta.changed) {
							const query = this.builder(dataSource).dropUk(entityChanged.old)
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
			const dataSource = await this.getDatastore(entityChanged.name)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'index') {
					if (!changed.delta) continue
					for (const c in changed.delta.changed) {
						const oldIndex = changed.delta.changed[c].old as Index
						const query = this.builder(dataSource).dropIndex(entityChanged.new, oldIndex)
						queries.push(query)
					}
					for (const r in changed.delta.remove) {
						const removeIndex = changed.delta.remove[r].old as Index
						const query = this.builder(dataSource).dropIndex(entityChanged.new, removeIndex)
						queries.push(query)
					}
				}
				if (changed.name === 'relation') {
					if (!changed.delta) continue
					for (const c in changed.delta.changed) {
						const newRelation = changed.delta.changed[c].new as Relation
						const oldRelation = changed.delta.changed[c].old as Relation

						const relatedDatabase = await this.getDatastore(newRelation.entity)
						if (relatedDatabase.name !== dataSource.name) continue

						if (this.changeRelation(oldRelation, newRelation)) {
							if (oldRelation.type === 'oneToMany' || oldRelation.type === 'oneToOne') {
								const query = this.builder(dataSource).dropFk(entityChanged.new, oldRelation)
								queries.push(query)
							}
						}
					}
					for (const r in changed.delta.remove) {
						const removeRelation = changed.delta.remove[r].old as Relation

						const relatedDatabase = await this.getDatastore(removeRelation.entity)
						if (relatedDatabase.name !== dataSource.name) continue

						const query = this.builder(dataSource).dropFk(entityChanged.new, removeRelation)
						queries.push(query)
					}
				}
			}
		}
		// remove indexes and tables for removed entities
		for (const name in delta.remove) {
			const removeEntity = delta.remove[name].old as EntityMapping
			const dataSource = await this.getDatastore(removeEntity.name)

			if (removeEntity.indexes) {
				for (const i in removeEntity.indexes) {
					const index = removeEntity.indexes[i]
					const query = this.builder(dataSource).dropIndex(removeEntity, index)
					queries.push(query)
				}
			}
			const query = this.builder(dataSource).dropEntity(removeEntity)
			queries.push(query)
		}
		// create tables
		for (const name in delta.new) {
			const newEntity = delta.new[name].new as EntityMapping
			const dataSource = await this.getDatastore(newEntity.name)
			const query = this.builder(dataSource).createEntity(newEntity)
			queries.push(query)
		}
		// add columns for entities changes
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			const dataSource = await this.getDatastore(entityChanged.name)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'property') {
					if (!changed.delta) continue
					for (const n in changed.delta.new) {
						const newProperty = changed.delta.new[n].new as PropertyMapping
						const query = this.builder(dataSource).addColumn(entityChanged.new, newProperty)
						queries.push(query)
					}
					for (const n in changed.delta.changed) {
						const newProperty = changed.delta.changed[n].new as PropertyMapping
						const oldProperty = changed.delta.changed[n].old as PropertyMapping
						if (newProperty.mapping === oldProperty.mapping) {
							const query = this.builder(dataSource).alterColumn(entityChanged.new, newProperty)
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
			const dataSource = await this.getDatastore(entityChanged.name)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'property') {
					if (!changed.delta) continue
					for (const n in changed.delta.remove) {
						const oldProperty = changed.delta.remove[n].old as PropertyMapping
						const query = this.builder(dataSource).dropColumn(entityChanged.old, oldProperty)
						queries.push(query)
					}
				}
			}
		}
		// create constraints for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			const dataSource = await this.getDatastore(entityChanged.name)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'primaryKey') {
					if (!changed.delta) continue
					for (const n in changed.delta.new) {
						const newPrimaryKey = changed.delta.new[n].new as string[]
						const query = this.builder(dataSource).addPk(entityChanged.new, newPrimaryKey)
						queries.push(query)
					}
					for (const c in changed.delta.changed) {
						const changePrimaryKey = changed.delta.changed[c].new as string[]
						const query = this.builder(dataSource).addPk(entityChanged.new, changePrimaryKey)
						queries.push(query)
					}
				}
				if (changed.name === 'uniqueKey') {
					if (changed.delta) {
						for (const n in changed.delta.new) {
							const newUniqueKey = changed.delta.new[n].new as string[]
							const query = this.builder(dataSource).addUk(entityChanged.new, newUniqueKey)
							queries.push(query)
						}
						for (const c in changed.delta.changed) {
							const chanegUniqueKey = changed.delta.changed[c].new as string[]
							const query = this.builder(dataSource).addUk(entityChanged.new, chanegUniqueKey)
							queries.push(query)
						}
					}
				}
			}
		}
		// create indexes and Fks for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			const dataSource = await this.getDatastore(entityChanged.name)
			for (const q in entityChanged.delta.changed) {
				const changed = entityChanged.delta.changed[q]
				if (changed.name === 'index') {
					if (!changed.delta) continue
					for (const n in changed.delta.new) {
						const newIndex = changed.delta.new[n].new as Index
						const query = this.builder(dataSource).createIndex(entityChanged.new, newIndex)
						queries.push(query)
					}
					for (const c in changed.delta.changed) {
						const changeIndex = changed.delta.changed[c].new as Index
						const query = this.builder(dataSource).createIndex(entityChanged.new, changeIndex)
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

							const relatedDatabase = await this.getDatastore(newRelation.entity)
							if (relatedDatabase.name !== dataSource.name) continue

							if (newRelation.type === 'oneToMany' || newRelation.type === 'oneToOne') {
								const query = this.builder(dataSource).addFk(entityChanged.new, newRelation)
								queries.push(query)
							}
						}
						for (const c in changed.delta.changed) {
							const newRelation = changed.delta.changed[c].new as Relation
							const oldRelation = changed.delta.changed[c].old as Relation

							const relatedDatabase = await this.getDatastore(newRelation.entity)
							if (relatedDatabase.name !== dataSource.name) continue

							if (this.changeRelation(oldRelation, newRelation)) {
								if (newRelation.type === 'oneToMany' || newRelation.type === 'oneToOne') {
									const query = this.builder(dataSource).addFk(entityChanged.new, newRelation)
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
			const dataSource = await this.getDatastore(newEntity.name)
			if (newEntity.indexes) {
				for (const i in newEntity.indexes) {
					const index = newEntity.indexes[i]
					const query = this.builder(dataSource).createIndex(newEntity, index)
					queries.push(query)
				}
			}
			if (newEntity.relations) {
				for (const p in newEntity.relations) {
					const relation = newEntity.relations[p]
					const relatedDatabase = await this.getDatastore(relation.entity)
					if (relatedDatabase.name !== dataSource.name) continue

					if (relation.type === 'oneToMany' || relation.type === 'oneToOne') {
						const query = this.builder(dataSource).addFk(newEntity, relation)
						queries.push(query)
					}
				}
			}
		}
		return queries
	}

	private async getDatastore (entity: string): Promise<DataSource> {
		const context = { entity: entity, action: 'ddl' }
		for (const i in this.dataSource.rules) {
			const rule = this.dataSource.rules[i]
			if (await this.evaluator.eval(rule.rule, context) === true) {
				return this.config.dataSource.get(rule.dataSource)
			}
		}
		return this.dataSource
	}

	private builder (dataSource: DataSource): LanguageDDLBuilder {
		return this.languageManager.ddlBuilder(dataSource)
	}

	private changeRelation (a: Relation, b: Relation): boolean {
		return a.entity !== b.entity || a.from !== b.from || a.name !== b.name || a.to !== b.to || a.type !== b.type
	}
}

export abstract class LanguageDDLBuilder {
	protected dataSource: string
	protected dialect:string
	protected mapping:MappingConfig
	protected metadata:DialectMetadata

	constructor (dataSource: string, mapping: MappingConfig, metadata: DialectMetadata) {
		this.dataSource = dataSource
		this.mapping = mapping
		this.metadata = metadata
		this.dialect = metadata.name
	}

	abstract truncateEntity(entity: Entity): Query
	abstract dropFk(entity: Entity, relation: Relation): Query
	abstract dropIndex(entity: Entity, index: Index): Query
	abstract dropEntity(entity: Entity): Query
	abstract dropPk(entity: Entity): Query
	abstract dropUk(entity: Entity): Query
	abstract createEntity(entity: Entity): Query
	abstract addColumn(entity: Entity, property: PropertyMapping): Query
	abstract alterColumn(entity: Entity, property: PropertyMapping): Query
	abstract dropColumn(entity: Entity, property: PropertyMapping): Query
	abstract addPk(entity: Entity, primaryKey: string[]): Query
	abstract addUk(entity: Entity, uniqueKey: string[]): Query
	abstract addFk(entity: Entity, relation: Relation): Query
	abstract createFk(entity: Entity, relation: Relation): Query
	abstract createIndex (entity:Entity, index:Index):Query
}
