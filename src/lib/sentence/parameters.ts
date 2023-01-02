
import { Operand, Parameter, OperandType, Type, IParameterManager } from '3xpr'
import { Map, Filter, GroupBy, Having, Sort, Insert, Update, Delete } from '../contract/operands'

export class SentenceParameterManager implements IParameterManager {
	public parameters (operand: Operand): Parameter[] {
		return this.parametersInSentence(operand.children)
	}

	private parametersInSentence (children: Operand[]): Parameter[] {
		const map = children.find(p => p instanceof Map) as Map | undefined
		const filter = children.find(p => p instanceof Filter) as Filter | undefined
		const groupBy = children.find(p => p instanceof GroupBy) as GroupBy | undefined
		const having = children.find(p => p instanceof Having) as Having | undefined
		const sort = children.find(p => p instanceof Sort) as Sort | undefined
		const insert = children.find(p => p instanceof Insert) as Insert | undefined
		const update = children.find(p => p instanceof Update) as Update | undefined
		const _delete = children.find(p => p instanceof Delete) as Delete | undefined

		const parameters: Parameter[] = []
		if (map) this.loadParameters(map, parameters)
		if (insert) this.loadParameters(insert, parameters)
		if (update) this.loadParameters(update, parameters)
		if (_delete) this.loadParameters(_delete, parameters)
		if (filter) this.loadParameters(filter, parameters)
		if (groupBy) this.loadParameters(groupBy, parameters)
		if (having) this.loadParameters(having, parameters)
		if (sort) this.loadParameters(sort, parameters)
		return parameters
	}

	private loadParameters (operand: Operand, parameters: Parameter[]) {
		if (operand.type === OperandType.Var) {
			parameters.push({ name: operand.name, type: Type.toString(operand.returnType) })
		}
		for (const child of operand.children) {
			this.loadParameters(child, parameters)
		}
	}
}
