/* eslint-disable @typescript-eslint/ban-types */
import { Query, QueryOptions, QueryInfo, ExecuteResult } from '../../query/domain'
import { QueryBuilder } from './queryBuilder'
import { IOrmExpressions } from '../../shared/domain'
import { SchemaService } from '../../schema/application'
import { LanguagesService } from '../../language/application'
import { SentenceService } from '../../sentence/application'
import { MemoryCache, ICache, Autowired } from 'h3lp'
import { helper } from '../../shared/application/helper'
import { Executor } from '../../execution/application'
import { ExpressionTransaction } from '../domain'

export class QueryService {
	private cache: ICache<string, string>
	private builder: QueryBuilder

	constructor (private readonly executor:Executor,
		sentenceService: SentenceService,
		private readonly schemaService: SchemaService,
		languages: LanguagesService) {
		this.cache = new MemoryCache<string, string>()
		this.builder = new QueryBuilder(sentenceService, schemaService, languages)
	}

	@Autowired('orm.expressions')
	private expressions!: IOrmExpressions

	public create (expression: string, options: QueryOptions, useCache:boolean): Query {
		if (!useCache) {
			return this.builder.build(expression, options)
		}
		const expressionKey = helper.utils.hashCode(expression)
		const key = `${expressionKey}-${options.stage}-${options.view || 'default'}`
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
		const query = this.create(expression, options, true)
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

	public solveOptions (options?: QueryOptions):QueryOptions {
		if (!options) {
			options = {}
		}
		if (!options.stage) {
			const _stage = this.schemaService.stage.get()
			options.stage = _stage.name
		}
		if (!options.view) {
			const _view = this.schemaService.view.get()
			options.view = _view.name
		}
		return options
	}

	public async execute (expression: string|Function, data: any = {}, options: QueryOptions|undefined = undefined): Promise<any> {
		const _expression = typeof expression !== 'string' ? this.expressions.toExpression(expression) : expression
		const _options = this.solveOptions(options)
		const query = this.create(_expression, _options, true)
		this.executeQuery(query, data, _options)
	}

	public async executeList (queries: Query[], options: QueryOptions): Promise<ExecuteResult[]> {
		return this.executor.executeList(queries, options)
	}

	public async executeQuery (query: Query, data: any, options: QueryOptions): Promise<any> {
		this.executor.execute(query, data, options)
	}

	/**
 * Create a transaction
 * @param source Database name
 * @param callback Code to be executed in transaction
 */
	public async transaction (options: QueryOptions, callback: { (tr: ExpressionTransaction): Promise<void> }): Promise<void> {
		this.executor.transaction(options, async (transaction) => {
			const tr = new ExpressionTransaction(transaction, this)
			await callback(tr)
		})
	}
}
