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
exports.MySqlConnectionAdapter = exports.MySQLConnectionPoolAdapter = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-tabs */
const typ3s_1 = require("typ3s");
const connectionPool_1 = require("./base/connectionPool");
const connection_1 = require("./base/connection");
const DECIMAL = 0;
const TINY = 1;
const LONG = 3;
const FLOAT = 4;
const DOUBLE = 5;
const TIMESTAMP = 7;
const LONGLONG = 8;
const INT24 = 9;
const DATE = 10;
const TIME = 11;
const DATETIME = 12;
const NEWDATE = 14;
const BIT = 16;
const NEWDECIMAL = 246;
class MySQLConnectionPoolAdapter extends connectionPool_1.ConnectionPoolAdapter {
    constructor(config, helper) {
        super(config, helper);
        if (!MySQLConnectionPoolAdapter.lib) {
            MySQLConnectionPoolAdapter.lib = require('mysql2/promise');
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // https://github.com/sidorares/node-mysql2/issues/795
            // https://stackoverflow.com/questions/64774472/how-do-i-determine-the-column-type-name-from-the-columntype-integer-value-in-mys
            const casts = {
                typeCast: function (field, next) {
                    if (field.type === 'DECIMAL') {
                        const value = field.string();
                        return (value === null) ? null : Number(value);
                    }
                    return next();
                }
            };
            this.pool = MySQLConnectionPoolAdapter.lib.createPool(Object.assign(Object.assign({}, this.config.connection), casts));
        });
    }
    create(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pool === undefined) {
                yield this.init();
            }
            const cnx = yield this.pool.getConnection();
            return new MySqlConnectionAdapter(id, cnx, this, this.helper);
        });
    }
    end() {
        const _super = Object.create(null, {
            end: { get: () => super.end }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.end.call(this);
            if (this.pool !== undefined) {
                this.pool.end();
            }
        });
    }
}
exports.MySQLConnectionPoolAdapter = MySQLConnectionPoolAdapter;
class MySqlConnectionAdapter extends connection_1.ConnectionAdapter {
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cnx.release();
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
    select(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this._execute(mapping, dialect, query, data);
        });
    }
    insert(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._execute(mapping, dialect, query, data);
            return result.insertId;
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    bulkInsert(mapping, dialect, query, array) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fieldIds = mapping.getFieldIds(query.entity);
                const fieldId = fieldIds && fieldIds.length === 1 ? fieldIds[0] : null;
                if (!array || array.length === 0) {
                    return [];
                }
                // https://github.com/sidorares/node-mysql2/issues/830
                const rows = this.arrayToRows(mapping, dialect, query, array);
                const result = yield this.cnx.query(query.sentence, [rows]);
                if (fieldId === null || fieldId === void 0 ? void 0 : fieldId.autoIncrement) {
                    // https://github.com/sidorares/node-mysql2/issues/435
                    const start = result[0].insertId;
                    const end = result[0].insertId + (result[0].affectedRows - 1);
                    const lastInsertedIds = [];
                    for (let i = start; i <= end; i++)
                        lastInsertedIds.push(i);
                    return lastInsertedIds;
                }
                else {
                    const ids = [];
                    if (fieldId) {
                        for (const item of array) {
                            ids.push(item[fieldId.name]);
                        }
                    }
                    return ids;
                }
            }
            catch (error) {
                throw new Error(`sentence: ${query.sentence} error: ${error.message}`);
            }
        });
    }
    update(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._execute(mapping, dialect, query, data);
            return result.affectedRows;
        });
    }
    delete(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._execute(mapping, dialect, query, data);
            return result.affectedRows;
        });
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cnx.query(query.sentence);
        });
    }
    executeDDL(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cnx.query(query.sentence);
        });
    }
    executeSentence(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cnx.query(sentence);
        });
    }
    beginTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cnx.beginTransaction();
            this.inTransaction = true;
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cnx.commit();
            this.inTransaction = false;
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cnx.rollback();
            this.inTransaction = false;
        });
    }
    _execute(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // Solve array parameters , example IN(?) where ? is array[]
            // https://github.com/sidorares/node-mysql2/issues/476
            let useExecute = true;
            const values = [];
            // in the case of having an array with string elements, it is not possible to resolve the IN(,,,) with execute
            // for this reason query is being used in this case.
            // see how this case can be resolved to always use execute.
            const params = this.dataToParameters(mapping, dialect, query, data);
            for (const param of params) {
                if (typ3s_1.Type.isList(param.type) || (param.type === typ3s_1.Primitive.any && Array.isArray(param.value))) {
                    useExecute = false;
                    break;
                }
            }
            for (const param of params) {
                values.push(param.value);
            }
            const result = (useExecute)
                ? yield this.cnx.execute(query.sentence, values)
                : yield this.cnx.query(query.sentence, values);
            if (!Array.isArray(result[0])) {
                return result[0];
            }
            else {
                return this.resultToRows(result);
            }
        });
    }
    resultToRows(result) {
        const rows = result[0];
        const cols = result[1];
        for (const row of rows) {
            for (const col of cols) {
                const value = row[col.name];
                if (value !== null) {
                    switch (col.columnType) {
                        case TINY:
                            // Boolean
                            // https://www.javatpoint.com/mysql-boolean#:~:text=MySQL%20does%20not%20contain%20built,to%200%20and%201%20value.
                            row[col.name] = value === 1;
                            break;
                        case DECIMAL:
                        case LONG:
                        case FLOAT:
                        case DOUBLE:
                        case LONGLONG:
                        case INT24:
                        case NEWDECIMAL:
                            row[col.name] = Number(value);
                            break;
                        case TIME:
                            row[col.name] = value;
                            break;
                        case DATETIME:
                        case DATE:
                        case NEWDATE:
                        case TIMESTAMP:
                            row[col.name] = new Date(value);
                            break;
                        case BIT:
                            row[col.name] = Boolean(value);
                            break;
                    }
                }
            }
        }
        return rows;
    }
}
exports.MySqlConnectionAdapter = MySqlConnectionAdapter;
//# sourceMappingURL=MySQL.js.map