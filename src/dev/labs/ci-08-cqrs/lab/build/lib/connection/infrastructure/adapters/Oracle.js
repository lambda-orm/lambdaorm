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
exports.OracleConnectionAdapter = exports.OracleConnectionPoolAdapter = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const connectionPool_1 = require("./base/connectionPool");
const connection_1 = require("./base/connection");
const lambdaorm_base_1 = require("lambdaorm-base");
const typ3s_1 = require("typ3s");
const domain_1 = require("../../domain");
class OracleConnectionPoolAdapter extends connectionPool_1.ConnectionPoolAdapter {
    constructor() {
        super(...arguments);
        this.pool = undefined;
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!OracleConnectionPoolAdapter.lib) {
                OracleConnectionPoolAdapter.lib = require('oracledb');
                // https://github.com/oracle/node-oracledb/blob/main/examples/connectionpool.js
                let libPath = process.env.ORACLE_LIB_PATH;
                if (!libPath) {
                    if (process.platform === 'win32') { // Windows
                        libPath = 'C:\\oracle\\instantclient_21_3';
                    }
                    else if (process.platform === 'darwin') { // macOS
                        libPath = process.env.HOME + '/Downloads/instantclient_21_3';
                    }
                    if (libPath && (yield this.helper.fs.exists(libPath))) {
                        yield OracleConnectionPoolAdapter.lib.initOracleClient({ libDir: libPath });
                    }
                }
            }
        });
    }
    create(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.pool) {
                if (!OracleConnectionPoolAdapter.lib) {
                    yield this.init();
                }
                this.pool = yield OracleConnectionPoolAdapter.lib.createPool(this.config.connection);
            }
            const cnx = yield this.pool.getConnection();
            return new OracleConnectionAdapter(OracleConnectionPoolAdapter.lib, id, cnx, this, this.helper);
        });
    }
}
exports.OracleConnectionPoolAdapter = OracleConnectionPoolAdapter;
class OracleConnectionAdapter extends connection_1.ConnectionAdapter {
    end() {
        return __awaiter(this, void 0, void 0, function* () {
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
    constructor(lib, id, cnx, pool, helper) {
        super(id, cnx, pool, helper);
        this.lib = lib;
        this.maxChunkSizeIdsOnSelect = 999;
    }
    select(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const qryInfo = this.getQueryPlan(mapping, dialect, query, data);
            const result = yield this.cnx.execute(qryInfo.sql, qryInfo.values, { autoCommit: !this.inTransaction });
            const list = [];
            for (const i in result.rows) {
                const row = result.rows[i];
                const item = {};
                for (const j in result.metaData) {
                    const col = result.metaData[j];
                    const colInfo = query.columns.find(p => p.name === col.name);
                    if (colInfo && colInfo.type === typ3s_1.Primitive.boolean) {
                        item[col.name] = row[j] === 'Y';
                    }
                    else {
                        item[col.name] = row[j];
                    }
                }
                list.push(item);
            }
            return list;
        });
    }
    insert(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql;
            const qryInfo = this.getQueryPlan(mapping, dialect, query, data);
            const autoIncrementInfo = this.getAutoIncrementInfo(mapping, query);
            if (autoIncrementInfo) {
                qryInfo.values[autoIncrementInfo.key] = autoIncrementInfo.bindDef;
                sql = `${query.sentence} ${autoIncrementInfo.returning}`;
            }
            else {
                sql = query.sentence;
            }
            const result = yield this.cnx.execute(sql, qryInfo.values, { autoCommit: !this.inTransaction });
            if (autoIncrementInfo) {
                return result.outBinds[autoIncrementInfo.key][0];
            }
            return null;
            // https://oracle.github.io/node-oracledb/doc/api.html#dmlreturn
        });
    }
    bulkInsert(mapping, dialect, query, array) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = '';
            const autoIncrementInfo = this.getAutoIncrementInfo(mapping, query);
            const bindDefs = {};
            for (const param of query.parameters) {
                const property = mapping.getProperty(query.entity, param.name);
                bindDefs[param.name] = this.getOracleType(param.type ? typ3s_1.Primitive[param.type] : typ3s_1.Primitive.any, property);
            }
            if (autoIncrementInfo) {
                bindDefs[autoIncrementInfo.key] = autoIncrementInfo.bindDef;
            }
            const options = {
                autoCommit: !this.inTransaction,
                batchErrors: true,
                bindDefs
            };
            const binds = this.arrayToRows(mapping, dialect, query, array);
            sql = autoIncrementInfo ? `${query.sentence} ${autoIncrementInfo.returning}` : query.sentence;
            const result = yield this.cnx.executeMany(sql, binds, options);
            if (result.rowsAffected !== binds.length) {
                throw new domain_1.ExecutionError(query.source, query.entity, query.sentence, `${binds.length - result.rowsAffected} records not imported!`, binds);
            }
            if (autoIncrementInfo) {
                const ids = [];
                for (const i in result.outBinds) {
                    ids.push(result.outBinds[i][autoIncrementInfo.key][0]);
                }
                return ids;
            }
            else {
                return [];
            }
            // Info
            // https://stackoverflow.com/questions/46964852/node-oracledb-bulk-insert-using-associative-array
            // https://blogs.oracle.com/opal/post/node-oracledb-22-with-batch-statement-execution-and-more-is-out-on-npm
            // [binDef by name](https://stackoverflow.com/questions/61009450/node-js-oracledb-4-2-executemany-error-njs-011-encountered-bind-value-an)
            // [binDef by name](https://github.com/oracle/node-oracledb/issues/1232)
            // [use sequence](https://stackoverflow.com/questions/57201595/how-to-use-column-nextval-with-oracledb)
            // [returning](https://cx-oracle.readthedocs.io/en/latest/user_guide/batch_statement.html)
        });
    }
    update(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const qryInfo = this.getQueryPlan(mapping, dialect, query, data);
            const result = yield this.cnx.execute(qryInfo.sql, qryInfo.values, { autoCommit: !this.inTransaction });
            return result.rowsAffected;
        });
    }
    delete(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const qryInfo = this.getQueryPlan(mapping, dialect, query, data);
            const result = yield this.cnx.execute(qryInfo.sql, qryInfo.values, { autoCommit: !this.inTransaction });
            return result.rowsAffected;
        });
    }
    execute(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = query.sentence;
            const options = this.inTransaction ? { autoCommit: false } : { autoCommit: true };
            return this.cnx.execute(sql, {}, options);
        });
    }
    executeDDL(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cnx.execute(query.sentence);
        });
    }
    executeSentence(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cnx.execute(sentence);
        });
    }
    beginTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
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
    arrayToRows(_mapping, _dialect, query, array) {
        const rows = [];
        for (const item of array) {
            const row = {};
            for (const parameter of query.parameters) {
                const value = item[parameter.name];
                row[parameter.name] = this.getItemValue(parameter.type ? typ3s_1.Primitive[parameter.type] : typ3s_1.Primitive.any, value);
            }
            rows.push(row);
        }
        return rows;
    }
    getQueryPlan(mapping, dialect, query, data) {
        const values = {};
        let sql = query.sentence;
        const params = this.dataToParameters(mapping, dialect, query, data);
        for (const param of params) {
            if (!typ3s_1.Type.isList(param.type) && !(param.type === typ3s_1.Primitive.any && Array.isArray(param.value))) {
                if (param.type === typ3s_1.Primitive.dateTime || param.type === typ3s_1.Primitive.date || param.type === typ3s_1.Primitive.time) {
                    values[param.name] = new Date(param.value);
                }
                else {
                    values[param.name] = param.value;
                }
                continue;
            }
            // if array
            if (param.value.length > 0) {
                const type = typeof param.value[0];
                if (type === typ3s_1.Primitive.string) {
                    const list = [];
                    for (const _item of param.value) {
                        let item = _item;
                        item = this.helper.query.escape(item);
                        item = this.helper.str.replace(item, '\\\'', '\\\'\'');
                        list.push(item);
                    }
                    sql = this.helper.str.replace(sql, `:${param.name}`, list.join(','));
                }
                else {
                    sql = this.helper.str.replace(sql, `:${param.name}`, param.value.join(','));
                }
            }
            else {
                // if empty array
                sql = this.helper.str.replace(sql, `:${param.name}`, '');
            }
        }
        return { sql, values };
    }
    getAutoIncrementInfo(mapping, query) {
        const fieldIds = mapping.getFieldIds(query.entity);
        const fieldId = fieldIds && fieldIds.length === 1 ? fieldIds[0] : null;
        if (!fieldId) {
            return undefined;
        }
        const key = 'lbdOrm_' + fieldId.name;
        // oracledb.BIND_OUT 3003
        let bindDef;
        const oracleType = this.oracleType(typ3s_1.Primitive[fieldId.type || 'string']);
        if (fieldId.type === typ3s_1.Primitive.string) {
            const property = mapping.getProperty(query.entity, fieldId.name);
            bindDef = { dir: 3003, type: oracleType, maxSize: property.length };
        }
        else {
            bindDef = { dir: 3003, type: oracleType };
        }
        const returning = `RETURNING ${fieldId.mapping} INTO :${key} `;
        return { key, bindDef, returning };
    }
    oracleType(type) {
        switch (type) {
            case typ3s_1.Primitive.boolean:
                return this.lib.DB_TYPE_CHAR;
            case typ3s_1.Primitive.string:
                return this.lib.STRING;
            case typ3s_1.Primitive.integer:
            case typ3s_1.Primitive.decimal:
                return this.lib.NUMBER;
            case typ3s_1.Primitive.dateTime:
            case typ3s_1.Primitive.date:
            case typ3s_1.Primitive.time:
                return this.lib.DATE;
            default:
                throw new lambdaorm_base_1.SchemaError(`type ${type} not implemented`);
        }
    }
    getOracleType(type, property) {
        const oracleType = this.oracleType(type);
        switch (type) {
            case typ3s_1.Primitive.boolean:
                return { type: oracleType, maxSize: 1 };
            case typ3s_1.Primitive.string:
                return { type: oracleType, maxSize: property.length };
            case typ3s_1.Primitive.number:
            case typ3s_1.Primitive.integer:
            case typ3s_1.Primitive.decimal:
                return { type: oracleType };
            case typ3s_1.Primitive.dateTime:
            case typ3s_1.Primitive.date:
            case typ3s_1.Primitive.time:
                return { type: oracleType };
        }
    }
    getItemValue(type, value) {
        switch (type) {
            case typ3s_1.Primitive.boolean:
                return value ? 'Y' : 'N';
            case typ3s_1.Primitive.string:
                return typeof value === 'string' || value === null || value === undefined ? value : value.toString();
            case typ3s_1.Primitive.dateTime:
            case typ3s_1.Primitive.date:
            case typ3s_1.Primitive.time:
                return value ? new Date(value) : null;
            default:
                return value;
        }
    }
}
exports.OracleConnectionAdapter = OracleConnectionAdapter;
//# sourceMappingURL=Oracle.js.map