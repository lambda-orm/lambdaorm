import { Operand, OperandSerializer, Expressions } from '3xpr';
import { SchemaState } from 'lambdaorm-base';
import { ICache } from 'h3lp';
import { OrmOperandHelper } from './services/operandHelper';
import { OrmH3lp } from '../../shared/infrastructure';
export declare class OperandFacade {
    private readonly expressions;
    private readonly schemaState;
    private readonly operandHelper;
    private readonly helper;
    private builder;
    private operandNormalize;
    constructor(expressions: Expressions, schemaState: SchemaState, cache: ICache<string, string>, operandSerializer: OperandSerializer, operandHelper: OrmOperandHelper, helper: OrmH3lp);
    build(expression: string): Operand;
    normalize(expression: string): string;
    getClauses(operand: Operand): any;
}
