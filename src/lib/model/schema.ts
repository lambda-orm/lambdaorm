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
export interface DataSource{
	name: string
	dialect: string
	mapping: string
	connection: any
}
export interface RuleDataSource
{
	name: string
	condition?: string
}
export interface Stage
{
	name: string
	dataSources: RuleDataSource[]
}
export interface App
{
	src: string
	data: string
	model: string
}
export interface Schema
{
	app: App
	entities: Entity[]
	enums: Enum[]
	mappings: Mapping[]
	dataSources: DataSource[]
	stages: Stage[]
}
export interface SchemaState
{
	mappings: Mapping[]
	mappingData: any
	pendingData:any[]
}
