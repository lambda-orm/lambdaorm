import { Query } from '../../../../query/domain'
import { Expressions } from '3xpr'

export class QuerySolveWriteValues {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly expressions: Expressions) {}

	public solve(query: Query, data: any[]): void
	public solve(query: Query, data: any): void
	public solve (query: Query, data: any | any[]): void {
		if (Array.isArray(data)) {
			for (const valueBehavior of query.values) {
				for (const item of data) {
					item[valueBehavior.property] = this.expressions.eval(valueBehavior.expression, item)
				}
			}
		} else {
			for (const valueBehavior of query.values) {
				data[valueBehavior.property] = this.expressions.eval(valueBehavior.expression, data)
			}
		}
	}
}
