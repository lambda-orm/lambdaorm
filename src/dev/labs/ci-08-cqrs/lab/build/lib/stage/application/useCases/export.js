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
exports.StageExport = void 0;
const actionDML_1 = require("./base/actionDML");
class StageExport extends actionDML_1.StageActionDML {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const queries = this.queries();
            const data = {};
            const schemaExport = { entities: [] };
            yield this.executor.transaction(this.options, (tr) => __awaiter(this, void 0, void 0, function* () {
                for (const query of queries) {
                    const rows = yield tr.execute(query, data);
                    schemaExport.entities.push({ entity: query.entity, rows });
                }
            }));
            return schemaExport;
        });
    }
    createQuery(entity) {
        let expression = `${entity.name}.map(p=>{`;
        let first = true;
        for (const i in entity.properties) {
            const property = entity.properties[i];
            expression = expression + (first ? '' : ',') + `${property.name}:p.${property.name}`;
            first = false;
        }
        expression = expression + '})' + this.createInclude(entity);
        return this.expressionFacade.build(expression, this.options);
    }
}
exports.StageExport = StageExport;
//# sourceMappingURL=export.js.map