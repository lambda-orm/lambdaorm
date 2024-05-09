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
exports.StageFacade = void 0;
const stateService_1 = require("./services/stateService");
const drop_1 = require("./useCases/drop");
const delete_1 = require("./useCases/delete");
const export_1 = require("./useCases/export");
const import_1 = require("./useCases/import");
const truncate_1 = require("./useCases/truncate");
const push_1 = require("./useCases/push");
const pull_1 = require("./useCases/pull");
const fetch_1 = require("./useCases/fetch");
class StageFacade {
    constructor(schemaState, expression, executor, languages, helper) {
        this.schemaState = schemaState;
        this.expression = expression;
        this.executor = executor;
        this.languages = languages;
        this.helper = helper;
        this.stageMappingService = new stateService_1.StageMappingService(schemaState, this.helper);
        this.stageModelService = new stateService_1.StageModelService(schemaState, this.helper);
    }
    /**
     * Check if the stage exists
     * @param name string
     * @returns {Promise<boolean>}
     */
    exists(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = this.stageModelService.getFile(name);
            return this.helper.fs.exists(file);
        });
    }
    /**
     * Push the stage with sources
     * @param options QueryOptions
     * @returns {StageActionDDL}
     */
    push(options) {
        const _options = this.expression.solveQueryOptions(options);
        return new push_1.StagePush(this.executor, this.stageModelService, this.schemaState, this.languages, _options, this.helper);
    }
    /**
     * Drop source entities related to the stage
     * @param options QueryOptions
     * @returns {StageActionDDL}
     */
    drop(options) {
        const _options = this.expression.solveQueryOptions(options);
        return new drop_1.StageDrop(this.executor, this.stageModelService, this.stageMappingService, this.schemaState, this.languages, _options, this.helper);
    }
    /**
     * Truncate source entities related to the stage
     * @param options QueryOptions
     * @returns {StageActionDDL}
     */
    truncate(options) {
        const _options = this.expression.solveQueryOptions(options);
        return new truncate_1.StageTruncate(this.executor, this.stageModelService, this.schemaState, this.languages, _options, this.helper);
    }
    /**
     * Delete source entities related to the stage
     * @param options QueryOptions
     * @returns {StageActionDDL}
     */
    delete(options) {
        const _options = this.expression.solveQueryOptions(options);
        return new delete_1.StageDelete(this.stageMappingService, this.schemaState.domain, this.expression, this.executor, _options);
    }
    /**
     * Export source entities related to the stage
     * @param options QueryOptions
     * @returns {StageActionDDL}
     */
    export(options) {
        const _options = this.expression.solveQueryOptions(options);
        return new export_1.StageExport(this.stageMappingService, this.schemaState.domain, this.expression, this.executor, _options);
    }
    /**
     * Import data into source entities related to the stage
     * @param options QueryOptions
     * @returns {StageActionDDL}
     */
    import(options) {
        const _options = this.expression.solveQueryOptions(options);
        return new import_1.StageImport(this.stageMappingService, this.schemaState.domain, this.expression, this.executor, _options);
    }
    /**
     * Fetch all mappings from the stage
     * @param options QueryOptions
     * @returns {Promise<Mapping[]>}
     */
    fetch(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const _options = this.expression.solveQueryOptions(options);
            return yield new fetch_1.StageFetch(this.executor, this.schemaState, this.languages, this.helper.schema, _options).execute();
        });
    }
    /**
     * Pull the stage with the sources
     * @param options StagePullOptions
     * @returns {Promise<void>}
     */
    pull() {
        return __awaiter(this, arguments, void 0, function* (options = { removeEntities: true, removeProperties: true, removeRelations: true }) {
            const _options = this.expression.solveQueryOptions(options);
            const mappings = yield this.fetch(_options);
            yield this.schemaState.match(mappings, _options);
            yield new pull_1.StagePull(this.executor, this.stageModelService, this.schemaState, this.languages, _options, this.helper).execute();
        });
    }
    /**
     * Update and Push Schema with data
     * @param data any|any[]
     * @param name string
     * @param options QueryOptions
     * @returns {Promise<SchemaData>}
     */
    introspect(data, name, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const schemaData = yield this.schemaState.introspect(data, name);
            yield this.push(options).execute();
            return schemaData;
        });
    }
    /**
     * Update and Push Schema and import data
     * @param data any|any[]
     * @param name string
     * @param options QueryOptions
     * @returns {Promise<SchemaData>}
     */
    incorporate(data, name, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const schemaData = yield this.introspect(data, name, options);
            yield this.import(options).execute(schemaData);
            return schemaData;
        });
    }
}
exports.StageFacade = StageFacade;
//# sourceMappingURL=facade.js.map