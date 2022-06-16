import { SchemaManager, ModelConfig, MappingConfig, Routing, Languages, Dialect } from '.'
import { Mapping, RuleDataSource, Query, Delta, Index, DataSource, Relation, EntityMapping, PropertyMapping, SentenceInfo, SchemaError } from '../model'
import { Helper } from '../manager/helper'

export class DDLBuilder {
	private languages: Languages
	private schema: SchemaManager
	private model: ModelConfig
	private routing: Routing
	public stage: string
	constructor (schema: SchemaManager, routing: Routing, languages: Languages, stage: string) {
		this.schema = schema
		this.model = schema.model
		this.routing = routing
		this.languages = languages
		this.stage = stage
	}

	public drop (mappings: Mapping[]): Query[] {
		const queries: Query[] = []
		const stage = this.schema.stage.get(this.stage)
		for (const ruleDataSource of stage.dataSources) {
			const dataSource = this.schema.dataSource.get(ruleDataSource.name)
			const mapping = mappings.find(p => p.name === dataSource.mapping)
			if (mapping !== undefined) {
				this._drop(dataSource, ruleDataSource, mapping.entities, queries)
			}
		}
		return queries
	}

	public truncate (mappings: Mapping[]): Query[] {
		const queries: Query[] = []
		const stage = this.schema.stage.get(this.stage)
		for (const ruleDataSource of stage.dataSources) {
			const dataSource = this.schema.dataSource.get(ruleDataSource.name)
			const mapping = mappings.find(p => p.name === dataSource.mapping)
			if (mapping !== undefined) {
				this._truncate(dataSource, ruleDataSource, mapping.entities, queries)
			}
		}
		return queries
	}

	public sync (mappings: Mapping[]): Query[] {
		const queries: Query[] = []
		const stage = this.schema.stage.get(this.stage)
		for (const ruleDataSource of stage.dataSources) {
			const dataSource = this.schema.dataSource.get(ruleDataSource.name)
			const oldMapping = mappings.find(p => p.name === dataSource.mapping)
			const oldEntities = oldMapping !== undefined && oldMapping.entities !== undefined ? oldMapping.entities : null
			const currentMapping = this.schema.mapping.mappings.find(p => p.name === dataSource.mapping)
			const currentEntities = currentMapping !== undefined && currentMapping.entities !== undefined ? currentMapping.entities : null
			const delta = Helper.deltaWithSimpleArrays(currentEntities, oldEntities)
			this._sync(dataSource, ruleDataSource, delta, currentEntities || [], oldEntities || [], queries)
		}
		return queries
	}

