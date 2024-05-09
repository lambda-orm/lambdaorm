import { ICache } from 'h3lp';
import { Query } from '../../../query/domain';
import { IQueryBuilder } from '../../domain/services';
import { OrmH3lp } from '../../../shared/infrastructure';
import { QueryOptions } from 'lambdaorm-base';
export declare class QueryBuilderCacheDecorator implements IQueryBuilder {
    private readonly builder;
    private readonly cache;
    private readonly helper;
    constructor(builder: IQueryBuilder, cache: ICache<string, string>, helper: OrmH3lp);
    build(expression: string, options: QueryOptions): Query;
}
