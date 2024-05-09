import { ISentenceBuilder, MetadataModel } from 'lambdaorm-base';
export declare class GetModel {
    private readonly sentenceBuilder;
    constructor(sentenceBuilder: ISentenceBuilder);
    /**
     * Get model of expression
     * @param expression expression
     * @returns Model of expression
     */
    model(expression: string): MetadataModel[];
    private modelFromSentence;
}
