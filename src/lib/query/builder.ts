import { Query, QueryOptions, Include, Sentence } from '../contract'
import { SchemaManager, ViewConfig } from '../manager'
import { Languages } from '../language'
import { SentenceManager } from '../sentence'

export class QueryBuilder {
	private schema: SchemaManager
	private languages: Languages
	private sentenceManager: SentenceManager

	constructor (sentenceManager: SentenceManager, schema: SchemaManager, languages: Languages) {
		this.schema = schema
		this.languages = languages
		this.sentenceManager = sentenceManager
	}

	public build (expression: string, options: QueryOptions): Query {
		const _view = this.schema.view.get(options.view)
		const view = this.schema.view.getInstance(_view.name)
		const sentence = this.sentenceManager.create(expression, view, options.stage as string, true)
		return this.dmlBuild(sentence, view, options.stage as string)
	}

	private dmlBuild (sentence: Sentence, view: ViewConfig, stage: string): Query {
		const includes:Include[] = []
		const source = this.sentenceManager.getDataSource(sentence, stage)
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
		const query = language.dmlBuild(source, mapping, sentence)
		query.includes = query.includes.concat(includes)
		return query
	}
}
