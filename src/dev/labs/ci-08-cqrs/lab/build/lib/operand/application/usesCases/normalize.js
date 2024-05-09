"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandNormalize = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
class OperandNormalize {
    // eslint-disable-next-line no-useless-constructor
    constructor(operandBuilder, operandHelper) {
        this.operandBuilder = operandBuilder;
        this.operandHelper = operandHelper;
    }
    normalize(expression) {
        try {
            const operand = this.operandBuilder.build(expression);
            return this.operandHelper.toExpression(operand);
        }
        catch (error) {
            throw new lambdaorm_base_1.SintaxisError('normalize expression: ' + expression + ' error: ' + error.toString());
        }
    }
}
exports.OperandNormalize = OperandNormalize;
//# sourceMappingURL=normalize.js.map