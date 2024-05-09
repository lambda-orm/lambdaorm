import { Expressions } from '3xpr';
import { OrmH3lp } from '../../shared/infrastructure';
export declare class OrmExpressionsBuilder {
    private readonly helper;
    constructor(helper: OrmH3lp);
    build(): Expressions;
}
