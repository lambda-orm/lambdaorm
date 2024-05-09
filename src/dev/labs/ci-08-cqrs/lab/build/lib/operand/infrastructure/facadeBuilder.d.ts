import { SchemaState } from 'lambdaorm-base';
import { OperandFacade } from '../application';
import { Expressions } from '3xpr';
import { OrmH3lp } from '../../shared/infrastructure';
export declare class OperandFacadeBuilder {
    private readonly expressions;
    private readonly helper;
    constructor(expressions: Expressions, helper: OrmH3lp);
    build(schemaState: SchemaState): OperandFacade;
}
