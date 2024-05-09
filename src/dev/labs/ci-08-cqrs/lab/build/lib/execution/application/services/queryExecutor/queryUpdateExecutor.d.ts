import { Query } from '../../../../query/domain';
import { Connection } from '../../../../connection/application';
import { DialectService } from '../../../../language/application';
import { QueryOptions, MappingConfigService, Data } from 'lambdaorm-base';
import { Expressions } from '3xpr';
import { QueryInternalExecutor } from './queryInternalExecutor';
export declare class QueryUpdateExecutor {
    options: QueryOptions;
    private solveWriteValues;
    private constraints;
    private executor;
    constructor(executor: QueryInternalExecutor, expressions: Expressions, options: QueryOptions);
    update(query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<number>;
    private updateInclude;
}
