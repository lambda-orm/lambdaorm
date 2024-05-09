"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetModel = void 0;
class GetModel {
    // eslint-disable-next-line no-useless-constructor
    constructor(sentenceBuilder) {
        this.sentenceBuilder = sentenceBuilder;
    }
    /**
     * Get model of expression
     * @param expression expression
     * @returns Model of expression
     */
    model(expression) {
        const sentence = this.sentenceBuilder.build(expression);
        return this.modelFromSentence(sentence);
    }
    modelFromSentence(sentence) {
        const result = [];
        for (const column of sentence.columns) {
            if (!column.name.startsWith('__')) {
                result.push({ name: column.name, type: column.type || 'string' });
            }
        }
        const includes = sentence.getIncludes();
        for (const p in includes) {
            const include = includes[p];
            const childType = include.relation.entity + (include.relation.type === 'manyToOne' ? '[]' : '');
            const child = { name: include.relation.name, type: childType, children: [] };
            child.children = this.modelFromSentence(include.children[0]);
            result.push(child);
        }
        return result;
    }
}
exports.GetModel = GetModel;
//# sourceMappingURL=getModel.js.map