"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySolveWriteValues = void 0;
class QuerySolveWriteValues {
    // eslint-disable-next-line no-useless-constructor
    constructor(expressions) {
        this.expressions = expressions;
    }
    solve(query, data) {
        if (Array.isArray(data)) {
            for (const valueBehavior of query.values) {
                for (const item of data) {
                    item[valueBehavior.property] = this.expressions.eval(valueBehavior.expression, item);
                }
            }
        }
        else {
            for (const valueBehavior of query.values) {
                data[valueBehavior.property] = this.expressions.eval(valueBehavior.expression, data);
            }
        }
    }
}
exports.QuerySolveWriteValues = QuerySolveWriteValues;
//# sourceMappingURL=querySolveWriteValues.js.map