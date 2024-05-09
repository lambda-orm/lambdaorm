import { Expressions } from '3xpr';
import { Transaction } from '../../../execution/domain';
import { Query } from '../../../query/domain';
import { IQueryBuilder } from '../../domain';
export declare class QueryTransaction {
    private readonly transaction;
    private readonly builder;
    private readonly expressions;
    constructor(transaction: Transaction, builder: IQueryBuilder, expressions: Expressions);
    execute(query: Function, data?: any): Promise<any>;
    execute(query: string, data?: any): Promise<any>;
    executeQuery(query: Query, data?: any): Promise<any>;
}
