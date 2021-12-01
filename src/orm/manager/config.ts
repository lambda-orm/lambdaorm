import { Entity, Property, Relation, EntityMapping, PropertyMapping, Datastore, Config, Model, Schema } from '../model'
import { ConnectionConfig } from '../connection'

interface RelationInfo {
	previousRelation:string
	previousEntity: Entity,
	entity: Entity,
	relation: Relation
}

abstract class _ModelConfig<TEntity extends Entity, TProperty extends Property> {
	public abstract get entities(): TEntity[];

	public getEntity (name: string): TEntity|undefined {
		if (name.includes('.')) {
			const entityName = name.split('.')[1]
			return this.entities.find(p => p.name === entityName)
		}
		return this.entities.find(p => p.name === name)
	}

	public isChild (entityName:string):boolean {
		for (const i in this.entities) {
			const entity = this.entities[i]
			for (const j in entity.relations) {
				const relation = entity.relations[j]
				if (relation.type === 'manyToOne' && relation.entity === entityName) return true
			}
		}
		return false
	}

	public existsProperty (entityName:string, name:string):boolean {
		const entity = this.getEntity(entityName)
		if (!entity) { throw new Error('Not exists entity:' + entityName) }
		const property = entity.properties.find(p => p.name === name)
		return property !== undefined
	}

	public getProperty (entityName:string, name:string):TProperty {
		const entity = this.getEntity(entityName)
		if (!entity) {
			throw new Error('Not exists entity:' + entityName)
		}
		const property = entity.properties.find(p => p.name === name)
		if (!property) {
			throw new Error('Not exists property: ' + name + ' in entity: ' + entityName)
		}
		return property as TProperty
	}

	public getAutoincrement (entityName:string): TProperty | undefined {
		const entity = this.getEntity(entityName)
		if (!entity) {
			throw new Error('Not exists entity:' + entityName)
		}
		return entity.properties.find(p => p.autoincrement === true) as TProperty
	}

	public listEntities (): string[] {
		return this.entities.map(p => p.name)
	}

	public sortEntities (entities:string[] = []): string[] {
		const sorted:string[] = []
		while (sorted.length < entities.length) {
			for (let i = 0; i < entities.length; i++) {
				const entityName = entities[i]
				if (sorted.includes(entityName)) { continue }
				if (this.solveSortEntity(entityName, sorted)) {
					sorted.push(entityName)
					break
				}
			}
		}
		return sorted
	}

	protected solveSortEntity (entityName:string, sorted:string[], parent?:string):boolean {
		const entity = this.getEntity(entityName)
		if (entity === undefined) {
			throw new Error('Not exists entity:' + entityName)
		}
		if (entity.relations === undefined || entity.relations.length === 0) {
			sorted.push(entity.name)
			return true
		} else {
			let unsolved = false
			for (const i in entity.relations) {
				const relation = entity.relations[i]
				if (relation.entity !== entityName) {
					if (relation.type === 'oneToOne' || relation.type === 'oneToMany') {
						if (!sorted.includes(relation.entity) && (parent === null || parent !== relation.entity)) {
							unsolved = true
							break
						}
					} else if (relation.type === 'manyToOne') {
						if (!this.solveSortEntity(relation.entity, sorted, entityName)) {
							unsolved = true
							break
						}
					}
				}
			}
			return !unsolved
		}
	}

