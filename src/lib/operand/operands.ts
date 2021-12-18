
import { Property, Parameter, Relation } from '../model/index'
import { Operand, Constant, ArrowFunction, ChildFunction, Variable } from 'js-expressions'
const SqlString = require('sqlstring')

export class Constant2 extends Constant {
	public eval (): any {
		switch (this.type) {
		case 'string':
			return SqlString.escape(this.name)
		case 'boolean':
			return this.name === 'true'
		case 'number':
			return parseFloat(this.name)
		default:
			return SqlString.escape(this.name)
		}
	}
}
export class Field extends Operand {
	public entity: string
	public alias?: string
	constructor (entity: string, name: string, type: string, alias?: string) {
		super(name, [], type)
		this.entity = entity
		this.alias = alias
	}

	public clone () {
		return new Field(this.entity, this.name, this.type, this.alias)
	}

	public eval (): any {
	// TODO:implement
		throw new Error('NotImplemented')
	}
}
export class From extends Operand {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class Join extends Operand {
	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class Map extends ArrowFunction { }
export class Filter extends ArrowFunction { }
export class GroupBy extends ArrowFunction { }
export class Having extends ArrowFunction { }
export class Sort extends ArrowFunction { }
export class Page extends ChildFunction { }
export class Insert extends ArrowFunction {
	// public autoincrement?: string
	public clause: string
	constructor (name: string, children: Operand[] = [], clause: string) {
		super(name, children)
		// this.autoincrement = autoincrement
		this.clause = clause
	}
}
export class Update extends ArrowFunction { }
export class Delete extends ArrowFunction { }
export class Sentence extends Operand {
	public columns: Property[]
	public parameters: Parameter[]
	public entity: string
	// public autoincrement?: Property
	public alias: string
	public action: string
	constructor (name: string, children: Operand[] = [], entity: string, alias: string, columns: Property[] = [], parameters: Parameter[] = []) {
		super(name, children)
		this.entity = entity
		// this.autoincrement = autoincrement
		this.alias = alias
		this.columns = columns
		this.parameters = parameters
		this.action = ''
		this.initialize()
	}

	public getIncludes (): SentenceInclude[] {
		return this.children.filter(p => p instanceof SentenceInclude) as SentenceInclude[]
	}

	private initialize () {
		const map = this.children.find(p => p.name === 'map')
		const filter = this.children.find(p => p.name === 'filter')
		const groupBy = this.children.find(p => p.name === 'groupBy')
		const having = this.children.find(p => p.name === 'having')
		const sort = this.children.find(p => p.name === 'sort')
		const insert = this.children.find(p => p instanceof Insert) as Insert | undefined
		const update = this.children.find(p => p instanceof Update) as Update | undefined
		const _delete = this.children.find(p => p instanceof Delete) as Delete | undefined

		const variables: Variable[] = []
		if (map) {
			this.action = 'select'
			this.loadVariables(map, variables)
		} else if (insert) {
			this.action = 'insert'
			this.loadVariables(insert, variables)
		} else if (update) {
			this.action = 'update'
			this.loadVariables(update, variables)
		} else if (_delete) {
			this.action = 'delete'
			this.loadVariables(_delete, variables)
		}
		if (filter) this.loadVariables(filter, variables)
		if (groupBy) this.loadVariables(groupBy, variables)
		if (having) this.loadVariables(having, variables)
		if (sort) this.loadVariables(sort, variables)
		for (let i = 0; i < variables.length; i++) {
			variables[i].number = i + 1
		}
	}

	private loadVariables (operand: Operand, variables: Variable[]) {
		if (operand instanceof Variable) { variables.push(operand) }
		for (let i = 0; i < operand.children.length; i++) { this.loadVariables(operand.children[i], variables) }
	}

	public eval (): any {
		throw new Error('NotImplemented')
	}
}
export class SentenceInclude extends Operand {
	public relation: Relation
	// public variable: string
	constructor (name: string, children: Operand[] = [], relation: Relation) {
		super(name, children)
		this.relation = relation
		// this.variable = variable
	}

	public eval (): any {
		throw new Error('NotImplemented')
	}
}
