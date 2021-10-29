import { SchemaHelper } from './../database'
import { Helper } from '../helper'
import { Schema, Entity, Property, Relation, Index, Database, Config } from '../model'
import { ConnectionConfig } from './../connection'

class SchemaConfig {
	public schemas:any
	constructor () {
		this.schemas = {}
	}

	public load (value:Schema):void {
		if (value && value.name) { this.schemas[value.name] = this.transform(value) }
	}

	public delete (name:string):void {
		delete this.schemas[name]
	}

	public get (name:string):Schema {
		const schema = this.schemas[name]
		if (!schema) { throw new Error(`schema ${name} not found`) }
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
				mapping: sourceEntity.mapping,
				primaryKey: sourceEntity.primaryKey,
				uniqueKey: sourceEntity.uniqueKey ? sourceEntity.uniqueKey : [],
				property: {},
				relation: {},
				index: {}
			}
			for (const q in sourceEntity.properties) {
				const sourceProperty = sourceEntity.properties[q]
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

export class ConfigManager {
	public database: DatabaseConfig
	public schema: SchemaConfig
	public config: Config
	public workspace: string
	constructor (workspace:string) {
		this.workspace = workspace
		this.database = new DatabaseConfig()
		this.schema = new SchemaConfig()
		this.config = { app: { src: 'src', data: 'data', models: 'models' }, databases: [], schemas: [] }
	}

	public async load (config: Config): Promise<void> {
		this.config = config
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
