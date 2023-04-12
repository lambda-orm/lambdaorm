import { Query, QueryOptions, QueryInfo, ISchemaService } from '../../domain'
import { QueryBuilder } from './index'
import { LanguagesService } from '../language'
import { SentenceService } from '../sentence'
import { MemoryCache, ICache } from 'h3lp'
import { IExpressions } from '3xpr'
import { helper } from '../../helper'

export class QueryManager {
	private cache: ICache<string, string>
	private builder: QueryBuilder
	private expressions: IExpressions

	constructor (sentenceManager: SentenceService, schema: ISchemaService, languages: LanguagesService, expressions: IExpressions) {
		this.cache = new MemoryCache<string, string>()
		this.builder = new QueryBuilder(sentenceManager, schema, languages)
		this.expressions = expressions
	}

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
}
