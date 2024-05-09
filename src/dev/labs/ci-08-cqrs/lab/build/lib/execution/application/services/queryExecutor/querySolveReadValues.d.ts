import { Query } from '../../../../query/domain';
import { OrmH3lp } from '../../../../shared/infrastructure';
import { Expressions } from '3xpr';
export declare class QuerySolveReadValues {
    private readonly expressions;
    private readonly helper;
    constructor(expressions: Expressions, helper: OrmH3lp);
    solve(query: Query, data: any[]): void;
}
