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
exports.QueryInsertExecutor = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
const querySolveDefaults_1 = require("./querySolveDefaults");
const querySolveWriteValues_1 = require("./querySolveWriteValues");
const queryEvalConstraints_1 = require("./queryEvalConstraints");
class QueryInsertExecutor {
    constructor(executor, expressions, options) {
        this.options = options;
        this.executor = executor;
        this.solveWriteValues = new querySolveWriteValues_1.QuerySolveWriteValues(expressions);
        this.solveDefaults = new querySolveDefaults_1.QuerySolveDefaults(expressions);
        this.solveWriteValues = new querySolveWriteValues_1.QuerySolveWriteValues(expressions);
        this.constraints = new queryEvalConstraints_1.QueryEvalConstraints(expressions);
    }
    insert(query, data, mapping, dialect, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            // before insert the relationships of the type oneToOne and oneToMany
            const autoIncrement = mapping.getAutoIncrement(query.entity);
            const entity = mapping.getEntity(query.entity);
            yield this.includeBefore(query, data, dialect);
            // solve default properties
            if (entity.hadDefaults) {
                this.solveDefaults.solve(query, data.data);
            }
            // solve default properties
            if (entity.hadWriteValues) {
                this.solveWriteValues.solve(query, data.data);
            }
            // evaluate constraints
            this.constraints.eval(query, data.data);
            // insert main entity
            const insertId = yield connection.insert(mapping, dialect, query, data);
            if (autoIncrement) {
                data.set(autoIncrement.name, insertId);
            }
            // after insert the relationships of the type oneToOne and manyToOne
            yield this.includeAfter(query, data, dialect);
            return insertId;
        });
    }
    includeBefore(query, data, dialect) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const include of query.includes) {
                if (!include.relation.composite || !dialect.solveComposite) {
                    const relation = data.get(include.relation.name);
                    if (relation && (include.relation.type === lambdaorm_base_1.RelationType.oneToOne || include.relation.type === lambdaorm_base_1.RelationType.oneToMany)) {
                        const relationData = new lambdaorm_base_1.Data(relation, data);
                        const relationId = yield this.executor._execute(include.query, relationData);
                        data.set(include.relation.from, relationId);
                    }
                }
            }
        });
    }
    includeAfter(query, data, dialect) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const include of query.includes) {
                if (!include.relation.composite || !dialect.solveComposite) {
                    const relation = data.get(include.relation.name);
                    if (relation && include.relation.type === lambdaorm_base_1.RelationType.manyToOne) {
                        const parentId = data.get(include.relation.from);
                        const childPropertyName = include.relation.to;
                        for (const child of relation) {
                            child[childPropertyName] = parentId;
                            const childData = new lambdaorm_base_1.Data(child, data);
                            yield this.executor._execute(include.query, childData);
                        }
                    }
                }
            }
        });
    }
}
exports.QueryInsertExecutor = QueryInsertExecutor;
//# sourceMappingURL=queryInsertExecutor.js.map