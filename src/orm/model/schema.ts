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
	mapping?: string
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
	singular?: string
	mapping?: string
	primaryKey?:string[]
	uniqueKey?:string[]
	properties:Property[]
	relations:Relation[]
	indexes?: Index[]
	externalDb?: string
}
export interface Schema {
	name: string
	entities: Entity[]
	enums: Enum[]
}