	private _drop (dataSource: DataSource, ruleDataSource: RuleDataSource, entitiesMapping: EntityMapping[], queries: Query[]): void {
		const dialect = this.languages.getDialect(dataSource.dialect)
		const entities = entitiesMapping.map(p => p.name)
		const sortedEntities = this.model.sortByDependencies(entities)
		// drop all constraint
		for (const entityName of sortedEntities) {
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityName)) {
				const entity = entitiesMapping.find(q => q.name === entityName)
				if (entity === undefined) {
					throw new SchemaError(`entity ${entityName} not found in mapping for drop constraint action`)
				}
				this._dropRelations(dataSource, ruleDataSource, entity, entitiesMapping, dialect, queries)
			}
		}
		// drop indexes and tables
		for (const entityName of sortedEntities) {
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityName)) {
				// const entity = this.model.getEntity(entityName) as Entity
				const entity = entitiesMapping.find(p => p.name === entityName)
				if (entity === undefined) {
					throw new SchemaError(`entity ${entityName} not found in mapping for drop indexes action`)
				}
				this._dropEntity(dataSource, entity, dialect, queries)
			}
		}
	}

	private _dropRelations (dataSource: DataSource, ruleDataSource: RuleDataSource, entity:EntityMapping, entitiesMapping: EntityMapping[], dialect:Dialect, queries: Query[]) {
		if (entity.relations && !entity.view && (!entity.composite || !dialect.solveComposite)) {
			for (const relation of entity.relations) {
				const relationEntity = entitiesMapping.find(r => r.name === relation.entity)
				// evaluate if entity relation is not view and apply in dataSource
				if (relationEntity && !relationEntity.view && (!relationEntity.composite || !dialect.solveComposite) && this.evalDataSource(ruleDataSource, relation.entity)) {
					this._dropRelation(dataSource, entity, relation, queries)
				}
			}
		}
	}

	private _dropRelation (dataSource: DataSource, entity:EntityMapping, relation:Relation, queries: Query[]) {
		if (!relation.weak) {
			// busca la propiedad relacionada para saber si es nullable la relación
			const fromProperty = entity.properties.find(r => r.name === relation.from)
			if (fromProperty === undefined) {
				throw new SchemaError(`property ${relation.from} not found in ${entity.name} `)
			}
			const isNullable = fromProperty.nullable !== undefined ? fromProperty.nullable : true
			if (isNullable) {
				const query = this.builder(dataSource).setNull(entity, relation)
				if (query) queries.push(query)
			}
			const queryDropFk = this.builder(dataSource).dropFk(entity, relation)
			if (queryDropFk) queries.push(queryDropFk)
		}
	}

	private _dropEntity (dataSource: DataSource, entity:EntityMapping, dialect:Dialect, queries: Query[]) {
		if (!entity.view && (!entity.composite || !dialect.solveComposite)) {
			this._dropIndexes(dataSource, entity, queries)
			if (entity.sequence) {
				const _query = this.builder(dataSource).dropSequence(entity)
				if (_query) queries.push(_query)
			}
			const queryDrop = this.builder(dataSource).dropEntity(entity)
			if (queryDrop) queries.push(queryDrop)
		}
	}

	private _dropIndexes (dataSource: DataSource, entity:EntityMapping, queries: Query[]) {
		if (entity.indexes) {
			for (const index of entity.indexes) {
				const _query = this.builder(dataSource).dropIndex(entity, index)
				if (_query) queries.push(_query)
			}
		}
	}

	private _truncate (dataSource: DataSource, ruleDataSource: RuleDataSource, entitiesMapping: EntityMapping[], queries: Query[]): void {
		const dialect = this.languages.getDialect(dataSource.dialect)
		const entities = entitiesMapping.map(p => p.name)
		const sortedEntities = this.model.sortByDependencies(entities)
		for (const entityName of sortedEntities) {
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityName)) {
				// const entity = this.model.getEntity(entityName) as Entity
				const entity = entitiesMapping.find(p => p.name === entityName)
				if (entity === undefined) {
					throw new SchemaError(`entity ${entityName} not found in mapping for truncate action`)
				}
				if (!entity.view && (!entity.composite || !dialect.solveComposite)) {
					const query = this.builder(dataSource).truncateEntity(entity)
					if (query) queries.push(query)
				}
			}
		}
	}

	public _sync (dataSource: DataSource, ruleDataSource: RuleDataSource, delta: Delta, newMapping: EntityMapping[], oldMapping: EntityMapping[], queries: Query[]): void {
		const dialect = this.languages.getDialect(dataSource.dialect)
		// remove constraints for changes in entities
		for (const entityChanged of delta.changed) {
			if (!entityChanged.delta) continue
			// if entity is view is excluded
			if ((entityChanged.old as EntityMapping).view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityChanged.name)) {
				for (const changed of entityChanged.delta.changed) {
					if (changed.name === 'primaryKey') {
						if (!changed.delta) continue
						if (changed.delta.remove && changed.delta.remove.length > 0) {
							const query = this.builder(dataSource).dropPk(entityChanged.old)
							if (query) queries.push(query)
						}
						if (changed.delta.changed && changed.delta.changed.length > 0) {
							const query = this.builder(dataSource).dropPk(entityChanged.old)
							if (query) queries.push(query)
						}
					}
					if (changed.name === 'uniqueKey') {
						if (changed.delta) {
							if (changed.delta.remove && changed.delta.remove.length > 0) {
								const query = this.builder(dataSource).dropUk(entityChanged.old)
								if (query) queries.push(query)
							}
							if (changed.delta.changed && changed.delta.changed.length > 0) {
								const query = this.builder(dataSource).dropUk(entityChanged.old)
								if (query) queries.push(query)
							}
						}
					}
				}
			}
		}
		// remove indexes and Fks for changes in entities
		for (const entityChanged of delta.changed) {
			if (!entityChanged.delta) continue
			// if entity is view is excluded
			if ((entityChanged.old as EntityMapping).view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityChanged.name)) {
				for (const changed of entityChanged.delta.changed) {
					if (changed.name === 'index') {
						if (!changed.delta) continue
						for (const oldIndex of changed.delta.changed) {
							const query = this.builder(dataSource).dropIndex(entityChanged.new, oldIndex.old as Index)
							if (query) queries.push(query)
						}
						for (const removeIndex of changed.delta.remove) {
							const query = this.builder(dataSource).dropIndex(entityChanged.new, removeIndex.old as Index)
							if (query) queries.push(query)
						}
					}
					if (changed.name === 'relation') {
						if (!changed.delta) continue
						for (const changedItem of changed.delta.changed) {
							const newRelation = changedItem.new as Relation
							const oldRelation = changedItem.old as Relation

							const oldRelationEntity = oldMapping.find(r => r.name === oldRelation.entity)
							if (oldRelationEntity && oldRelationEntity.view) continue

							// evaluate if entity relation apply in dataSource
							if (this.evalDataSource(ruleDataSource, newRelation.entity)) {
								if (this.changeRelation(oldRelation, newRelation)) {
									if (!oldRelation.weak) {
										const query = this.builder(dataSource).dropFk(entityChanged.new, oldRelation)
										if (query) queries.push(query)
									}
								}
							}
						}
						for (const removeItem of changed.delta.remove) {
							const removeRelation = removeItem.old as Relation
							const oldRelationEntity = oldMapping.find(s => s.name === removeRelation.entity)
							if (oldRelationEntity && oldRelationEntity.view) continue
							// evaluate if entity relation apply in dataSource
							if (this.evalDataSource(ruleDataSource, removeRelation.entity)) {
								const query = this.builder(dataSource).dropFk(entityChanged.new, removeRelation)
								if (query) queries.push(query)
							}
						}
					}
				}
			}
		}
		// remove indexes and tables for removed entities
		for (const removeItem of delta.remove) {
			const removeEntity = removeItem.old as EntityMapping
			// if entity is view is excluded
			if (removeEntity.view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, removeEntity.name)) {
				if (removeEntity.indexes) {
					for (const index of removeEntity.indexes) {
						const query = this.builder(dataSource).dropIndex(removeEntity, index)
						if (query) queries.push(query)
					}
				}
				if (removeEntity.sequence) {
					const query = this.builder(dataSource).createSequence(removeEntity)
					if (query) queries.push(query)
				}
				const queryDropEntity = this.builder(dataSource).dropEntity(removeEntity)
				if (queryDropEntity) queries.push(queryDropEntity)
			}
		}
		// create tables
		for (const newItem of delta.new) {
			const newEntity = newItem.new as EntityMapping
			// evaluate if entity apply in dataSource
			if (!newEntity.view && (!newEntity.composite || !dialect.solveComposite) && this.evalDataSource(ruleDataSource, newEntity.name)) {
				if (newEntity.sequence) {
					const createSequence = this.builder(dataSource).createSequence(newEntity)
					if (createSequence) queries.push(createSequence)
				}
				const createEntity = this.builder(dataSource).createEntity(newEntity)
				if (createEntity) {
					queries.push(createEntity)
					if (newEntity.uniqueKey && newEntity.uniqueKey.length > 0) {
						const uk = this.builder(dataSource).addUk(newEntity, newEntity.uniqueKey)
						if (uk) queries.push(uk)
					}
				}
			}
		}
		// add columns for entities changes
		for (const entityChanged of delta.changed) {
			if (!entityChanged.delta) continue
			// if entity is view is excluded
			if ((entityChanged.new as EntityMapping).view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityChanged.name)) {
				for (const changed of entityChanged.delta.changed) {
					if (changed.name === 'property') {
						if (!changed.delta) continue
						for (const n in changed.delta.new) {
							const newProperty = changed.delta.new[n].new as PropertyMapping
							const query = this.builder(dataSource).addProperty(entityChanged.new, newProperty)
							if (query) queries.push(query)
						}
						for (const changedItem of changed.delta.changed) {
							const newProperty = changedItem.new as PropertyMapping
							const oldProperty = changedItem.old as PropertyMapping
							if (newProperty.mapping === oldProperty.mapping && !newProperty.view) {
								const query = this.builder(dataSource).alterProperty(entityChanged.new, newProperty)
								if (query) queries.push(query)
							}
						}
					}
				}
			}
		}
		// TODO:
		// Solve rename column: se debe resolver en cascada los indexes, Fks, Uk and Pk que esta haciendo referencia la columns
		// Solve rename table: se debe resolver en cascada los indexes, Fks, Uk and Pk que esta haciendo referencia la columns
		// en ambos casos se debe resolver que se hará con los datos para que estos no se pierdan

		// remove columns for entities changes
		for (const entityChanged of delta.changed) {
			if (!entityChanged.delta) continue
			// if entity is view is excluded
			if ((entityChanged.old as EntityMapping).view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityChanged.name)) {
				for (const changed of entityChanged.delta.changed) {
					if (changed.name === 'property') {
						if (!changed.delta) continue
						for (const removeItem of changed.delta.remove) {
							const oldProperty = removeItem.old as PropertyMapping
							if (!oldProperty.view) {
								const query = this.builder(dataSource).dropProperty(entityChanged.old, oldProperty)
								if (query) queries.push(query)
							}
						}
					}
				}
			}
		}
		// create constraints for changes in entities
		for (const entityChanged of delta.changed) {
			if (!entityChanged.delta) continue
			// if entity is view is excluded
			if ((entityChanged.new as EntityMapping).view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityChanged.name)) {
				for (const changed of entityChanged.delta.changed) {
					if (changed.name === 'primaryKey') {
						if (!changed.delta) continue
						for (const newItem of changed.delta.new) {
							const newPrimaryKey = newItem.new as string[]
							const query = this.builder(dataSource).addPk(entityChanged.new, newPrimaryKey)
							if (query) queries.push(query)
						}
						for (const changedItem of changed.delta.changed) {
							const changePrimaryKey = changedItem.new as string[]
							const query = this.builder(dataSource).addPk(entityChanged.new, changePrimaryKey)
							if (query) queries.push(query)
						}
					}
					if (changed.name === 'uniqueKey') {
						if (changed.delta) {
							for (const newItem of changed.delta.new) {
								const newUniqueKey = newItem.new as string[]
								const query = this.builder(dataSource).addUk(entityChanged.new, newUniqueKey)
								if (query) queries.push(query)
							}
							for (const changedItem of changed.delta.changed) {
								const changeUniqueKey = changedItem.new as string[]
								const query = this.builder(dataSource).addUk(entityChanged.new, changeUniqueKey)
								if (query) queries.push(query)
							}
						}
					}
				}
			}
		}
		// create indexes and Fks for changes in entities
		for (const entityChanged of delta.changed) {
			if (!entityChanged.delta) continue
			// if entity is view is excluded
			if ((entityChanged.new as EntityMapping).view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, entityChanged.name)) {
				for (const changed of entityChanged.delta.changed) {
					if (changed.name === 'index') {
						if (!changed.delta) continue
						for (const newItem of changed.delta.new) {
							const newIndex = newItem.new as Index
							const query = this.builder(dataSource).createIndex(entityChanged.new, newIndex)
							if (query) queries.push(query)
						}
						for (const changedItem of changed.delta.changed) {
							const changeIndex = changedItem.new as Index
							const query = this.builder(dataSource).createIndex(entityChanged.new, changeIndex)
							if (query) queries.push(query)
						}
					} else if (changed.name === 'sequence') {
						if (!changed.delta) continue
						// TODO : revisar
						const query = this.builder(dataSource).createSequence(entityChanged.new)
						if (query) queries.push(query)
					} else if (changed.name === 'relation') {
						if (changed.delta) {
							for (const newItem of changed.delta.new) {
								const newRelation = newItem.new as Relation
								// evaluate if entity relation apply in dataSource
								if (this.evalDataSource(ruleDataSource, newRelation.entity)) {
									if (!newRelation.weak) {
										const query = this.builder(dataSource).addFk(entityChanged.new, newRelation)
										if (query) queries.push(query)
									}
								}
							}
							for (const changedItem of changed.delta.changed) {
								const newRelation = changedItem.new as Relation
								const oldRelation = changedItem.old as Relation
								// evaluate if entity relation apply in dataSource
								if (this.evalDataSource(ruleDataSource, newRelation.entity)) {
									if (this.changeRelation(oldRelation, newRelation)) {
										if (!newRelation.weak) {
											const query = this.builder(dataSource).addFk(entityChanged.new, newRelation)
											if (query) queries.push(query)
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
		for (const newItem of delta.new) {
			const newEntity = newItem.new as EntityMapping
			// if entity is view is excluded
			if (newEntity.view) continue
			// evaluate if entity apply in dataSource
			if (this.evalDataSource(ruleDataSource, newEntity.name)) {
				if (newEntity.indexes) {
					for (const index of newEntity.indexes) {
						const query = this.builder(dataSource).createIndex(newEntity, index)
						if (query) queries.push(query)
					}
				}
				if (newEntity.relations) {
					for (const relation of newEntity.relations) {
						const relationEntity = newMapping.find(q => q.name === relation.entity)
						if (relationEntity && relationEntity.view) continue
						// evaluate if entity relation apply in dataSource
						if (this.evalDataSource(ruleDataSource, relation.entity)) {
							if (!relation.weak) {
								const query = this.builder(dataSource).addFk(newEntity, relation)
								if (query) queries.push(query)
							}
						}
					}
				}
			}
		}
	}

	private evalDataSource (dataSource: RuleDataSource, entity: string): boolean {
		const sentenceInfo: SentenceInfo = { entity: entity, name: 'ddl' }
		return this.routing.eval(dataSource, sentenceInfo)
	}

	private builder (dataSource: DataSource): LanguageDDLBuilder {
		// TODO agregar cache por dataSource
		const language = this.languages.getByDialect(dataSource.dialect)
		const mapping = this.schema.mapping.getInstance(dataSource.mapping)
		return language.ddlBuilder(dataSource, mapping)
	}

	private changeRelation (a: Relation, b: Relation): boolean {
		return a.entity !== b.entity || a.from !== b.from || a.name !== b.name || a.to !== b.to || a.type !== b.type
	}
}

export abstract class LanguageDDLBuilder {
	protected dataSource: DataSource
	protected mapping: MappingConfig
	protected dialect: Dialect

	constructor (dataSource: DataSource, mapping: MappingConfig, dialect: Dialect) {
		this.dataSource = dataSource
		this.mapping = mapping
		this.dialect = dialect
	}

	abstract truncateEntity(entity: EntityMapping): Query | undefined
	abstract setNull(entity: EntityMapping, relation: Relation): Query | undefined
	abstract dropFk(entity: EntityMapping, relation: Relation): Query | undefined
	abstract dropIndex(entity: EntityMapping, index: Index): Query | undefined
	abstract dropSequence(entity: EntityMapping): Query | undefined
	abstract dropEntity(entity: EntityMapping): Query | undefined
	abstract dropPk(entity: EntityMapping): Query | undefined
	abstract dropUk(entity: EntityMapping): Query | undefined
	abstract createEntity(entity: EntityMapping): Query | undefined
	abstract addProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
	abstract alterProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
	abstract dropProperty(entity: EntityMapping, property: PropertyMapping): Query | undefined
	abstract addPk(entity: EntityMapping, primaryKey: string[]): Query | undefined
	abstract addUk(entity: EntityMapping, uniqueKey: string[]): Query | undefined
	abstract addFk(entity: EntityMapping, relation: Relation): Query | undefined
	abstract createFk(entity: EntityMapping, relation: Relation): Query | undefined
	abstract createIndex(entity: EntityMapping, index: Index): Query | undefined
	abstract createSequence(entity: EntityMapping): Query | undefined
}
