import {
	Enum, Entity, Property, Relation,
	RelationInfo, RelationType,
	Dependent, SchemaError
} from '../../../domain'

export abstract class DomainConfigServiceBase<TEntity extends Entity, TProperty extends Property> {
	public abstract get entities(): TEntity[];
	public abstract get enums(): Enum[];

	public getEntity (name: string): TEntity | undefined {
		return this.entities.find(p => p.name === name)
	}

	public getForcedEntity (name: string): TEntity {
		const entity = this.getEntity(name)
		if (entity === undefined) {
			throw new SchemaError(`entity ${name} not found`)
		}
		return entity
	}

	public getEnum (name: string): Enum | undefined {
		return this.enums.find(p => p.name === name)
	}

	public isChild (entityName: string): boolean {
		for (const i in this.entities) {
			const entity = this.entities[i]
			for (const j in entity.relations) {
				const relation = entity.relations[j]
				if (relation.type === RelationType.manyToOne && relation.composite && relation.entity === entityName) return true
			}
		}
		return false
	}

	public existsProperty (entityName: string, name: string): boolean {
		const entity = this.getEntity(entityName)
		if (!entity) { throw new SchemaError('Not exists entity:' + entityName) }
		const property = entity.properties.find(p => p.name === name)
		return property !== undefined
	}

	public getProperty (entityName: string, name: string): TProperty {
		const entity = this.getEntity(entityName)
		if (!entity) {
			throw new SchemaError('Not exists entity:' + entityName)
		}
		const property = entity.properties.find(p => p.name === name)
		if (!property) {
			throw new SchemaError('Not exists property: ' + name + ' in entity: ' + entityName)
		}
		return property as TProperty
	}

	public getAutoIncrement (entityName: string): TProperty | undefined {
		const entity = this.getEntity(entityName)
		if (!entity) {
			throw new SchemaError('Not exists entity:' + entityName)
		}
		return entity.properties.find(p => p.autoIncrement === true) as TProperty
	}

	public getFieldIds (entityName: string): TProperty[] | undefined {
		const entity = this.getEntity(entityName)
		if (!entity) {
			throw new SchemaError('Not exists entity:' + entityName)
		}
		return entity.properties.filter(p => entity.primaryKey.includes(p.name)) as TProperty[]
	}

	public listEntities (): string[] {
		return this.entities.map(p => p.name)
	}

	/**
	 * Sort a list of entities according to their relationships
	 * @param entities entities to order
	 * @returns returns the sorted entities
	 */
	public sortByRelations (mainEntities: string[], allEntities: string[]): string[] {
		if (mainEntities.length < 2) return mainEntities
		const sorted: string[] = []
		let tries = 0
		let solved = true
		while (sorted.length < mainEntities.length) {
			if (tries >= 1000) {
				solved = false
				break
			}
			for (const entityName of mainEntities) {
				if (sorted.includes(entityName)) {
					continue
				}
				if (this.solveSortEntity(entityName, mainEntities, allEntities, sorted)) {
					sorted.push(entityName)
					break
				}
			}
			tries++
		}
		if (solved) {
			return sorted
		}
		const info:string[] = []
		for (const entityName of mainEntities) {
			if (!sorted.includes(entityName)) {
				const entity = this.getEntity(entityName)
				if (entity === undefined) {
					throw new SchemaError('Not exists entity:' + entityName)
				}
				info.push(`{ ${entity.name} relations: `)
				if (entity.dependents && entity.dependents.length > 0) {
					for (const relation of entity.relations) {
						if (relation.entity !== entity.name && mainEntities.includes(relation.entity)) {
							for (const relation of entity.relations) {
								if (this.unsolvedRelation(entityName, mainEntities, allEntities, sorted, relation)) {
									info.push(`${relation.entity}.${relation.name} `)
								}
							}
						}
					}
				}
				info.push('}, ')
			}
		}
		throw new SchemaError(`Task cannot be completed because the following entities cannot be sorted by their relations ${info.join('')}`)
	}

	/**
	 * Sort a list of entities according to their dependencies
	 * @param entities entities to order
	 * @returns returns the sorted entities
	 */
	public sortByDependencies (entities: string[] = []): string[] {
		if (entities.length < 2) return entities
		const sorted: string[] = []
		let tries = 0
		let solved = true
		while (sorted.length < entities.length) {
			if (tries >= 1000) {
				solved = false
				break
			}
			for (const entityName of entities) {
				if (sorted.includes(entityName)) {
					continue
				}
				const entity = this.getEntity(entityName)
				if (entity === undefined) {
					throw new SchemaError('Not exists entity:' + entityName)
				}
				if (!this.hadDependencies(entity, entities, sorted)) {
					sorted.push(entityName)
					break
				}
			}
			tries++
		}
		if (solved) {
			return sorted
		}
		const info:string[] = []
		for (const entityName of entities) {
			if (!sorted.includes(entityName)) {
				const entity = this.getEntity(entityName)
				if (entity === undefined) {
					throw new SchemaError('Not exists entity:' + entityName)
				}
				info.push(`{ ${entity.name} depend: `)
				if (entity.dependents && entity.dependents.length > 0) {
					for (const dependent of entity.dependents) {
						if (dependent.entity !== entity.name && entities.includes(dependent.entity)) {
							for (const dependent of entity.dependents) {
								if (dependent.entity !== entity.name && entities.includes(dependent.entity)) {
									if (this.hadDependents(entity, sorted, dependent)) {
										info.push(`${dependent.entity}.${dependent.relation.name} `)
									}
								}
							}
						}
					}
				}
				info.push('}, ')
			}
		}
		throw new SchemaError(`Task cannot be completed because the following entities cannot be sorted by their dependencies ${info.join('')}`)
	}

