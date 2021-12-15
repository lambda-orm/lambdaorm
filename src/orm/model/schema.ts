export interface EnumValue {
	name: string
	value: any
}
export interface Enum {
	name: string
	values: EnumValue[]
}
export interface Property {
	name: string
	type: string
	length?: number
	nullable?: boolean
	primaryKey?: boolean
	autoincrement?: boolean
}
export interface Relation {
	name: string
	type: string
	composite?: boolean
	from: string
	entity: string
	to: string
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
	uniqueKey:string[]
	indexes: Index[]
	primaryKey:string[]
	properties:Property[]
	relations:Relation[]
}
export interface RelationInfo {
	previousRelation:string
	previousEntity: Entity,
	entity: Entity,
	relation: Relation
}
export interface Model{
	entities: Entity[]
	enums: Enum[]
}
export interface PropertyMapping extends Property {
	mapping: string
	key?: string
}

export interface EntityMapping extends Entity {
	mapping: string
	properties: PropertyMapping[]
}
export interface Mapping {
	extends?: string
	mapping?: string
	name: string
	entities: EntityMapping[]
}
export interface App
{
	src: string
	data: string
	model:string
}
export interface RuleDatastore
{
	name: string
	rule: string
	dataSource: string
}
export interface DataSource
{
	name: string
	dialect: string
	mapping: string
	connection: any
	rules: RuleDatastore[]
}
export interface Schema
{
	app: App
	model: Model
	mappings: Mapping[]
	defaultDatastore?: string
	dataSources: DataSource[]
}
