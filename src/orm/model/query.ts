import { Property, Parameter, Relation } from './../model/index'

// export class Query extends Operand {
export class Query {
	public name: string
	// eslint-disable-next-line no-use-before-define
	public children: Include[]
	public sentence: string
	public dialect: string
	public datastore: string
	public entity: string
	// public autoincrement?: Property
	public columns: Property[]
	public parameters: Parameter[]
	constructor (name: string, dialect: string, datastore: string, sentence: string, entity: string, columns: Property[] = [], parameters: Parameter[] = []) {
		this.name = name
		this.dialect = dialect
		this.sentence = sentence
		this.entity = entity
		// this.autoincrement = autoincrement
		this.columns = columns
		this.parameters = parameters
		this.datastore = datastore
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
