import { MemoryCache } from 'h3lp'
import { ExecutionFacade } from '../../execution/application'
import { LanguagesService } from '../../language/application'
import { SchemaFacade } from '../../schema/application'
import { SentenceFacade } from '../../sentence/application'
import { QueryFacade } from '../application'
import { Expressions } from '3xpr'

export class QueryFacadeBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly languages: LanguagesService,
		private readonly execution:ExecutionFacade,
		private readonly expressions:Expressions) {}

	public build (sentence: SentenceFacade, schema: SchemaFacade):QueryFacade {
		const queryCache = new MemoryCache<string, string>()
		return new QueryFacade(sentence, schema, this.languages, this.execution, this.expressions, queryCache)
	}
}
