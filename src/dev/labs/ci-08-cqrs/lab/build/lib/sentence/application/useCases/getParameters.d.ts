import { ISentenceBuilder, MetadataParameter } from 'lambdaorm-base';
export declare class GetParameters {
    private readonly sentenceBuilder;
    constructor(sentenceBuilder: ISentenceBuilder);
    /**
     * Get parameters of expression
     * @param expression  expression
     * @returns Parameters of expression
     */
    parameters(expression: string): MetadataParameter[];
    private parametersFromSentence;
}
