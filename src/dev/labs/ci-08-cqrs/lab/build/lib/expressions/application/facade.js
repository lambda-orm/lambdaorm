"use strict";
/* eslint-disable @typescript-eslint/ban-types */
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
exports.ExpressionFacade = void 0;
const queryHelper_1 = require("./services/queryHelper");
const plan_1 = require("./useCases/plan");
const queryBuilder_1 = require("./services/queryBuilder");
const queryBuilderCacheDecorator_1 = require("./services/queryBuilderCacheDecorator");
const execute_1 = require("./useCases/execute");
class ExpressionFacade {
    constructor(sentenceFacade, schemaState, languages, executor, expressions, cache, helper) {
        this.sentenceFacade = sentenceFacade;
        this.schemaState = schemaState;
        this.languages = languages;
        this.builder = new queryBuilderCacheDecorator_1.QueryBuilderCacheDecorator(new queryBuilder_1.QueryBuilder(this.sentenceFacade, this.schemaState, this.languages), cache, helper);
        this.getQueryPlan = new plan_1.GeQueryPlan(this.builder);
        this.queryHelper = new queryHelper_1.QueryHelper(this.schemaState.stage, this.schemaState.view);
        this.expressionExecute = new execute_1.ExpressionExecute(this.builder, executor, expressions, helper);
    }
    build(query, options) {
        return this.builder.build(query, this.solveQueryOptions(options));
    }
    plan(query, options) {
        return this.getQueryPlan.plan(query, this.solveQueryOptions(options));
    }
    solveQueryOptions(options) {
        return this.queryHelper.solveQueryOptions(options);
    }
    execute(query_1) {
        return __awaiter(this, arguments, void 0, function* (query, data = {}, options) {
            return this.expressionExecute.execute(query, data, this.solveQueryOptions(options));
        });
    }
    executeList(queries, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.expressionExecute.executeList(queries, this.solveQueryOptions(options));
        });
    }
    transaction() {
        return __awaiter(this, arguments, void 0, function* (options = undefined, callback) {
            return this.expressionExecute.transaction(this.solveQueryOptions(options), callback);
        });
    }
}
exports.ExpressionFacade = ExpressionFacade;
//# sourceMappingURL=facade.js.map