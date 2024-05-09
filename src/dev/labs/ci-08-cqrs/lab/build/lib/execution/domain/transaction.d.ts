import { Query } from '../../query/domain';
import { QueryExecutor } from './executor';
import { QueryOptions } from 'lambdaorm-base';
export declare class Transaction {
    private readonly queryExecutor;
    constructor(queryExecutor: QueryExecutor);
    execute(query: Query, data?: any): Promise<any>;
    get options(): QueryOptions;
}
