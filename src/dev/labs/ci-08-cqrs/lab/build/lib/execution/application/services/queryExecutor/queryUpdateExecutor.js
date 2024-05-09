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
exports.QueryUpdateExecutor = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
const queryEvalConstraints_1 = require("./queryEvalConstraints");
const querySolveWriteValues_1 = require("./querySolveWriteValues");
class QueryUpdateExecutor {
    constructor(executor, expressions, options) {
        this.options = options;
        this.executor = executor;
        this.solveWriteValues = new querySolveWriteValues_1.QuerySolveWriteValues(expressions);
        this.solveWriteValues = new querySolveWriteValues_1.QuerySolveWriteValues(expressions);
        this.constraints = new queryEvalConstraints_1.QueryEvalConstraints(expressions);
    }
    update(query, data, mapping, dialect, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = mapping.getEntity(query.entity);
            // solve default properties
            if (entity && entity.hadWriteValues) {
                this.solveWriteValues.solve(query, data.data);
            }
            // evaluate constraints
            this.constraints.eval(query, data.data);
            // update
            const changeCount = yield connection.update(mapping, dialect, query, data);
            for (const include of query.includes) {
                if (!include.relation.composite || !dialect.solveComposite) {
                    yield this.updateInclude(include, data);
                }
            }
            return changeCount;
        });
    }
    updateInclude(include, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const children = data.get(include.relation.name);
            if (children) {
                if (include.relation.type === lambdaorm_base_1.RelationType.manyToOne) {
                    for (const child of children) {
                        const childData = new lambdaorm_base_1.Data(child, data);
                        yield this.executor._execute(include.query, childData);
                    }
                }
                else {
                    const childData = new lambdaorm_base_1.Data(children, data);
                    yield this.executor._execute(include.query, childData);
                }
            }
        });
    }
}
exports.QueryUpdateExecutor = QueryUpdateExecutor;
//# sourceMappingURL=queryUpdateExecutor.js.map