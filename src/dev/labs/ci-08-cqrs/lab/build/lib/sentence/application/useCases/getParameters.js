"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetParameters = void 0;
const typ3s_1 = require("typ3s");
class GetParameters {
    // eslint-disable-next-line no-useless-constructor
    constructor(sentenceBuilder) {
        this.sentenceBuilder = sentenceBuilder;
    }
    /**
     * Get parameters of expression
     * @param expression  expression
     * @returns Parameters of expression
     */
    parameters(expression) {
        const sentence = this.sentenceBuilder.build(expression);
        return this.parametersFromSentence(sentence);
    }
    parametersFromSentence(sentence) {
        var _a;
        const parameters = [];
        for (const parameter of sentence.parameters) {
            if (parameters.find(p => p.name === parameter.name) === undefined) {
                parameters.push({ name: parameter.name, type: parameter.type ? parameter.type : typ3s_1.Primitive.any });
            }
        }
        const includes = sentence.getIncludes();
        for (const p in includes) {
            const include = includes[p];
            const relationParameter = {
                name: include.relation.name,
                type: include.relation.entity,
                children: []
            };
            const children = this.parametersFromSentence(include.children[0]);
            for (const q in children) {
                const child = children[q];
                (_a = relationParameter.children) === null || _a === void 0 ? void 0 : _a.push(child);
            }
            parameters.push(relationParameter);
        }
        return parameters;
    }
}
exports.GetParameters = GetParameters;
//# sourceMappingURL=getParameters.js.map