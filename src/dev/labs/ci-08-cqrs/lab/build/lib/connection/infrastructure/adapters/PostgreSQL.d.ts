import { ConnectionPoolAdapter } from './base/connectionPool';
import { ConnectionAdapter } from './base/connection';
import { ConnectionConfig } from '../../domain';
import { OrmH3lp } from '../../../shared/infrastructure';
import { Connection } from '../../application';
import { MappingConfigService, Data } from 'lambdaorm-base';
import { DialectService } from '../../../language/application';
import { Query } from '../../../query/domain';
export declare class PostgreSQLConnectionPoolAdapter extends ConnectionPoolAdapter {
    private static lib;
    constructor(config: ConnectionConfig, helper: OrmH3lp);
    init(): Promise<void>;
    protected create(id: string): Promise<Connection>;
}
export declare class PostgreSQLConnectionAdapter extends ConnectionAdapter {
    insertConditional(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    upsert(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    merge(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    bulkMerge(mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): Promise<any[]>;
    select(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    insert(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    bulkInsert(mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): Promise<any[]>;
    protected arrayToRows(mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): any[];
    private getItemValue;
    update(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number>;
    delete(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number>;
    execute(query: Query): Promise<any>;
    executeDDL(query: Query): Promise<any>;
    executeSentence(sentence: any): Promise<any>;
    beginTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    protected _execute(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
}
