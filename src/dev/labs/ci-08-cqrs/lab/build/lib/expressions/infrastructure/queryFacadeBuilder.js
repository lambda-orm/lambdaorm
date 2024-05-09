"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressionFacadeBuilder = void 0;
const h3lp_1 = require("h3lp");
const application_1 = require("../application");
class ExpressionFacadeBuilder {
    // eslint-disable-next-line no-useless-constructor
    constructor(languages, executor, expressions, helper) {
        this.languages = languages;
        this.executor = executor;
        this.expressions = expressions;
        this.helper = helper;
    }
    build(sentence, schemaState) {
        const queryCache = new h3lp_1.MemoryCache();
        return new application_1.ExpressionFacade(sentence, schemaState, this.languages, this.executor, this.expressions, queryCache, this.helper);
    }
}
exports.ExpressionFacadeBuilder = ExpressionFacadeBuilder;
//# sourceMappingURL=queryFacadeBuilder.js.map