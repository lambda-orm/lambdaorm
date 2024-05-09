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
exports.QueryBulkMergeExecutor = void 0;
const queryBulkInsertExecutor_1 = require("./queryBulkInsertExecutor");
class QueryBulkMergeExecutor extends queryBulkInsertExecutor_1.QueryBulkInsertExecutor {
    bulkMerge(query, data, mapping, dialect, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = mapping.getEntity(query.entity);
            // before insert the relationships of the type oneToMany and oneToOne with relation required
            yield this.bulkIncludesBefore(query, data, entity, dialect);
            // insert data
            const chunkSize = this.options.chunkSize ? Math.min(connection.maxChunkSizeOnBulkInsert, this.options.chunkSize) : connection.maxChunkSizeOnBulkInsert;
            let ids = [];
            for (let i = 0; i < data.data.length; i += chunkSize) {
                const chunk = data.data.slice(i, i + chunkSize);
                const result = yield this._chunk(query, entity, chunk, mapping, dialect, connection);
                ids = ids.concat(result);
            }
            const autoIncrement = mapping.getAutoIncrement(query.entity);
            if (autoIncrement) {
                for (let i = 0; i < data.data.length; i++) {
                    data.data[i][autoIncrement.name] = ids[i];
                }
            }
            // after insert the relationships of the type manyToOne and oneToOne with relation not required
            yield this.bulkIncludesAfter(query, data, mapping, dialect);
            return ids;
        });
    }
    _chunk(query, entity, chunk, mapping, dialect, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            // solve default properties
            if (entity.hadDefaults) {
                this.solveDefaults.solve(query, chunk);
            }
            // solve write properties
            if (entity.hadWriteValues) {
                this.solveWriteValues.solve(query, chunk);
            }
            // evaluate constraints
            this.constraints.eval(query, chunk);
            return connection.bulkMerge(mapping, dialect, query, chunk);
        });
    }
}
exports.QueryBulkMergeExecutor = QueryBulkMergeExecutor;
//# sourceMappingURL=queryBulkMergeExecutor.js.map