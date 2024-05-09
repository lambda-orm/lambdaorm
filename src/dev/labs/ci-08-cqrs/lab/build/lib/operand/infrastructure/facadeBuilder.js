"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandFacadeBuilder = void 0;
const h3lp_1 = require("h3lp");
const application_1 = require("../application");
const _3xpr_1 = require("3xpr");
class OperandFacadeBuilder {
    // eslint-disable-next-line no-useless-constructor
    constructor(expressions, helper) {
        this.expressions = expressions;
        this.helper = helper;
    }
    build(schemaState) {
        const operandCache = new h3lp_1.MemoryCache();
        const operandSerializer = new _3xpr_1.OperandSerializerImpl();
        const operandHelper = new application_1.OrmOperandHelper(this.helper.operand);
        return new application_1.OperandFacade(this.expressions, schemaState, operandCache, operandSerializer, operandHelper, this.helper);
    }
}
exports.OperandFacadeBuilder = OperandFacadeBuilder;
//# sourceMappingURL=facadeBuilder.js.map