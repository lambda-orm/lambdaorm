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
exports.StageDelete = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
const actionDML_1 = require("./base/actionDML");
class StageDelete extends actionDML_1.StageActionDML {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const queries = this.build();
            yield this.executor.executeList(queries, this.options);
        });
    }
    sort(entities) {
        const onlyUnique = function (value, index, self) {
            return self.indexOf(value) === index;
        };
        const _entities = entities.map(p => p.name).filter(onlyUnique);
        const sortedEntities = this.domain.sortByRelations(_entities, _entities).reverse();
        const result = [];
        for (const sortedEntity of sortedEntities) {
            const entity = entities.find(p => p.name === sortedEntity);
            if (entity !== undefined) {
                result.push(entity);
            }
        }
        return result;
    }
    build() {
        const entities = this.sort(this.domain.entities);
        const queries = this.createUpdateQueries(entities);
        for (const entity of entities) {
            const query = this.createQuery(entity);
            queries.push(query);
        }
        return queries;
    }
    createUpdateQueries(entities) {
        var _a;
        const queries = [];
        for (const entity of entities) {
            if (entity.view) {
                continue;
            }
            if (entity.relations) {
                for (const relation of entity.relations) {
                    const fromProperty = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.name === relation.from);
                    if (fromProperty === undefined) {
                        throw new lambdaorm_base_1.SchemaError(`property ${relation.from} not found in ${entity.name} `);
                    }
                    if (!fromProperty.required) {
                        const query = this.expressionFacade.build(`${entity.name}.updateAll({${relation.from}:null})`, this.options);
                        queries.push(query);
                    }
                }
            }
        }
        return queries;
    }
    createQuery(entity) {
        return this.expressionFacade.build(`${entity.name}.deleteAll()`, this.options);
    }
}
exports.StageDelete = StageDelete;
//# sourceMappingURL=delete.js.map