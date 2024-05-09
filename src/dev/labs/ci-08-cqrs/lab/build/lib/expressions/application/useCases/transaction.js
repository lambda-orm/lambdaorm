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
exports.QueryTransaction = void 0;
class QueryTransaction {
    // eslint-disable-next-line no-useless-constructor
    constructor(transaction, builder, expressions) {
        this.transaction = transaction;
        this.builder = builder;
        this.expressions = expressions;
    }
    execute(query_1) {
        return __awaiter(this, arguments, void 0, function* (query, data = {}) {
            if (typeof query !== 'string') {
                query = this.expressions.convert(query, 'function')[0];
            }
            const _query = this.builder.build(query, this.transaction.options);
            return this.transaction.execute(_query, data);
        });
    }
    executeQuery(query_1) {
        return __awaiter(this, arguments, void 0, function* (query, data = {}) {
            return this.transaction.execute(query, data);
        });
    }
}
exports.QueryTransaction = QueryTransaction;
//# sourceMappingURL=transaction.js.map