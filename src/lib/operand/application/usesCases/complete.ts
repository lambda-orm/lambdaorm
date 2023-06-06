/* eslint-disable no-case-declarations */
import { Operand } from '3xpr'

export class OrmOperandComplete {
	public complete (operand:Operand): Operand {
		this._complete(operand)
		return operand
	}

	private _complete (operand: Operand, index = 0, parentId?:string): void {
		const id = parentId ? parentId + '.' + index : index.toString()
		if (operand.children) {
			for (let i = 0; i < operand.children.length; i++) {
				const child = operand.children[i]
				this._complete(child, i, id)
			}
		}
		operand.id = id
	}
}
