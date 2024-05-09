import { Query } from '../../../../query/domain';
import { Expressions } from '3xpr';
export declare class QueryEvalConstraints {
    private readonly expressions;
    constructor(expressions: Expressions);
    eval(query: Query, data: any[]): void;
    eval(query: Query, data: any): void;
    private constraint;
}
