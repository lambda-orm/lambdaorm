"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceCompleteBuilder = void 0;
const sentenceCompleter_1 = require("./sentenceCompleter");
class SentenceCompleteBuilder {
    constructor(sentenceBuilder, schemaState, sentenceHelper, expressions) {
        this.sentenceBuilder = sentenceBuilder;
        this.schemaState = schemaState;
        this.sentenceHelper = sentenceHelper;
        this.expressions = expressions;
        this.completer = new sentenceCompleter_1.SentenceCompleter(this.expressions);
    }
    build(expression, view, stage) {
        const sentence = this.sentenceBuilder.build(expression);
        this.completeSentence(sentence, view, stage);
        return sentence;
    }
    completeSentence(sentence, view, stage) {
        const sentenceIncludes = sentence.getIncludes();
        for (const p in sentenceIncludes) {
            const sentenceInclude = sentenceIncludes[p];
            this.completeSentence(sentenceInclude.children[0], view, stage);
        }
        const source = this.sentenceHelper.getSource(sentence, stage);
        const mapping = this.schemaState.mapping.getInstance(source.mapping);
        this.completer.complete(mapping, view, sentence);
    }
}
exports.SentenceCompleteBuilder = SentenceCompleteBuilder;
//# sourceMappingURL=sentenceCompleteBuilder.js.map