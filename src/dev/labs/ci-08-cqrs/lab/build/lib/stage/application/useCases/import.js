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
exports.StageImport = void 0;
const actionDML_1 = require("./base/actionDML");
const lambdaorm_base_1 = require("lambdaorm-base");
class StageImport extends actionDML_1.StageActionDML {
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const state = yield this.stageMappingService.get(this.options.stage);
            const _queries = this.queries();
            const queries = this.sort(_queries);
            yield this.executor.transaction(this.options, (tr) => __awaiter(this, void 0, void 0, function* () {
                for (const query of queries) {
                    const entityData = data.entities.find(p => p.entity === query.entity);
                    if (entityData) {
                        const aux = {};
                        this.loadExternalIds(entityData.entity, entityData.rows || [], aux);
                        this.solveInternalsIds(entityData.entity, entityData.rows, state);
                        yield tr.execute(query, entityData.rows);
                        this.completeMapping(entityData.entity, entityData.rows || [], aux, state);
                    }
                }
                for (const pending of state.pending) {
                    const entity = this.domain.getEntity(pending.entity);
                    if (entity === undefined) {
                        throw new lambdaorm_base_1.SchemaError(`Entity ${pending.entity} not found`);
                    }
                    const relation = entity.relations ? entity.relations.find(p => p.name === pending.relation) : undefined;
                    if (relation === undefined) {
                        throw new lambdaorm_base_1.SchemaError(`Relation ${pending.relation} not found`);
                    }
                    if (!entity.uniqueKey || entity.uniqueKey.length === 0) {
                        state.inconsistency.push(`${entity.name} had not unique Key`);
                        continue;
                    }
                    pending.rows = yield this.executePendingRows(state, entity, relation, tr, pending.rows, this.options);
                }
            }));
            yield this.stageMappingService.update(this.options.stage, state);
        });
    }
    executePendingRows(state, entity, relation, tr, rows, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const stillPending = [];
            let filter = '';
            for (const p in entity.uniqueKey) {
                filter = filter + (filter === '' ? '' : ' && ') + `p.${entity.uniqueKey[p]}==${entity.uniqueKey[p]}`;
            }
            const expression = `${entity.name}.update({${relation.from}:${relation.from}}).filter(p=> ${filter})`;
            for (const row of rows) {
                if (state.mapping[relation.entity] && state.mapping[relation.entity][relation.to] && state.mapping[relation.entity][relation.to][row.externalId]) {
                    const values = {};
                    const internalId = state.mapping[relation.entity][relation.to][row.externalId];
                    values[relation.from] = internalId;
                    for (const p in entity.uniqueKey) {
                        values[entity.uniqueKey[p]] = row.keys[p];
                    }
                    const query = this.expressionFacade.build(expression, options);
                    yield tr.execute(query, values);
                }
                else {
                    stillPending.push(row);
                }
            }
            return stillPending;
        });
    }
    solveInternalsIds(entityName, rows, state, parentEntity) {
        const entity = this.domain.getEntity(entityName);
        if (entity === undefined) {
            throw new lambdaorm_base_1.SchemaError(`Entity ${entityName} not found`);
        }
        if (entity.relations) {
            for (const relation of entity.relations) {
                if ((relation.type === 'oneToOne' || relation.type === 'oneToMany') && (parentEntity === null || parentEntity !== relation.entity)) {
                    this.solveInternalsIdsOne(entity, relation, state, rows);
                }
                else if (relation.type === 'manyToOne') {
                    this.solveInternalsIdsMany(entityName, relation, state, rows);
                }
            }
        }
    }
    solveInternalsIdsMany(entityName, relation, state, rows) {
        for (const row of rows) {
            const children = row[relation.name];
            if (children && children.length > 1) {
                this.solveInternalsIds(relation.entity, children, state, entityName);
            }
        }
    }
    solveInternalsIdsOne(entity, relation, state, rows) {
        var _a;
        const relationEntity = this.domain.getEntity(relation.entity);
        if (relationEntity === undefined) {
            throw new lambdaorm_base_1.SchemaError(`Relation Entity ${relation.entity} not found`);
        }
        const relationProperty = (_a = relationEntity.properties) === null || _a === void 0 ? void 0 : _a.find(q => q.name === relation.to);
        if (relationProperty !== undefined && relationProperty.autoIncrement) {
            const pendingRows = [];
            for (const row of rows) {
                this.solveInternalsIdsRow(entity, relation, state, pendingRows, row);
            }
            if (pendingRows.length > 0) {
                state.pending.push({ entity: entity.name, relation: relation.name, rows: pendingRows });
            }
        }
    }
    solveInternalsIdsRow(entity, relation, state, pendingRows, row) {
        const externalId = row[relation.from];
        if (state.mapping[relation.entity] && state.mapping[relation.entity][relation.to] && state.mapping[relation.entity][relation.to][externalId]) {
            row[relation.from] = state.mapping[relation.entity][relation.to][externalId];
        }
        else if (entity.uniqueKey !== undefined) {
            const keys = [];
            for (const ukProperty of entity.uniqueKey) {
                const value = row[ukProperty];
                if (value == null) {
                    state.inconsistency.push(`for entity ${entity.name} unique ${ukProperty} is null`);
                }
                keys.push(value);
            }
            if (keys.length === 0) {
                state.inconsistency.push(`for entity ${entity.name} had not unique key`);
            }
            pendingRows.push({ keys, externalId });
            row[relation.from] = null;
        }
    }
    loadExternalIds(entityName, rows, aux) {
        var _a;
        if (aux[entityName] === undefined) {
            aux[entityName] = {};
        }
        const entity = this.domain.getEntity(entityName);
        if (entity === undefined) {
            throw new lambdaorm_base_1.SchemaError(`Entity ${entityName} not found`);
        }
        const autoIncrement = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.autoIncrement);
        if (autoIncrement) {
            if (aux[entityName][autoIncrement.name] === undefined) {
                aux[entityName][autoIncrement.name] = {};
            }
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                aux[entityName][autoIncrement.name][i] = row[autoIncrement.name];
            }
        }
        if (entity.relations) {
            for (const relation of entity.relations) {
                if (relation.type === 'manyToOne') {
                    for (const row of rows) {
                        const children = row[relation.name];
                        this.loadExternalIds(relation.entity, children || [], aux || {});
                    }
                }
            }
        }
    }
    completeMapping(entityName, rows, aux, state) {
        var _a;
        if (state.mapping[entityName] === undefined) {
            state.mapping[entityName] = {};
        }
        const entity = this.domain.getEntity(entityName);
        if (entity === undefined) {
            throw new lambdaorm_base_1.SchemaError(`Entity ${entityName} not found`);
        }
        const autoIncrement = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.autoIncrement);
        if (autoIncrement) {
            if (state.mapping[entityName][autoIncrement.name] === undefined) {
                state.mapping[entityName][autoIncrement.name] = {};
            }
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const externalId = aux[entityName][autoIncrement.name][i];
                state.mapping[entityName][autoIncrement.name][externalId] = row[autoIncrement.name];
            }
        }
        if (entity.relations) {
            for (const relation of entity.relations) {
                if (relation.type !== 'manyToOne') {
                    continue;
                }
                for (const row of rows) {
                    const children = row[relation.name];
                    this.completeMapping(relation.entity, children || [], aux, state);
                }
            }
        }
    }
    sort(queries) {
        const onlyUnique = function (value, index, self) {
            return self.indexOf(value) === index;
        };
        const mainEntities = queries.map(p => p.entity).filter(onlyUnique);
        const allEntities = this.getAllEntities(queries).filter(onlyUnique);
        const entities = this.domain.sortByRelations(mainEntities, allEntities);
        const result = [];
        for (const entity of entities) {
            const query = queries.find(p => p.entity === entity);
            if (query !== undefined) {
                result.push(query);
            }
        }
        return result;
    }
    createQuery(entity) {
        const expression = `${entity.name}.bulkInsert()${this.createInclude(entity)}`;
        return this.expressionFacade.build(expression, this.options);
    }
}
exports.StageImport = StageImport;
//# sourceMappingURL=import.js.map