import { Operand, OperandCloner } from '3xpr'

export class OrmOperandClone implements OperandCloner {
	public clone (source: Operand): Operand {
		const children: Operand[] = []
		for (const child of source.children) {
			children.push(this.clone(child))
		}
		const target = new Operand(source.pos, source.name, source.type, children, source.returnType)
		target.id = source.id
		return target
	}
}
