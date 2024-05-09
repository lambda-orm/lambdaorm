import { OperandHelper, Operand } from '3xpr';
export declare class OrmOperandHelper {
    private readonly operandHelper;
    constructor(operandHelper: OperandHelper);
    toExpression(operand: Operand): string;
    getClauses(operand: Operand): any;
}
