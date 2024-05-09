"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmOperandClone = void 0;
const _3xpr_1 = require("3xpr");
class OrmOperandClone {
    clone(source) {
        const children = [];
        for (const child of source.children) {
            children.push(this.clone(child));
        }
        const target = new _3xpr_1.Operand(source.pos, source.name, source.type, children, source.returnType);
        target.id = source.id;
        return target;
    }
}
exports.OrmOperandClone = OrmOperandClone;
//# sourceMappingURL=clone.js.map