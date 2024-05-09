import { SentenceFacade } from '../../sentence/application';
import { Query } from '../../query/domain';
import { QueryPlan, SchemaState, QueryOptions } from 'lambdaorm-base';
import { LanguagesService } from '../../language/application';
import { QueryTransaction } from './useCases/transaction';
import { ICache } from 'h3lp';
import { Expressions } from '3xpr';
import { Executor } from '../../execution/domain';
import { OrmH3lp } from '../../shared/infrastructure';
export declare class ExpressionFacade {
    private readonly sentenceFacade;
    private readonly schemaState;
    private readonly languages;
    private queryHelper;
    private getQueryPlan;
    private builder;
    private expressionExecute;
    constructor(sentenceFacade: SentenceFacade, schemaState: SchemaState, languages: LanguagesService, executor: Executor, expressions: Expressions, cache: ICache<string, string>, helper: OrmH3lp);
    build(query: string, options?: QueryOptions): Query;
    plan(query: string, options?: QueryOptions): QueryPlan;
    solveQueryOptions(options?: QueryOptions): QueryOptions;
    execute(query: string, data?: any, options?: QueryOptions): Promise<any>;
    executeList(queries: string[], options?: QueryOptions): Promise<any>;
    transaction(options: QueryOptions | undefined, callback: {
        (tr: QueryTransaction): Promise<void>;
    }): Promise<void>;
}
