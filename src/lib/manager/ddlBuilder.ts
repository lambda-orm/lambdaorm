import { SchemaManager, ModelConfig, MappingConfig, Routing } from '.'
import { LanguageManager, DialectMetadata } from '../language'
import { Mapping, RuleDataSource, Query, Delta, Index, DataSource, Relation, EntityMapping, PropertyMapping, SentenceInfo, SchemaError } from '../model'
import { Helper } from '../manager/helper'

export class DDLBuilder {
	private languageManager: LanguageManager
	private schema: SchemaManager
	private model:ModelConfig
	private routing:Routing
	public stage: string
	constructor (schema: SchemaManager, routing:Routing, languageManager:LanguageManager, stage: string) {
		this.schema = schema
		this.model = schema.model
		this.routing = routing
		this.languageManager = languageManager
		this.stage = stage
	}

	public drop (mappings: Mapping[]):Query[] {
		const queries:Query[] = []
		const stage = this.schema.stage.get(this.stage)
		for (const k in stage.dataSources) {
			const ruleDataSource = stage.dataSources[k]
			const dataSource = this.schema.dataSource.get(ruleDataSource.name)
			const mapping = mappings.find(p => p.name === dataSource.mapping)
			if (mapping !== undefined) {
				this._drop(dataSource, ruleDataSource, mapping.entities, queries)
			}
		}
		return queries
	}

	public truncate (mappings: Mapping[]):Query[] {
		const queries:Query[] = []
		const stage = this.schema.stage.get(this.stage)
		for (const k in stage.dataSources) {
			const ruleDataSource = stage.dataSources[k]
			const dataSource = this.schema.dataSource.get(ruleDataSource.name)
			const mapping = mappings.find(p => p.name === dataSource.mapping)
			if (mapping !== undefined) {
				this._truncate(dataSource, ruleDataSource, mapping.entities, queries)
			}
		}
		return queries
	}

	public sync (mappings: Mapping[]): Query[] {
		const queries:Query[] = []
		const stage = this.schema.stage.get(this.stage)
		for (const k in stage.dataSources) {
			const ruleDataSource = stage.dataSources[k]
			const dataSource = this.schema.dataSource.get(ruleDataSource.name)
			const oldMapping = mappings.find(p => p.name === dataSource.mapping)
			const oldEntities = oldMapping !== undefined && oldMapping.entities !== undefined ? oldMapping.entities : null
			const currentMapping = this.schema.mapping.mappings.find(p => p.name === dataSource.mapping)
			const currnetEntities = currentMapping !== undefined && currentMapping.entities !== undefined ? currentMapping.entities : null
			const delta = Helper.deltaWithSimpleArrays(currnetEntities, oldEntities)
			this._sync(dataSource, ruleDataSource, delta, queries)
		}
		return queries
	}

