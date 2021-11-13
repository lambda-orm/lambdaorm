import { SchemaHelper } from './../manager'
import { Helper } from '../helper'
import { Schema, Entity, Property, Relation, Index, Database, Config } from './../model'
import { ConnectionConfig } from './../connection'

class SchemaConfig {
	public schemas: any

	constructor () {
		this.schemas = {}
	}

	public load (value:Schema):void {
		if (value && value.name) {
			this.schemas[value.name] = this.transform(value)
		}
	}

	public delete (name:string):void {
		delete this.schemas[name]
	}

	public get (name:string):Schema {
		const schema = this.schemas[name]
		if (!schema) {
			throw new Error(`schema ${name} not found`)
		}
		return this.untransform(schema)
	}

	public list ():Schema[] {
		const result:Schema[] = []
		for (const p in this.schemas) {
			result.push(this.untransform(this.schemas[p]))
		}
		return result
	}

	public getInstance (name:string):SchemaHelper {
		const schema = this.schemas[name]
		if (!schema) { throw new Error(`schema ${name} not found`) }
		return new SchemaHelper(schema)
	}

	public transform (source:Schema):any {
		const target:any = { entity: {}, enum: {} }
		target.name = source.name
		for (const p in source.entities) {
			const sourceEntity = source.entities[p]
			const targetEntity:any = {
				name: sourceEntity.name,
				mapping: sourceEntity.mapping || sourceEntity.name,
				primaryKey: sourceEntity.primaryKey,
				uniqueKey: sourceEntity.uniqueKey ? sourceEntity.uniqueKey : [],
				property: {},
				relation: {},
				index: {}
			}
			if (sourceEntity.database !== undefined) {
				targetEntity.database = sourceEntity.database
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

	public untransform (source:any):Schema {
		const target:Schema = { name: source.name as string, entities: [], enums: [] }
		for (const p in source.entity) {
			const sourceEntity = source.entity[p]
			const targetEntity:Entity = {
				name: sourceEntity.name as string,
				mapping: sourceEntity.mapping as string,
				primaryKey: sourceEntity.primaryKey,
				uniqueKey: sourceEntity.uniqueKey ? sourceEntity.uniqueKey : [],
				properties: [],
				relations: [],
				indexes: []
			}
			if (sourceEntity.database !== undefined) {
				targetEntity.database = sourceEntity.database
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
					mapping: sourceProperty.mapping,
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
}

class DatabaseConfig {
	public databases: any
	public default?:string

	constructor () {
		this.databases = {}
	}

	public load (database:Database):void {
		this.databases[database.name] = database
	}

	public get (name?: string): Database {
		if (name === undefined) {
			if (this.default !== undefined) {
				const db = this.databases[this.default]
				if (db === undefined) {
					throw new Error(`default database: ${this.default} not found`)
				}
				return db as Database
			} else if (Object.keys(this.databases).length === 1) {
				const key = Object.keys(this.databases)[0]
				return this.databases[key] as Database
			} else {
				throw new Error('the name of the database is required')
			}
		}
		return this.databases[name]as Database
	}
}

class ConfigExtender {
	extend (config:Config):Config {
		this.extendSchemas(config.schemas)
		config.schemas = this.clear(config.schemas)
		this.complete(config.schemas)
		return config
	}

	private extendSchemas (schemas:Schema[]):void {
		for (const k in schemas) {
			schemas[k] = this.extendSchema(schemas[k], schemas)
		}
	}

	private clear (sources: Schema[]): Schema[] {
		const targets:Schema[] = []
		for (const k in sources) {
			const source = sources[k]
			if (source.abstract === true) continue
			const target: Schema = { name: source.name, excludeModel: source.excludeModel, enums: source.enums, entities: [] }
			if (source.entities !== undefined) {
				for (let i = 0; i < source.entities.length; i++) {
					const sourceEntity = source.entities[i]
					if (sourceEntity.abstract === true) continue
					// delete sourceEntity.extends
					target.entities.push(sourceEntity)
				}
			}
			targets.push(target)
		}
		return targets
	}

	private complete (schemas:Schema[]):void {
		for (const k in schemas) {
			const schema = schemas[k]
			if (schema.entities !== undefined) {
				for (let i = 0; i < schema.entities.length; i++) {
					const entity = schema.entities[i]
					if (entity.mapping === undefined) entity.mapping = entity.name
					if (entity.properties !== undefined) {
						for (let j = 0; j < entity.properties.length; j++) {
							const property = entity.properties[j]
							if (property.mapping === undefined) property.mapping = property.name
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
	}

	private extendSchema (schema: Schema, schemas: Schema[]):Schema {
		if (schema.extends !== undefined) {
			const schemaBase = schemas.find(p => p.name === schema.extends)
			if (schemaBase === undefined) {
				throw new Error(`${schema.extends} not found`)
			}
			this.extendSchema(schemaBase, schemas)

			// extiendo enums
			if (schemaBase.enums !== undefined && schemaBase.enums.length > 0) {
				if (schema.enums === undefined) {
					schema.enums = []
				}
				this.extendObject(schema.enums, schemaBase.enums)
			}
			// extiendo entidades
			if (schemaBase.entities !== undefined && schemaBase.entities.length > 0) {
				if (schema.entities === undefined) {
					schema.entities = []
				}

				for (let i = 0; i < schemaBase.entities.length; i++) {
					const entityBase = schemaBase.entities[i]
					const entity = schema.entities.find((p: any) => p.name === entityBase.name)
					if (entity === undefined) {
						schema.entities.push(entityBase)
					} else {
						this.extendObject(entity, entityBase)
					}
				}

				// primero extiendo las entidades del schema base
				this.extendEntities(schema)
			}
			// se setea dado que ya fue extendido
			delete schema.extends
		} else {
			this.extendEntities(schema)
		}
		return schema
	}

	private extendEntities (schema: Schema): void {
		if (schema.entities) {
			for (const k in schema.entities) {
				this.extendEntiy(schema.entities[k], schema)
			}
		}
	}

	private extendEntiy (entity: Entity, schema: Schema):void {
		if (entity.extends !== undefined) {
			const entityBase = schema.entities.find(p => p.name === entity.extends)
			if (entityBase === undefined) {
				throw new Error(`${entity.extends} not found`)
			}
			this.extendEntiy(entityBase, schema)
			if (entity.database === undefined && entityBase.database !== undefined) entity.database = entityBase.database
			if (entity.mapping === undefined && entityBase.mapping !== undefined) entity.mapping = entityBase.mapping
			if (entity.primaryKey === undefined && entityBase.primaryKey !== undefined) entity.primaryKey = entityBase.primaryKey
			if (entity.uniqueKey === undefined && entityBase.uniqueKey !== undefined) entity.uniqueKey = entityBase.uniqueKey
			// extend indexes
			if (entityBase.indexes !== undefined && entityBase.indexes.length > 0) {
				if (entity.indexes === undefined) {
					entity.indexes = []
				}
				this.extendObject(entity.indexes, entityBase.indexes)
			}
			// extend properties
			if (entityBase.properties !== undefined && entityBase.properties.length > 0) {
				if (entity.properties === undefined) {
					entity.properties = []
				}
				this.extendObject(entity.properties, entityBase.properties)
			}
			// extend relations
			if (entityBase.relations !== undefined && entityBase.relations.length > 0) {
				if (entity.relations === undefined) {
					entity.relations = []
				}
				this.extendObject(entity.relations, entityBase.relations)
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
	public database: DatabaseConfig
	public schema: SchemaConfig
	public config: Config
	public workspace: string
	private configExtender:ConfigExtender

	constructor (workspace:string) {
		this.workspace = workspace
		this.database = new DatabaseConfig()
		this.schema = new SchemaConfig()
		this.config = { app: { src: 'src', data: 'data', models: 'models' }, databases: [], schemas: [] }
		this.configExtender = new ConfigExtender()
	}

	public async load (config: Config): Promise<void> {
		this.config = this.configExtender.extend(config)
		// console.log(JSON.stringify(this.config, null, 2))
		if (this.config.schemas) {
			for (const p in this.config.schemas) {
				this.schema.load(this.config.schemas[p])
			}
		}
		if (this.config.databases) {
			for (const p in this.config.databases) {
				const database = this.config.databases[p]
				const connectionConfig: ConnectionConfig = { name: database.name, dialect: database.dialect, connection: {} }
				connectionConfig.connection = database.connection
				this.database.load(database)
			}
		}
		this.database.default = this.config.app.defaultDatabase
	}
}
