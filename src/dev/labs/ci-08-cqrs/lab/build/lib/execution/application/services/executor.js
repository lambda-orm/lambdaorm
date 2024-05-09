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
exports.ExecutorImpl = void 0;
const queryExecutor_1 = require("./queryExecutor/queryExecutor");
const domain_1 = require("../../domain");
const queryExecutorObservableDecorator_1 = require("./queryExecutor/queryExecutorObservableDecorator");
class ExecutorImpl {
    constructor(connectionFacade, languages, schemaState, expressions, helper) {
        this.connectionFacade = connectionFacade;
        this.languages = languages;
        this.schemaState = schemaState;
        this.expressions = expressions;
        this.helper = helper;
        this.observers = [];
    }
    subscribe(observer) {
        this.observers.push(observer);
    }
    unsubscribe(observer) {
        const index = this.observers.indexOf(observer);
        if (index === -1) {
            throw new Error('Subject: Nonexistent observer.');
        }
        this.observers.splice(index, 1);
    }
    execute(query, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            let error;
            let result;
            if (query.includes && query.includes.length > 0) {
                yield this.transaction(options, function (tr) {
                    return __awaiter(this, void 0, void 0, function* () {
                        result = yield tr.execute(query, data);
                    });
                });
            }
            else {
                const queryExecutor = this.createQueryExecutor(options, false);
                try {
                    result = yield queryExecutor.execute(query, data);
                }
                catch (_error) {
                    error = _error;
                }
                finally {
                    yield queryExecutor.release();
                }
                if (error) {
                    throw error;
                }
            }
            return result;
        });
    }
    executeList(queries, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            if (options.tryAllCan) {
                for (const query of queries) {
                    const queryExecutor = this.createQueryExecutor(options, false);
                    try {
                        const result = yield queryExecutor.execute(query, {});
                        results.push({ result, description: query.description });
                    }
                    catch (error) {
                        results.push({ error, description: query.description });
                    }
                    finally {
                        yield queryExecutor.release();
                    }
                }
            }
            else {
                yield this.transaction(options, function (tr) {
                    return __awaiter(this, void 0, void 0, function* () {
                        for (const query of queries) {
                            const result = yield tr.execute(query);
                            results.push({ result, description: query.description });
                        }
                    });
                });
            }
            return results;
        });
    }
    /**
 * Create a transaction
 * @param options QueryOptions
 * @param callback Code to be executed in transaction
 */
    transaction(options, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryExecutor = this.createQueryExecutor(options, true);
            let error;
            try {
                const transaction = new domain_1.Transaction(queryExecutor);
                yield callback(transaction);
                yield queryExecutor.commit();
            }
            catch (_error) {
                error = _error;
                yield queryExecutor.rollback();
            }
            finally {
                yield queryExecutor.release();
            }
            if (error) {
                throw error;
            }
        });
    }
    createQueryExecutor(options, transactional) {
        const queryExecutor = new queryExecutor_1.QueryExecutorImpl(this.connectionFacade, this.languages, this.schemaState, this.expressions, options, this.helper, transactional);
        return new queryExecutorObservableDecorator_1.QueryExecutorObservableDecorator(this.expressions, queryExecutor, this.observers);
    }
}
exports.ExecutorImpl = ExecutorImpl;
//# sourceMappingURL=executor.js.map