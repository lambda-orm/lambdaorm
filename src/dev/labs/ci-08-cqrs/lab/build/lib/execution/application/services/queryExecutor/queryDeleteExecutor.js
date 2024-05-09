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
exports.QueryDeleteExecutor = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
class QueryDeleteExecutor {
    constructor(executor, options) {
        this.options = options;
        this.executor = executor;
    }
    delete(query, data, mapping, dialect, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            // before remove relations entities
            for (const include of query.includes) {
                if (!include.relation.composite || !dialect.solveComposite) {
                    yield this.include(include, data);
                }
            }
            // remove main entity
            return connection.delete(mapping, dialect, query, data);
        });
    }
    include(include, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const relation = data.get(include.relation.name);
            if (relation) {
                if (include.relation.type === lambdaorm_base_1.RelationType.manyToOne) {
                    for (const child of relation) {
                        const childData = new lambdaorm_base_1.Data(child, data);
                        yield this.executor._execute(include.query, childData);
                    }
                }
                else {
                    const childData = new lambdaorm_base_1.Data(relation, data);
                    yield this.executor._execute(include.query, childData);
                }
            }
        });
    }
}
exports.QueryDeleteExecutor = QueryDeleteExecutor;
//# sourceMappingURL=queryDeleteExecutor.js.map