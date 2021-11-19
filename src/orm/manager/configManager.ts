import { Helper } from '../helper'
import { Entity, Property, Relation, Index, Datastore, Config, Model, Mapping } from './../model'
import { ConnectionConfig } from './../connection'

class ModelConfig {
	private model: any
	constructor () {
		this.model = {}
	}

	private transform (source:Model):any {
		const target:any = { entity: {}, enum: {} }
		for (const p in source.entities) {
			const sourceEntity = source.entities[p]
			const targetEntity:any = {
				name: sourceEntity.name,
				primaryKey: sourceEntity.primaryKey,
				uniqueKey: sourceEntity.uniqueKey ? sourceEntity.uniqueKey : [],
				property: {},
				relation: {},
				index: {}
			}
			if (sourceEntity.singular !== undefined) {
				targetEntity.singular = sourceEntity.singular
			}
			if (sourceEntity.abstract !== undefined) {
				targetEntity.abstract = sourceEntity.abstract
			}
			for (const q in sourceEntity.properties) {
				const sourceProperty = sourceEntity.properties[q]
				if (sourceProperty.type === 'string' && sourceProperty.length === undefined) {
					sourceProperty.length = 80
				}
				if (sourceProperty.autoincrement) {
					sourceProperty.nullable = false
				}
				targetEntity.property[sourceProperty.name] = sourceProperty
			}
			for (const q in sourceEntity.relations) {
				const sourceRelation = sourceEntity.relations[q]
				targetEntity.relation[sourceRelation.name] = sourceRelation
			}
			if (sourceEntity.indexes) {
				for (const q in sourceEntity.indexes) {
					const index = sourceEntity.indexes[q]
					targetEntity.index[index.name] = index
				}
			}
			target.entity[sourceEntity.name] = targetEntity
		}
		return target
	}

	private untransform (source:any):Model {
		const target:Model = { entities: [], enums: [] }
		for (const p in source.entity) {
			const sourceEntity = source.entity[p]
			const targetEntity:Entity = {
				name: sourceEntity.name as string,
				primaryKey: sourceEntity.primaryKey,
				uniqueKey: sourceEntity.uniqueKey ? sourceEntity.uniqueKey : [],
				properties: [],
				relations: [],
				indexes: []
			}
			if (sourceEntity.singular !== undefined) {
				targetEntity.singular = sourceEntity.singular
			}
			if (sourceEntity.abstract !== undefined) {
				targetEntity.abstract = sourceEntity.abstract
			}
			for (const q in sourceEntity.property) {
				const sourceProperty = sourceEntity.property[q]
				const targetProperty:Property = {
					name: sourceProperty.name,
					type: sourceProperty.type
				}
				// properties defined when is necesary
				if (sourceProperty.length !== undefined)targetProperty.length = sourceProperty.length
				if (sourceProperty.nullable !== undefined)targetProperty.nullable = sourceProperty.nullable
				if (sourceProperty.autoincrement !== undefined)targetProperty.autoincrement = sourceProperty.autoincrement
				targetEntity.properties.push(targetProperty)
			}
			for (const q in sourceEntity.relation) {
				const sourceRelation = sourceEntity.relation[q]
				const targetRelation:Relation = {
					name: sourceRelation.name,
					type: sourceRelation.type,
					composite: Helper.nvl(sourceRelation.composite, false),
					from: sourceRelation.from,
					entity: sourceRelation.entity,
					to: sourceRelation.to
				}
				targetEntity.relations.push(targetRelation)
			}
			for (const q in sourceEntity.index) {
				const sourceIndex = sourceEntity.index[q]
				const targetIndex:Index = {
					name: sourceIndex.name,
					fields: sourceIndex.fields
				}
				targetEntity.indexes?.push(targetIndex)
			}
			target.entities.push(targetEntity)
		}
		return target
	}

	public get ():Model {
		return this.untransform(this.model)
	}

	public set (value: Model) {
		this.model = this.transform(value)
	}

	public get entity () {
		return this.model.entity
	}

