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
exports.PostgreSQLConnectionAdapter = exports.PostgreSQLConnectionPoolAdapter = void 0;
const connectionPool_1 = require("./base/connectionPool");
const connection_1 = require("./base/connection");
const typ3s_1 = require("typ3s");
const lambdaorm_base_1 = require("lambdaorm-base");
// https://node-postgres.com/features/connecting
class PostgreSQLConnectionPoolAdapter extends connectionPool_1.ConnectionPoolAdapter {
    constructor(config, helper) {
        super(config, helper);
        if (!PostgreSQLConnectionPoolAdapter.lib) {
            const pg = require('pg');
            // Solve error number as string in queries
            // https://stackoverflow.com/questions/39168501/pg-promise-returns-integers-as-strings
            // https://www.npmjs.com/package/pg-types
            pg.types.setTypeParser(pg.types.builtins.INT2, (value) => {
                return parseInt(value);
            });
            pg.types.setTypeParser(pg.types.builtins.INT4, (value) => {
                return parseInt(value);
            });
            pg.types.setTypeParser(pg.types.builtins.INT8, (value) => {
                return parseInt(value);
            });
            pg.types.setTypeParser(pg.types.builtins.FLOAT4, (value) => {
                return parseFloat(value);
            });
            pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value) => {
                return parseFloat(value);
            });
            pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
                return parseFloat(value);
            });
            pg.types.setTypeParser(pg.types.builtins.MONEY, (value) => {
                return parseFloat(value);
            });
            PostgreSQLConnectionPoolAdapter.lib = pg;
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.helper.logger.log('PostgreSQL init pool not Implemented');
        });
    }
    create(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const cnx = new PostgreSQLConnectionPoolAdapter.lib.Client(this.config.connection);
            cnx.connect();
            return new PostgreSQLConnectionAdapter(id, cnx, this, this.helper);
        });
    }
}
exports.PostgreSQLConnectionPoolAdapter = PostgreSQLConnectionPoolAdapter;
class PostgreSQLConnectionAdapter extends connection_1.ConnectionAdapter {
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
            const result = yield this._execute(mapping, dialect, query, data);
            return result.rows;
        });
    }
    insert(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this._execute(mapping, dialect, query, data);
                return result.rows.length > 0 ? result.rows[0].id : null;
            }
            catch (error) {
                yield this.helper.logger.log(error, lambdaorm_base_1.LogLevel.ERROR);
                throw error;
            }
        });
    }
    bulkInsert(mapping, dialect, query, array) {
        return __awaiter(this, void 0, void 0, function* () {
            const fieldIds = mapping.getFieldIds(query.entity);
            const fieldId = fieldIds && fieldIds.length === 1 ? fieldIds[0] : null;
            const sql = query.sentence;
            let _query = '';
            try {
                const rows = this.arrayToRows(mapping, dialect, query, array);
                const returning = fieldId ? 'RETURNING ' + fieldId.mapping + ' AS "' + fieldId.name + '"' : '';
                _query = `${sql} ${rows.join(',')} ${returning};`;
                const result = yield this.cnx.query(_query);
                const ids = [];
                if (fieldId) {
                    for (const p in result.rows) {
                        const id = result.rows[p][fieldId.name];
                        ids.push(id);
                    }
                }
                return ids;
            }
            catch (error) {
                yield this.helper.logger.log(_query, lambdaorm_base_1.LogLevel.ERROR);
                throw error;
            }
        });
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
                    value = value ? 'true' : 'false';
                    break;
                case typ3s_1.Primitive.string:
                    if (value.includes('\'')) {
                        // value = helper.escape(value)
                        value = `'${this.helper.str.replace(value, '\'', '\'\'')}'`;
                    }
                    else {
                        // value = helper.escape(value)
                        value = `'${value}'`;
                    }
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
    update(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._execute(mapping, dialect, query, data);
            return result.rowCount;
        });
    }
    delete(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this._execute(mapping, dialect, query, data);
            return result.rowCount;
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
            yield this.cnx.query('BEGIN');
            this.inTransaction = true;
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cnx.query('COMMIT');
            this.inTransaction = false;
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cnx.query('ROLLBACK');
            this.inTransaction = false;
        });
    }
    _execute(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const values = [];
            let sql = query.sentence;
            const params = this.dataToParameters(mapping, dialect, query, data);
            for (let i = 0; i < params.length; i++) {
                const param = params[i];
                if (typ3s_1.Type.isList(param.type) || (param.type === typ3s_1.Primitive.any && Array.isArray(param.value))) {
                    // https://stackoverflow.com/questions/10720420/node-postgres-how-to-execute-where-col-in-dynamic-value-list-query
                    // https://www.it-swarm-es.com/es/node.js/node-postgres-como-ejecutar-la-consulta-where-col-lista-de-valores-dinamicos/1066948040/
                    // https://www.postgresql.org/docs/9.2/functions-array.html
                    // https://newbedev.com/node-postgres-how-to-execute-where-col-in-dynamic-value-list-query
                    if (param.value.length === 0) {
                        values.push([]);
                        continue;
                    }
                    if (param.value.length === 1) {
                        values.push(param.value[0]);
                        continue;
                    }
                    const type = typeof param.value[0];
                    switch (type) {
                        case typ3s_1.Primitive.string:
                            sql = this.helper.str.replace(sql, '($' + (i + 1) + ')', '(SELECT(UNNEST($' + (i + 1) + '::VARCHAR[])))');
                            values.push(param.value);
                            break;
                        case 'bigint':
                        case typ3s_1.Primitive.number:
                            sql = this.helper.str.replace(sql, '($' + (i + 1) + ')', '(SELECT(UNNEST($' + (i + 1) + '::INTEGER[])))');
                            values.push(param.value);
                            break;
                        default:
                            values.push(param.value);
                    }
                }
                else {
                    values.push(param.value);
                }
            }
            try {
                let result = null;
                if (values && values.length > 0) {
                    result = yield this.cnx.query(sql, values);
                }
                else {
                    result = yield this.cnx.query(sql);
                }
                return result;
            }
            catch (error) {
                yield this.helper.logger.log(error, lambdaorm_base_1.LogLevel.ERROR);
                throw error;
            }
        });
    }
}
exports.PostgreSQLConnectionAdapter = PostgreSQLConnectionAdapter;
//# sourceMappingURL=PostgreSQL.js.map