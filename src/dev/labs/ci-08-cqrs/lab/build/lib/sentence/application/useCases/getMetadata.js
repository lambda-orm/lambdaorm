"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMetadata = void 0;
const typ3s_1 = require("typ3s");
class GetMetadata {
    // eslint-disable-next-line no-useless-constructor
    constructor(sentenceBuilder) {
        this.sentenceBuilder = sentenceBuilder;
    }
    /**
     * Get metadata of expression
     * @param expression expression
     * @returns metadata of expression
     */
    metadata(expression) {
        const sentence = this.sentenceBuilder.build(expression);
        return this.metadataFromSentence(sentence);
    }
    metadataFromSentence(sentence) {
        const children = [];
        for (const sentenceInclude of sentence.getIncludes()) {
            const child = this.metadataFromSentence(sentenceInclude.children[0]);
            children.push(child);
        }
        return {
            classtype: sentence.constructor.name,
            pos: sentence.pos,
            name: sentence.name,
            children,
            type: typ3s_1.Type.stringify(sentence.returnType),
            entity: sentence.entity,
            columns: sentence.columns,
            // property: sentence.p
            parameters: sentence.parameters,
            constraints: sentence.constraints,
            values: sentence.values,
            defaults: sentence.defaults,
            // relation: sentence.rel,
            clause: sentence.action,
            alias: sentence.alias,
            // isRoot: sentence.
            number: sentence.number
        };
    }
}
exports.GetMetadata = GetMetadata;
//# sourceMappingURL=getMetadata.js.map