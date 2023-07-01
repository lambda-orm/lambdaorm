import { Property, Relation, Behavior, Constraint } from '../../schema/domain'
import { Parameter, Operand, OperandType, Position } from '3xpr'
import { Type } from 'typ3s'
import { SentenceAction, SentenceCrudAction } from '../../schema/domain/actions'
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

	public fieldName () {
		if (this.alias === undefined || !this.name.startsWith(this.alias + '.')) {
			return this.name
		}
		return this.name.replace(this.alias + '.', '')
	}

	public clone () {
		return new Field(this.pos, this.entity, this.name, this.returnType, this.alias, this.isRoot)
	}
}

export class Clause extends Operand {
	public alias: string
	public entity:string
	constructor (pos:Position, name: string, children:Operand[], entity:string, alias: string) {
		super(pos, name, OperandType.Arrow, children, Type.any)
		this.alias = alias
		this.entity = entity
	}
}

export class Map extends Clause { }
export class Filter extends Clause { }
export class GroupBy extends Clause { }
export class Having extends Clause { }
export class Sort extends Clause { }
export class Page extends Clause { }
export class From extends Clause {}
export class Join extends Clause {}
export class Insert extends Clause { }
export class BulkInsert extends Clause { }
export class Update extends Clause { }
export class Delete extends Clause { }

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
		const insert = this.children.find(p => p instanceof Insert) as Insert | undefined
		const bulkInsert = this.children.find(p => p instanceof BulkInsert) as BulkInsert | undefined
		const update = this.children.find(p => p instanceof Update) as Update | undefined
		const _delete = this.children.find(p => p instanceof Delete) as Delete | undefined

		if (map) {
			this.crudAction = SentenceCrudAction.select
		} else if (insert) {
			this.crudAction = SentenceCrudAction.insert
		} else if (bulkInsert) {
			this.crudAction = SentenceCrudAction.insert
		} else if (update) {
			this.crudAction = SentenceCrudAction.update
		} else if (_delete) {
			this.crudAction = SentenceCrudAction.delete
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
