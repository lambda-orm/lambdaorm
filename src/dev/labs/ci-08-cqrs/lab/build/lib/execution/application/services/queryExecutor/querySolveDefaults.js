"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySolveDefaults = void 0;
class QuerySolveDefaults {
    // eslint-disable-next-line no-useless-constructor
    constructor(expressions) {
        this.expressions = expressions;
    }
    solve(query, data) {
        if (Array.isArray(data)) {
            for (const defaultBehavior of query.defaults) {
                for (const item of data) {
                    this.solveDefault(defaultBehavior, item);
                }
            }
        }
        else {
            for (const defaultBehavior of query.defaults) {
                this.solveDefault(defaultBehavior, data);
            }
        }
    }
    solveDefault(defaultBehavior, data) {
        const value = data[defaultBehavior.property];
        if (value === undefined) {
            data[defaultBehavior.property] = this.expressions.eval(defaultBehavior.expression, data);
        }
    }
}
exports.QuerySolveDefaults = QuerySolveDefaults;
//# sourceMappingURL=querySolveDefaults.js.map