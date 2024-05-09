import { Expressions } from '3xpr';
import { ISentenceBuilder, ISentenceCompleteBuilder, Sentence, SchemaState, ViewConfigService } from 'lambdaorm-base';
import { SentenceHelper } from './sentenceHelper';
export declare class SentenceCompleteBuilder implements ISentenceCompleteBuilder {
    private readonly sentenceBuilder;
    private readonly schemaState;
    private readonly sentenceHelper;
    private readonly expressions;
    private completer;
    constructor(sentenceBuilder: ISentenceBuilder, schemaState: SchemaState, sentenceHelper: SentenceHelper, expressions: Expressions);
    build(expression: string, view: ViewConfigService, stage: string): Sentence;
    private completeSentence;
}
