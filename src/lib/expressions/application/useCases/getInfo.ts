import { Query, QueryInfo, QueryOptions } from '../../../query/domain'
import { IQueryBuilder } from '../../domain/services'

export class GetInfoQuery {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly builder:IQueryBuilder) {}

	public getInfo (expression: string, options: QueryOptions): QueryInfo {
		const query = this.builder.build(expression, options)
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
