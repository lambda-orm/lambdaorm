"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DdlBuilderBase = void 0;
const domain_1 = require("../../../query/domain");
const lambdaorm_base_1 = require("lambdaorm-base");
class DdlBuilderBase {
    // eslint-disable-next-line no-useless-constructor
    constructor(source, mapping, dialect, helper) {
        this.source = source;
        this.mapping = mapping;
        this.dialect = dialect;
        this.helper = helper;
    }
    objects() {
        const text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.objects);
        return this.createQuery(lambdaorm_base_1.SentenceAction.objects, text, 'get objects', '');
    }
    tables(names) {
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.tables);
        text = text.replace('{names}', names.map(p => this.dialect.string(p)).join(','));
        return this.createQuery(lambdaorm_base_1.SentenceAction.tables, text, 'get tables', '');
    }
    views(names) {
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.views);
        text = text.replace('{names}', names.map(p => this.dialect.string(p)).join(','));
        return this.createQuery(lambdaorm_base_1.SentenceAction.views, text, 'get views', '');
    }
    primaryKeys(tableNames) {
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.primaryKeys);
        text = text.replace('{tableNames}', tableNames.map(p => this.dialect.string(p)).join(','));
        return this.createQuery(lambdaorm_base_1.SentenceAction.primaryKeys, text, 'get primary keys', '');
    }
    uniqueKeys(tableNames) {
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.uniqueKeys);
        text = text.replace('{tableNames}', tableNames.map(p => this.dialect.string(p)).join(','));
        return this.createQuery(lambdaorm_base_1.SentenceAction.uniqueKeys, text, 'get unique keys', '');
    }
    foreignKeys(tableNames) {
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.foreignKeys);
        text = text.replace('{tableNames}', tableNames.map(p => this.dialect.string(p)).join(','));
        return this.createQuery(lambdaorm_base_1.SentenceAction.foreignKeys, text, 'get foreign keys', '');
    }
    indexes(tableNames) {
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.indexes);
        text = text.replace('{tableNames}', tableNames.map(p => this.dialect.string(p)).join(','));
        return this.createQuery(lambdaorm_base_1.SentenceAction.indexes, text, 'get indexes', '');
    }
    sequences() {
        const text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.sequences);
        return this.createQuery(lambdaorm_base_1.SentenceAction.sequences, text, 'get sequences', '');
    }
    createQuery(action, sentence, entity, description, query = '') {
        const category = this.helper.query.getSentenceCategory(action);
        const type = lambdaorm_base_1.SentenceType.ddl;
        return new domain_1.Query({ query, action, category, type, description, dialect: this.source.dialect, source: this.source.name, sentence, entity });
    }
}
exports.DdlBuilderBase = DdlBuilderBase;
//# sourceMappingURL=DdlBuilderBase.js.map