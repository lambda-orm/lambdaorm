import { Query } from '../../query/domain';
import { QueryOptions } from 'lambdaorm-base';
export interface IQueryBuilder {
    build(expression: string, options: QueryOptions): Query;
}
