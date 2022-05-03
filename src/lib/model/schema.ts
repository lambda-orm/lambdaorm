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
	nullable?: boolean
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
	uniqueKey: string[]
	indexes: Index[]
	primaryKey: string[]
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
	datetime?: string
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

export interface DataSource {
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
	dataSources: RuleDataSource[]
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
	dataSources: DataSource[]
	stages: Stage[]
}
export interface SchemaState {
	mappings: Mapping[]
	mappingData: any
	pendingData: any[]
}

export interface Behavior {
	alias?: string
	property: string
	expression: string
}
