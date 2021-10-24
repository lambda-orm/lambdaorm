import { Property, Parameter } from './../model/index'

// export class Query extends Operand {
export class Query {
		public name: string
		// eslint-disable-next-line no-use-before-define
		public children: Include[]
		public sentence: string
		public dialect: string
		public entity: string
		public autoincrement?: Property
		public columns: Property[]
		public parameters: Parameter[]
		constructor (name: string, children: Include[] = [], dialect: string, sentence: string, entity: string, autoincrement?: Property, columns: Property[] = [], parameters: Parameter[] = []) {
			this.name = name
			this.children = children
			this.dialect = dialect
			this.sentence = sentence
			this.entity = entity
			this.autoincrement = autoincrement
			this.columns = columns
			this.parameters = parameters
		}
}
export class Include {
		public name: string
		public children: Query[]
		public relation: any
		// public variable: string
		// constructor(name: string, children: Operand[] = [], relation: any, variable: string) {
		constructor (name: string, children: Query[] = [], relation: any) {
			this.name = name
			this.children = children
			this.relation = relation
			// this.variable = variable
		}
}
