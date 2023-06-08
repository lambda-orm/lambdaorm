import { Behavior } from '../../../../schema/domain'
import { Query } from '../../../../query/domain'
import { Expressions } from '3xpr'

export class QuerySolveDefaults {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly expressions: Expressions) {}

	/**
	 * solve default properties
	 * @param query
	 * @param data
	 */
	public solve(query: Query, data: any[]): void
	public solve(query: Query, data: any): void
	public solve (query: Query, data: any | any[]): void {
		if (Array.isArray(data)) {
			for (const defaultBehavior of query.defaults) {
				for (const item of data) {
					this.solveDefault(defaultBehavior, item)
				}
			}
		} else {
			for (const defaultBehavior of query.defaults) {
				this.solveDefault(defaultBehavior, data)
			}
		}
	}

	private solveDefault (defaultBehavior:Behavior, data: any): void {
		const value = data[defaultBehavior.property]
		if (value === undefined) {
			data[defaultBehavior.property] = this.expressions.eval(defaultBehavior.expression, data)
		}
	}
}
