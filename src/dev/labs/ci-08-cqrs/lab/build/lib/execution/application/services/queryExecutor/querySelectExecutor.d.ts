import { Query } from '../../../../query/domain';
import { OrmH3lp } from '../../../../shared/infrastructure';
import { Connection } from '../../../../connection/application';
import { DialectService } from '../../../../language/application';
import { QueryOptions, MappingConfigService, Data } from 'lambdaorm-base';
import { Expressions } from '3xpr';
import { QueryInternalExecutor } from './queryInternalExecutor';
export declare class QuerySelectExecutor {
    private readonly executor;
    readonly options: QueryOptions;
    private readonly helper;
    private solveReadValues;
    constructor(executor: QueryInternalExecutor, expressions: Expressions, options: QueryOptions, helper: OrmH3lp);
    select(query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any>;
    private selectIncludes;
    private selectIncludeComposite;
    private selectInclude;
    private selectChunkResult;
    private selectChunkIds;
    private selectChild;
    private addIncludeResult;
    private selectChildSetManyToOne;
    private selectChildSetOneToMany;
}
