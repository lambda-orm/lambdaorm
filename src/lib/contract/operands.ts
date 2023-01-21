
import { Property, Relation, Behavior, Constraint } from '.'
import { Parameter, Operand, OperandType, Position, Type } from '3xpr'
const SqlString = require('sqlstring')

export class Constant extends Operand {
	public eval (): any {
		if (this.returnType === undefined) {
			return SqlString.escape(this.name)
		}
		switch (this.returnType) {
		case Type.string:
			return SqlString.escape(this.name)
		case Type.boolean:
			return this.name === 'true'
		case Type.integer:
			return parseInt(this.name)
		case Type.number:
		case Type.decimal:
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
	constructor (pos:Position, entity: string, name: string, returnType?:Type, alias?: string, isRoot?: boolean) {
		super(pos, name, OperandType.Var, [], returnType)
		this.entity = entity
		this.alias = alias
		this.isRoot = isRoot
	}

	public clone () {
		return new Field(this.pos, this.entity, this.name, this.returnType, this.alias, this.isRoot)
	}
}

export class Map extends Operand { }
export class Filter extends Operand { }
export class GroupBy extends Operand { }
export class Having extends Operand { }
export class Sort extends Operand { }
export class Page extends Operand { }

export class Clause extends Operand {
	public alias: string
	public entity:string
	constructor (pos:Position, name: string, children:Operand[], entity:string, alias: string) {
		super(pos, name, OperandType.Arrow, children, Type.any)
		this.alias = alias
		this.entity = entity
	}
}
export class From extends Clause {
	constructor (pos:Position, entity:string, alias: string) {
		super(pos, 'from', [], entity, alias)
	}
}
export class Join extends Clause {}
export class Insert extends Clause { }
export class BulkInsert extends Clause { }
export class Update extends Clause { }
export class Delete extends Clause { }

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

	constructor (pos:Position, name: string, children: Operand[], entity: string, alias: string) {
		super(pos, name, OperandType.Arrow, children, Type.any)
		this.action = SentenceAction[name]
		this.crudAction = SentenceCrudAction.undefined
		this.entity = entity
		this.alias = alias
		this.columns = []
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
		const map = this.children.find(p => p instanceof Map)
		const filter = this.children.find(p => p instanceof Filter)
		const groupBy = this.children.find(p => p instanceof GroupBy)
		const having = this.children.find(p => p instanceof Having)
		const sort = this.children.find(p => p instanceof Sort)
		const insert = this.children.find(p => p instanceof Insert) as Insert | undefined
		const bulkInsert = this.children.find(p => p instanceof BulkInsert) as BulkInsert | undefined
		const update = this.children.find(p => p instanceof Update) as Update | undefined
		const _delete = this.children.find(p => p instanceof Delete) as Delete | undefined

		const variables: Operand[] = []
		if (map) {
			this.crudAction = SentenceCrudAction.select
			this.loadVariables(map, variables)
		} else if (insert) {
			this.crudAction = SentenceCrudAction.insert
			this.loadVariables(insert, variables)
		} else if (bulkInsert) {
			this.crudAction = SentenceCrudAction.insert
			this.loadVariables(bulkInsert, variables)
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

	private loadVariables (operand: Operand, variables: Operand[]) {
		if (operand.type === OperandType.Var) {
			variables.push(operand)
		}
		for (const child of operand.children) {
			this.loadVariables(child, variables)
		}
	}
}
export class SentenceInclude extends Operand {
	public relation: Relation
	constructor (pos:Position, name: string, children: Operand[], relation: Relation) {
		super(pos, name, OperandType.Arrow, children, Type.any)
		this.relation = relation
	}
}
