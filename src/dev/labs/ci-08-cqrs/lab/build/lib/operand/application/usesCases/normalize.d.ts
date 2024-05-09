import { OperandBuilder } from '3xpr';
import { OrmOperandHelper } from '../services/operandHelper';
export declare class OperandNormalize {
    private readonly operandBuilder;
    private readonly operandHelper;
    constructor(operandBuilder: OperandBuilder, operandHelper: OrmOperandHelper);
    normalize(expression: string): string;
}
