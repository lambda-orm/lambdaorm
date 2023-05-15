import { Expressions, expressions } from '3xpr'
import { SentenceLibrary } from '../../sentence/infrastructure'

export class OrmExpressionsBuilder {
	public build (): Expressions {
		expressions.addLibrary(new SentenceLibrary())
		return expressions
	}
}