	public isChild (entityName:string):boolean {
		for (const _entityName in this.model.entity) {
			const entity = this.model.entity[_entityName]
			for (const relationName in entity.relation) {
				const relation = entity.relation[relationName]
				if (relation.type === 'manyToOne' && relation.entity === entityName) return true
			}
		}
		return false
	}

	public existsProperty (entityName:string, name:string):boolean {
		const entity = this.getEntity(entityName)
		if (!entity) { throw new Error('Not exists entity:' + entityName) }
		const property = entity.property[name]
		return property !== undefined
	}

	public getProperty (entityName:string, name:string):Property {
		const entity = this.getEntity(entityName)
		if (!entity) { throw new Error('Not exists entity:' + entityName) }
		const property = entity.property[name]
		if (!property) { throw new Error('Not exists property: ' + name + ' in entity: ' + entityName) }
		return property
	}

	public entityMapping (entityName:string):string {
		const entity = this.getEntity(entityName)
		return entity ? entity.mapping : null
	}

	public getEntity (name: string): any {
		if (name.includes('.')) {
			const entityName = name.split('.')[1]
			return this.model.entity[entityName]
		}
		return this.model.entity[name]
	}

	public getAutoincrement (entityName:string):Property | undefined {
		const entity = this.getEntity(entityName)
		if (!entity) { throw new Error('Not exists entity:' + entityName) }
		for (const name in entity.property) {
			const property = entity.property[name] as Property
			if (property.autoincrement) { return property }
		}
		return undefined
	}

