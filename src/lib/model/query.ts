import { Property, Parameter, Relation, Behavior, Constraint } from './index'

// export class Query extends Operand {
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
	constructor (name: string, dialect: string, dataSource: string, sentence: string, entity: string, columns: Property[] = [], parameters: Parameter[] = [], constraints: Constraint[] = [], values: Behavior[] = [], defaults: Behavior[] = []) {
		this.name = name
		this.dialect = dialect
		this.sentence = sentence
		this.entity = entity
		this.columns = columns
		this.parameters = parameters
		this.dataSource = dataSource
		this.constraints = constraints
		this.values = values
		this.defaults = defaults
		this.includes = []
	}
	// public getCompositeIncludes(): Include[] {
	// return this.includes.filter(p => p.relation.composite)
	// }
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
