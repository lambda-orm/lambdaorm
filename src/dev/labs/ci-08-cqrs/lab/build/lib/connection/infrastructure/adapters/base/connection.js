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
exports.ConnectionAdapter = void 0;
const typ3s_1 = require("typ3s");
const lambdaorm_base_1 = require("lambdaorm-base");
class ConnectionAdapter {
    constructor(id, cnx, pool, helper) {
        this.id = id;
        this.cnx = cnx;
        this.pool = pool;
        this.helper = helper;
        this.inTransaction = false;
        this.maxChunkSizeOnSelect = 10000;
        this.maxChunkSizeIdsOnSelect = 7000;
        this.maxChunkSizeOnBulkInsert = 100000;
    }
    get config() {
        return this.pool.config;
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cnx.end();
        });
    }
    arrayToRows(mapping, dialect, query, array) {
        const rows = [];
        for (const item of array) {
            const row = [];
            for (const parameter of query.parameters) {
                let value = item[parameter.name];
                if (value) {
                    switch (parameter.type) {
                        case typ3s_1.Primitive.dateTime:
                            value = this.writeDateTime(value, mapping, dialect);
                            break;
                        case typ3s_1.Primitive.date:
                            value = this.writeDate(value, mapping, dialect);
                            break;
                        case typ3s_1.Primitive.time:
                            value = this.writeTime(value, mapping, dialect);
                            break;
                        case typ3s_1.Primitive.any:
                            if (this.helper.val.isDateTime(value) || this.helper.val.isDateTimeFormat(value)) {
                                value = this.writeDateTime(value, mapping, dialect);
                                break;
                            }
                            else if (this.helper.val.isDate(value) || this.helper.val.isDateFormat(value)) {
                                value = this.writeDate(value, mapping, dialect);
                                break;
                            }
                            else if (this.helper.val.isTime(value) || this.helper.val.isTimeFormat(value)) {
                                value = this.writeTime(value, mapping, dialect);
                                break;
                            }
                    }
                }
                row.push(value === undefined ? null : value);
            }
            rows.push(row);
        }
        return rows;
    }
    dataToParameters(mapping, dialect, query, data) {
        const parameters = [];
        for (const parameter of query.parameters) {
            let value = data.get(parameter.name);
            if (value) {
                switch (parameter.type) {
                    case typ3s_1.Primitive.dateTime:
                        value = this.writeDateTime(value, mapping, dialect);
                        break;
                    case typ3s_1.Primitive.date:
                        value = this.writeDate(value, mapping, dialect);
                        break;
                    case typ3s_1.Primitive.time:
                        value = this.writeTime(value, mapping, dialect);
                        break;
                    case typ3s_1.Primitive.any:
                        if (this.helper.val.isDateTime(value) || this.helper.val.isDateTimeFormat(value)) {
                            value = this.writeDateTime(value, mapping, dialect);
                            break;
                        }
                        else if (this.helper.val.isDate(value) || this.helper.val.isDateFormat(value)) {
                            value = this.writeDate(value, mapping, dialect);
                            break;
                        }
                        else if (this.helper.val.isTime(value) || this.helper.val.isTimeFormat(value)) {
                            value = this.writeTime(value, mapping, dialect);
                            break;
                        }
                }
            }
            else {
                value = null;
            }
            parameters.push({ name: this.helper.query.transformParameter(parameter.name), type: parameter.type, value });
        }
        return parameters;
    }
    writeDateTime(value, mapping, dialect) {
        var _a;
        const format = ((_a = mapping.format) === null || _a === void 0 ? void 0 : _a.dateTime) || dialect.format.dateTime;
        return format ? this.helper.query.dateFormat(value, format) : value;
    }
    writeDate(value, mapping, dialect) {
        var _a;
        const format = ((_a = mapping.format) === null || _a === void 0 ? void 0 : _a.date) || dialect.format.date;
        return format ? this.helper.query.dateFormat(value, format) : value;
    }
    writeTime(value, mapping, dialect) {
        var _a;
        const format = ((_a = mapping.format) === null || _a === void 0 ? void 0 : _a.time) || dialect.format.time;
        return format ? this.helper.query.dateFormat(value, format) : value;
    }
    bulkDelete(_mapping, _dialect, _query, _array) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new lambdaorm_base_1.MethodNotImplemented('Connection', 'deleteMany');
        });
    }
    bulkUpdate(_mapping, _dialect, _query, _array) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new lambdaorm_base_1.MethodNotImplemented('Connection', 'updateMany');
        });
    }
    truncateEntity(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    createEntity(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    createSequence(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    createFk(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    createIndex(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    alterProperty(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    addProperty(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    addPk(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    addUk(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    addFk(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    dropSequence(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    dropEntity(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    dropProperty(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    dropPk(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    dropUk(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    dropFk(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    dropIndex(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.executeDDL(query);
        });
    }
    objects(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.select(mapping, dialect, query, data);
        });
    }
    tables(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.select(mapping, dialect, query, data);
        });
    }
    views(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.select(mapping, dialect, query, data);
        });
    }
    partitions(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.select(mapping, dialect, query, data);
        });
    }
    sequences(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.select(mapping, dialect, query, data);
        });
    }
    foreignKeys(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.select(mapping, dialect, query, data);
        });
    }
    primaryKeys(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.select(mapping, dialect, query, data);
        });
    }
    uniqueKeys(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.select(mapping, dialect, query, data);
        });
    }
    indexes(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.select(mapping, dialect, query, data);
        });
    }
}
exports.ConnectionAdapter = ConnectionAdapter;
//# sourceMappingURL=connection.js.map