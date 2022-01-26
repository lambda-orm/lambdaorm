import { Enum, Entity, Property, Relation, EntityMapping, PropertyMapping, DataSource, Schema, Mapping, RelationInfo, Stage, ContextInfo } from '../model'
import { ConnectionConfig } from '../connection'
import path from 'path'
import { Helper } from './helper'
import { Expressions } from 'js-expressions'

const yaml = require('js-yaml')

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
		if (entities.length < 2) return entities
		const sorted: string[] = []
		while (sorted.length < entities.length) {
			for (let i = 0; i < entities.length; i++) {
				const entityName = entities[i]
				if (sorted.includes(entityName)) {
					continue
				}
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

export class ModelConfig extends _ModelConfig<Entity, Property> {
	public entities: Entity[]
	public enums:Enum[]

	constructor (entities: Entity[] = [], enums:Enum[] = []) {
		super()
		this.entities = entities
		this.enums = enums
	}
}

export class MappingConfig extends _ModelConfig<EntityMapping, PropertyMapping> {
	private mapping: Mapping
	constructor (mapping: Mapping) {
		super()
		this.mapping = mapping
	}

	public get name ():string {
		return this.mapping.name
	}

	// public get mapping (): string {
	// if (this.mapping.mapping === undefined) {
	// throw new Error(`mapping ${this.mapping.name} Mapping undefined`)
	// }
	// return this.mapping.mapping
	// }

	public get ():Mapping {
		return this.mapping
	}

	public set (value: Mapping) {
		this.mapping = value
	}

	public get entities ():EntityMapping[] {
		return this.mapping.entities
	}

	public entityMapping (entityName:string):string|undefined {
		const entity = this.getEntity(entityName)
		return entity ? entity.mapping : undefined
	}
}

export class MappingsConfig {
	public mappings: Mapping[]

	constructor () {
		this.mappings = []
	}

	public load (value:Mapping):void {
		if (value && value.name) {
			const index = this.mappings.findIndex(p => p.name === value.name)
			if (index === -1) {
				this.mappings.push(value)
			} else {
				this.mappings[index] = value
			}
		}
	}

	public delete (name: string): void {
		const index = this.mappings.findIndex(p => p.name === name)
		if (index !== -1) {
			this.mappings.splice(index, 1)
		}
	}

	public get (name:string):Mapping {
		const mapping = this.mappings.find(p => p.name === name)
		if (!mapping) {
			throw new Error(`mapping ${name} not found`)
		}
		return mapping
	}

	public getInstance (name:string):MappingConfig {
		const mapping = this.get(name)
		if (!mapping) {
			throw new Error(`mapping ${name} not found`)
		}
		return new MappingConfig(mapping)
	}
}

export class DataSourceConfig {
	public dataSources: DataSource[]
	public default?:string

	constructor () {
		this.dataSources = []
	}

	public load (value: DataSource): void {
		if (value && value.name) {
			const index = this.dataSources.findIndex(p => p.name === value.name)
			if (index === -1) {
				this.dataSources.push(value)
			} else {
				this.dataSources[index] = value
			}
		}
	}

	public get (name?: string): DataSource {
		const _name = name === undefined ? this.default : name
		if (_name === undefined) {
			if (this.dataSources.length === 1) {
				return this.dataSources[0]
			} else {
				throw new Error('the name of the dataSource is required')
			}
		}
		const db = this.dataSources.find(p => p.name === _name)
		if (db === undefined) {
			throw new Error(`default dataSource: ${_name} not found`)
		}
		return db
	}
}

export class StageConfig {
	public stages: Stage[]

	constructor () {
		this.stages = []
	}

	public load (value:Stage):void {
		if (value && value.name) {
			const index = this.stages.findIndex(p => p.name === value.name)
			if (index === -1) {
				this.stages.push(value)
			} else {
				this.stages[index] = value
			}
		}
	}

	public get (name?: string): Stage {
		if (name === undefined) {
			return this.stages[0]
		}
		const stage = this.stages.find(p => p.name === name)
		if (stage === undefined) {
			throw new Error(`Stage: ${name} not found`)
		}
		return stage
	}
}

export class SchemaExtender {
	private expressions:Expressions
	constructor (expressions:Expressions) {
		this.expressions = expressions
	}

	public extend (schema: Schema): Schema {
		// model
		if (schema.entities) {
			const entities = schema.entities
			for (const k in entities) {
				this.extendEntiy(entities[k], entities)
			}
		}
		schema.entities = this.clearEntities(schema.entities)
		this.completeEntities(schema.entities)

		// mappings
		if (schema.mappings.length > 0) {
			// extend entities into mapping
			for (const k in schema.mappings) {
				const entities = schema.mappings[k].entities
				if (entities) {
					for (const k in entities) {
						this.extendEntiyMapping(entities[k], entities)
					}
				}
			}
			// etends mappings
			for (const k in schema.mappings) {
				this.extendMapping(schema.mappings[k], schema.mappings)
			}
		} else {
			schema.mappings = [{ name: 'default', entities: [] }]
		}
		// extend mapping for model
		for (const k in schema.mappings) {
			// const mapping = schema.mappings[k]
			// if (mapping.entities === undefined) {
			// mapping.entities = []
			// }
			// for (const l in schema.entities) {
			// const entity = schema.entities[l]
			// let mapEntity = mapping.entities.find(p => p.name === entity.name)
			// if (mapEntity === undefined) {
			// mapEntity = { name: entity.name, mapping: entity.name, properties: [] }
			// }
			// }

			this.extendObject(schema.mappings[k], { entities: schema.entities })
			schema.mappings[k] = this.clearMapping(schema.mappings[k])
			this.completeMapping(schema.mappings[k])
		}
		// dataSources
		if (schema.dataSources === undefined || schema.dataSources.length === 0) {
			throw new Error('Datasources not defined')
		}
		for (const k in schema.dataSources) {
			const dataSource = schema.dataSources[k]
			if (dataSource.mapping === undefined) {
				dataSource.mapping = schema.mappings[0].name
			}
		}
		// stages
		if (schema.stages === undefined || schema.stages.length === 0) {
			schema.stages = [{ name: 'default', dataSources: [{ name: schema.dataSources[0].name }] }]
		}
		for (const k in schema.stages) {
			const stage = schema.stages[k]
			if (stage.dataSources === undefined) {
				stage.dataSources = [{ name: schema.dataSources[0].name }]
			}
		}
		// exclude entities not used in mapping
		for (const k in schema.mappings) {
			schema.mappings[k] = this.clearMapping2(schema, schema.mappings[k])
		}
		return schema
	}

	public complete (schema: Schema): void {
		this.completeEntities(schema.entities)
	}

	private clearEntities (source: Entity[]): Entity[] {
		const target: Entity[] = []
		if (source !== undefined) {
			for (let i = 0; i < source.length; i++) {
				const sourceEntity = source[i]
				if (sourceEntity.abstract === true) continue
				target.push(sourceEntity)
			}
		}
		return target
	}

	private completeEntities (entities:Entity[]):void {
		if (entities !== undefined) {
			for (let i = 0; i < entities.length; i++) {
				const entity = entities[i]
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
					obj.push(Helper.clone(baseChild))
				} else {
					this.extendObject(objChild, baseChild)
				}
			}
		} else if (typeof base === 'object') {
			for (const k in base) {
				if (obj[k] === undefined) {
					obj[k] = Helper.clone(base[k])
				} else if (typeof obj[k] === 'object') {
					this.extendObject(obj[k], base[k])
				}
			}
		}
		return obj
	}

	private completeMapping (mapping:Mapping):void {
		if (mapping.entities !== undefined) {
			for (let i = 0; i < mapping.entities.length; i++) {
				const entity = mapping.entities[i]
				if (entity.mapping === undefined) entity.mapping = entity.name
				if (entity.properties !== undefined) {
					for (let j = 0; j < entity.properties.length; j++) {
						const property = entity.properties[j]
						if (property.mapping === undefined) property.mapping = property.name
					}
				}
			}
		}
	}

	private clearMapping (source: Mapping): Mapping {
		const target: Mapping = { name: source.name, mapping: source.mapping, entities: [] }
		if (source.entities !== undefined) {
			for (let i = 0; i < source.entities.length; i++) {
				const sourceEntity = source.entities[i]
				if (sourceEntity.abstract === true) continue
				target.entities.push(sourceEntity)
			}
		}
		return target
	}

	private clearMapping2 (schema:Schema, source: Mapping): Mapping {
		const target: Mapping = { name: source.name, mapping: source.mapping, entities: [] }

		if (source.entities !== undefined) {
			for (let i = 0; i < source.entities.length; i++) {
				const sourceEntity = source.entities[i]
				if (!this.existsInMapping(schema, source.name, sourceEntity.name)) continue
				target.entities.push(sourceEntity)
			}
		}
		return target
	}

	private existsInMapping (schema:Schema, mapping:string, entity:string):boolean {
		const context:ContextInfo = { entity: entity, sentence: 'ddl', read: false, write: true, dml: false, ddl: true }
		const dataSourcesNames = schema.dataSources.filter(p => p.mapping === mapping).map(p => p.name)
		for (const i in schema.stages) {
			const stage = schema.stages[i]
			const ruleDataSources = stage.dataSources.filter(p => dataSourcesNames.includes(p.name))
			for (const j in ruleDataSources) {
				const ruleDataSource = ruleDataSources[j]
				if (ruleDataSource.condition === undefined) {
					return true
				} else if (this.expressions.eval(ruleDataSource.condition, context)) {
					return true
				}
			}
		}
		return false
	}
}

export class SchemaManager {
	public dataSource: DataSourceConfig
	public model: ModelConfig
	public mapping: MappingsConfig
	public stage: StageConfig
	public schema: Schema
	public workspace: string
	private extender: SchemaExtender
	private expressions:Expressions

	constructor (workspace: string, expressions: Expressions) {
		this.expressions = expressions
		this.workspace = workspace
		this.dataSource = new DataSourceConfig()
		this.model = new ModelConfig()
		this.mapping = new MappingsConfig()
		this.stage = new StageConfig()
		this.extender = new SchemaExtender(this.expressions)
		this.schema = { app: { src: 'src', data: 'data', model: 'model' }, enums: [], entities: [], mappings: [], dataSources: [], stages: [] }
	}

	public async init (source?: string | Schema): Promise<Schema> {
		let schema
		if (source === undefined || typeof source === 'string') {
			schema = await this.get(source)
		} else {
			const _schema = source as Schema
			if (_schema === undefined) {
				throw new Error(`Schema: ${source} not supported`)
			}
			schema = _schema
		}
		Helper.solveEnvironmentVariables(schema)
		schema = this.load(schema)
		return schema
	}

	public async get (source?: string): Promise<Schema> {
		let workspace : string
		let configFile: string|undefined
		workspace = process.cwd()

		if (source === undefined) {
			configFile = await this.getConfigFileName(workspace)
		} else if (typeof source === 'string') {
			const lstat = await Helper.lstat(source)
			if (lstat.isFile()) {
				configFile = path.basename(source)
				workspace = path.dirname(source)
			} else {
				workspace = source
				configFile = await this.getConfigFileName(workspace)
			}
		} else {
			throw new Error(`Schema: ${source} not supported`)
		}

		let schema: Schema = { app: { src: 'src', data: 'data', model: 'model' }, entities: [], enums: [], dataSources: [], mappings: [], stages: [] }
		if (configFile !== undefined) {
			const configPath = path.join(workspace, configFile)
			if (path.extname(configFile) === '.yaml' || path.extname(configFile) === '.yml') {
				const content = await Helper.readFile(configPath)
				if (content !== null) {
					schema = yaml.load(content)
				} else {
					throw new Error(`Schema file: ${configPath} empty`)
				}
			} else if (path.extname(configFile) === '.json') {
				const content = await Helper.readFile(configPath)
				if (content !== null) {
					schema = JSON.parse(content)
				} else {
					throw new Error(`Schema file: ${configPath} empty`)
				}
			} else {
				throw new Error(`Schema file: ${configPath} not supported`)
			}
		}

		if (schema.app === undefined) {
			schema.app = { src: 'src', data: 'data', model: 'model' }
		} else {
			if (schema.app.src === undefined) {
				schema.app.src = 'src'
			}
			if (schema.app.data === undefined) {
				schema.app.data = 'data'
			}
			if (schema.app.model === undefined) {
				schema.app.model = 'model'
			}
		}
		if (schema.dataSources === undefined) schema.dataSources = []
		return schema
	}

	public async getConfigFileName (workspace:string):Promise<string|undefined> {
		if (await Helper.existsPath(path.join(workspace, 'lambdaorm.yaml'))) {
			return 'lambdaorm.yaml'
		} else if (await Helper.existsPath(path.join(workspace, 'lambdaorm.yml'))) {
			return 'lambdaorm.yml'
		} else if (await Helper.existsPath(path.join(workspace, 'lambdaorm.json'))) {
			return 'lambdaorm.json'
		} else {
			return undefined
		}
	}

	public complete (schema: Schema): void {
		this.extender.complete(schema)
	}

	public extend (schema: Schema): Schema {
		return this.extender.extend(schema)
	}

	public load (schema: Schema): Schema {
		this.schema = this.extend(schema)
		this.model.entities = this.schema.entities ? this.schema.entities : []
		this.model.enums = this.schema.enums ? this.schema.enums : []
		if (this.schema.mappings) {
			for (const p in this.schema.mappings) {
				const mapping = this.schema.mappings[p]
				this.mapping.load(mapping)
			}
		}
		if (this.schema.dataSources) {
			for (const p in this.schema.dataSources) {
				const dataSource = this.schema.dataSources[p]
				const connectionConfig: ConnectionConfig = { name: dataSource.name, dialect: dataSource.dialect, connection: {} }
				connectionConfig.connection = dataSource.connection
				this.dataSource.load(dataSource)
			}
		}
		if (this.schema.stages) {
			for (const p in this.schema.stages) {
				const stage = this.schema.stages[p]
				this.stage.load(stage)
			}
		}
		return this.schema
	}
}
