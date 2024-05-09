import { Query } from '../../../../query/domain';
import { Expressions } from '3xpr';
export declare class QuerySolveDefaults {
    private readonly expressions;
    constructor(expressions: Expressions);
    /**
     * solve default properties
     * @param query
     * @param data
     */
    solve(query: Query, data: any[]): void;
    solve(query: Query, data: any): void;
    private solveDefault;
}
