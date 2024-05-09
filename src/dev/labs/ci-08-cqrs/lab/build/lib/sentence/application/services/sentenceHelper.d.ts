import { Property, Source, SchemaState, Field, Sentence } from 'lambdaorm-base';
import { Operand, Parameter } from '3xpr';
import { OrmH3lp } from 'lib/shared/infrastructure';
export declare class SentenceHelper {
    private readonly schemaState;
    private readonly helper;
    constructor(schemaState: SchemaState, helper: OrmH3lp);
    getSource(sentence: Sentence, stage: string): Source;
    getPropertiesFromParameters(entityName: string, parameters: Parameter[]): Property[];
    groupByFields(operand: Operand): Field[];
    private _groupByFields;
    fieldsInSelect(operand: Operand): Property[];
    fieldsInModify(operand: Operand, entityName: string, addAutoIncrement?: boolean): Property[];
    getColumns(sentence: Sentence): Property[];
    getParameters(sentence: Sentence): Parameter[];
    private loadVariables;
}
