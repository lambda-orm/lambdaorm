import { ConnectionPoolAdapter } from './base/connectionPool';
import { ConnectionAdapter } from './base/connection';
import { Query } from '../../../query/domain';
import { ConnectionConfig } from '../../domain';
import { OrmH3lp } from '../../../shared/infrastructure';
import { Connection } from '../../application';
import { MappingConfigService, Data } from 'lambdaorm-base';
import { DialectService } from '../../../language/application';
export declare class SqlServerConnectionPoolAdapter extends ConnectionPoolAdapter {
    static lib: any;
    constructor(config: ConnectionConfig, helper: OrmH3lp);
    init(): Promise<void>;
    protected create(id: string): Promise<Connection>;
}
export declare class SqlServerConnectionAdapter extends ConnectionAdapter {
    end(): Promise<void>;
    insertConditional(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    upsert(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    merge(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    bulkMerge(mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): Promise<any[]>;
    constructor(id: string, cnx: any, pool: any, helper: OrmH3lp);
    select(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    insert(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    bulkInsert(mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): Promise<any[]>;
    update(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number>;
    delete(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<number>;
    execute(query: Query): Promise<any>;
    executeDDL(query: Query): Promise<any>;
    executeSentence(sentence: any): Promise<any>;
    beginTransaction(): Promise<void>;
    commit(): Promise<void>;
    rollback(): Promise<void>;
    private _query;
    private _execute;
    private _executeSentence;
    private createNonQueryRequest;
    protected solveArrayParameters(query: Query, data: Data, sentence: string): string;
    private addParameters;
    protected arrayToRows(mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): any[];
    private getItemValue;
}
