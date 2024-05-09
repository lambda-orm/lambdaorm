import { ConnectionPoolAdapter } from './base/connectionPool';
import { ConnectionAdapter } from './base/connection';
import { ConnectionConfig } from '../../domain';
import { OrmH3lp } from '../../../shared/infrastructure';
import { Connection } from '../../application';
import { MappingConfigService, Data } from 'lambdaorm-base';
import { DialectService } from '../../../language/application';
import { Query } from '../../../query/domain';
export declare class SQLjsConnectionPoolAdapter extends ConnectionPoolAdapter {
    private static lib;
    private db;
    constructor(config: ConnectionConfig, helper: OrmH3lp);
    init(): Promise<void>;
    protected create(id: string): Promise<Connection>;
    end(): Promise<void>;
}
export declare class SQLjsConnectionAdapter extends ConnectionAdapter {
    end(): Promise<void>;
    insertConditional(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    upsert(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    merge(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    bulkMerge(mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): Promise<any[]>;
    select(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    insert(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number>;
    bulkInsert(mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): Promise<number[]>;
    update(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number>;
    delete(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number>;
    execute(query: Query): Promise<any>;
    executeDDL(query: Query): Promise<any>;
    executeSentence(sentence: any): Promise<any>;
    beginTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    protected _execute(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    protected _query(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any[]>;
}
