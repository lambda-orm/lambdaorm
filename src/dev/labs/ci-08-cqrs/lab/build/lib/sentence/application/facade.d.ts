import { OperandFacade } from '../../operand/application';
import { Metadata, MetadataConstraint, MetadataModel, MetadataParameter, Sentence, SentenceSerializer, SchemaState, ViewConfigService, Source } from 'lambdaorm-base';
import { ICache } from 'h3lp';
import { Expressions } from '3xpr';
import { OrmH3lp } from '../../shared/infrastructure';
export declare class SentenceFacade {
    private readonly schemaState;
    private readonly operandFacade;
    private readonly expressions;
    private getConstraints;
    private builder;
    private builderComplete;
    private getMetadata;
    private getModel;
    private getParameters;
    private sentenceHelper;
    constructor(schemaState: SchemaState, operandFacade: OperandFacade, expressions: Expressions, cache: ICache<string, string>, serializer: SentenceSerializer, helper: OrmH3lp);
    build(expression: string, view: ViewConfigService, stage: string): Sentence;
    constraints(expression: string): MetadataConstraint;
    metadata(expression: string): Metadata;
    model(expression: string): MetadataModel[];
    parameters(expression: string): MetadataParameter[];
    getSource(sentence: Sentence, stage: string): Source;
}
