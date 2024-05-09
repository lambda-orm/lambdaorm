"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageFacadeBuilder = void 0;
const application_1 = require("../application");
class StageFacadeBuilder {
    // eslint-disable-next-line no-useless-constructor
    constructor(languages, executor, helper) {
        this.languages = languages;
        this.executor = executor;
        this.helper = helper;
    }
    build(schemaState, expressionFacade) {
        return new application_1.StageFacade(schemaState, expressionFacade, this.executor, this.languages, this.helper);
    }
}
exports.StageFacadeBuilder = StageFacadeBuilder;
//# sourceMappingURL=facadeBuilder.js.map