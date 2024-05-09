"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmExpressionsBuilder = void 0;
const _3xpr_1 = require("3xpr");
const infrastructure_1 = require("../../sentence/infrastructure");
class OrmExpressionsBuilder {
    // eslint-disable-next-line no-useless-constructor
    constructor(helper) {
        this.helper = helper;
    }
    build() {
        _3xpr_1.expressions.addLibrary(new infrastructure_1.SentenceLibrary(this.helper));
        return _3xpr_1.expressions;
    }
}
exports.OrmExpressionsBuilder = OrmExpressionsBuilder;
//# sourceMappingURL=expressionsBuilder.js.map