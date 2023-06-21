import { Behavior, Constraint, Property, Relation } from '../../schema/domain/schema'
import { Parameter, Position } from '3xpr'

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

export interface Metadata {
	classtype: string,
	pos:Position,
	name: string,
	children?: Metadata[],
	type: string,
	returnType?: string,
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
