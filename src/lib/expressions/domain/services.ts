import { Query, QueryOptions } from '../../query/domain'

export interface IQueryBuilder {
	build (expression: string, options: QueryOptions): Query
}
