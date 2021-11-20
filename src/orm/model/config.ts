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

export interface Entity {
	name: string
	extends?: string
	abstract?: boolean
	singular?: string
	primaryKey?:string[]
	properties:Property[]
	relations:Relation[]
}
export interface Model {
	enums: Enum[]
	entities: Entity[]
}
export interface RuleDatastore
{
	rule: string
	datastore: string
}
export interface Datastore
{
	name: string
	dialect: string
	schema: string
	connection: any
	rules: RuleDatastore[]
}
export interface PropertyMapping extends Property {
	mapping: string
	key?: string
}
export interface Index {
	name: string
	fields: string[]
}
export interface EntityMapping extends Entity {
	mapping: string
	uniqueKey?:string[]
	indexes?: Index[]
	properties: PropertyMapping[]
}
export interface Schema {
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
export interface Config
{
	app: App
	model: Model
	schemas: Schema[]
	defaultDatastore?: string
	datastores: Datastore[]
}
