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
exports.QueryExecutorImpl = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
const domain_1 = require("../../../../connection/domain");
const queryBulkInsertExecutor_1 = require("./queryBulkInsertExecutor");
const queryDeleteExecutor_1 = require("./queryDeleteExecutor");
const queryInsertExecutor_1 = require("./queryInsertExecutor");
const querySelectExecutor_1 = require("./querySelectExecutor");
const queryUpdateExecutor_1 = require("./queryUpdateExecutor");
const queryBulkMergeExecutor_1 = require("./queryBulkMergeExecutor");
const queryUpsertExecutor_1 = require("./queryUpsertExecutor");
const queryInsertConditionalExecutor_1 = require("./queryInsertConditionalExecutor");
const queryBulkDeleteExecutor_1 = require("./queryBulkDeleteExecutor");
class QueryExecutorImpl {
    constructor(connectionFacade, languages, schemaState, expressions, _options, helper, transactional = false) {
        this.connectionFacade = connectionFacade;
        this.languages = languages;
        this.schemaState = schemaState;
        this.expressions = expressions;
        this._options = _options;
        this.helper = helper;
        this.transactional = transactional;
        this.connections = {};
        this.selectExecutor = new querySelectExecutor_1.QuerySelectExecutor(this, this.expressions, this.options, this.helper);
        this.insertExecutor = new queryInsertExecutor_1.QueryInsertExecutor(this, this.expressions, this.options);
        this.insertConditionalExecutor = new queryInsertConditionalExecutor_1.QueryInsertConditionalExecutor(this, this.expressions, this.options);
        this.bulkInsertExecutor = new queryBulkInsertExecutor_1.QueryBulkInsertExecutor(this, this.expressions, this.options);
        this.bulkMergeExecutor = new queryBulkMergeExecutor_1.QueryBulkMergeExecutor(this, this.expressions, this.options);
        this.bulkDeleteExecutor = new queryBulkDeleteExecutor_1.QueryBulkDeleteExecutor(this, this.options);
        this.updateExecutor = new queryUpdateExecutor_1.QueryUpdateExecutor(this, this.expressions, this.options);
        this.upsertExecutor = new queryUpsertExecutor_1.QueryUpsertExecutor(this, this.expressions, this.options);
        this.deleteExecutor = new queryDeleteExecutor_1.QueryDeleteExecutor(this, this.options);
    }
    get options() {
        return this._options;
    }
    getConnection(source) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection = this.connections[source];
            if (connection === undefined) {
                connection = yield this.connectionFacade.acquire(source);
                if (this.transactional) {
                    yield connection.beginTransaction();
                }
                this.connections[source] = connection;
            }
            return connection;
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const p in this.connections) {
                const connection = this.connections[p];
                yield connection.commit();
            }
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const p in this.connections) {
                const connection = this.connections[p];
                yield connection.rollback();
            }
        });
    }
    release() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const p in this.connections) {
                const connection = this.connections[p];
                yield this.connectionFacade.release(connection);
            }
            this.connections = {};
        });
    }
    execute(query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const _data = new lambdaorm_base_1.Data(data);
            if ([lambdaorm_base_1.SentenceAction.insert, lambdaorm_base_1.SentenceAction.update, lambdaorm_base_1.SentenceAction.bulkInsert].includes(query.action)) {
                yield this._execute(query, _data);
                return _data;
            }
            else {
                const result = yield this._execute(query, _data);
                this.clearTemporalFields(query, result);
                return result;
            }
        });
    }
    clearTemporalFields(query, result) {
        for (const include of query.includes) {
            const keyId = '__' + include.relation.from;
            for (const element of result) {
                const item = element[include.name];
                delete element[keyId];
                if (include.relation.type === lambdaorm_base_1.RelationType.manyToOne) {
                    for (const child of item) {
                        delete child.LambdaOrmParentId;
                    }
                    this.clearTemporalFields(include.query, item);
                }
                else if (item) {
                    delete item.LambdaOrmParentId;
                    this.clearTemporalFields(include.query, [item]);
                }
            }
        }
    }
    _execute(query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            const source = this.schemaState.source.get(query.source);
            const mapping = this.schemaState.mapping.getInstance(source.mapping);
            const connection = yield this.getConnection(source.name);
            const dialect = this.languages.getDialect(query.dialect);
            try {
                switch (query.action) {
                    case lambdaorm_base_1.SentenceAction.select:
                        result = yield this.selectExecutor.select(query, data, mapping, dialect, connection);
                        break;
                    case lambdaorm_base_1.SentenceAction.insert:
                        result = yield this.insertExecutor.insert(query, data, mapping, dialect, connection);
                        break;
                    case lambdaorm_base_1.SentenceAction.insertConditional:
                        result = yield this.insertConditionalExecutor.insertConditional(query, data, mapping, dialect, connection);
                        break;
                    case lambdaorm_base_1.SentenceAction.bulkInsert:
                        result = yield this.bulkInsertExecutor.bulkInsert(query, data, mapping, dialect, connection);
                        break;
                    case lambdaorm_base_1.SentenceAction.bulkMerge:
                        result = yield this.bulkMergeExecutor.bulkMerge(query, data, mapping, dialect, connection);
                        break;
                    case lambdaorm_base_1.SentenceAction.bulkDelete:
                        result = yield this.bulkDeleteExecutor.bulkDelete(query, data, mapping, dialect, connection);
                        break;
                    case lambdaorm_base_1.SentenceAction.update:
                        result = yield this.updateExecutor.update(query, data, mapping, dialect, connection);
                        break;
                    case lambdaorm_base_1.SentenceAction.upsert:
                        result = yield this.upsertExecutor.upsert(query, data, mapping, dialect, connection);
                        break;
                    case lambdaorm_base_1.SentenceAction.delete:
                        result = yield this.deleteExecutor.delete(query, data, mapping, dialect, connection);
                        break;
                    case lambdaorm_base_1.SentenceAction.truncateEntity:
                        result = yield connection.truncateEntity(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.createEntity:
                        result = yield connection.createEntity(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.createSequence:
                        result = yield connection.createSequence(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.createFk:
                        result = yield connection.createFk(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.createIndex:
                        result = yield connection.createIndex(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.alterProperty:
                        result = yield connection.alterProperty(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.addProperty:
                        result = yield connection.addProperty(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.addPk:
                        result = yield connection.addPk(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.addUk:
                        result = yield connection.addUk(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.addFk:
                        result = yield connection.addFk(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.dropSequence:
                        result = yield connection.dropSequence(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.dropEntity:
                        result = yield connection.dropEntity(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.dropProperty:
                        result = yield connection.dropProperty(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.dropPk:
                        result = yield connection.dropPk(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.dropUk:
                        result = yield connection.dropUk(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.dropFk:
                        result = yield connection.dropFk(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.dropIndex:
                        result = yield connection.dropIndex(mapping, query);
                        break;
                    case lambdaorm_base_1.SentenceAction.objects:
                        result = yield connection.objects(mapping, dialect, query, data);
                        break;
                    case lambdaorm_base_1.SentenceAction.tables:
                        result = yield connection.tables(mapping, dialect, query, data);
                        break;
                    case lambdaorm_base_1.SentenceAction.views:
                        result = yield connection.views(mapping, dialect, query, data);
                        break;
                    case lambdaorm_base_1.SentenceAction.foreignKeys:
                        result = yield connection.foreignKeys(mapping, dialect, query, data);
                        break;
                    case lambdaorm_base_1.SentenceAction.primaryKeys:
                        result = yield connection.primaryKeys(mapping, dialect, query, data);
                        break;
                    case lambdaorm_base_1.SentenceAction.uniqueKeys:
                        result = yield connection.uniqueKeys(mapping, dialect, query, data);
                        break;
                    case lambdaorm_base_1.SentenceAction.indexes:
                        result = yield connection.indexes(mapping, dialect, query, data);
                        break;
                    case lambdaorm_base_1.SentenceAction.partitions:
                        result = yield connection.partitions(mapping, dialect, query, data);
                        break;
                    case lambdaorm_base_1.SentenceAction.sequences:
                        result = yield connection.sequences(mapping, dialect, query, data);
                        break;
                    default:
                        throw new Error(`query action ${query.action} undefined`);
                }
                return result;
            }
            catch (error) {
                throw new domain_1.ExecutionError(query.source, query.entity, JSON.stringify(query.sentence), error.message, data);
            }
        });
    }
}
exports.QueryExecutorImpl = QueryExecutorImpl;
//# sourceMappingURL=queryExecutor.js.map