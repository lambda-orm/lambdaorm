import { Property, Relation, Behavior, Constraint, SentenceAction, SentenceType, SentenceCategory } from 'lambdaorm-base'
import { Parameter } from '3xpr'

export interface QueryArgs{
	action: SentenceAction,
	type: SentenceType,
	category: SentenceCategory
	dialect: string,
	source: string,
	sentence: string,
	entity: string,
	columns?: Property[],
	parameters?: Parameter[],
	constraints?: Constraint[],
	values?: Behavior[],
	defaults?: Behavior[],
	// eslint-disable-next-line no-use-before-define
	includes?: Include[]
	query?: string,
}
export class Query {
	public action: SentenceAction
	public type: SentenceType
	public category: SentenceCategory
	// eslint-disable-next-line no-use-before-define
	public includes: Include[]
	public sentence: string
	public dialect: string
	public source: string
	public entity: string
	public columns: Property[]
	public parameters: Parameter[]
	public constraints: Constraint[]
	public values: Behavior[]
	public defaults: Behavior[]
	public query: string
	constructor (args:QueryArgs) {
		this.action = args.action
		this.type = args.type
		this.category = args.category
		this.dialect = args.dialect
		this.sentence = args.sentence
		this.entity = args.entity
		this.source = args.source
		this.columns = args.columns || []
		this.parameters = args.parameters || []
		this.constraints = args.constraints || []
		this.values = args.values || []
		this.defaults = args.defaults || []
		this.includes = args.includes || []
		this.query = args.query || ''
	}
}
export class Include {
	public name: string
	public query: Query
	public relation: Relation
	constructor (name: string, query: Query, relation: Relation) {
		this.name = name
		this.query = query
		this.relation = relation
	}
}
export interface ExecuteResult {
	result?: any
	error?: Error
}
