import { Expressions, expressions } from '3xpr'
import { SentenceLibrary } from '../../sentence/infrastructure'
import { OrmH3lp } from '../../shared/infrastructure'

export class OrmExpressionsBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly helper: OrmH3lp) {}
	public build (): Expressions {
		expressions.addLibrary(new SentenceLibrary(this.helper))
		return expressions
	}
}
