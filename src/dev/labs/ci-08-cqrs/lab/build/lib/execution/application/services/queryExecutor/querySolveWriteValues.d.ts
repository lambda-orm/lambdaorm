import { Query } from '../../../../query/domain';
import { Expressions } from '3xpr';
export declare class QuerySolveWriteValues {
    private readonly expressions;
    constructor(expressions: Expressions);
    solve(query: Query, data: any[]): void;
    solve(query: Query, data: any): void;
}
