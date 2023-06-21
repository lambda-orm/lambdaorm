
import { Query } from '../../../../query/domain'
import { Helper } from '../../../../shared/application'
import { Expressions } from '3xpr'

export class QuerySolveReadValues {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly expressions: Expressions, private readonly helper:Helper) {}

	public solve (query: Query, data: any[]): void {
		for (const valueBehavior of query.values) {
			if (valueBehavior.alias === valueBehavior.property) {
				// Example Users.map(p=> [p.email]) or Users.map(p=> {email:p.email})
				for (const item of data) {
					item[valueBehavior.alias] = this.expressions.eval(valueBehavior.expression, item)
				}
			} else if (valueBehavior.alias) {
				// Example Users.map(p=> {mail:p.email})
				// since the expression contains the name of the property and not the alias
				// the property must be added with the alias value.
				for (const item of data) {
					const context = this.helper.obj.clone(item)
					context[valueBehavior.property] = item[valueBehavior.alias]
					item[valueBehavior.alias] = this.expressions.eval(valueBehavior.expression, context)
				}
			}
		}
	}
}
