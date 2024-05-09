import { SentenceAction, QueryOptions, SentenceCategory, SentenceType } from 'lambdaorm-base';
import { ExecuteResult, Query } from '../../query/domain';
import { Transaction } from '.';
export interface ActionObserverArgs {
    action: SentenceAction;
    type: SentenceType;
    category: SentenceCategory;
    sentence: string;
    dialect: string;
    source: string;
    entity: string;
    query: string;
    data: any;
    options: QueryOptions;
    result?: any;
    error?: any;
}
export declare abstract class ActionObserver {
    on: SentenceCategory[];
    condition?: string;
    transactional?: boolean;
    constructor(on: SentenceCategory[], condition?: string, transactional?: boolean);
    before(args: ActionObserverArgs): Promise<void>;
    after(args: ActionObserverArgs): Promise<void>;
    error(args: ActionObserverArgs): Promise<void>;
}
export interface QueryExecutor {
    get options(): QueryOptions;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    release(): Promise<void>;
    execute(query: Query, data: any): Promise<any>;
}
export interface Executor {
    execute(query: Query, data: any, options: QueryOptions): Promise<any>;
    executeList(queries: Query[], options: QueryOptions): Promise<ExecuteResult[]>;
    transaction(options: QueryOptions, callback: {
        (tr: Transaction): Promise<void>;
    }): Promise<void>;
}
export interface ObservableExecutor {
    subscribe(observer: ActionObserver): void;
    unsubscribe(observer: ActionObserver): void;
}
export interface ObservableExecutorDecorator extends Executor, ObservableExecutor {
}
