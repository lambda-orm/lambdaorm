import { ModelService, Operand, TypeServiceImpl } from '3xpr';
import { Type } from 'typ3s';
import { DomainConfigService } from 'lambdaorm-base';
import { OrmH3lp } from '../../../shared/infrastructure';
export declare class SentenceTypeService extends TypeServiceImpl {
    private readonly config;
    private readonly helper;
    constructor(model: ModelService, config: DomainConfigService, helper: OrmH3lp);
    getType(operand: Operand): Type;
    private solveSentence;
    private solveSelect;
    private solveModify;
    private solveFields;
    private solveFieldsModify;
}
