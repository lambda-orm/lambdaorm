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
exports.QueryInsertConditionalExecutor = void 0;
const queryInsertExecutor_1 = require("./queryInsertExecutor");
class QueryInsertConditionalExecutor extends queryInsertExecutor_1.QueryInsertExecutor {
    insertConditional(query, data, mapping, dialect, connection) {
        return __awaiter(this, void 0, void 0, function* () {
            // before insert the relationships of the type oneToOne and oneToMany
            const autoIncrement = mapping.getAutoIncrement(query.entity);
            const entity = mapping.getEntity(query.entity);
            yield this.includeBefore(query, data, dialect);
            // solve default properties
            if (entity.hadDefaults) {
                this.solveDefaults.solve(query, data.data);
            }
            // solve default properties
            if (entity.hadWriteValues) {
                this.solveWriteValues.solve(query, data.data);
            }
            // evaluate constraints
            this.constraints.eval(query, data.data);
            // insert main entity
            const insertId = yield connection.insertConditional(mapping, dialect, query, data);
            if (autoIncrement) {
                data.set(autoIncrement.name, insertId);
            }
            // after insert the relationships of the type oneToOne and manyToOne
            yield this.includeAfter(query, data, dialect);
            return insertId;
        });
    }
}
exports.QueryInsertConditionalExecutor = QueryInsertConditionalExecutor;
//# sourceMappingURL=queryInsertConditionalExecutor.js.map