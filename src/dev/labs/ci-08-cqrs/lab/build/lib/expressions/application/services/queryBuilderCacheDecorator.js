"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBuilderCacheDecorator = void 0;
class QueryBuilderCacheDecorator {
    // eslint-disable-next-line no-useless-constructor
    constructor(builder, cache, helper) {
        this.builder = builder;
        this.cache = cache;
        this.helper = helper;
    }
    build(expression, options) {
        const expressionKey = this.helper.utils.hashCode(expression);
        const key = `${expressionKey}-${options.stage}-${options.view || 'default'}`;
        const value = this.cache.get(key);
        if (!value) {
            const query = this.builder.build(expression, options);
            this.cache.set(key, JSON.stringify(query));
            return query;
        }
        else {
            return JSON.parse(value);
        }
    }
}
exports.QueryBuilderCacheDecorator = QueryBuilderCacheDecorator;
//# sourceMappingURL=queryBuilderCacheDecorator.js.map