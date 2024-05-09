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
exports.SqlServerConnectionAdapter = exports.SqlServerConnectionPoolAdapter = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-this-alias */
const connectionPool_1 = require("./base/connectionPool");
const connection_1 = require("./base/connection");
const typ3s_1 = require("typ3s");
const lambdaorm_base_1 = require("lambdaorm-base");
class SqlServerConnectionPoolAdapter extends connectionPool_1.ConnectionPoolAdapter {
    constructor(config, helper) {
        super(config, helper);
        if (!SqlServerConnectionPoolAdapter.lib) {
            SqlServerConnectionPoolAdapter.lib = require('tedious');
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.helper.logger.log('init');
        });
    }
    create(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cnx = yield new Promise((resolve, reject) => {
                    const connection = new SqlServerConnectionPoolAdapter.lib.Connection(this.config.connection);
                    connection.connect();
                    connection.on('connect', (err) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(connection);
                    });
                });
                return new SqlServerConnectionAdapter(id, cnx, this, this.helper);
            }
            catch (error) {
                yield this.helper.logger.log(error, lambdaorm_base_1.LogLevel.ERROR);
                throw error;
            }
        });
    }
}
exports.SqlServerConnectionPoolAdapter = SqlServerConnectionPoolAdapter;
class SqlServerConnectionAdapter extends connection_1.ConnectionAdapter {
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.cnx.closed) {
                return;
            }
            yield this.cnx.close();
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    insertConditional(mapping, dialect, query, data) {
        throw new Error('Method not implemented.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    upsert(mapping, dialect, query, data) {
        throw new Error('Method not implemented.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    merge(mapping, dialect, query, data) {
        throw new Error('Method not implemented.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    bulkMerge(mapping, dialect, query, array) {
        throw new Error('Method not implemented.');
    }
    constructor(id, cnx, pool, helper) {
        super(id, cnx, pool, helper);
        this.maxChunkSizeOnBulkInsert = 1000;
    }
    select(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._query(mapping, dialect, query, query.sentence, data);
        });
    }
    insert(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const autoIncrement = mapping.getAutoIncrement(query.entity);
            const fieldId = autoIncrement && autoIncrement.mapping ? autoIncrement.mapping : undefined;
            const sentence = fieldId
                ? query.sentence
                : query.sentence.replace('OUTPUT INSERTED.0', '');
            const result = yield this._query(mapping, dialect, query, sentence, data);
            if (fieldId && result.length === 1) {
                return result[0][fieldId];
            }
            else {
                return 0;
            }
        });
    }
    bulkInsert(mapping, dialect, query, array) {
        return __awaiter(this, void 0, void 0, function* () {
            // https://www.sqlservertutorial.net/sql-server-basics/sql-server-insert-multiple-rows/
            try {
                const autoIncrement = mapping.getAutoIncrement(query.entity);
                const fieldId = autoIncrement && autoIncrement.mapping ? autoIncrement.mapping : undefined;
                const sql = query.sentence;
                const rows = this.arrayToRows(mapping, dialect, query, array);
                if (fieldId) {
                    const sentence = `${sql} OUTPUT inserted.${fieldId} VALUES ${rows.join(',')};`;
                    const result = yield this._query(mapping, dialect, query, sentence, undefined);
                    const ids = [];
                    for (const p in result) {
                        const id = result[p][fieldId];
                        ids.push(id);
                    }
                    return ids;
                }
                else {
                    const sentence = `${sql} VALUES ${rows.join(',')};`;
                    yield this._executeSentence(sentence);
                    return [];
                }
            }
            catch (error) {
                throw new Error(`Error to execute bulkInsert \nerror: ${error} \nquery:\n${query}`);
            }
        });
    }
    update(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._execute(mapping, dialect, query, data);
        });
    }
    delete(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._execute(mapping, dialect, query, data);
        });
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._executeSentence(query.sentence);
        });
    }
    executeDDL(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._executeSentence(query.sentence);
        });
    }
    executeSentence(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._executeSentence(sentence);
        });
    }
    beginTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            yield new Promise((resolve, reject) => {
                me.cnx.beginTransaction((error) => {
                    if (error) {
                        reject(new Error(`SqlServer connection beginTransaction error: ${error}`));
                    }
                    me.inTransaction = true;
                    resolve();
                });
            });
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.cnx.inTransaction) {
                const me = this;
                yield new Promise((resolve, reject) => {
                    me.cnx.commitTransaction((error) => {
                        if (error) {
                            reject(new Error(`SqlServer connection commit error: ${error}`));
                        }
                        me.inTransaction = false;
                        resolve();
                    });
                });
            }
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.cnx.inTransaction) {
                const me = this;
                yield new Promise((resolve, reject) => {
                    me.cnx.rollbackTransaction((error) => {
                        if (error) {
                            reject(new Error(`SqlServer connection rollback error: ${error}`));
                        }
                        me.inTransaction = false;
                        resolve();
                    });
                });
            }
        });
    }
    _query(mapping, dialect, query, sentence, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            return new Promise((resolve, reject) => {
                try {
                    const rows = [];
                    // https://github.com/tediousjs/tedious/issues/130
                    const _sentence = data ? this.solveArrayParameters(query, data, sentence) : sentence;
                    const request = new SqlServerConnectionPoolAdapter.lib.Request(_sentence, (error) => {
                        if (error) {
                            reject(new Error(`SqlServer connection _query error: ${error}`));
                        }
                        resolve(rows);
                    });
                    request.on('row', (columns) => {
                        const row = {};
                        for (const p in columns) {
                            const column = columns[p];
                            row[column.metadata.colName] = column.value;
                        }
                        rows.push(row);
                    });
                    if (data) {
                        const params = this.dataToParameters(mapping, dialect, query, data);
                        if (params.length > 0) {
                            me.addParameters(query.sentence, request, data, params);
                        }
                    }
                    return me.cnx.execSql(request);
                }
                catch (error) {
                    reject(new Error(`SqlServer connection _query error: ${error}`));
                }
            });
        });
    }
    _execute(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            return new Promise((resolve, reject) => {
                const request = this.createNonQueryRequest(query.sentence, reject, resolve);
                const params = this.dataToParameters(mapping, dialect, query, data);
                if (params.length > 0) {
                    me.addParameters(query.sentence, request, data, params);
                }
                return me.cnx.execSql(request);
            });
        });
    }
    _executeSentence(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            const me = this;
            return new Promise((resolve, reject) => {
                const sqlRequest = this.createNonQueryRequest(sentence, reject, resolve);
                return me.cnx.execSql(sqlRequest);
            });
        });
    }
    createNonQueryRequest(sentence, reject, resolve) {
        return new SqlServerConnectionPoolAdapter.lib.Request(sentence, (err, rowCount) => {
            if (err) {
                reject(new Error(`SqlServer sentence: ${sentence} error: ${err}`));
            }
            resolve(rowCount);
        });
    }
    solveArrayParameters(query, data, sentence) {
        let _sentence = sentence;
        for (const parameter of query.parameters) {
            const value = data.get(parameter.name);
            const type = parameter.type;
            if (typ3s_1.Type.isList(type) || (type === typ3s_1.Primitive.any && Array.isArray(value))) {
                let list;
                if (value.length > 0) {
                    const type = typeof value[0];
                    if (type === typ3s_1.Primitive.string) {
                        const values = [];
                        for (const item of value) {
                            let _item = item;
                            _item = this.helper.query.escape(_item);
                            _item = this.helper.str.replace(_item, '\\\'', '\\\'\'');
                            values.push(_item);
                        }
                        list = values.join(',');
                    }
                    else {
                        list = value.join(',');
                    }
                }
                else {
                    list = '';
                }
                _sentence = this.helper.str.replace(_sentence, '@' + parameter.name, list);
            }
        }
        return _sentence;
    }
    addParameters(sentence, request, data, params = []) {
        for (const param of params) {
            if (request.parameters.find(p => p.name === param.name) !== undefined) {
                continue;
            }
            switch (param.type) {
                case typ3s_1.Primitive.string:
                    request.addParameter(param.name, SqlServerConnectionPoolAdapter.lib.TYPES.NVarChar, param.value);
                    break;
                case typ3s_1.Primitive.number:
                    request.addParameter(param.name, SqlServerConnectionPoolAdapter.lib.TYPES.Numeric, param.value);
                    break;
                case typ3s_1.Primitive.integer:
                    request.addParameter(param.name, SqlServerConnectionPoolAdapter.lib.TYPES.Int, param.value);
                    break;
                case typ3s_1.Primitive.decimal:
                    request.addParameter(param.name, SqlServerConnectionPoolAdapter.lib.TYPES.Decimal, param.value);
                    break;
                case typ3s_1.Primitive.boolean:
                    request.addParameter(param.name, SqlServerConnectionPoolAdapter.lib.TYPES.Bit, param.value);
                    break;
                case typ3s_1.Primitive.dateTime:
                    request.addParameter(param.name, SqlServerConnectionPoolAdapter.lib.TYPES.DateTime, param.value);
                    break;
                case typ3s_1.Primitive.date:
                    request.addParameter(param.name, SqlServerConnectionPoolAdapter.lib.TYPES.Date, param.value);
                    break;
                case typ3s_1.Primitive.time:
                    request.addParameter(param.name, SqlServerConnectionPoolAdapter.lib.TYPES.Time, param.value);
                    break;
                case typ3s_1.Primitive.any:
                    if (typ3s_1.Type.isList(param.type) || (param.type === typ3s_1.Primitive.any)) {
                        const value = data.get(param.name);
                        if (Array.isArray(value)) {
                            continue;
                        }
                    }
                    throw new Error(`Param: ${param.name} is any type in sentence: ${sentence}`);
            }
        }
    }
    arrayToRows(mapping, dialect, query, array) {
        const rows = [];
        for (const item of array) {
            const row = [];
            for (const parameter of query.parameters) {
                const value = this.getItemValue(mapping, dialect, item, parameter);
                row.push(value);
            }
            rows.push(`(${row.join(',')})`);
        }
        return rows;
    }
    getItemValue(mapping, dialect, item, parameter) {
        let value = item[parameter.name];
        if (value == null || value === undefined) {
            value = 'null';
        }
        else {
            switch (parameter.type) {
                case typ3s_1.Primitive.boolean:
                    value = value ? 1 : 0;
                    break;
                case typ3s_1.Primitive.string:
                    if (value.includes('\'')) {
                        value = `'${this.helper.str.replace(value, '\'', '\'\'')}'`;
                    }
                    else {
                        value = `'${value}'`;
                    }
                    // value = this.helper.escape(value)
                    // value = this.helper.str.replace(value, '\\\'', '\\\'\'')
                    break;
                case typ3s_1.Primitive.dateTime:
                    value = this.helper.query.escape(this.writeDateTime(value, mapping, dialect));
                    break;
                case typ3s_1.Primitive.date:
                    value = this.helper.query.escape(this.writeDate(value, mapping, dialect));
                    break;
                case typ3s_1.Primitive.time:
                    value = this.helper.query.escape(this.writeTime(value, mapping, dialect));
                    break;
            }
        }
        return value;
    }
}
exports.SqlServerConnectionAdapter = SqlServerConnectionAdapter;
//# sourceMappingURL=SqlServer.js.map