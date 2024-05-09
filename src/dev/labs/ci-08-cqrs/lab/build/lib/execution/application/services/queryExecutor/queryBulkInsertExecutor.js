"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryBulkInsertExecutor = void 0;
const domain_1 = require("../../../../connection/domain");
const lambdaorm_base_1 = require("lambdaorm-base");
const queryEvalConstraints_1 = require("./queryEvalConstraints");
const querySolveDefaults_1 = require("./querySolveDefaults");
const querySolveWriteValues_1 = require("./querySolveWriteValues");
class QueryBulkInsertExecutor {
    constructor(executor, expressions, options) {
        this.options = options;
        this.executor = executor;
        this.solveWriteValues = new querySolveWriteValues_1.QuerySolveWriteValues(expressions);
        this.solveDefaults = new querySolveDefaults_1.QuerySolveDefaults(expressions);
        this.solveWriteValues = new querySolveWriteValues_1.QuerySolveWriteValues(expressions);
        this.constraints = new queryEvalConstraints_1.QueryEvalConstraints(expressions);
    }
    bulkInsert(query, data, mapping, dialect, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = mapping.getEntity(query.entity);
            // before insert the relationships of the type oneToMany and oneToOne with relation required
            yield this.bulkIncludesBefore(query, data, entity, dialect);
            // insert data
            const chunkSize = this.options.chunkSize ? Math.min(connection.maxChunkSizeOnBulkInsert, this.options.chunkSize) : connection.maxChunkSizeOnBulkInsert;
            let ids = [];
            for (let i = 0; i < data.data.length; i += chunkSize) {
                const chunk = data.data.slice(i, i + chunkSize);
                const result = yield this._chunk(query, entity, chunk, mapping, dialect, connection);
                ids = ids.concat(result);
            }
            const autoIncrement = mapping.getAutoIncrement(query.entity);
            if (autoIncrement) {
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i][autoIncrement.name] = ids[i];
                }
            }
            // after insert the relationships of the type manyToOne and oneToOne with relation not required
            yield this.bulkIncludesAfter(query, data, mapping, dialect);
            return ids;
        });
    }
    bulkIncludesBefore(query, data, entity, dialect) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            for (const include of query.includes) {
                if (!include.relation.composite || !dialect.solveComposite) {
                    const relationProperty = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(q => q.name === include.relation.from);
                    if (include.relation.type === lambdaorm_base_1.RelationType.oneToMany) {
                        yield this.bulkIncludeBeforeOneToMany(include, data);
                    }
                    else if (include.relation.type === lambdaorm_base_1.RelationType.oneToOne && relationProperty && relationProperty.required) {
                        yield this.bulkIncludeBeforeOneToOne(include, data);
                    }
                }
            }
        });
    }
    bulkIncludeBeforeOneToMany(include, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const allChildren = [];
            const items = [];
            for (const item of data.data) {
                const child = item[include.relation.name];
                if (child) {
                    allChildren.push(child);
                    items.push(item);
                }
            }
            const childData = new lambdaorm_base_1.Data(allChildren, data);
            const allChildrenId = yield this.executor._execute(include.query, childData);
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                if (item[include.relation.name]) {
                    item[include.relation.from] = allChildrenId[i];
                }
            }
        });
    }
    bulkIncludeBeforeOneToOne(include, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const allChildren = [];
            const items = [];
            for (const item of data.data) {
                const child = item[include.relation.name];
                if (child) {
                    allChildren.push(child);
                    items.push(item);
                }
            }
            if (allChildren.length > 0) {
                const childData = new lambdaorm_base_1.Data(allChildren, data);
                const allChildrenId = yield this.executor._execute(include.query, childData);
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (item[include.relation.name]) {
                        item[include.relation.from] = allChildrenId[i];
                    }
                }
            }
        });
    }
    bulkIncludesAfter(query, data, mapping, dialect) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const p in query.includes) {
                const include = query.includes[p];
                if (!include.relation.composite || !dialect.solveComposite) {
                    const relationProperty = mapping.getProperty(query.entity, include.relation.from);
                    if (include.relation.type === lambdaorm_base_1.RelationType.manyToOne) {
                        yield this.bulkIncludeAfterManyToOne(include, data);
                    }
                    else if (include.relation.type === lambdaorm_base_1.RelationType.oneToOne && !relationProperty.required) {
                        yield this.bulkIncludeAfterOneToOne(query, include, data);
                    }
                }
            }
        });
    }
    bulkIncludeAfterManyToOne(include, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const allChildren = [];
            for (const item of data.data) {
                const parentId = item[include.relation.from];
                const children = item[include.relation.name];
                if (children) {
                    for (const child of children) {
                        child[include.relation.to] = parentId;
                        allChildren.push(child);
                    }
                }
            }
            const childData = new lambdaorm_base_1.Data(allChildren, data);
            yield this.executor._execute(include.query, childData);
        });
    }
    bulkIncludeAfterOneToOne(query, include, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const allChildren = [];
            const items = [];
            for (const item of data.data) {
                const parentId = item[include.relation.from];
                const child = item[include.relation.name];
                if (!parentId) {
                    throw new domain_1.ExecutionError(query.source, query.entity, JSON.stringify(query.sentence), `parentId not found in ${include.relation.from}`, item);
                }
                if (child) {
                    child[include.relation.to] = parentId;
                    allChildren.push(child);
                    items.push(item);
                }
            }
            if (allChildren.length > 0) {
                const childData = new lambdaorm_base_1.Data(allChildren, data);
                const allChildrenId = yield this.executor._execute(include.query, childData);
                for (let i = 0; i < items.length; i++) {
                    const item = items[i];
                    if (item[include.relation.name]) {
                        item[include.relation.from] = allChildrenId[i];
                    }
                }
            }
        });
    }
    _chunk(query, entity, chunk, mapping, dialect, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            // solve default properties
            if (entity.hadDefaults) {
                this.solveDefaults.solve(query, chunk);
            }
            // solve write properties
            if (entity.hadWriteValues) {
                this.solveWriteValues.solve(query, chunk);
            }
            // evaluate constraints
            this.constraints.eval(query, chunk);
            return connection.bulkInsert(mapping, dialect, query, chunk);
        });
    }
}
exports.QueryBulkInsertExecutor = QueryBulkInsertExecutor;
//# sourceMappingURL=queryBulkInsertExecutor.js.map