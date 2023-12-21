import { Query, QueryOptions } from '../../../query/domain'
import { QueryPlan } from 'lambdaorm-base'
import { IQueryBuilder } from '../../domain/services'

export class GeQueryPlan {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly builder:IQueryBuilder) {}

	public plan (expression: string, options: QueryOptions): QueryPlan {
		const query = this.builder.build(expression, options)
		return this._plan(query)
	}

	private _plan (query: Query): QueryPlan {
		const mainSentence: QueryPlan = { entity: query.entity, dialect: query.dialect, source: query.source, sentence: query.sentence }
		for (const p in query.includes) {
			const include = query.includes[p]
			const includeSentence = this._plan(include.query)
			if (mainSentence.children === undefined) {
				mainSentence.children = []
			}
			mainSentence.children.push(includeSentence)
		}
		return mainSentence
	}
}
