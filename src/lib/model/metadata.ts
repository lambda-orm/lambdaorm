import { Constraint, Property, Relation } from './schema'
import { Parameter } from './parameter'

export interface MetadataParameter
{
	name:string
	type: string
	childs?:MetadataParameter[]
}

export interface MetadataModel
{
	name:string
	type: string
	childs?:MetadataModel[]
}

export interface MetadataConstraint
{
	entity:string
	constraints: Constraint[]
	childs?:MetadataConstraint[]
}

export interface MetadataSentence
{
	entity:string
	dialect: string
	dataSource : string
	sentence: string
	childs?:MetadataSentence[]
}

export interface Metadata
{
	name: string,
	type: string,
	entity?: string,
	children?: Metadata[],
	fields?: Property[],
	property?:string
	parameters?: Parameter[],
	relation?: Relation,
	sentence?: string,
	alias?: string,
	number?:number
}
