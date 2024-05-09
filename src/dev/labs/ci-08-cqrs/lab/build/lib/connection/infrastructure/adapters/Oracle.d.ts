import { ConnectionPoolAdapter } from './base/connectionPool';
import { ConnectionAdapter } from './base/connection';
import { Query } from '../../../query/domain';
import { OrmH3lp } from '../../../shared/infrastructure';
import { Data, MappingConfigService } from 'lambdaorm-base';
import { Connection } from '../../application';
import { DialectService } from '../../../language/application';
export declare class OracleConnectionPoolAdapter extends ConnectionPoolAdapter {
    private static lib;
    private pool;
    init(): Promise<void>;
    protected create(id: string): Promise<Connection>;
}
export declare class OracleConnectionAdapter extends ConnectionAdapter {
    private readonly lib;
    end(): Promise<void>;
    insertConditional(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    upsert(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    merge(mapping: MappingConfigService, dialect: DialectService, query: Query, data: Data): Promise<any>;
    bulkMerge(mapping: MappingConfigService, dialect: DialectService, query: Query, array: any[]): Promise<any[]>;
    constructor(lib: any, id: string, cnx: any, pool: any, helper: OrmH3lp);
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
    protected arrayToRows(_mapping: MappingConfigService, _dialect: DialectService, query: Query, array: any[]): any[];
    private getQueryPlan;
    private getAutoIncrementInfo;
    private oracleType;
    private getOracleType;
    private getItemValue;
}
