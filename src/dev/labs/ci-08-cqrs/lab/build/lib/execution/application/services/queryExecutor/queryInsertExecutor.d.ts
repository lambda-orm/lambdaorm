import { Query } from '../../../../query/domain';
import { Connection } from '../../../../connection/application';
import { DialectService } from '../../../../language/application';
import { QueryOptions, MappingConfigService, Data } from 'lambdaorm-base';
import { Expressions } from '3xpr';
import { QuerySolveDefaults } from './querySolveDefaults';
import { QuerySolveWriteValues } from './querySolveWriteValues';
import { QueryEvalConstraints } from './queryEvalConstraints';
import { QueryInternalExecutor } from './queryInternalExecutor';
export declare class QueryInsertExecutor {
    options: QueryOptions;
    protected solveDefaults: QuerySolveDefaults;
    protected solveWriteValues: QuerySolveWriteValues;
    protected constraints: QueryEvalConstraints;
    protected executor: QueryInternalExecutor;
    constructor(executor: QueryInternalExecutor, expressions: Expressions, options: QueryOptions);
    insert(query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any>;
    protected includeBefore(query: Query, data: Data, dialect: DialectService): Promise<any>;
    protected includeAfter(query: Query, data: Data, dialect: DialectService): Promise<any>;
}
