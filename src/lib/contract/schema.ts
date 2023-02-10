
export enum RelationType {
	oneToMany = 'oneToMany',
	manyToOne = 'manyToOne',
	oneToOne = 'oneToOne'
}
export interface EnumValue {
	name: string
	value: any
}
export interface Enum {
	name: string
	values: EnumValue[]
}
export interface Constraint {
	message: string
	condition: string
}
export interface Property {
	name: string
	type: string
	length?: number
	required?: boolean
	primaryKey?: boolean
	autoIncrement?: boolean
	view?: boolean
	readExp?: string
	writeExp?: string
	default?: string
	readValue?: string
	writeValue?: string
	enum?: string
	key?: string
}
export interface Relation {
	name: string
	type: RelationType
	composite?: boolean
	from: string
	entity: string
	to: string
	weak?: boolean
	target?: string
}
export interface Dependent {
	entity: string,
	relation: Relation
}
export interface Index {
	name: string
	fields: string[]
}
export interface Entity {
	name: string
	extends?: string
	abstract?: boolean
	singular?: string
	view?: boolean
	primaryKey: string[]
	uniqueKey: string[]
	required: string[]
	indexes: Index[]
	properties: Property[]
	relations: Relation[]
	dependents: Dependent[]
	constraints?: Constraint[]
	hadReadExps?: boolean
	hadWriteExps?: boolean
	hadReadValues?: boolean
	hadWriteValues?: boolean
	hadDefaults?: boolean
	hadViewReadExp?: boolean
	composite?: boolean
}
export interface RelationInfo {
	previousRelation: string
	previousEntity: Entity,
	entity: Entity,
	relation: Relation
}
export interface PropertyMapping extends Property {
	mapping: string
	readMappingExp?: string
}
export interface EntityMapping extends Entity {
	mapping: string
	sequence: string
	properties: PropertyMapping[]
	filter?: string
	hadKeys?: boolean
	hadReadMappingExp?: boolean
}
export interface FormatMapping extends Entity {
	dateTime?: string
	date?: string
	time?: string
}
export interface Mapping {
	extends?: string
	mapping?: string
	name: string
	entities: EntityMapping[]
	format?: FormatMapping
}

export interface PropertyView {
	name: string
	readExp?: string
	exclude?: boolean
}
export interface EntityView {
	name: string
	exclude?: boolean
	properties: PropertyView[]
}
export interface View {
	name: string
	entities: EntityView[]
}
export interface source {
	name: string
	dialect: string
	mapping: string
	connection: any
}
export interface RuleDataSource {
	name: string
	condition?: string
}
export interface Stage {
	name: string
	sources: RuleDataSource[]
}
export interface App {
	src: string
	data: string
	model: string
}
export interface Schema {
	app: App
	entities: Entity[]
	enums: Enum[]
	views: View[]
	mappings: Mapping[]
	sources: source[]
	stages: Stage[]
}
export interface SchemaModel {
	mappings: Mapping[]
}
export interface SchemaMapping {
	mapping: any
	pending: any[]
	inconsistency: any[]
}
export interface SchemaDataEntity
{
	entity:string
	rows:any[]
}
export interface SchemaData
{
	entities:SchemaDataEntity[]
}
export interface Behavior {
	alias?: string
	property: string
	expression: string
}
