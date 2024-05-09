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
exports.orm = exports.Orm = void 0;
const infrastructure_1 = require("../../shared/infrastructure");
const h3lp_1 = require("h3lp");
const lambdaorm_base_1 = require("lambdaorm-base");
const infrastructure_2 = require("../../connection/infrastructure");
const expressionsBuilder_1 = require("./expressionsBuilder");
const infrastructure_3 = require("../../operand/infrastructure");
const facadeBuilder_1 = require("../../sentence/infrastructure/facadeBuilder");
const infrastructure_4 = require("../../expressions/infrastructure");
const infrastructure_ts_1 = require("../../execution/infrastructure.ts");
const infrastructure_5 = require("../../stage/infrastructure");
const infrastructure_6 = require("../../sentence/infrastructure");
const application_1 = require("../../execution/application");
const ormLibrary_1 = require("./ormLibrary");
/**
 * Facade through which you can access all the functionalities of the library.
 */
class Orm {
    constructor(_logger) {
        this._logger = _logger;
        this._logger = _logger || new lambdaorm_base_1.LoggerBuilder().build();
        this.helper = new infrastructure_1.OrmH3lp(h3lp_1.h3lp, this._logger);
        this.exp = new expressionsBuilder_1.OrmExpressionsBuilder(this.helper).build();
        new ormLibrary_1.OrmLibrary(this).load();
        this.language = new infrastructure_6.SentenceLanguageServiceBuilder(this.helper).build();
        this.connection = new infrastructure_2.ConnectionFacadeBuilder(this.helper).build();
        this.schema = new lambdaorm_base_1.SchemaFacadeBuilder(this.exp, this.helper).build();
        this.state = new lambdaorm_base_1.SchemaStateBuilder(this.exp, this.schema, this.helper).build();
        this.executor = new infrastructure_ts_1.ExecutorBuilder(this.connection, this.language, this.exp, this.helper).build(this.state);
        this.operand = new infrastructure_3.OperandFacadeBuilder(this.exp, this.helper).build(this.state);
        this.sentence = new facadeBuilder_1.SentenceFacadeBuilder(this.exp, this.helper).build(this.state, this.operand);
        this.expression = new infrastructure_4.ExpressionFacadeBuilder(this.language, this.executor, this.exp, this.helper).build(this.sentence, this.state);
        this.stage = new infrastructure_5.StageFacadeBuilder(this.language, this.executor, this.helper).build(this.state, this.expression);
    }
    get logger() {
        return this._logger;
    }
    set logger(value) {
        this._logger = value;
    }
    get defaultStage() {
        return this.state.stage.get();
    }
    /**
 * initialize the orm library
 * @param source optional parameter to specify the location of the configuration file. In the case that it is not passed, it is assumed that it is "lambdaORM.yaml" in the root of the project
 * @returns promise void
 */
    init(source_1) {
        return __awaiter(this, arguments, void 0, function* (source, connect = true) {
            var _a, _b, _c;
            const schema = yield this.state.load(source || process.cwd());
            // set connections
            if (connect && ((_a = schema.infrastructure) === null || _a === void 0 ? void 0 : _a.sources)) {
                for (const source of schema.infrastructure.sources.filter(p => this.helper.val.isNotEmpty(p.connection))) {
                    this.connection.load(source);
                }
            }
            // add enums
            if (schema.domain.enums) {
                for (const _enum of schema.domain.enums) {
                    const values = [];
                    if (_enum.values) {
                        for (const enumValue of _enum.values) {
                            values.push([enumValue.name, enumValue.value]);
                        }
                    }
                    this.exp.addEnum(_enum.name, values);
                }
            }
            // start
            if ((_b = schema.application) === null || _b === void 0 ? void 0 : _b.start) {
                for (const task of schema.application.start) {
                    if (task.condition === undefined || this.exp.eval(task.condition)) {
                        yield this.exp.evalAsync(task.expression);
                    }
                }
            }
            // add listeners
            if ((_c = schema.application) === null || _c === void 0 ? void 0 : _c.listeners) {
                for (const listener of schema.application.listeners) {
                    const observer = new application_1.ExecutionActionObserver(listener, this.exp);
                    this.subscribe(observer);
                }
            }
            return schema;
        });
    }
    /**
  * Frees the resources used, for example the connection pools
  */
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            // ends task
            const schema = this.state.schema;
            if ((_a = schema.application) === null || _a === void 0 ? void 0 : _a.end) {
                for (const task of schema.application.end) {
                    if (task.condition === undefined || this.exp.eval(task.condition)) {
                        yield this.exp.evalAsync(task.expression);
                    }
                }
            }
            yield this.connection.end();
        });
    }
    /**
     * Get dialect of source
     * @param source Name of source
     * @returns
     */
    dialect(source) {
        return this.state.source.get(source).dialect;
    }
    normalize(query) {
        const expression = this.toExpression(query);
        return this.operand.normalize(expression);
    }
    model(query) {
        const expression = this.toExpression(query);
        return this.sentence.model(expression);
    }
    parameters(query) {
        const expression = this.toExpression(query);
        return this.sentence.parameters(expression);
    }
    constraints(query) {
        const expression = this.toExpression(query);
        return this.sentence.constraints(expression);
    }
    metadata(query) {
        const expression = this.toExpression(query);
        return this.sentence.metadata(expression);
    }
    plan(query, options) {
        const expression = this.toExpression(query);
        const _options = options !== undefined && typeof options === 'string' ? JSON.parse(options) : options || {};
        return this.expression.plan(expression, _options);
    }
    execute(query_1) {
        return __awaiter(this, arguments, void 0, function* (query, data = {}, options) {
            if (query === undefined || query === null) {
                throw new Error('query is empty');
            }
            const expression = this.toExpression(query);
            if (expression === '') {
                throw new Error('query is empty');
            }
            const _data = data !== undefined && typeof data === 'string' ? JSON.parse(data) : data || {};
            const _options = options !== undefined && typeof options === 'string' ? JSON.parse(options) : options || {};
            return this.expression.execute(expression, _data, _options);
        });
    }
    /**
     * Create a transaction
     * @param options options of execution
     * @param callback Code to be executed in transaction
     */
    transaction(options, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.expression.transaction(options, callback);
        });
    }
    toExpression(query) {
        return typeof query !== 'string' ? this.exp.convert(query, 'function')[0] : query;
    }
    subscribe(observer) {
        this.executor.subscribe(observer);
    }
    unsubscribe(observer) {
        this.executor.unsubscribe(observer);
    }
}
exports.Orm = Orm;
exports.orm = new Orm();
//# sourceMappingURL=orm.js.map