"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilder = void 0;
const domain_1 = require("../../../query/domain");
// eslint-disable-next-line padded-blocks
class QueryBuilder {
    // eslint-disable-next-line no-useless-constructor
    constructor(sentenceFacade, schemaState, languages) {
        this.sentenceFacade = sentenceFacade;
        this.schemaState = schemaState;
        this.languages = languages;
    }
    build(queryExpression, options) {
        const _view = this.schemaState.view.get(options.view);
        const view = this.schemaState.view.getInstance(_view.name);
        const sentence = this.sentenceFacade.build(queryExpression, view, options.stage);
        const query = this.dmlBuild(sentence, view, options.stage);
        query.query = queryExpression;
        return query;
    }
    dmlBuild(sentence, view, stage) {
        const includes = [];
        const source = this.sentenceFacade.getSource(sentence, stage);
        const language = this.languages.getByDialect(source.dialect);
        // const dialect = this.languages.getDialect(source.dialect)
        const mapping = this.schemaState.mapping.getInstance(source.mapping);
        const sentenceIncludes = sentence.getIncludes();
        for (const p in sentenceIncludes) {
            const sentenceInclude = sentenceIncludes[p];
            // if (!sentenceInclude.relation.composite || !dialect.solveComposite) {
            const queryInclude = this.dmlBuild(sentenceInclude.children[0], view, stage);
            const include = new domain_1.Include(sentenceInclude.name, queryInclude, sentenceInclude.relation);
            includes.push(include);
            // }
        }
        const query = language.dmlBuilder(source, mapping).build(sentence);
        query.includes = query.includes.concat(includes);
        return query;
    }
}
exports.QueryBuilder = QueryBuilder;
//# sourceMappingURL=queryBuilder.js.map