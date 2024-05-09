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
exports.QuerySelectExecutor = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
const querySolveReadValues_1 = require("./querySolveReadValues");
class QuerySelectExecutor {
    constructor(executor, expressions, options, helper) {
        this.executor = executor;
        this.options = options;
        this.helper = helper;
        this.options = options;
        this.executor = executor;
        this.solveReadValues = new querySolveReadValues_1.QuerySolveReadValues(expressions, this.helper);
    }
    select(query, data, mapping, dialect, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const mainResult = yield connection.select(mapping, dialect, query, data);
            if (mainResult.length > 0) {
                if (query.entity) {
                    const entity = mapping.getEntity(query.entity);
                    if (entity && entity.hadReadValues) {
                        this.solveReadValues.solve(query, mainResult);
                    }
                }
                // get rows for include relations
                yield this.selectIncludes(query, data, mainResult, dialect, connection);
            }
            return mainResult;
        });
    }
    selectIncludes(query, data, mainResult, dialect, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const idsChunkSize = this.options.chunkSize ? Math.min(connection.maxChunkSizeIdsOnSelect, this.options.chunkSize) : connection.maxChunkSizeIdsOnSelect;
            const chunkSize = this.options.chunkSize ? Math.min(connection.maxChunkSizeOnSelect, this.options.chunkSize) : connection.maxChunkSizeOnSelect;
            for (const include of query.includes) {
                if (!include.relation.composite || !dialect.solveComposite) {
                    yield this.selectInclude(include, data, mainResult, idsChunkSize, chunkSize);
                }
                else if (include.query.includes.length > 0) {
                    yield this.selectIncludeComposite(include, data, mainResult, idsChunkSize, chunkSize);
                }
            }
        });
    }
    selectIncludeComposite(include, data, mainResult, idsChunkSize, chunkSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const includeItems = [];
            for (const element of mainResult) {
                const item = element[include.relation.name];
                if (include.relation.type === lambdaorm_base_1.RelationType.manyToOne) {
                    for (const child of item) {
                        child.LambdaOrmParentId = element[include.relation.from];
                        includeItems.push(child);
                    }
                }
                else if (item) {
                    item.LambdaOrmParentId = element[include.relation.from];
                    includeItems.push(item);
                }
            }
            for (const includeChild of include.query.includes) {
                const keyId = '__' + includeChild.relation.from;
                const chunk = this.selectChunkResult(includeItems, keyId);
                const _data = data.clone();
                _data.set('LambdaOrmParentId', chunk.ids);
                const includeResult = yield this.executor._execute(includeChild.query, _data);
                yield this.addIncludeResult(includeChild, includeResult, chunk.result, chunkSize);
            }
        });
    }
    selectInclude(include, data, mainResult, idsChunkSize, chunkSize) {
        return __awaiter(this, void 0, void 0, function* () {
            let chunks = [];
            const keyId = '__' + include.relation.from;
            if (mainResult.length > idsChunkSize) {
                const promises = [];
                for (let i = 0; i < mainResult.length; i += idsChunkSize) {
                    const chunk = mainResult.slice(i, i + idsChunkSize);
                    promises.push(this.selectChunkResult(chunk, keyId));
                }
                chunks = yield Promise.all(promises);
            }
            else {
                chunks = [this.selectChunkResult(mainResult, keyId)];
            }
            const promises2 = [];
            for (const chunk of chunks) {
                if (chunk.ids !== undefined && chunk.ids.length > 0) {
                    promises2.push(this.selectChild(include, data, chunk.ids, chunk.result, chunkSize));
                }
            }
            yield Promise.all(promises2);
        });
    }
    selectChunkResult(result, keyId) {
        const ids = [];
        for (const item of result) {
            const id = item[keyId];
            // Replace for performance
            let exists = false;
            for (const _id of ids) {
                if (_id === id) {
                    exists = true;
                    break;
                }
            }
            if (!exists && id !== undefined && id !== null) {
                ids.push(id);
            }
        }
        return { ids, result };
    }
    selectChunkIds(result, keyId) {
        const ids = [];
        for (const item of result) {
            const id = item[keyId];
            // Replace for performance
            let exists = false;
            for (const _id of ids) {
                if (_id === id) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                ids.push(id);
            }
        }
        return ids;
    }
    selectChild(include, _data, ids, mainResult, chunkSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = _data.clone();
            data.set('LambdaOrmParentId', ids);
            const includeResult = yield this.executor._execute(include.query, data);
            yield this.addIncludeResult(include, includeResult, mainResult, chunkSize);
        });
    }
    addIncludeResult(include, includeResult, mainResult, chunkSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const keyId = '__' + include.relation.from;
            if (include.relation.type === lambdaorm_base_1.RelationType.manyToOne) {
                if (includeResult.length > chunkSize) {
                    const promises = [];
                    for (let i = 0; i < includeResult.length; i += chunkSize) {
                        const chunk = includeResult.slice(i, i + chunkSize);
                        promises.push(this.selectChildSetManyToOne(mainResult, chunk, include.name, keyId));
                    }
                    yield Promise.all(promises);
                }
                else {
                    this.selectChildSetManyToOne(mainResult, includeResult, include.name, keyId);
                }
            }
            else {
                if (includeResult.length > chunkSize) {
                    const promises = [];
                    for (let i = 0; i < includeResult.length; i += chunkSize) {
                        const chunk = includeResult.slice(i, i + chunkSize);
                        promises.push(this.selectChildSetOneToMany(mainResult, chunk, include.name, keyId));
                    }
                    yield Promise.all(promises);
                }
                else {
                    this.selectChildSetOneToMany(mainResult, includeResult, include.name, keyId);
                }
            }
        });
    }
    selectChildSetManyToOne(mainResult, includeResult, propertyName, keyId) {
        for (const element of mainResult) {
            const relationId = element[keyId];
            if (element[propertyName] === undefined) {
                element[propertyName] = [];
            }
            for (const item of includeResult) {
                if (item.LambdaOrmParentId === relationId) {
                    element[propertyName].push(item);
                }
            }
        }
    }
    selectChildSetOneToMany(mainResult, includeResult, propertyName, keyId) {
        for (const element of mainResult) {
            const relationId = element[keyId];
            if (element[propertyName] === undefined) {
                element[propertyName] = null;
            }
            for (const item of includeResult) {
                if (item.LambdaOrmParentId === relationId) {
                    element[propertyName] = item;
                    break;
                }
            }
        }
    }
}
exports.QuerySelectExecutor = QuerySelectExecutor;
//# sourceMappingURL=querySelectExecutor.js.map