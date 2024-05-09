"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmOperandBuilder = void 0;
const _3xpr_1 = require("3xpr");
const operandNormalizer_1 = require("./operandNormalizer");
const complete_1 = require("../usesCases/complete");
const clone_1 = require("../usesCases/clone");
class OrmOperandBuilder {
    // eslint-disable-next-line no-useless-constructor
    constructor(expressions, modelConfigService, helper) {
        this.expressions = expressions;
        this.modelConfigService = modelConfigService;
        this.helper = helper;
        const cloner = new clone_1.OrmOperandClone();
        this.ormOperandNormalizer = new operandNormalizer_1.OrmOperandNormalizer(this.modelConfigService, this.expressions, cloner, this.helper);
        this.parse = new _3xpr_1.ExpressionParse(this.expressions);
        this.normalizer = new _3xpr_1.ExpressionNormalizer();
        this.operandNormalize = new _3xpr_1.OperandNormalize(this.expressions);
        this.operandComplete = new complete_1.OrmOperandComplete();
        this.operandReduce = new _3xpr_1.OperandReduce(this.expressions, this.expressions.constBuilder);
    }
    get evaluatorFactory() {
        return this.expressions.getBuilder('sync').evaluatorFactory;
    }
    build(expression) {
        const expressionNormalized = this.normalizer.normalize(expression);
        const operand = this.parse.parse(expressionNormalized);
        const normalized = this.operandNormalize.normalize(operand);
        const completed = this.operandComplete.complete(normalized);
        const reduced = this.operandReduce.reduce(completed);
        // reduced.returnType = this.typeService.getType(reduced)
        const ormNormalized = this.ormOperandNormalizer.normalize(reduced);
        return ormNormalized;
    }
}
exports.OrmOperandBuilder = OrmOperandBuilder;
//# sourceMappingURL=operandBuilder.js.map