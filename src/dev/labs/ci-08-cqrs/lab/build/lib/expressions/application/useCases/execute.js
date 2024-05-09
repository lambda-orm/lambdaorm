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
exports.ExpressionExecute = void 0;
const transaction_1 = require("./transaction");
class ExpressionExecute {
    // eslint-disable-next-line no-useless-constructor
    constructor(builder, executor, query, helper) {
        this.builder = builder;
        this.executor = executor;
        this.query = query;
        this.helper = helper;
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    execute(query, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (query === undefined || query === null || query.trim() === '') {
                yield this.helper.logger.log('query is empty');
                return null;
            }
            const _query = this.builder.build(query, options);
            return this.executor.execute(_query, data === null || data === undefined ? {} : data, options);
        });
    }
    executeList(queries, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const _queries = queries.map(p => this.builder.build(p, options));
            return this.executor.executeList(_queries, options);
        });
    }
    transaction(options, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            this.executor.transaction(options, (transaction) => __awaiter(this, void 0, void 0, function* () {
                const tr = new transaction_1.QueryTransaction(transaction, this.builder, this.query);
                yield callback(tr);
            }));
        });
    }
}
exports.ExpressionExecute = ExpressionExecute;
//# sourceMappingURL=execute.js.map