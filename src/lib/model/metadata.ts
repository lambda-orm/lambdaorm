import { Behavior, Constraint, Property, Relation } from './schema'
import { Parameter } from './parameter'

export interface MetadataParameter {
	name: string
	type: string
	childs?: MetadataParameter[]
}

export interface MetadataModel {
	name: string
	type: string
	childs?: MetadataModel[]
}

export interface MetadataConstraint {
	entity: string
	constraints: Constraint[]
	childs?: MetadataConstraint[]
}

export interface MetadataSentence {
	entity: string
	dialect: string
	dataSource: string
	sentence: string
	childs?: MetadataSentence[]
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
	number?: number
}
