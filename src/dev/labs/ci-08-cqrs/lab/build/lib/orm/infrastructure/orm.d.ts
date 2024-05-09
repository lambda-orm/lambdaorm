import { OrmH3lp } from '../../shared/infrastructure';
import { QueryOptions, MetadataParameter, MetadataConstraint, MetadataModel, Metadata, Dialect, Schema, Stage, QueryPlan, SchemaFacade, SchemaState, Logger } from 'lambdaorm-base';
import { ConnectionFacade } from '../../connection/application';
import { LanguagesService } from '../../language/application';
import { StageFacade } from '../../stage/application';
import { QueryTransaction } from '../../expressions/application';
import { IOrm } from '../application';
import { Expressions } from '3xpr';
import { ActionObserver } from '../../execution/domain';
/**
 * Facade through which you can access all the functionalities of the library.
 */
export declare class Orm implements IOrm {
    private _logger?;
    connection: ConnectionFacade;
    language: LanguagesService;
    exp: Expressions;
    schema: SchemaFacade;
    state: SchemaState;
    stage: StageFacade;
    helper: OrmH3lp;
    private operand;
    private sentence;
    private expression;
    private executor;
    constructor(_logger?: Logger | undefined);
    get logger(): Logger;
    set logger(value: Logger);
    get defaultStage(): Stage;
    /**
 * initialize the orm library
 * @param source optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project
 * @returns promise void
 */
    init(source?: string | Schema, connect?: boolean): Promise<Schema>;
    /**
  * Frees the resources used, for example the connection pools
  */
    end(): Promise<void>;
    /**
     * Get dialect of source
     * @param source Name of source
     * @returns
     */
    dialect(source: string): Dialect;
    /**
     * Normalize query
     * @param query query expression
     * @returns Expression normalized
     */
    normalize(query: Function): string;
    normalize(query: string): string;
    /**
     * Get model of query
     * @param query query expression
     * @returns Model of query
     */
    model(query: Function): MetadataModel[];
    model(query: string): MetadataModel[];
    /**
     * Get parameters of query
     * @param query query expression
     * @returns Parameters of query
     */
    parameters(query: Function): MetadataParameter[];
    parameters(query: string): MetadataParameter[];
    /**
     * Get constraints of query
     * @param query query expression
     * @returns Constraints of query
     */
    constraints(query: Function): MetadataConstraint;
    constraints(query: string): MetadataConstraint;
    /**
     * Get metadata of query
     * @param query query expression
     * @returns metadata of query
     */
    metadata(query: Function): Metadata;
    metadata(query: string): Metadata;
    /**
     * Get getInfo of query
     * @param query query expression
     * @param options options of execution
     */
    plan(query: Function, options?: QueryOptions): QueryPlan;
    plan(query: string, options?: QueryOptions): QueryPlan;
    /**
     * Execute query
     * @param query query expression
     * @param data Data with variables
     * @param options options of execution
     * @returns Result of execution
     */
    execute(query: Function, data?: any, options?: QueryOptions): Promise<any>;
    execute(query: string, data?: any, options?: QueryOptions): Promise<any>;
    /**
     * Create a transaction
     * @param options options of execution
     * @param callback Code to be executed in transaction
     */
    transaction(options: QueryOptions | undefined, callback: {
        (tr: QueryTransaction): Promise<void>;
    }): Promise<void>;
    private toExpression;
    subscribe(observer: ActionObserver): void;
    unsubscribe(observer: ActionObserver): void;
}
export declare const orm: Orm;
