import { Executor } from '../../../execution/domain';
import { QueryOptions } from 'lambdaorm-base';
import { IQueryBuilder } from '../../domain/services';
import { QueryTransaction } from './transaction';
import { Expressions } from '3xpr';
import { OrmH3lp } from '../../../shared/infrastructure';
export declare class ExpressionExecute {
    private readonly builder;
    private readonly executor;
    private readonly query;
    private readonly helper;
    constructor(builder: IQueryBuilder, executor: Executor, query: Expressions, helper: OrmH3lp);
    execute(query: string, data: any, options: QueryOptions): Promise<any>;
    executeList(queries: string[], options: QueryOptions): Promise<any>;
    transaction(options: QueryOptions, callback: {
        (tr: QueryTransaction): Promise<void>;
    }): Promise<void>;
}
