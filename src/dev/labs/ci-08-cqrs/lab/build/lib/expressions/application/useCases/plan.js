"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeQueryPlan = void 0;
class GeQueryPlan {
    // eslint-disable-next-line no-useless-constructor
    constructor(builder) {
        this.builder = builder;
    }
    plan(expression, options) {
        const query = this.builder.build(expression, options);
        return this._plan(query);
    }
    _plan(query) {
        const mainSentence = { entity: query.entity, dialect: query.dialect, source: query.source, sentence: query.sentence };
        for (const p in query.includes) {
            const include = query.includes[p];
            const includeSentence = this._plan(include.query);
            if (mainSentence.children === undefined) {
                mainSentence.children = [];
            }
            mainSentence.children.push(includeSentence);
        }
        return mainSentence;
    }
}
exports.GeQueryPlan = GeQueryPlan;
//# sourceMappingURL=plan.js.map