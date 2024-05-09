import { ActionObserver, ActionObserverArgs } from '../../domain';
import { ListenerConfig } from 'lambdaorm-base';
import { Expressions } from '3xpr';
export declare class ExecutionActionObserver extends ActionObserver {
    private readonly config;
    private readonly expressions;
    constructor(config: ListenerConfig, expressions: Expressions);
    before(args: ActionObserverArgs): Promise<void>;
    after(args: ActionObserverArgs): Promise<void>;
    error(args: ActionObserverArgs): Promise<void>;
}
