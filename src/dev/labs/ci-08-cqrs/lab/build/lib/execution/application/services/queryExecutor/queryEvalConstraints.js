"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryEvalConstraints = void 0;
const domain_1 = require("../../../domain");
class QueryEvalConstraints {
    // eslint-disable-next-line no-useless-constructor
    constructor(expressions) {
        this.expressions = expressions;
    }
    eval(query, data) {
        if (Array.isArray(data)) {
            for (const constraint of query.constraints) {
                for (const item of data) {
                    this.constraint(query, constraint, item);
                }
            }
        }
        else {
            for (const constraint of query.constraints) {
                this.constraint(query, constraint, data);
            }
        }
    }
    constraint(query, constraint, data) {
        if (!this.expressions.eval(constraint.condition, data)) {
            throw new domain_1.ValidationError(query.source, query.entity, constraint.condition, JSON.stringify(query.sentence), constraint.message, data);
        }
    }
}
exports.QueryEvalConstraints = QueryEvalConstraints;
//# sourceMappingURL=queryEvalConstraints.js.map