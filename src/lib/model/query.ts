import { Property, Parameter, Relation, Behavior, Constraint } from './index'

// export class Query extends Operand {
export class Query {
	public name: string
	// eslint-disable-next-line no-use-before-define
	public children: Include[]
	public sentence: string
	public dialect: string
	public dataSource: string
	public entity: string
	// public autoincrement?: Property
	public columns: Property[]
	public parameters: Parameter[]
	public constraints:Constraint[]
	public values: Behavior[]
	public defaults: Behavior[]
	constructor (name: string, dialect: string, dataSource: string, sentence: string, entity: string, columns: Property[] = [], parameters: Parameter[] = [], constraints:Constraint[] = [], values: Behavior[] = [], defaults: Behavior[] = []) {
		this.name = name
		this.dialect = dialect
		this.sentence = sentence
		this.entity = entity
		// this.autoincrement = autoincrement
		this.columns = columns
		this.parameters = parameters
		this.dataSource = dataSource
		this.constraints = constraints
		this.values = values
		this.defaults = defaults
		this.children = []
	}
}
export class Include {
		public name: string
		public children: Query[]
		public relation: Relation
		// public variable: string
		// constructor(name: string, children: Operand[] = [], relation: any, variable: string) {
		constructor (name: string, children: Query[] = [], relation: Relation) {
			this.name = name
			this.children = children
			this.relation = relation
			// this.variable = variable
		}
}
