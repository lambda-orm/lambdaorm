"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmOperandComplete = void 0;
class OrmOperandComplete {
    complete(operand) {
        this._complete(operand);
        return operand;
    }
    _complete(operand, index = 0, parentId) {
        const id = parentId ? parentId + '.' + index : index.toString();
        if (operand.children) {
            for (let i = 0; i < operand.children.length; i++) {
                const child = operand.children[i];
                this._complete(child, i, id);
            }
        }
        operand.id = id;
    }
}
exports.OrmOperandComplete = OrmOperandComplete;
//# sourceMappingURL=complete.js.map