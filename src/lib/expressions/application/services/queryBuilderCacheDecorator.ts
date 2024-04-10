import { ICache } from 'h3lp'
import { Query } from '../../../query/domain'
import { IQueryBuilder } from '../../domain/services'
import { OrmH3lp } from '../../../shared/application'
import { QueryOptions } from 'lambdaorm-base'

export class QueryBuilderCacheDecorator implements IQueryBuilder {
	// eslint-disable-next-line no-useless-constructor
	constructor (
		private readonly builder: IQueryBuilder
		, private readonly cache: ICache<string, string>,
		private readonly helper: OrmH3lp
	) {}

	public build (expression: string, options: QueryOptions): Query {
		const expressionKey = this.helper.utils.hashCode(expression)
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
}
