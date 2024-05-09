import { Query, Include } from '../../../../query/domain';
import { Connection } from '../../../../connection/application';
import { DialectService } from '../../../../language/application';
import { QueryOptions, MappingConfigService, EntityMapping, Data } from 'lambdaorm-base';
import { Expressions } from '3xpr';
import { QueryInternalExecutor } from './queryInternalExecutor';
import { QueryEvalConstraints } from './queryEvalConstraints';
import { QuerySolveDefaults } from './querySolveDefaults';
import { QuerySolveWriteValues } from './querySolveWriteValues';
export declare class QueryBulkInsertExecutor {
    options: QueryOptions;
    protected solveDefaults: QuerySolveDefaults;
    protected solveWriteValues: QuerySolveWriteValues;
    protected constraints: QueryEvalConstraints;
    protected executor: QueryInternalExecutor;
    constructor(executor: QueryInternalExecutor, expressions: Expressions, options: QueryOptions);
    bulkInsert(query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any[]>;
    protected bulkIncludesBefore(query: Query, data: Data, entity: EntityMapping, dialect: DialectService): Promise<void>;
    protected bulkIncludeBeforeOneToMany(include: Include, data: Data): Promise<void>;
    protected bulkIncludeBeforeOneToOne(include: Include, data: Data): Promise<void>;
    protected bulkIncludesAfter(query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService): Promise<void>;
    protected bulkIncludeAfterManyToOne(include: Include, data: Data): Promise<void>;
    protected bulkIncludeAfterOneToOne(query: Query, include: Include, data: Data): Promise<void>;
    protected _chunk(query: Query, entity: EntityMapping, chunk: any[], mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any[]>;
}
