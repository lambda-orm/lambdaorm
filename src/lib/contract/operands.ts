
import { Property, Parameter, Relation, Behavior, Constraint, MethodNotImplemented } from '.'
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
	public isRoot?: boolean
	public prefix?: string
	constructor (entity: string, name: string, type: string, alias?: string, isRoot?: boolean) {
		super(name, [], type)
		this.entity = entity
		this.alias = alias
		this.isRoot = isRoot
	}

	public clone () {
		return new Field(this.entity, this.name, this.type, this.alias, this.isRoot)
	}

	public eval (): any {
		throw new MethodNotImplemented('Field', 'eval')
	}
}
export class From extends Operand {
	public alias: string
	constructor (name: string, alias: string) {
		super(name, [], 'any')
		this.alias = alias
	}

	public eval (): any {
		throw new MethodNotImplemented('From', 'eval')
	}
}
export class Join extends Operand {
	public alias: string
	public entity:string
	constructor (name: string, children:Operand[], entity:string, alias: string) {
		super(name, children, 'any')
		this.alias = alias
		this.entity = entity
	}

	public eval (): any {
		throw new MethodNotImplemented('Join', 'eval')
	}
}
export class Map extends ArrowFunction { }
export class Filter extends ArrowFunction { }
export class GroupBy extends ArrowFunction { }
export class Having extends ArrowFunction { }
export class Sort extends ArrowFunction { }
export class Page extends ChildFunction { }
export class Insert extends ArrowFunction {
	public clause: string
	constructor (name: string, children: Operand[], clause: string) {
		super(name, children)
		this.clause = clause
	}
}
export class Update extends ArrowFunction {
	public alias: string
	constructor (name: string, children: Operand[], alias: string) {
		super(name, children)
		this.alias = alias
	}
}
export class Delete extends ArrowFunction {
	public alias: string
	constructor (name: string, children: Operand[], alias: string) {
		super(name, children)
		this.alias = alias
	}
}

export enum SentenceCrudAction {
	undefined = 'undefined',
	select = 'select',
	insert = 'insert',
	update = 'update',
	delete = 'delete'
}
export enum SentenceAction {
	select = 'select',
	insert = 'insert',
	bulkInsert = 'bulkInsert',
	update = 'update',
	delete = 'delete',
	truncateEntity = 'truncateEntity',
	createEntity = 'createEntity',
	createSequence = 'createSequence',
	createFk = 'createFk',
	createIndex = 'createIndex',
	alterProperty = 'alterProperty',
	addProperty = 'addProperty',
	addPk = 'addPk',
	addUk = 'addUk',
	addFk = 'addFk',
	dropSequence = 'dropSequence',
	dropEntity = 'dropEntity',
	dropProperty = 'dropProperty',
	dropPk = 'dropPk',
	dropUk = 'dropUk',
	dropFk = 'dropFk',
	dropIndex = 'dropIndex',
	ddl = 'ddl'
}

export class Sentence extends Operand {
	public columns: Property[]
	public parameters: Parameter[]
	public entity: string
	public alias: string
	public action: SentenceAction
	public crudAction: SentenceCrudAction
	public constraints: Constraint[]
	public values: Behavior[]
	public defaults: Behavior[]

	constructor (name: string, children: Operand[], entity: string, alias: string, columns: Property[]) {
		super(name, children)
		this.action = SentenceAction[name]
		this.crudAction = SentenceCrudAction.undefined
		this.entity = entity
		this.alias = alias
		this.columns = columns
		this.parameters = []
		this.constraints = []
		this.values = []
		this.defaults = []
		this.initialize()
	}

	public getIncludes (): SentenceInclude[] {
		return this.children.filter(p => p instanceof SentenceInclude) as SentenceInclude[]
	}

	public getCompositeIncludes (): SentenceInclude[] {
		const includes = this.getIncludes()
		return includes.filter(p => p.relation.composite)
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
			this.crudAction = SentenceCrudAction.select
			this.loadVariables(map, variables)
		} else if (insert) {
			this.crudAction = SentenceCrudAction.insert
			this.loadVariables(insert, variables)
		} else if (update) {
			this.crudAction = SentenceCrudAction.update
			this.loadVariables(update, variables)
		} else if (_delete) {
			this.crudAction = SentenceCrudAction.delete
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
		if (operand instanceof Variable) {
			variables.push(operand)
		}
		for (const child of operand.children) {
			this.loadVariables(child, variables)
		}
	}

	public eval (): any {
		throw new MethodNotImplemented('Sentence', 'eval')
	}
}
export class SentenceInclude extends Operand {
	public relation: Relation
	// public variable: string
	constructor (name: string, children: Operand[], relation: Relation) {
		super(name, children)
		this.relation = relation
		// this.variable = variable
	}

	public eval (): any {
		throw new MethodNotImplemented('SentenceInclude', 'eval')
	}
}
