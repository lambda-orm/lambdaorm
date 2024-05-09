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
exports.Transaction = void 0;
class Transaction {
    constructor(queryExecutor) {
        this.queryExecutor = queryExecutor;
        this.queryExecutor = queryExecutor;
    }
    execute(query_1) {
        return __awaiter(this, arguments, void 0, function* (query, data = {}) {
            return this.queryExecutor.execute(query, data);
        });
    }
    get options() {
        return this.queryExecutor.options;
    }
}
exports.Transaction = Transaction;
//# sourceMappingURL=transaction.js.map