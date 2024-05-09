import { OperandBuilder, Operand, OperandSerializer, EvaluatorFactory } from '3xpr';
import { ICache } from 'h3lp';
import { OrmH3lp } from '../../../shared/infrastructure';
export declare class OperandBuilderCacheDecorator implements OperandBuilder {
    private readonly operandBuilder;
    private readonly cache;
    private readonly serializer;
    private readonly helper;
    constructor(operandBuilder: OperandBuilder, cache: ICache<string, string>, serializer: OperandSerializer, helper: OrmH3lp);
    get evaluatorFactory(): EvaluatorFactory;
    build(expression: string): Operand;
}
