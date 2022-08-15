import { Behavior, Constraint, Property, Relation } from './schema'
import { Parameter } from './parameter'

export interface MetadataParameter {
	name: string
	type: string
	children?: MetadataParameter[]
}

export interface MetadataModel {
	name: string
	type: string
	children?: MetadataModel[]
}

export interface MetadataConstraint {
	entity: string
	constraints: Constraint[]
	children?: MetadataConstraint[]
}

export interface MetadataSentence {
	entity: string
	dialect: string
	dataSource: string
	sentence: string
	children?: MetadataSentence[]
}

export interface Metadata {
	classtype: string,
	name: string,
	children?: Metadata[],
	type?: string,
	entity?: string,
	columns?: Property[],
	property?: string
	parameters?: Parameter[],
	constraints?: Constraint[],
	values?: Behavior[],
	defaults?: Behavior[],
	relation?: Relation,
	clause?: string,
	alias?: string,
	isRoot?: boolean
	number?: number
}
