import { OrmH3lp } from '../../../shared/infrastructure';
import { DomainConfigService } from 'lambdaorm-base';
import { Expressions, Operand, OperandCloner } from '3xpr';
/**
 *  Expression completer
 */
export declare class OrmOperandNormalizer {
    private readonly modelConfigService;
    private readonly expressions;
    private readonly cloner;
    private readonly helper;
    constructor(modelConfigService: DomainConfigService, expressions: Expressions, cloner: OperandCloner, helper: OrmH3lp);
    normalize(operand: Operand): Operand;
    private normalizeOperand;
    private getClauses;
    private normalizeSentence;
    private completeFilter;
    private normalizeDistinct;
    private normalizeFirst;
    private normalizeLast;
    private addSortNode;
    private normalizeSort;
    private normalizeInclude;
    private addChildFieldField;
    private normalizeMap;
    private fieldToKeyVal;
    private normalizeInsert;
    private normalizeUpdate;
    private normalizeDelete;
    private createReadFields;
    private createWriteVars;
    private writeVarsFromList;
    private createClauseFilter;
    private createFilter;
    private completeMapInclude;
    private completeSelectInclude;
    private completeBulkInsertInclude;
    private completeInsertInclude;
    private completeUpdateInclude;
    private completeDeleteInclude;
    private getIncludeRelation;
    private completeInclude;
}
