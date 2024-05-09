"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySolveReadValues = void 0;
class QuerySolveReadValues {
    // eslint-disable-next-line no-useless-constructor
    constructor(expressions, helper) {
        this.expressions = expressions;
        this.helper = helper;
    }
    solve(query, data) {
        for (const valueBehavior of query.values) {
            if (valueBehavior.alias === valueBehavior.property) {
                // Example Users.map(p=> [p.email]) or Users.map(p=> {email:p.email})
                for (const item of data) {
                    item[valueBehavior.alias] = this.expressions.eval(valueBehavior.expression, item);
                }
            }
            else if (valueBehavior.alias) {
                // Example Users.map(p=> {mail:p.email})
                // since the expression contains the name of the property and not the alias
                // the property must be added with the alias value.
                for (const item of data) {
                    const context = this.helper.obj.clone(item);
                    context[valueBehavior.property] = item[valueBehavior.alias];
                    item[valueBehavior.alias] = this.expressions.eval(valueBehavior.expression, context);
                }
            }
        }
    }
}
exports.QuerySolveReadValues = QuerySolveReadValues;
//# sourceMappingURL=querySolveReadValues.js.map