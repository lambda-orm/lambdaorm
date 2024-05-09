import { QueryPlan, QueryOptions } from 'lambdaorm-base';
import { IQueryBuilder } from '../../domain/services';
export declare class GeQueryPlan {
    private readonly builder;
    constructor(builder: IQueryBuilder);
    plan(expression: string, options: QueryOptions): QueryPlan;
    private _plan;
}
