import { Query } from '../../../../query/domain';
import { Connection } from '../../../../connection/application';
import { DialectService } from '../../../../language/application';
import { MappingConfigService, QueryOptions, EntityMapping, Data } from 'lambdaorm-base';
import { QueryInternalExecutor } from './queryInternalExecutor';
export declare class QueryBulkDeleteExecutor {
    options: QueryOptions;
    private executor;
    constructor(executor: QueryInternalExecutor, options: QueryOptions);
    bulkDelete(query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<void>;
    private include;
    protected _chunk(query: Query, entity: EntityMapping, chunk: any[], mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<void>;
}
