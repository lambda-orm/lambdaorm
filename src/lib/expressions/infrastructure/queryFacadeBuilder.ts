import { MemoryCache } from 'h3lp'
import { LanguagesService } from '../../language/application'
import { SchemaState } from 'lambdaorm-base'
import { SentenceFacade } from '../../sentence/application'
import { Expressions } from '3xpr'
import { ExpressionFacade } from '../application'
import { Executor } from '../../execution/domain'
import { OrmH3lp } from '../../shared/infrastructure'

export class ExpressionFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly languages: LanguagesService,
		private readonly executor:Executor,
		private readonly expressions:Expressions,
		private readonly helper:OrmH3lp
	) {}

	public build (sentence: SentenceFacade, schemaState: SchemaState):ExpressionFacade {
		const queryCache = new MemoryCache<string, string>()
		return new ExpressionFacade(sentence, schemaState, this.languages, this.executor, this.expressions, queryCache, this.helper)
	}
}
