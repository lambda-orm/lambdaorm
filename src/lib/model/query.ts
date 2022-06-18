import { Property, Parameter, Relation, Behavior, Constraint } from './index'

export interface QueryArgs{
	name: string, dialect: string, dataSource: string, sentence: string, entity: string, columns?: Property[], parameters?: Parameter[], constraints?: Constraint[], values?: Behavior[], defaults?: Behavior[]
}

export class Query {
	public name: string
	// eslint-disable-next-line no-use-before-define
	public includes: Include[]
	public sentence: string
	public dialect: string
	public dataSource: string
	public entity: string
	public columns: Property[]
	public parameters: Parameter[]
	public constraints: Constraint[]
	public values: Behavior[]
	public defaults: Behavior[]
	constructor (args:QueryArgs) {
		this.name = args.name
		this.dialect = args.dialect
		this.sentence = args.sentence
		this.entity = args.entity
		this.dataSource = args.dataSource
		this.columns = args.columns || []
		this.parameters = args.parameters || []
		this.constraints = args.constraints || []
		this.values = args.values || []
		this.defaults = args.defaults || []
		this.includes = []
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
