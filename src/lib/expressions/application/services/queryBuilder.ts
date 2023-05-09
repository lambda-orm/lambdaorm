import { Query, QueryOptions, Include } from '../../../query/domain'
import { ISentenceCompleteBuilder, Sentence } from '../../../sentence/domain'
import { SchemaService, ViewConfigService } from '../../../schema/application'
import { LanguagesService } from '../../../language/application'
import { SentenceHelper } from '../../../sentence/application'
import { IQueryBuilder } from '../../domain/services'

// eslint-disable-next-line padded-blocks
export class QueryBuilder implements IQueryBuilder {

	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly sentenceHelper: SentenceHelper,
		private readonly schema: SchemaService,
		private readonly languages: LanguagesService,
		private readonly sentenceBuilder: ISentenceCompleteBuilder) {}

	public build (expression: string, options: QueryOptions): Query {
		const _view = this.schema.view.get(options.view)
		const view = this.schema.view.getInstance(_view.name)
		const sentence = this.sentenceBuilder.build(expression, view, options.stage as string)
		return this.dmlBuild(sentence, view, options.stage as string)
	}

	private dmlBuild (sentence: Sentence, view: ViewConfigService, stage: string): Query {
		const includes:Include[] = []
		const source = this.sentenceHelper.getSource(sentence, stage)
		const language = this.languages.getByDialect(source.dialect)
		const dialect = this.languages.getDialect(source.dialect)
		const mapping = this.schema.mapping.getInstance(source.mapping)
		const sentenceIncludes = sentence.getIncludes()
		for (const p in sentenceIncludes) {
			const sentenceInclude = sentenceIncludes[p]
			if (!sentenceInclude.relation.composite || !dialect.solveComposite) {
				const queryInclude = this.dmlBuild(sentenceInclude.children[0] as Sentence, view, stage)
				const include = new Include(sentenceInclude.name, queryInclude, sentenceInclude.relation)
				includes.push(include)
			}
		}
		const query = language.dmlBuilder(source, mapping).build(sentence)
		query.includes = query.includes.concat(includes)
		return query
	}
}
