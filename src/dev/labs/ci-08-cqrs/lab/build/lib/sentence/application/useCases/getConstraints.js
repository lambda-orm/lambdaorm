"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConstraints = void 0;
class GetConstraints {
    // eslint-disable-next-line no-useless-constructor
    constructor(sentenceBuilder) {
        this.sentenceBuilder = sentenceBuilder;
    }
    /**
     * Get constraints of expression
     * @param expression expression
     * @returns constraints
     */
    constraints(expression) {
        const sentence = this.sentenceBuilder.build(expression);
        return this.constraintsFromSentence(sentence);
    }
    constraintsFromSentence(sentence) {
        const result = { entity: sentence.entity, constraints: sentence.constraints };
        const includes = sentence.getIncludes();
        for (const p in includes) {
            const include = includes[p];
            const child = this.constraintsFromSentence(include.children[0]);
            if (!result.children) {
                result.children = [];
            }
            result.children.push(child);
        }
        return result;
    }
}
exports.GetConstraints = GetConstraints;
//# sourceMappingURL=getConstraints.js.map