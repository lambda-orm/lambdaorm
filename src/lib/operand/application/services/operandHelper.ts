import { OperandHelper, Operand, OperandType } from '3xpr'
import { Type } from 'typ3s'
export class OrmOperandHelper {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly operandHelper:OperandHelper) {}

	public toExpression (operand: Operand): string {
		const clauses: any = this.getClauses(operand)
		const list:string[] = []
		if (clauses.map) {
			const body = this.operandHelper.toExpression(clauses.map.children[2])
			list.push(`map(${clauses.map.children[1].name}=>${body})`)
		} else if (clauses.insert) {
			const body = this.operandHelper.toExpression(clauses.insert.children[1])
			list.push(`insert(${body})`)
		} else if (clauses.bulkInsert) {
			const body = this.operandHelper.toExpression(clauses.bulkInsert.children[1])
			list.push(`bulkInsert(${body})`)
		} else if (clauses.update) {
			const body = this.operandHelper.toExpression(clauses.update.children[2])
			list.push(`update(${clauses.update.children[1].name}=>${body})`)
		} else if (clauses.delete) {
			list.push('delete()')
		}
		if (clauses.filter) {
			const body = this.operandHelper.toExpression(clauses.filter.children[2])
			list.push(`filter(${clauses.filter.children[1].name}=>${body})`)
		}
		if (clauses.include) {
			const body = clauses.include.children[2]
			if (Type.isList(body.type as string)) {
				const includes:string[] = []
				for (const child of body.children) {
					const include = this.toExpression(child)
					includes.push(include)
				}
				list.push(`include(${clauses.include.children[1].name}=>[${includes.join(',')}])`)
			} else {
				const include = this.toExpression(body)
				list.push(`include(${clauses.include.children[1].name}=>${include})`)
			}
		}

		if (clauses.groupBy) {
			const body = this.operandHelper.toExpression(clauses.groupBy.children[2])
			list.push(`groupBy(${clauses.groupBy.children[1].name}=>${body})`)
		}
		if (clauses.having) {
			const body = this.operandHelper.toExpression(clauses.having.children[2])
			list.push(`having(${clauses.having.children[1].name}=>${body})`)
		}
		if (clauses.sort) {
			const body = this.operandHelper.toExpression(clauses.sort.children[2])
			list.push(`sort(${clauses.sort.children[1].name}=>${body})`)
		}
		if (clauses.page) {
			const offset = this.operandHelper.toExpression(clauses.page.children[1])
			const limit = this.operandHelper.toExpression(clauses.page.children[2])
			list.push(`page(${offset},${limit})`)
		}
		// TODO: solve includes
		return `${clauses.from.name}.${list.join('.')}`
	}

	public getClauses (operand: Operand): any {
		const clauses: any = {}
		let current = operand
		while (current) {
			const name = current.type === OperandType.Var ? 'from' : current.name
			clauses[name] = current
			if (current.children.length > 0) {
				current = current.children[0]
			} else {
				break
			}
		}
		return clauses
	}
}
