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
exports.QueryExecutorObservableDecorator = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
class QueryExecutorObservableDecorator {
    // eslint-disable-next-line no-useless-constructor
    constructor(expressions, queryExecutor, observers) {
        this.expressions = expressions;
        this.queryExecutor = queryExecutor;
        this.observers = observers;
    }
    get options() {
        return this.queryExecutor.options;
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.queryExecutor.commit();
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.queryExecutor.rollback();
        });
    }
    release() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.queryExecutor.release();
        });
    }
    execute(query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            if ([lambdaorm_base_1.SentenceType.dql, lambdaorm_base_1.SentenceType.dml].includes(query.type)) {
                try {
                    yield this.beforeExecutionNotify(query, data, this.options);
                    const result = yield this.queryExecutor.execute(query, data);
                    yield this.afterExecutionNotify(query, data, this.options, result);
                    return result;
                }
                catch (error) {
                    yield this.errorExecutionNotify(query, data, this.options, error);
                    throw error;
                }
            }
            else {
                return this.queryExecutor.execute(query, data);
            }
        });
    }
    beforeExecutionNotify(query, data, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = this.createActionObserverArgs(query, data, options);
            if (!this.observers)
                return;
            this.observers.filter(p => p.on && p.on.includes(query.category)).forEach((observer) => __awaiter(this, void 0, void 0, function* () {
                if (observer.condition === undefined) {
                    observer.before(args);
                }
                else {
                    if (this.expressions.eval(observer.condition, args)) {
                        yield observer.before(args);
                    }
                }
            }));
        });
    }
    afterExecutionNotify(query, data, options, result) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = this.createActionObserverArgs(query, data, options, result);
            if (!this.observers)
                return;
            this.observers.filter(p => p.on && p.on.includes(query.category)).forEach((observer) => __awaiter(this, void 0, void 0, function* () {
                if (observer.condition === undefined) {
                    observer.after(args);
                }
                else {
                    if (this.expressions.eval(observer.condition, args)) {
                        yield observer.after(args);
                    }
                }
            }));
        });
    }
    errorExecutionNotify(query, data, options, error) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = this.createActionObserverArgs(query, data, options, null, error);
            if (!this.observers)
                return;
            this.observers.filter(p => p.on && p.on.includes(query.category)).forEach((observer) => __awaiter(this, void 0, void 0, function* () {
                if (observer.condition === undefined) {
                    observer.error(args);
                }
                else {
                    if (this.expressions.eval(observer.condition, args)) {
                        yield observer.error(args);
                    }
                }
            }));
        });
    }
    createActionObserverArgs(query, data, options, result, error) {
        return {
            data,
            options,
            error,
            result,
            action: query.action,
            type: query.type,
            category: query.category,
            dialect: query.dialect,
            entity: query.entity,
            query: query.query,
            source: query.source,
            sentence: query.sentence
        };
    }
}
exports.QueryExecutorObservableDecorator = QueryExecutorObservableDecorator;
//# sourceMappingURL=queryExecutorObservableDecorator.js.map