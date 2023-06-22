import {
	Enum, Entity, Relation, EntityMapping,
	Schema, Mapping, RelationType, View,
	DIALECT_DEFAULT, ObservableAction, SchemaError
} from '../../domain'
import { Helper } from '../../../shared/application/helper'
import { Primitive } from 'typ3s'
import { Expressions } from '3xpr'

export class SchemaExtender {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly expressions: Expressions,
		private readonly helper: Helper
	) {}

	public extend (source: Schema): Schema {
		const schema = this.helper.obj.clone(source) as Schema
		this.extendEnums(schema)
		this.extendEntities(schema)
		this.complete(schema)
		this.extendMappings(schema)
		this.extendDataSources(schema)
		this.extendDataStages(schema)
		// views
		if (!schema.domain.views || !schema.domain.views.length || schema.domain.views.length === 0) {
			schema.domain.views = [{ name: 'default', entities: [] }]
		}
		// exclude entities not used in mapping
		for (const k in schema.infrastructure.mappings) {
			schema.infrastructure.mappings[k] = this.clearMapping2(schema, schema.infrastructure.mappings[k])
		}
		return schema
	}

	private extendEnums (schema: Schema) {
		if (schema.domain.enums === undefined) {
			schema.domain.enums = []
		}
		if (Array.isArray(schema.domain.enums)) {
			for (const _enum of schema.domain.enums) {
				if (_enum && _enum.extends) {
					this.extendEnum(_enum, schema.domain.enums)
				}
			}
			schema.domain.enums = this.clearEnums(schema.domain.enums)
		}
	}

	private extendEntities (schema: Schema) {
		if (schema.domain.entities === undefined) {
			schema.domain.entities = []
		}
		for (const entity of schema.domain.entities) {
			this.entitySecureArrays(entity)
		}
		for (const entity of schema.domain.entities) {
			if (entity && entity.extends) {
				this.extendEntity(entity, schema.domain.entities)
			}
		}
		schema.domain.entities = this.clearEntities(schema.domain.entities)
	}

	private entitySecureArrays (entity:Entity) {
		if (entity.uniqueKey === undefined) {
			entity.uniqueKey = []
		}
		if (entity.primaryKey === undefined) {
			entity.primaryKey = []
		}
		if (entity.required === undefined) {
			entity.required = []
		}
		if (entity.indexes === undefined) {
			entity.indexes = []
		}
		if (entity.properties === undefined) {
			entity.properties = []
		}
		if (entity.relations === undefined) {
			entity.relations = []
		}
		if (entity.dependents === undefined) {
			entity.dependents = []
		}
		if (entity.constraints === undefined) {
			entity.constraints = []
		}
	}

	private extendMappings (schema: Schema) {
		if (!schema.infrastructure.mappings || !schema.infrastructure.mappings.length || schema.infrastructure.mappings.length === 0) {
			schema.infrastructure.mappings = [{ name: 'default', entities: [] }]
		} else {
			// extend entities into mapping
			for (const mapping of schema.infrastructure.mappings) {
				if (mapping.entities === undefined) {
					mapping.entities = []
				}
				for (const entity of mapping.entities) {
					this.extendEntityMapping(entity, mapping.entities)
				}
			}
			// extends mappings
			for (const mapping of schema.infrastructure.mappings) {
				this.extendMapping(mapping, schema.infrastructure.mappings)
			}
		}
		// extend mapping for model
		for (const k in schema.infrastructure.mappings) {
			schema.infrastructure.mappings[k].entities = this.helper.obj.extends(schema.infrastructure.mappings[k].entities, schema.domain.entities)
			schema.infrastructure.mappings[k] = this.clearMapping(schema.infrastructure.mappings[k])
			const mapping = schema.infrastructure.mappings[k]
			if (mapping && mapping.entities) {
				this.completeMapping(schema.infrastructure.mappings[k])
			}
		}
	}

	private extendDataSources (schema: Schema) {
		if (!schema.infrastructure.sources || !schema.infrastructure.sources.length || schema.infrastructure.sources.length === 0) {
			console.log('sources not defined')
			schema.infrastructure.sources = [{ name: 'default', dialect: DIALECT_DEFAULT, mapping: schema.infrastructure.mappings[0].name, connection: null }]
		}
		for (const k in schema.infrastructure.sources) {
			const source = schema.infrastructure.sources[k]
			if (source.mapping === undefined) {
				source.mapping = schema.infrastructure.mappings[0].name
			}
		}
	}

	private extendDataStages (schema: Schema) {
		if (!schema.infrastructure.stages || !schema.infrastructure.stages.length || schema.infrastructure.stages.length === 0) {
			schema.infrastructure.stages = [{ name: 'default', sources: [{ name: schema.infrastructure.sources[0].name }] }]
		}
		for (const k in schema.infrastructure.stages) {
			const stage = schema.infrastructure.stages[k]
			if (stage.sources === undefined) {
				stage.sources = [{ name: schema.infrastructure.sources[0].name }]
			}
		}
	}

	public complete (schema: Schema): void {
		if (schema) {
			if (schema.domain.enums) {
				this.completeEnums(schema.domain.enums)
			}
			if (schema.domain.entities) {
				this.completeEntities(schema.domain.entities, schema.domain.views)
				if (schema.domain.entities && schema.domain.entities.length) {
					this.completeRelations(schema.domain.entities)
					this.completeDependents(schema.domain.entities)
				}
			}
		}
	}

	public isCompound (parent, child):boolean {
		const parentRoot = parent.split('.')[0]
		const childRoot = child.split('.')[0]
		return parentRoot === childRoot
	}

	private clearEnums (source: Enum[]): Enum[] {
		const target: Enum[] = []
		if (source && source.length) {
			for (const sourceEnum of source) {
				if (sourceEnum.abstract === true) continue
				target.push(sourceEnum)
			}
		}
		return target
	}

	private clearEntities (source: Entity[]): Entity[] {
		const target: Entity[] = []
		if (source && source.length) {
			for (const sourceEntity of source) {
				if (sourceEntity.abstract === true) continue
				target.push(sourceEntity)
			}
		}
		return target
	}

	private completeEnums (enums: Enum[]): void {
		if (enums && enums.length) {
			for (const _enum of enums) {
				if (_enum.values === undefined || _enum.values === null) {
					_enum.values = []
				} else {
					for (const value of _enum.values) {
						if (value.value === undefined) {
							value.value = value.name
						}
					}
				}
			}
		}
	}

	private completeEntities (entities: Entity[], views: View[]): void {
		if (entities && entities.length) {
			for (const entity of entities) {
				this.completeEntity(entity, views)
			}
		}
	}

	private completeEntity (entity: Entity, views: View[]):void {
		this.entitySecureArrays(entity)
		entity.composite = entity.name.includes('.')
		this.completeEntityProperties(entity)
		this.completeEntityRelations(entity)
		if (entity.properties) {
			entity.hadReadExps = entity.properties.some(p => p.readExp !== undefined)
			entity.hadWriteExps = entity.properties.some(p => p.writeExp !== undefined)
			entity.hadReadValues = entity.properties.some(p => p.readValue !== undefined)
			entity.hadWriteValues = entity.properties.some(p => p.writeValue !== undefined)
			entity.hadDefaults = entity.properties.some(p => p.default !== undefined)
			entity.hadViewReadExp = views ? views.some(p => p.entities ? p.entities.some(q => q.name === entity.name && q.properties ? q.properties.some(r => r.readExp !== undefined) : false) : false) : false
		} else {
			entity.hadReadExps = false
			entity.hadWriteExps = false
			entity.hadReadValues = false
			entity.hadWriteValues = false
			entity.hadDefaults = false
			entity.hadViewReadExp = false
		}
	}

	private completeEntityProperties (entity: Entity):void {
		if (entity.properties !== undefined) {
			for (const property of entity.properties) {
				if (property.autoIncrement) {
					property.required = false
				} else if (property.required === undefined) {
					property.required = (entity.required.includes(property.name) || entity.primaryKey.includes(property.name) || entity.uniqueKey.includes(property.name))
				}
				if (property.type === undefined) property.type = Primitive.string
				if (property.type === Primitive.string && property.length === undefined) property.length = 80
				if (property.length !== undefined && isNaN(property.length)) {
					throw new SchemaError(`Invalid length in ${entity.name}.${property.name}`)
				}
			}
		}
	}

	private completeEntityRelations (entity: Entity):void {
		if (entity.relations !== undefined) {
			for (const relation of entity.relations) {
				if (relation.type === undefined) relation.type = RelationType.oneToMany
				// All relations manyToOne are weak
				if (relation.type === RelationType.manyToOne) relation.weak = true
				if (relation.weak === undefined) relation.weak = false
			}
		}
	}

	private completeRelations (entities: Entity[]): void {
		for (const source of entities) {
			if (source.relations) {
				for (const sourceRelation of source.relations) {
					if (sourceRelation.target && (sourceRelation.type === RelationType.oneToMany || sourceRelation.type === RelationType.oneToOne)) {
						this.completeRelation(source, sourceRelation, entities)
					}
				}
			} else {
				source.relations = []
			}
		}
	}

	private completeRelation (source:Entity, sourceRelation: Relation, entities: Entity[]) {
		const targetEntity = entities.find(p => p.name === sourceRelation.entity)
		if (targetEntity) {
			const exists = targetEntity.relations.find(p => p.name === sourceRelation.target) !== undefined
			if (!exists) {
				targetEntity.relations.push({
					name: sourceRelation.target as string,
					type: sourceRelation.type === RelationType.oneToOne ? RelationType.oneToOne : RelationType.manyToOne,
					composite: this.isCompound(targetEntity.name, source.name),
					from: sourceRelation.to,
					entity: source.name,
					weak: true,
					to: sourceRelation.from,
					target: sourceRelation.name
				})
			}
		}
	}

	private completeDependents (entities: Entity[]): void {
		for (const entity of entities) {
			entity.dependents = []
			for (const related of entities) {
				for (const relation of related.relations) {
					if (relation.entity === entity.name && !relation.weak) {
						const dependent = { entity: related.name, relation }
						entity.dependents.push(dependent)
					}
				}
			}
		}
	}

	private extendEnum (_enum: Enum, enums: Enum[]): void {
		const base = enums.find(p => p.name === _enum.extends)
		if (base === undefined) {
			throw new SchemaError(`${_enum.extends} not found`)
		}
		if (base.extends) {
			this.extendEnum(base, enums)
		}
		// extend values
		if (base.values !== undefined && base.values.length > 0) {
			if (_enum.values === undefined || _enum.values === null) {
				_enum.values = []
			}
			_enum.values = this.helper.obj.extends(_enum.values, base.values)
		}

		// elimina dado que ya fue extendido
		delete _enum.extends
	}

	private extendEntity (entity: Entity, entities: Entity[]): void {
		const base = entities.find(p => p.name === entity.extends)
		if (base === undefined) {
			throw new SchemaError(`${entity.extends} not found`)
		}
		if (base.extends) {
			this.extendEntity(base, entities)
		}
		if (entity.primaryKey === undefined && base.primaryKey !== undefined) entity.primaryKey = base.primaryKey
		// extend properties
		if (base.properties !== undefined && base.properties.length > 0) {
			if (entity.properties === undefined) {
				entity.properties = []
			}
			entity.properties = this.helper.obj.extends(entity.properties, base.properties)
		}
		// extend relations
		if (base.relations.length > 0) {
			entity.relations = this.helper.obj.extends(entity.relations, base.relations)
		}
		// elimina dado que ya fue extendido
		delete entity.extends
	}

	private extendMapping (mapping: Mapping, mappings: Mapping[]): void {
		if (mapping && mapping.extends) {
			const base = mappings.find(p => p.name === mapping.extends)
			if (base === undefined) {
				throw new SchemaError(`${mapping.extends} not found`)
			}
			this.extendMapping(base, mappings)
			mapping.entities = this.helper.obj.extends(mapping.entities, base.entities)
			// elimina dado que ya fue extendido
			delete mapping.extends
		}
	}

	private extendEntityMapping (entity: EntityMapping, entities: EntityMapping[]): void {
		if (entity && entity.extends) {
			const base = entities.find(p => p.name === entity.extends)
			if (base === undefined) {
				throw new SchemaError(`${entity.extends} not found`)
			}
			this.extendEntityMapping(base, entities)
			if (entity.uniqueKey === undefined && base.uniqueKey !== undefined) {
				entity.uniqueKey = base.uniqueKey
			}
			if (entity.mapping === undefined && base.mapping !== undefined) {
				entity.mapping = base.mapping
			}
			this.extendEntityMappingIndexes(entity, base)
			this.extendEntityMappingProperties(entity, base)
			// delete since it was already extended
			delete entity.extends
		}
	}

	private extendEntityMappingIndexes (entity: EntityMapping, base: EntityMapping): void {
		if (base.indexes !== undefined && base.indexes.length > 0) {
			if (entity.indexes === undefined) {
				entity.indexes = []
			}
			entity.indexes = this.helper.obj.extends(entity.indexes, base.indexes)
		}
	}

	private extendEntityMappingProperties (entity: EntityMapping, base: EntityMapping): void {
		if (base.properties !== undefined && base.properties.length > 0) {
			if (entity.properties === undefined) {
				entity.properties = []
			}
			entity.properties = this.helper.obj.extends(entity.properties, base.properties)
		}
	}

	private completeMapping (mapping: Mapping): void {
		for (const entity of mapping.entities) {
			if (this.helper.val.isEmpty(entity.mapping)) {
				entity.mapping = entity.name
			}
			if (entity.properties === undefined || entity.properties.length === 0) {
				entity.hadKeys = false
				continue
			}
			for (const property of entity.properties) {
				if (this.helper.val.isEmpty(property.mapping)) {
					property.mapping = property.name
				}
			}
			entity.hadKeys = entity.properties.some(p => p.key !== undefined)
		}
	}

	private clearMapping (source: Mapping): Mapping {
		const target: Mapping = { name: source.name, mapping: source.mapping, entities: [] }
		if (source && source.entities) {
			for (const sourceEntity of source.entities) {
				if (sourceEntity.abstract === true) continue
				target.entities.push(sourceEntity)
			}
		}
		return target
	}

	private clearMapping2 (schema: Schema, source: Mapping): Mapping {
		const target: Mapping = { name: source.name, mapping: source.mapping, entities: [] }

		if (source && source.entities) {
			for (const sourceEntity of source.entities) {
				if (!this.existsInMapping(schema, source.name, sourceEntity.name)) continue
				target.entities.push(sourceEntity)
			}
		}
		return target
	}

	private existsInMapping (schema: Schema, mapping: string, entity: string): boolean {
		const context = { entity, action: ObservableAction.ddl, read: false, write: true, dml: false, ddl: true }
		const dataSourcesNames = schema.infrastructure.sources.filter(p => p.mapping === mapping).map(p => p.name)
		for (const stage of schema.infrastructure.stages) {
			const ruleDataSources = stage.sources.filter(p => dataSourcesNames.includes(p.name))
			for (const ruleDataSource of ruleDataSources) {
				if (ruleDataSource.condition === undefined || this.expressions.eval(ruleDataSource.condition, context)) {
					return true
				}
			}
		}
		return false
	}
}
