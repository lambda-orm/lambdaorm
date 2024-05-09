"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceCompleteBuilderCacheDecorator = void 0;
class SentenceCompleteBuilderCacheDecorator {
    // eslint-disable-next-line no-useless-constructor
    constructor(builder, cache, serializer, helper) {
        this.builder = builder;
        this.cache = cache;
        this.serializer = serializer;
        this.helper = helper;
    }
    build(expression, view, stage) {
        const expressionKey = this.helper.utils.hashCode(expression);
        const key = `${expressionKey}-${stage}-${view.name}`;
        const value = this.cache.get(key);
        if (value) {
            return this.serializer.deserialize(value);
        }
        const sentence = this.builder.build(expression, view, stage);
        this.cache.set(key, this.serializer.serialize(sentence));
        return sentence;
    }
}
exports.SentenceCompleteBuilderCacheDecorator = SentenceCompleteBuilderCacheDecorator;
//# sourceMappingURL=sentenceCompleteBuilderCacheDecorator.js.map