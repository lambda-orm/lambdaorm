import { Query, ExecuteResult } from '../../../query/domain';
import { QueryOptions, SchemaState } from 'lambdaorm-base';
import { LanguagesService } from '../../../language/application';
import { Transaction, Executor, ActionObserver, ObservableExecutor } from '../../domain';
import { ConnectionFacade } from '../../../connection/application';
import { Expressions } from '3xpr';
import { OrmH3lp } from '../../../shared/infrastructure/helper';
export declare class ExecutorImpl implements Executor, ObservableExecutor {
    private readonly connectionFacade;
    private readonly languages;
    private readonly schemaState;
    private readonly expressions;
    private readonly helper;
    private observers;
    constructor(connectionFacade: ConnectionFacade, languages: LanguagesService, schemaState: SchemaState, expressions: Expressions, helper: OrmH3lp);
    subscribe(observer: ActionObserver): void;
    unsubscribe(observer: ActionObserver): void;
    execute(query: Query, data: any, options: QueryOptions): Promise<any>;
    executeList(queries: Query[], options: QueryOptions): Promise<ExecuteResult[]>;
    /**
 * Create a transaction
 * @param options QueryOptions
 * @param callback Code to be executed in transaction
 */
    transaction(options: QueryOptions, callback: {
        (tr: Transaction): Promise<void>;
    }): Promise<void>;
    private createQueryExecutor;
}
