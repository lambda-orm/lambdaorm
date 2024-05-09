import { Expressions } from '3xpr';
import { OperandFacade } from '../../operand/application';
import { SchemaState } from 'lambdaorm-base';
import { SentenceFacade } from '../application';
import { OrmH3lp } from '../../shared/infrastructure';
export declare class SentenceFacadeBuilder {
    private readonly expressions;
    private readonly helper;
    constructor(expressions: Expressions, helper: OrmH3lp);
    build(schemaState: SchemaState, operand: OperandFacade): SentenceFacade;
}
