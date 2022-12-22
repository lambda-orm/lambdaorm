import { Query, QueryOptions, SintaxisError, Include, QueryInfo, Sentence } from '../contract'
import { SchemaManager, Languages, ViewConfig, helper } from '.'
import { SentenceManager } from '../sentence'
import { MemoryCache, ICache } from 'h3lp'
import { Expressions } from 'js-expressions'

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
		const sentence = this.sentenceManager.create(expression, view, options.stage as string)
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

export class QueryManager {
	private cache: ICache<number, string>
	private builder: QueryBuilder
	private expressions: Expressions

	constructor (sentenceManager: SentenceManager, schema: SchemaManager, languages: Languages, expressions: Expressions) {
		this.cache = new MemoryCache<number, string>()
		this.builder = new QueryBuilder(sentenceManager, schema, languages)
		this.expressions = expressions
	}

	public create (expression: string, options: QueryOptions): Query {
		const key = helper.utils.hashCode(expression)
		const value = this.cache.get(key)
		if (!value) {
			const query = this.builder.build(expression, options)
			this.cache.set(key, JSON.stringify(query))
			return query
		} else {
			return JSON.parse(value) as Query
		}
	}

	public getInfo (expression: string, options: QueryOptions): QueryInfo {
		const query = this.create(expression, options)
		return this._getInfo(query)
	}

	private _getInfo (query: Query): QueryInfo {
		const mainSentence: QueryInfo = { entity: query.entity, dialect: query.dialect, source: query.source, sentence: query.sentence, children: [] }
		for (const p in query.includes) {
			const include = query.includes[p]
			const includeSentence = this._getInfo(include.query)
			mainSentence.children?.push(includeSentence)
		}
		return mainSentence
	}

	/**
	 * Convert a lambda expression to a query expression
	 * @param lambda lambda expression
	 * @returns Expression manager
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	public toExpression (func: Function): string {
		if (!func) {
			throw new SintaxisError('empty lambda function}')
		}
		const expression = helper.clearLambda(func)
		const node = this.expressions.parser.parse(expression)
		let aux = node
		while (aux.type !== 'var') {
			if (aux.children.length > 0) {
				aux = aux.children[0]
			}
		}
		if (aux.name.includes('.')) {
			// Example: __model_1.Products.map(p=>p) =>  Products.map(p=>p)
			// Example: __model_1.Orders.details.map(p=>p) =>  Orders.details.map(p=>p)
			const names:string[] = aux.name.split('.')
			if (names[0].startsWith('__')) {
				aux.name = names.slice(1).join('.')
			}
		}
		return this.expressions.parser.toExpression(node)
	}
}
