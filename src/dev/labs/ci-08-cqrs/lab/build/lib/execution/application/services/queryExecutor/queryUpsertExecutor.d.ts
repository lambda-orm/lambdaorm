import { Query } from '../../../../query/domain';
import { Connection } from '../../../../connection/application';
import { DialectService } from '../../../../language/application';
import { MappingConfigService, Data } from 'lambdaorm-base';
import { QueryInsertExecutor } from './queryInsertExecutor';
export declare class QueryUpsertExecutor extends QueryInsertExecutor {
    upsert(query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any>;
}
