import { Query } from '../../../../query/domain';
import { Connection } from '../../../../connection/application';
import { DialectService } from '../../../../language/application';
import { MappingConfigService, EntityMapping, Data } from 'lambdaorm-base';
import { QueryBulkInsertExecutor } from './queryBulkInsertExecutor';
export declare class QueryBulkMergeExecutor extends QueryBulkInsertExecutor {
    bulkMerge(query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any[]>;
    protected _chunk(query: Query, entity: EntityMapping, chunk: any[], mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any[]>;
}