	public getRelation (entity:string, relation:string):any {
		let previousEntity, previousSchema, relationData, relationEntity, relationSchema
		const parts = relation.split('.')
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i]
			if (i === 0) {
				previousEntity = entity
				previousSchema = this.getEntity(previousEntity)
			} else {
				previousEntity = relationEntity
				previousSchema = relationSchema
			}
			relationData = previousSchema.relation[part]
			if (!relationData) { throw new Error('relation ' + part + ' not found in ' + previousSchema.name) }
			relationEntity = relationData.entity
			relationSchema = this.getEntity(relationEntity)
		}
		return {
			previousRelation: parts.length > 1 ? parts.slice(0, parts.length - 1).join('.') : '',
			previousSchema: previousSchema,
			relationSchema: relationSchema,
			relationData: relationData
		}
	}

	public listEntities (): string[] {
		const entities = []
		for (const name in this.model.entity) {
			entities.push(name)
		}
		return entities
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
		if (!entity.relation) {
			sorted.push(entity.name)
			return true
		} else {
			let unsolved = false
			for (const p in entity.relation) {
				const relation = entity.relation[p]
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
}

// class ModelConfig {
// public model: any

// constructor (value: Model) {
// this.model = this.transform(value)
// }

// public load (value:Model):void {

// }

// public get (name:string):Schema {
// const schema = this.schemas[name]
// if (!schema) {
// throw new Error(`schema ${name} not found`)
// }
// return this.untransform(schema)
// }

// public list ():Schema[] {
// const result:Schema[] = []
// for (const p in this.schemas) {
// result.push(this.untransform(this.schemas[p]))
// }
// return result
// }

// public getInstance (name:string):SchemaHelper {
// const schema = this.schemas[name]
// if (!schema) { throw new Error(`schema ${name} not found`) }
// return new SchemaHelper(schema)
// }

// public transform (source:Model):any {
// const target:any = { entity: {}, enum: {} }
// for (const p in source.entities) {
// const sourceEntity = source.entities[p]
// const targetEntity:any = {
// name: sourceEntity.name,
// primaryKey: sourceEntity.primaryKey,
// uniqueKey: sourceEntity.uniqueKey ? sourceEntity.uniqueKey : [],
// property: {},
// relation: {},
// index: {}
// }
// if (sourceEntity.singular !== undefined) {
// targetEntity.singular = sourceEntity.singular
// }
// if (sourceEntity.abstract !== undefined) {
// targetEntity.abstract = sourceEntity.abstract
// }
// for (const q in sourceEntity.properties) {
// const sourceProperty = sourceEntity.properties[q]
// if (sourceProperty.type === 'string' && sourceProperty.length === undefined) {
// sourceProperty.length = 80
// }
// if (sourceProperty.autoincrement) {
// sourceProperty.nullable = false
// }
// targetEntity.property[sourceProperty.name] = sourceProperty
// }
// for (const q in sourceEntity.relations) {
// const sourceRelation = sourceEntity.relations[q]
// targetEntity.relation[sourceRelation.name] = sourceRelation
// }
// if (sourceEntity.indexes) {
// for (const q in sourceEntity.indexes) {
// const index = sourceEntity.indexes[q]
// targetEntity.index[index.name] = index
// }
// }
// target.entity[sourceEntity.name] = targetEntity
// }
// return target
// }

// public untransform (source:any):Model {
// const target:Model = { entities: [], enums: [] }
// for (const p in source.entity) {
// const sourceEntity = source.entity[p]
// const targetEntity:Entity = {
// name: sourceEntity.name as string,
// primaryKey: sourceEntity.primaryKey,
// uniqueKey: sourceEntity.uniqueKey ? sourceEntity.uniqueKey : [],
// properties: [],
// relations: [],
// indexes: []
// }
// if (sourceEntity.singular !== undefined) {
// targetEntity.singular = sourceEntity.singular
// }
// if (sourceEntity.abstract !== undefined) {
// targetEntity.abstract = sourceEntity.abstract
// }
// for (const q in sourceEntity.property) {
// const sourceProperty = sourceEntity.property[q]
// const targetProperty:Property = {
// name: sourceProperty.name,
// type: sourceProperty.type
// }
// // properties defined when is necesary
// if (sourceProperty.length !== undefined)targetProperty.length = sourceProperty.length
// if (sourceProperty.nullable !== undefined)targetProperty.nullable = sourceProperty.nullable
// if (sourceProperty.autoincrement !== undefined)targetProperty.autoincrement = sourceProperty.autoincrement
// targetEntity.properties.push(targetProperty)
// }
// for (const q in sourceEntity.relation) {
// const sourceRelation = sourceEntity.relation[q]
// const targetRelation:Relation = {
// name: sourceRelation.name,
// type: sourceRelation.type,
// composite: Helper.nvl(sourceRelation.composite, false),
// from: sourceRelation.from,
// entity: sourceRelation.entity,
// to: sourceRelation.to
// }
// targetEntity.relations.push(targetRelation)
// }
// for (const q in sourceEntity.index) {
// const sourceIndex = sourceEntity.index[q]
// const targetIndex:Index = {
// name: sourceIndex.name,
// fields: sourceIndex.fields
// }
// targetEntity.indexes?.push(targetIndex)
// }
// target.entities.push(targetEntity)
// }
// return target
// }
// }

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
		if (config.model.entities) {
			const entities = config.model.entities
			for (const k in entities) {
				this.extendEntiy(entities[k], entities)
			}
		}
		if (config.mappings) {
			const mappings = config.mappings
			for (const k in mappings) {
				this.extendMapping(mappings[k], mappings)
			}
		}
		config.model = this.clear(config.model)
		this.complete(config.model)
		return config
	}

	private clear (source: Model): Model {
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

	private complete (model:Model):void {
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

	private extendMapping (mapping: Mapping, mappings: Mapping[]): void {
		if (mapping.extends !== undefined) {
			const base = mappings.find(p => p.name === mapping.extends)
			if (base === undefined) {
				throw new Error(`${mapping.extends} not found`)
			}
			this.extendMapping(base, mappings)
			this.extendObject(mapping, base)
			// se setea dado que ya fue extendido
			delete mapping.extends
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
	public config: Config
	public workspace: string
	private configExtender:ConfigExtender

	constructor (workspace:string) {
		this.workspace = workspace
		this.datastore = new DatastoreConfig()
		this.model = new ModelConfig()
		this.config = { app: { src: 'src', data: 'data', model: 'model' }, model: { enums: [], entities: [] }, datastores: [] }
		this.configExtender = new ConfigExtender()
	}

	public async load (config: Config): Promise<void> {
		this.config = this.configExtender.extend(config)
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
