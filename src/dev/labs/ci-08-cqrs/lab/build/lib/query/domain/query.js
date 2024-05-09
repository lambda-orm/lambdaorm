"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Include = exports.Query = void 0;
class Query {
    constructor(args) {
        this.action = args.action;
        this.type = args.type;
        this.category = args.category;
        this.dialect = args.dialect;
        this.sentence = args.sentence;
        this.entity = args.entity;
        this.source = args.source;
        this.columns = args.columns || [];
        this.parameters = args.parameters || [];
        this.constraints = args.constraints || [];
        this.values = args.values || [];
        this.defaults = args.defaults || [];
        this.includes = args.includes || [];
        this.query = args.query || '';
        this.description = args.description;
    }
}
exports.Query = Query;
class Include {
    constructor(name, query, relation) {
        this.name = name;
        this.query = query;
        this.relation = relation;
    }
}
exports.Include = Include;
//# sourceMappingURL=query.js.map