	public getRelation (entity:string, relation:string):RelationInfo {
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
			if (!relationData) { throw new Error('relation ' + part + ' not found in ' + previousEntity.name) }
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

class ModelConfig extends _ModelConfig<Entity, Property> {
	private model:Model

	constructor () {
		super()
		this.model = { entities: [], enums: [] }
	}

	public get ():Model {
		return this.model
	}

	public set (value:Model) {
		this.model = value
	}

	public get entities ():Entity[] {
		return this.model.entities
	}
}

export class SchemaConfig extends _ModelConfig<EntityMapping, PropertyMapping> {
	private schema: Schema
	constructor (schema: Schema) {
		super()
		this.schema = schema
	}

	public get name ():string {
		return this.schema.name
	}

	public get mapping (): string {
		if (this.schema.mapping === undefined) {
			throw new Error(`schema ${this.schema.name} Mapping undefined`)
		}
		return this.schema.mapping
	}

	public get ():Schema {
		return this.schema
	}

	public set (value: Schema) {
		this.schema = value
	}

	public get entities ():EntityMapping[] {
		return this.schema.entities
	}

	public entityMapping (entityName:string):string|undefined {
		const entity = this.getEntity(entityName)
		return entity ? entity.mapping : undefined
	}
}

class SchemasConfig {
	public schemas: Schema[]

	constructor () {
		this.schemas = []
	}

	public load (value:Schema):void {
		if (value && value.name) {
			const index = this.schemas.findIndex(p => p.name === value.name)
			if (index === -1) {
				this.schemas.push(value)
			} else {
				this.schemas[index] = value
			}
		}
	}

	public delete (name: string): void {
		const index = this.schemas.findIndex(p => p.name === name)
		if (index !== -1) {
			this.schemas.splice(index, 1)
		}
	}

	public get (name:string):Schema {
		const schema = this.schemas.find(p => p.name === name)
		if (!schema) {
			throw new Error(`schema ${name} not found`)
		}
		return schema
	}

	public list (): Schema[] {
		return this.schemas
	}

	public getInstance (name:string):SchemaConfig {
		const schema = this.get(name)
		if (!schema) { throw new Error(`schema ${name} not found`) }
		return new SchemaConfig(schema)
	}
}

class DatastoreConfig {
	public datastores: any
	public default?:string

	constructor () {
		this.datastores = {}
	}

	public load (datastore:Datastore):void {
		this.datastores[datastore.name] = datastore
	}

	public get (name?: string): Datastore {
		if (name === undefined) {
			if (this.default !== undefined) {
				const db = this.datastores[this.default]
				if (db === undefined) {
					throw new Error(`default datastore: ${this.default} not found`)
				}
				return db as Datastore
			} else if (Object.keys(this.datastores).length === 1) {
				const key = Object.keys(this.datastores)[0]
				return this.datastores[key] as Datastore
			} else {
				throw new Error('the name of the datastore is required')
			}
		}
		return this.datastores[name]as Datastore
	}
}

class ConfigExtender {
	extend (config: Config): Config {
		// model
		if (config.model.entities) {
			const entities = config.model.entities
			for (const k in entities) {
				this.extendEntiy(entities[k], entities)
			}
		}
		config.model = this.clearModel(config.model)
		this.completeModel(config.model)
		// schemas
		if (config.schemas.length > 0) {
			// extend entities into schema
			for (const k in config.schemas) {
				const entities = config.schemas[k].entities
				if (entities) {
					for (const k in entities) {
						this.extendEntiyMapping(entities[k], entities)
					}
				}
			}
			// etends schemas
			for (const k in config.schemas) {
				this.extendSchema(config.schemas[k], config.schemas)
			}
		} else {
			config.schemas = [{ name: 'default', entities: [] }]
		}
		// extend schema for model
		for (const k in config.schemas) {
			this.extendObject(config.schemas[k], config.model)
		}
		return config
	}

	private clearModel (source: Model): Model {
		const target: Model = { enums: [], entities: [] }
		if (source.entities !== undefined) {
			for (let i = 0; i < source.entities.length; i++) {
				const sourceEntity = source.entities[i]
				if (sourceEntity.abstract === true) continue
				target.entities.push(sourceEntity)
			}
		}
		return target
	}

	private completeModel (model:Model):void {
		if (model.entities !== undefined) {
			for (let i = 0; i < model.entities.length; i++) {
				const entity = model.entities[i]
				if (entity.properties !== undefined) {
					for (let j = 0; j < entity.properties.length; j++) {
						const property = entity.properties[j]
						if (property.type === undefined) property.type = 'string'
						if (property.type === 'string' && property.length === undefined) property.length = 80
					}
				}
				if (entity.relations !== undefined) {
					for (let j = 0; j < entity.relations.length; j++) {
						const relation = entity.relations[j]
						if (relation.type === undefined) relation.type = 'oneToMany'
					}
				}
			}
		}
	}

	private extendEntiy (entity: Entity, entities: Entity[]):void {
		if (entity.extends !== undefined) {
			const base = entities.find(p => p.name === entity.extends)
			if (base === undefined) {
				throw new Error(`${entity.extends} not found`)
			}
			this.extendEntiy(base, entities)
			if (entity.primaryKey === undefined && base.primaryKey !== undefined) entity.primaryKey = base.primaryKey
			// extend properties
			if (base.properties !== undefined && base.properties.length > 0) {
				if (entity.properties === undefined) {
					entity.properties = []
				}
				this.extendObject(entity.properties, base.properties)
			}
			// extend relations
			if (base.relations !== undefined && base.relations.length > 0) {
				if (entity.relations === undefined) {
					entity.relations = []
				}
				this.extendObject(entity.relations, base.relations)
			}
			// se setea dado que ya fue extendido
			delete entity.extends
		}
	}

	private extendSchema (schema: Schema, schemas: Schema[]): void {
		if (schema.extends !== undefined) {
			const base = schemas.find(p => p.name === schema.extends)
			if (base === undefined) {
				throw new Error(`${schema.extends} not found`)
			}
			this.extendSchema(base, schemas)
			this.extendObject(schema, base)
			// se setea dado que ya fue extendido
			delete schema.extends
		}
	}

	private extendEntiyMapping (entity: EntityMapping, entities: EntityMapping[]):void {
		if (entity.extends !== undefined) {
			const base = entities.find(p => p.name === entity.extends)
			if (base === undefined) {
				throw new Error(`${entity.extends} not found`)
			}
			this.extendEntiyMapping(base, entities)
			if (entity.uniqueKey === undefined && base.uniqueKey !== undefined) entity.uniqueKey = base.uniqueKey
			// extend indexes
			if (base.indexes !== undefined && base.indexes.length > 0) {
				if (entity.indexes === undefined) {
					entity.indexes = []
				}
				this.extendObject(entity.indexes, base.indexes)
			}
			// extend properties
			if (base.properties !== undefined && base.properties.length > 0) {
				if (entity.properties === undefined) {
					entity.properties = []
				}
				this.extendObject(entity.properties, base.properties)
			}
			// se setea dado que ya fue extendido
			delete entity.extends
		}
	}

	private extendObject (obj:any, base:any) {
		if (Array.isArray(base)) {
			for (let i = 0; i < base.length; i++) {
				const baseChild = base[i]
				const objChild = obj.find((p: any) => p.name === baseChild.name)
				if (objChild === undefined) {
					obj.push(baseChild)
				} else {
					this.extendObject(objChild, baseChild)
				}
			}
		} else if (typeof base === 'object') {
			for (const k in base) {
				if (obj[k] === undefined) {
					obj[k] = base[k]
				} else if (typeof obj[k] === 'object') {
					this.extendObject(obj[k], base[k])
				}
			}
		}
		return obj
	}
}

export class ConfigManager {
	public datastore: DatastoreConfig
	public model: ModelConfig
	public schema: SchemasConfig
	public config: Config
	public workspace: string
	private extender:ConfigExtender

	constructor (workspace:string) {
		this.workspace = workspace
		this.datastore = new DatastoreConfig()
		this.model = new ModelConfig()
		this.schema = new SchemasConfig()
		this.config = { app: { src: 'src', data: 'data', model: 'model' }, model: { enums: [], entities: [] }, schemas: [], datastores: [] }
		this.extender = new ConfigExtender()
	}

	public async load (config: Config): Promise<void> {
		this.config = this.extender.extend(config)
		this.model.set(this.config.model)
		if (this.config.datastores) {
			for (const p in this.config.datastores) {
				const datastore = this.config.datastores[p]
				const connectionConfig: ConnectionConfig = { name: datastore.name, dialect: datastore.dialect, connection: {} }
				connectionConfig.connection = datastore.connection
				this.datastore.load(datastore)
			}
		}
		this.datastore.default = this.config.defaultDatastore
	}
}
