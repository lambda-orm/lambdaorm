import { Query } from '../../../../query/domain';
import { Expressions } from '3xpr';
import { ActionObserver, QueryExecutor } from '../../../domain';
import { QueryOptions } from 'lambdaorm-base';
export declare class QueryExecutorObservableDecorator implements QueryExecutor {
    private readonly expressions;
    private readonly queryExecutor;
    private readonly observers;
    constructor(expressions: Expressions, queryExecutor: QueryExecutor, observers: ActionObserver[]);
    get options(): QueryOptions;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    release(): Promise<void>;
    execute(query: Query, data: any): Promise<any>;
    private beforeExecutionNotify;
    private afterExecutionNotify;
    private errorExecutionNotify;
    private createActionObserverArgs;
}