	/**
	 * Determines whether an entity can be included in the entity list based on its relationships
	 * @param entityName name of entity
	 * @param sorted current list of entities sorted by dependencies
	 * @param parent entity parent , used in manyToOne relations
	 * @returns
	 */
	protected solveSortEntity (entityName: string, mainEntities: string[], allEntities: string[], sorted: string[], parent?: string): boolean {
		const entity = this.getEntity(entityName)
		if (entity === undefined) {
			throw new SchemaError('Not exists entity:' + entityName)
		}
		if (entity.relations === undefined || entity.relations.length === 0) {
			return true
		} else {
			let unsolved = false
			for (const relation of entity.relations) {
				if (this.unsolvedRelation(entityName, mainEntities, allEntities, sorted, relation, parent)) {
					unsolved = true
					break
				}
			}
			return !unsolved
		}
	}

	private unsolvedRelation (entityName: string, mainEntities: string[], allEntities: string[], sorted: string[], relation:Relation, parent?: string): boolean {
		if (relation.entity !== entityName && allEntities.includes(relation.entity)) {
			if (relation.type === RelationType.oneToOne || relation.type === RelationType.oneToMany) {
				if (!relation.weak && !sorted.includes(relation.entity) && (parent === null || parent !== relation.entity)) {
					return true
				}
			} else if (relation.type === RelationType.manyToOne) {
				if (relation.composite && !this.solveSortEntity(relation.entity, mainEntities, allEntities, sorted, entityName)) {
					return true
				}
			}
		}
		return false
	}

	/**
	 * Determines whether an entity can be included in the entity list based on its dependencies
	 * @param entityName name of entity
	 * @param sorted current list of entities sorted by dependencies
	 * @param parent entity parent , used in manyToOne relations
	 * @returns
	 */
	protected hadDependencies (entity: TEntity, entities: string[], sorted: string[], parent?: string): boolean {
		if (entity.dependents === undefined || entity.dependents.length === 0) {
			return false
		} else {
			let hadDependents = false
			for (const dependent of entity.dependents) {
				if (dependent.entity !== entity.name && entities.includes(dependent.entity)) {
					if (this.hadDependents(entity, sorted, dependent, parent)) {
						hadDependents = true
						break
					}
				}
			}
			return hadDependents
		}
	}

	private hadDependents (entity: TEntity, sorted: string[], dependent:Dependent, parent?: string): boolean {
		// if the relationship is not weak
		if (!dependent.relation.weak) {
			// look for the related property to see if the dependency is not required
			const dependentEntity = this.getEntity(dependent.entity)
			if (dependentEntity === undefined) {
				throw new SchemaError('Not exists entity:' + dependent.entity)
			}
			const dependentProperty = dependentEntity.properties.find(p => p.name === dependent.relation.from)
			if (dependentProperty === undefined) {
				throw new SchemaError(`property ${dependent.relation.from} not found in ${entity.name} `)
			}

			// if the relation is not required
			// and the related entity is not included in the entities sorted by dependency
			// and the parent entity is null or is the same as the relation
			// in this case it cannot be determined that this entity can still be included in the list of entities ordered by dependency.
			if (dependentProperty.required && !sorted.includes(dependent.entity) && (parent === null || parent !== dependent.entity)) {
				return true
			}
		}

		return false
	}

	public getRelation (entity: string, relation: string): RelationInfo {
		let _previousEntity, previousEntity, relationData, _relationEntity, relationEntity
		const parts = relation.split('.')
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i]
			if (i === 0) {
				_previousEntity = entity
				previousEntity = this.getEntity(_previousEntity) as Entity
			} else {
				_previousEntity = _relationEntity
				previousEntity = relationEntity as Entity
			}
			relationData = previousEntity.relations.find(p => p.name === part)
			if (!relationData) { throw new SchemaError('relation ' + part + ' not found in ' + previousEntity.name) }
			_relationEntity = relationData.entity
			relationEntity = this.getEntity(_relationEntity)
		}
		return {
			previousRelation: parts.length > 1 ? parts.slice(0, parts.length - 1).join('.') : '',
			previousEntity: previousEntity as Entity,
			entity: relationEntity as Entity,
			relation: relationData as Relation
		}
	}
}
