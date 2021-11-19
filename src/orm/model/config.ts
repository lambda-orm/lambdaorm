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
	primaryKey?:string[]
	uniqueKey?:string[]
	properties:Property[]
	relations:Relation[]
	indexes?: Index[]
}
export interface Model {
	enums: Enum[]
	entities: Entity[]
}
export interface Datastore
{
	name: string
	dialect: string
	mapping?: string
	connection: any
}
export interface EntityKey {
	field: string
	value: any
}
export interface EntityMapping {
	name: string
	mapping: string
	extends?: string
	properties: any
	// para poder definir el key, Example: Country and states Mapping with Localtions with Field "type" value "country" and "state"
	keys: EntityKey[]
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
export interface Config
{
	app: App
	model: Model
	mappings?: Mapping[]
	defaultDatastore?: string
	datastores: Datastore[]
}
