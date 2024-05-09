import { Query } from '../../../../query/domain';
import { Connection } from '../../../../connection/application';
import { DialectService } from '../../../../language/application';
import { QueryOptions, MappingConfigService, Data } from 'lambdaorm-base';
import { QueryInternalExecutor } from './queryInternalExecutor';
export declare class QueryDeleteExecutor {
    options: QueryOptions;
    private executor;
    constructor(executor: QueryInternalExecutor, options: QueryOptions);
    delete(query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<number>;
    private include;
}
