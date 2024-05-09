import { Operand } from '3xpr';
import { EntityMapping, Field, Sentence, Join, Map, Filter, Having } from 'lambdaorm-base';
import { Query } from '../../../../query/domain';
import { DmlBuilderBase } from '../base/dmlBuilder';
export declare class NoSqlDmlBuilder extends DmlBuilderBase {
    build(sentence: Sentence): Query;
    protected buildSelectSentence(sentence: Sentence): string;
    protected buildInsertSentence(sentence: Sentence): string;
    protected buildUpdateSentence(sentence: Sentence): string;
    protected buildDeleteSentence(sentence: Sentence): string;
    protected buildField(operand: Field): string;
    protected buildObject(operand: Operand): string;
    protected buildReplaceRoot(entity: EntityMapping): any[];
    protected getHaving(query: any, having: Having): any[];
    protected solveHaving(operand: Operand, groupKeyValues: [string, string][], toReplaces: [string, string][]): void;
    protected getGroupBy(map: Map, sentence: Sentence): any[];
    protected getMap(map: Map, sentence: Sentence): any[];
    protected getComposite(sentence: Sentence): string | undefined;
    protected getChildrenMap(sentence: Sentence): any;
    protected buildJoins(entity: EntityMapping, joins: Join[]): any[];
    protected buildFilter(operand: Filter): any[];
    protected getFieldMapping(operand: Field, alias?: string): string;
    protected setPrefixToField(operand: Operand, prefix: string): void;
    protected hadGroupFunction(operand: Operand): boolean;
}
