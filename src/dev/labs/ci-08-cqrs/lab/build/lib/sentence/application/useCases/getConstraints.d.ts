import { ISentenceBuilder, MetadataConstraint } from 'lambdaorm-base';
export declare class GetConstraints {
    private readonly sentenceBuilder;
    constructor(sentenceBuilder: ISentenceBuilder);
    /**
     * Get constraints of expression
     * @param expression expression
     * @returns constraints
     */
    constraints(expression: string): MetadataConstraint;
    private constraintsFromSentence;
}
