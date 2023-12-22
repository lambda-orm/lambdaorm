import { Query, Include } from '../../../query/domain'
import { SchemaFacade, ViewConfigService, Sentence, QueryOptions } from 'lambdaorm-base'
import { LanguagesService } from '../../../language/application'
import { SentenceFacade } from '../../../sentence/application'
import { IQueryBuilder } from '../../domain/services'

// eslint-disable-next-line padded-blocks
export class QueryBuilder implements IQueryBuilder {

	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly sentenceFacade: SentenceFacade,
		private readonly schema: SchemaFacade,
		private readonly languages: LanguagesService) {}

	public build (expression: string, options: QueryOptions): Query {
		const _view = this.schema.view.get(options.view)
		const view = this.schema.view.getInstance(_view.name)
		const sentence = this.sentenceFacade.build(expression, view, options.stage as string)
		const query = this.dmlBuild(sentence, view, options.stage as string)
		query.expression = expression
		return query
	}

	private dmlBuild (sentence: Sentence, view: ViewConfigService, stage: string): Query {
		const includes:Include[] = []
		const source = this.sentenceFacade.getSource(sentence, stage)
		const language = this.languages.getByDialect(source.dialect)
		// const dialect = this.languages.getDialect(source.dialect)
		const mapping = this.schema.mapping.getInstance(source.mapping)
		const sentenceIncludes = sentence.getIncludes()
		for (const p in sentenceIncludes) {
			const sentenceInclude = sentenceIncludes[p]
			// if (!sentenceInclude.relation.composite || !dialect.solveComposite) {
			const queryInclude = this.dmlBuild(sentenceInclude.children[0] as Sentence, view, stage)
			const include = new Include(sentenceInclude.name, queryInclude, sentenceInclude.relation)
			includes.push(include)
			// }
		}
		const query = language.dmlBuilder(source, mapping).build(sentence)
		query.includes = query.includes.concat(includes)
		return query
	}
}
