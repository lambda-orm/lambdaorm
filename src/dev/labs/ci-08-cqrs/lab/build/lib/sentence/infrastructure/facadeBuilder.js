"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceFacadeBuilder = void 0;
const application_1 = require("../application");
const h3lp_1 = require("h3lp");
class SentenceFacadeBuilder {
    // eslint-disable-next-line no-useless-constructor
    constructor(expressions, helper) {
        this.expressions = expressions;
        this.helper = helper;
    }
    build(schemaState, operand) {
        const sentenceCache = new h3lp_1.MemoryCache();
        const sentenceSerializer = new application_1.SentenceSerializerImp();
        return new application_1.SentenceFacade(schemaState, operand, this.expressions, sentenceCache, sentenceSerializer, this.helper);
    }
}
exports.SentenceFacadeBuilder = SentenceFacadeBuilder;
//# sourceMappingURL=facadeBuilder.js.map