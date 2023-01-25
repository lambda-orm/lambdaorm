
import { Relation, Metadata, Sentence, SentenceInclude, Map, BulkInsert, Insert, Update, Delete, Field, From, Join, Filter, GroupBy, Having, Sort, Page } from '../contract'
import { Operand, OperandType, Type } from '3xpr'

export class SentenceSerializer {
	public clone (sentence: Sentence): Sentence {
		return this.deserialize(this.serialize(sentence))
	}

	public serialize (sentence: Sentence): string {
		return JSON.stringify(this._serialize(sentence))
	}

	public deserialize (value: string): Sentence {
		return (this._deserialize(JSON.parse(value))) as Sentence
	}

	private _serialize (operand: Operand): Metadata {
		const children:Metadata[] = []
		for (const child of operand.children) {
			children.push(this._serialize(child))
		}
		if (operand instanceof Sentence) {
			return { classtype: operand.constructor.name, pos: operand.pos, name: operand.name, children, type: operand.type, returnType: Type.toString(operand.returnType), columns: operand.columns, parameters: operand.parameters, entity: operand.entity, constraints: operand.constraints }
		} else if (operand instanceof SentenceInclude) {
			return { classtype: operand.constructor.name, pos: operand.pos, name: operand.name, children, type: operand.type, returnType: Type.toString(operand.returnType), relation: operand.relation }
		} else if (operand instanceof Map || operand instanceof From || operand instanceof Filter ||
				operand instanceof Join || operand instanceof Insert || operand instanceof BulkInsert || operand instanceof Delete ||
				operand instanceof GroupBy || operand instanceof Having || operand instanceof Sort || operand instanceof Page) {
			return { classtype: operand.constructor.name, pos: operand.pos, name: operand.name, children, type: operand.type, returnType: Type.toString(operand.returnType), entity: operand.entity, alias: operand.alias }
		} else if (operand instanceof Field) {
			return { classtype: operand.constructor.name, pos: operand.pos, name: operand.name, children, type: operand.type, returnType: Type.toString(operand.returnType), entity: operand.entity, alias: operand.alias, isRoot: operand.isRoot }
		} else {
			return { classtype: operand.constructor.name, pos: operand.pos, name: operand.name, children, type: operand.type, returnType: Type.toString(operand.returnType) }
		}
	}

	private _deserialize (value: Metadata): Operand {
		const children:Operand[] = []
		if (value.children) {
			for (const k in value.children) {
				children.push(this._deserialize(value.children[k]))
			}
		}
		switch (value.classtype) {
		case 'Sentence':
			// eslint-disable-next-line no-case-declarations
			const sentence = new Sentence(value.pos, value.name, children, value.entity || '', value.alias || '')
			sentence.parameters = value.parameters || []
			sentence.constraints = value.constraints || []
			sentence.values = value.values || []
			sentence.defaults = value.defaults || []
			return sentence
		case 'SentenceInclude':
			return new SentenceInclude(value.pos, value.name, children, value.relation as Relation)
		case 'Delete':
			return new Delete(value.pos, value.name, children, value.entity || '', value.alias || '')
		case 'Update':
			return new Update(value.pos, value.name, children, value.entity || '', value.alias || '')
		case 'Insert':
			return new Insert(value.pos, value.name, children, value.entity || '', value.alias || '')
		case 'BulkInsert':
			return new BulkInsert(value.pos, value.name, children, value.entity || '', value.alias || '')
		case 'Page':
			return new Page(value.pos, value.name, children, value.entity || '', value.alias || '')
		case 'Sort':
			return new Sort(value.pos, value.name, children, value.entity || '', value.alias || '')
		case 'Having':
			return new Having(value.pos, value.name, children, value.entity || '', value.alias || '')
		case 'GroupBy':
			return new GroupBy(value.pos, value.name, children, value.entity || '', value.alias || '')
		case 'Filter':
			return new Filter(value.pos, value.name, children, value.entity || '', value.alias || '')
		case 'Map':
			return new Map(value.pos, value.name, children, value.entity || '', value.alias || '')
		case 'Join':
			return new Join(value.pos, value.name, children, value.entity || '', value.alias || '')
		case 'From':
			return new From(value.pos, value.name, children, value.entity || '', value.alias || '')
		case 'Field':
			return new Field(value.pos, value.entity as string, value.name, Type.to(value.returnType as string), value.alias, value.isRoot)
		default:
			return new Operand(value.pos, value.name, OperandType[value.type], children, Type.to(value.returnType as string))
		}
	}
}
