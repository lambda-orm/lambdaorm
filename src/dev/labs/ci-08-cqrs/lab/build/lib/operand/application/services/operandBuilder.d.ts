import { EvaluatorFactory, OperandBuilder, Operand, Expressions } from '3xpr';
import { DomainConfigService } from 'lambdaorm-base';
import { OrmH3lp } from '../../../shared/infrastructure';
export declare class OrmOperandBuilder implements OperandBuilder {
    private readonly expressions;
    private readonly modelConfigService;
    private readonly helper;
    private parse;
    private normalizer;
    private operandNormalize;
    private operandComplete;
    private operandReduce;
    private ormOperandNormalizer;
    constructor(expressions: Expressions, modelConfigService: DomainConfigService, helper: OrmH3lp);
    get evaluatorFactory(): EvaluatorFactory;
    build(expression: string): Operand;
}
