"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutorBuilder = void 0;
const application_1 = require("../application");
class ExecutorBuilder {
    // eslint-disable-next-line no-useless-constructor
    constructor(connection, languages, expressions, helper) {
        this.connection = connection;
        this.languages = languages;
        this.expressions = expressions;
        this.helper = helper;
    }
    build(schemaState) {
        return new application_1.ExecutorImpl(this.connection, this.languages, schemaState, this.expressions, this.helper);
    }
}
exports.ExecutorBuilder = ExecutorBuilder;
//# sourceMappingURL=executorBuilder.js.map