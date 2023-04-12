import {
	Enum, Entity, Property, FormatMapping, EntityMapping, PropertyMapping,
	Source, Schema, Mapping, RelationInfo, Stage, View, EntityView,
	PropertyView, QueryOptions
} from '../model'

interface IModelConfigServiceBase<TEntity extends Entity, TProperty extends Property> {
	get entities(): TEntity[]
	get enums(): Enum[]

	getEntity (name: string): TEntity | undefined
	getForcedEntity (name: string): TEntity
	getEnum (name: string): Enum | undefined
	isChild (entityName: string): boolean
	existsProperty (entityName: string, name: string): boolean
	getProperty (entityName: string, name: string): TProperty
	getAutoIncrement (entityName: string): TProperty | undefined
	getFieldIds (entityName: string): TProperty[] | undefined
	listEntities (): string[]
	/**
	 * Sort a list of entities according to their relationships
	 * @param entities entities to order
	 * @returns returns the sorted entities
	 */
	sortByRelations (mainEntities: string[], allEntities: string[]): string[]
	/**
	 * Sort a list of entities according to their dependencies
	 * @param entities entities to order
	 * @returns returns the sorted entities
	 */
	sortByDependencies (entities: string[]): string[]
	getRelation (entity: string, relation: string): RelationInfo
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IModelConfigService extends IModelConfigServiceBase<Entity, Property> {
	entities: Entity[]
	enums: Enum[]
}

export interface IMappingConfigService extends IModelConfigServiceBase<EntityMapping, PropertyMapping> {
	get name (): string
	get format (): FormatMapping | undefined
	get (): Mapping
	set (value: Mapping)
	get entities (): EntityMapping[]
	entityMapping (entityName: string): string | undefined
}

export interface IMappingsConfigService {
	mappings: Mapping[]
	load (value: Mapping): void
	delete (name: string): void
	get (name: string): Mapping
	getInstance (name: string): IMappingConfigService
}

export interface IViewConfigService {
	get name (): string
	get (): View
	set (value: View)
	get entities (): EntityView[]
	getEntity (name: string): EntityView | undefined
	getProperty (entityName: string, name: string): PropertyView | undefined
	excludeEntity (name: string): boolean
}

export interface IViewsConfigService {
	views: View[]
	load (value: View): void
	get (name?: string): View
	getInstance (name?: string): IViewConfigService
}

export interface IDataSourceConfigService {
	sources: Source[]
	default?: string
	load (value: Source): void
	get (name?: string): Source
}

export interface IStageConfigService {
	stages: Stage[]
	load (value: Stage): void
	get (name?: string): Stage
}

export interface ISchemaService {
	source: IDataSourceConfigService
	model: IModelConfigService
	mapping: IMappingsConfigService
	stage: IStageConfigService
	view: IViewsConfigService
	schema: Schema
	workspace: string
	init (source?: string | Schema): Promise<Schema>
	get (source?: string): Promise<Schema>
	getConfigFileName (workspace: string): Promise<string | undefined>
	complete (schema: Schema): void
	extend (schema: Schema): Schema
	load (schema: Schema): Schema
	solveOptions (options?: QueryOptions):QueryOptions
}
