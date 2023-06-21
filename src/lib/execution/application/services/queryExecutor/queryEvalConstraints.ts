import { Constraint } from '../../../../schema/domain'
import { ValidationError } from '../../../domain'
import { Query } from '../../../../query/domain'
import { Expressions } from '3xpr'

export class QueryEvalConstraints {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly expressions: Expressions) {}

	public eval(query: Query, data: any[]): void
	public eval(query: Query, data: any): void
	public eval (query: Query, data: any | any[]): void {
		if (Array.isArray(data)) {
			for (const constraint of query.constraints) {
				for (const item of data) {
					this.constraint(query, constraint, item)
				}
			}
		} else {
			for (const constraint of query.constraints) {
				this.constraint(query, constraint, data)
			}
		}
	}

	private constraint (query: Query, constraint:Constraint, data: any): void {
		if (!this.expressions.eval(constraint.condition, data)) {
			throw new ValidationError(query.source, query.entity, constraint.condition, JSON.stringify(query.sentence), constraint.message, data)
		}
	}
}
