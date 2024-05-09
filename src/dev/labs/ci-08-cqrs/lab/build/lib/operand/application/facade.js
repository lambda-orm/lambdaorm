"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandFacade = void 0;
const operandBuilderCacheDecorator_1 = require("./services/operandBuilderCacheDecorator");
const operandBuilder_1 = require("./services/operandBuilder");
const normalize_1 = require("./usesCases/normalize");
class OperandFacade {
    constructor(expressions, schemaState, cache, operandSerializer, operandHelper, helper) {
        this.expressions = expressions;
        this.schemaState = schemaState;
        this.operandHelper = operandHelper;
        this.helper = helper;
        this.builder = new operandBuilderCacheDecorator_1.OperandBuilderCacheDecorator(new operandBuilder_1.OrmOperandBuilder(this.expressions, this.schemaState.domain, this.helper), cache, operandSerializer, this.helper);
        this.operandNormalize = new normalize_1.OperandNormalize(this.builder, operandHelper);
    }
    build(expression) {
        return this.builder.build(expression);
    }
    normalize(expression) {
        return this.operandNormalize.normalize(expression);
    }
    getClauses(operand) {
        return this.operandHelper.getClauses(operand);
    }
}
exports.OperandFacade = OperandFacade;
//# sourceMappingURL=facade.js.map