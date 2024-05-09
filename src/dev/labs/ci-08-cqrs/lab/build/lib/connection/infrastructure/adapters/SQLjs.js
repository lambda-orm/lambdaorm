"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-tabs */
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
exports.SQLjsConnectionAdapter = exports.SQLjsConnectionPoolAdapter = void 0;
const connectionPool_1 = require("./base/connectionPool");
const connection_1 = require("./base/connection");
class SQLjsConnectionPoolAdapter extends connectionPool_1.ConnectionPoolAdapter {
    constructor(config, helper) {
        super(config, helper);
        if (!SQLjsConnectionPoolAdapter.lib) {
            SQLjsConnectionPoolAdapter.lib = require('sql.js');
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            const fileBuffer = yield this.helper.fs.read(me.config.connection);
            this.db = yield new Promise((resolve, reject) => {
                SQLjsConnectionPoolAdapter.lib.then(function (SQL) {
                    // Load the db
                    try {
                        const db = new SQL.Database(fileBuffer);
                        resolve(db);
                    }
                    catch (error) {
                        reject(error);
                    }
                });
            });
        });
    }
    create(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new SQLjsConnectionAdapter(id, null, this, this.helper);
        });
    }
    end() {
        const _super = Object.create(null, {
            end: { get: () => super.end }
        });
        return __awaiter(this, void 0, void 0, function* () {
            yield _super.end.call(this);
            const data = this.db.export();
            yield this.helper.fs.write(this.config.connection, data);
        });
    }
}
exports.SQLjsConnectionPoolAdapter = SQLjsConnectionPoolAdapter;
class SQLjsConnectionAdapter extends connection_1.ConnectionAdapter {
    end() {
        return __awaiter(this, void 0, void 0, function* () { });
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
            return result;
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    bulkInsert(mapping, dialect, query, array) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = query.sentence;
            try {
                if (!array || array.length === 0) {
                    return [];
                }
                // https://github.com/sidorares/node-mysql2/issues/830
                const rows = this.arrayToRows(mapping, dialect, query, array);
                const result = yield this.cnx.query(sql, [rows]);
                // https://github.com/sidorares/node-mysql2/issues/435
                const start = result[0].insertId;
                const end = result[0].insertId + (result[0].affectedRows - 1);
                const lastInsertedIds = [];
                for (let i = start; i <= end; i++)
                    lastInsertedIds.push(i);
                return lastInsertedIds;
            }
            catch (error) {
                throw new Error(`sentence: ${sql} error: ${error.message}`);
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
            return this.cnx._query(query);
        });
    }
    executeDDL(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cnx.db.run(query.sentence);
        });
    }
    executeSentence(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cnx.db.run(sentence);
        });
    }
    beginTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            this.inTransaction = true;
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            this.inTransaction = false;
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            this.inTransaction = false;
        });
    }
    _execute(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = query.sentence;
            const params = this.dataToParameters(mapping, dialect, query, data);
            const values = [];
            for (const param of params) {
                values.push(param.value);
            }
            return this.cnx.db.run(sql, values);
        });
    }
    _query(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = query.sentence;
            const params = this.dataToParameters(mapping, dialect, query, data);
            const values = [];
            for (const param of params) {
                values.push(param.value);
            }
            const result = this.cnx.db.run(sql, values);
            const rows = [];
            const cols = result.columns;
            for (const value of result.values) {
                const row = {};
                for (let j = 0; j < cols.length; j++) {
                    const col = cols[j];
                    row[col] = value[j];
                }
                rows.push(row);
            }
            return rows;
        });
    }
}
exports.SQLjsConnectionAdapter = SQLjsConnectionAdapter;
//# sourceMappingURL=SQLjs.js.map