	private _drop (dataSource:DataSource, ruleDataSource:RuleDataSource, entitiesMapping: EntityMapping[], queries:Query[]):void {
		const entities = entitiesMapping.map(p => p.name)
		const sortedEntities = this.model.sortByDependencies(entities)
		// drop all constraint
		for (const p in sortedEntities) {
			const entityName = sortedEntities[p]
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityName)) {
				const entity = entitiesMapping.find(p => p.name === entityName)
				if (entity === undefined) {
					throw new SchemaError(`entity ${entityName} not found in mapping for drop constraint action`)
				}
				if (entity.relations && !entity.view) {
					for (const q in entity.relations) {
						const relation = entity.relations[q] as Relation
						// evaluate if entity relation apply in dataSource
						if (this.evalDataSource(ruleDataSource, relation.entity)) {
							if (!relation.weak) {
								// busca la propiedad relacionada para saber si es nullable la relacion
								const fromProperty = entity.properties.find(p => p.name === relation.from)
								if (fromProperty === undefined) {
									throw new SchemaError(`property ${relation.from} not found in ${entity.name} `)
								}
								const isNullable = fromProperty.nullable !== undefined ? fromProperty.nullable : true
								if (isNullable) {
									const query = this.builder(dataSource).setNull(entity, relation)
									queries.push(query)
								}
								const query = this.builder(dataSource).dropFk(entity, relation)
								queries.push(query)
							}
						}
					}
				}
			}
		}
		// drop indexes and tables
		for (const i in sortedEntities) {
			const entityName = sortedEntities[i]
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityName)) {
				// const entity = this.model.getEntity(entityName) as Entity
				const entity = entitiesMapping.find(p => p.name === entityName)
				if (entity === undefined) {
					throw new SchemaError(`entity ${entityName} not found in mapping for drop indexes action`)
				}
				if (!entity.view) {
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
			}
		}
	}

	private _truncate (dataSource: DataSource, ruleDataSource: RuleDataSource, entitiesMapping: EntityMapping[], queries: Query[]): void {
		const entities = entitiesMapping.map(p => p.name)
		const sortedEntities = this.model.sortByDependencies(entities)
		for (const i in sortedEntities) {
			const entityName = sortedEntities[i]
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityName)) {
				// const entity = this.model.getEntity(entityName) as Entity
				const entity = entitiesMapping.find(p => p.name === entityName)
				if (entity === undefined) {
					throw new SchemaError(`entity ${entityName} not found in mapping for truncate action`)
				}
				if (!entity.view) {
					const query = this.builder(dataSource).truncateEntity(entity)
					queries.push(query)
				}
			}
		}
	}

	public _sync (dataSource:DataSource, ruleDataSource:RuleDataSource, delta:Delta, queries:Query[]):void {
		// remove constraints for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			// if entity is view is excluded
			if ((entityChanged.old as EntityMapping).view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityChanged.name)) {
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
		}
		// remove indexes and Fks for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			// if entity is view is excluded
			if ((entityChanged.old as EntityMapping).view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityChanged.name)) {
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

							// evaluate if entity relation apply in dataSource
							if (this.evalDataSource(ruleDataSource, newRelation.entity)) {
								if (this.changeRelation(oldRelation, newRelation)) {
									if (!oldRelation.weak) {
										const query = this.builder(dataSource).dropFk(entityChanged.new, oldRelation)
										queries.push(query)
									}
								}
							}
						}
						for (const r in changed.delta.remove) {
							const removeRelation = changed.delta.remove[r].old as Relation
							// evaluate if entity relation apply in dataSource
							if (this.evalDataSource(ruleDataSource, removeRelation.entity)) {
								const query = this.builder(dataSource).dropFk(entityChanged.new, removeRelation)
								queries.push(query)
							}
						}
					}
				}
			}
		}
		// remove indexes and tables for removed entities
		for (const name in delta.remove) {
			const removeEntity = delta.remove[name].old as EntityMapping
			// if entity is view is excluded
			if (removeEntity.view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, removeEntity.name)) {
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
		}
		// create tables
		for (const name in delta.new) {
			const newEntity = delta.new[name].new as EntityMapping
			// evaluate if entity apply in dataSource
			if (!newEntity.view && this.evalDataSource(ruleDataSource, newEntity.name)) {
				const query = this.builder(dataSource).createEntity(newEntity)
				queries.push(query)
			}
		}
		// add columns for entities changes
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			// if entity is view is excluded
			if ((entityChanged.new as EntityMapping).view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityChanged.name)) {
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
		}
		// TODO:
		// Solve rename column: se debe resolver en cascada los indexes, Fks, Uk and Pk que esten referenciando la columns
		// Solve rename table: se debe resolver en cascada los indexes, Fks, Uk and Pk que esten referenciando la columns
		// en ambos casos se debe resolver que se hara con los datos para que estos no se pierdan

		// remove columns for entities changes
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			// if entity is view is excluded
			if ((entityChanged.old as EntityMapping).view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityChanged.name)) {
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
		}
		// create constraints for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			// if entity is view is excluded
			if ((entityChanged.new as EntityMapping).view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityChanged.name)) {
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
		}
		// create indexes and Fks for changes in entities
		for (const p in delta.changed) {
			const entityChanged = delta.changed[p]
			if (!entityChanged.delta) continue
			// if entity is view is excluded
			if ((entityChanged.new as EntityMapping).view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityChanged.name)) {
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
								// evaluate if entity relation apply in dataSource
								if (this.evalDataSource(ruleDataSource, newRelation.entity)) {
									if (!newRelation.weak) {
										const query = this.builder(dataSource).addFk(entityChanged.new, newRelation)
										queries.push(query)
									}
								}
							}
							for (const c in changed.delta.changed) {
								const newRelation = changed.delta.changed[c].new as Relation
								const oldRelation = changed.delta.changed[c].old as Relation
								// evaluate if entity relation apply in dataSource
								if (this.evalDataSource(ruleDataSource, newRelation.entity)) {
									if (this.changeRelation(oldRelation, newRelation)) {
										if (!newRelation.weak) {
											const query = this.builder(dataSource).addFk(entityChanged.new, newRelation)
											queries.push(query)
										}
									}
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
			// if entity is view is excluded
			if (newEntity.view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, newEntity.name)) {
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
						// evaluate if entity relation apply in dataSource
						if (this.evalDataSource(ruleDataSource, relation.entity)) {
							if (!relation.weak) {
								const query = this.builder(dataSource).addFk(newEntity, relation)
								queries.push(query)
							}
						}
					}
				}
			}
		}
	}

	private evalDataSource (dataSource:RuleDataSource, entity: string):boolean {
		const sentenceInfo: SentenceInfo = { entity: entity, name: 'ddl' }
		return this.routing.eval(dataSource, sentenceInfo)
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

	abstract truncateEntity(entity: EntityMapping): Query
	abstract setNull(entity: EntityMapping, relation: Relation): Query
	abstract dropFk(entity: EntityMapping, relation: Relation): Query
	abstract dropIndex(entity: EntityMapping, index: Index): Query
	abstract dropEntity(entity: EntityMapping): Query
	abstract dropPk(entity: EntityMapping): Query
	abstract dropUk(entity: EntityMapping): Query
	abstract createEntity(entity: EntityMapping): Query
	abstract addColumn(entity: EntityMapping, property: PropertyMapping): Query
	abstract alterColumn(entity: EntityMapping, property: PropertyMapping): Query
	abstract dropColumn(entity: EntityMapping, property: PropertyMapping): Query
	abstract addPk(entity: EntityMapping, primaryKey: string[]): Query
	abstract addUk(entity: EntityMapping, uniqueKey: string[]): Query
	abstract addFk(entity: EntityMapping, relation: Relation): Query
	abstract createFk(entity: EntityMapping, relation: Relation): Query
	abstract createIndex (entity:EntityMapping, index:Index):Query
}
