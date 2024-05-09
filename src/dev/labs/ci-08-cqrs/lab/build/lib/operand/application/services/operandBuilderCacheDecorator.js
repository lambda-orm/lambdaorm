"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperandBuilderCacheDecorator = void 0;
class OperandBuilderCacheDecorator {
    // eslint-disable-next-line no-useless-constructor
    constructor(operandBuilder, cache, serializer, helper) {
        this.operandBuilder = operandBuilder;
        this.cache = cache;
        this.serializer = serializer;
        this.helper = helper;
    }
    get evaluatorFactory() {
        return this.operandBuilder.evaluatorFactory;
    }
    build(expression) {
        try {
            if (expression === undefined || expression === null || expression.trim() === '') {
                throw new Error('undefined expression');
            }
            const key = this.helper.utils.hashCode(expression).toString();
            const value = this.cache.get(key);
            if (!value) {
                const operand = this.operandBuilder.build(expression);
                const serialized = this.serializer.serialize(operand);
                this.cache.set(key, serialized);
                return operand;
            }
            else {
                return this.serializer.deserialize(value);
            }
        }
        catch (error) {
            throw new Error('expression: ' + expression + ' error: ' + error.toString());
        }
    }
}
exports.OperandBuilderCacheDecorator = OperandBuilderCacheDecorator;
//# sourceMappingURL=operandBuilderCacheDecorator.js.map