import { ISentenceBuilder, Metadata } from 'lambdaorm-base';
export declare class GetMetadata {
    private readonly sentenceBuilder;
    constructor(sentenceBuilder: ISentenceBuilder);
    /**
     * Get metadata of expression
     * @param expression expression
     * @returns metadata of expression
     */
    metadata(expression: string): Metadata;
    private metadataFromSentence;
}
