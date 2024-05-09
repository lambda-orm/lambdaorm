import { DmlBuilderBase } from '../base/dmlBuilder';
import { Operand } from '3xpr';
import { EntityMapping, Field, Sentence, From, Join } from 'lambdaorm-base';
import { Query } from '../../../../query/domain';
export declare class SqlDmlBuilder extends DmlBuilderBase {
    build(sentence: Sentence): Query;
    protected buildSelectSentence(sentence: Sentence): string;
    protected buildInsertSentence(sentence: Sentence): string;
    protected buildUpdateSentence(sentence: Sentence): string;
    protected buildDeleteSentence(sentence: Sentence): string;
    protected buildFrom(from: From): string;
    protected buildJoins(_entity: EntityMapping, joins: Join[]): string;
    protected buildField(field: Field): string;
    protected buildObject(operand: Operand): string;
}
