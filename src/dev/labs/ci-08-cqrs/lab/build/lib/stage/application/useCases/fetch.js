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
exports.StageFetch = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
class StageFetch {
    // eslint-disable-next-line no-useless-constructor
    constructor(executor, schemaState, languages, helper, options) {
        this.executor = executor;
        this.schemaState = schemaState;
        this.languages = languages;
        this.helper = helper;
        this.options = options;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const stageName = this.options.stage;
            const stage = this.schemaState.stage.get(stageName);
            const mappings = [];
            for (const ruleDataSource of stage.sources) {
                const source = this.schemaState.source.get(ruleDataSource.name);
                let mapping = mappings.find(p => this.helper.equalName(p.name, source.mapping));
                if (mapping === undefined) {
                    mapping = { name: source.mapping, entities: [] };
                    mappings.push(mapping);
                }
                if (mapping.entities === undefined)
                    mapping.entities = [];
                yield this.source(source, mapping.entities);
            }
            return mappings;
        });
    }
    source(source, entities) {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.sourceObjects(source);
            const tableNames = rows.filter((row) => row.type === 'table').map((row) => row.name);
            const viewNames = rows.filter((row) => row.type === 'view').map((row) => row.name);
            if (tableNames.length > 0) {
                yield this.entities(source, tableNames, entities);
            }
            if (viewNames.length > 0) {
                yield this.views(source, viewNames, entities);
            }
        });
    }
    sourceObjects(source) {
        return __awaiter(this, void 0, void 0, function* () {
            const objectsQuery = this.builder(source).objects();
            return yield this.executor.execute(objectsQuery, {}, this.options);
        });
    }
    entities(source, names, entities) {
        return __awaiter(this, void 0, void 0, function* () {
            const dialect = this.languages.getDialect(source.dialect);
            const query = this.builder(source).tables(names);
            const rows = yield this.executor.execute(query, {}, this.options);
            this.completeEntities(source, rows, entities);
            const toRemove = entities.filter(e => !e.view && e.mapping !== undefined && !names.includes(e.mapping));
            for (const entity of toRemove) {
                const index = entities.indexOf(entity);
                entities.splice(index, 1);
            }
            yield this.solvePrimaryKeys(source, names, entities);
            yield this.solveUniqueKeys(source, names, entities);
            yield this.solveIndexes(source, names, entities);
            yield this.solveRelations(source, names, entities);
            if (dialect.support('sequences')) {
                yield this.solveSequences(dialect, source, entities);
            }
        });
    }
    views(source, names, entities) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.builder(source).views(names);
            const rows = yield this.executor.execute(query, {}, this.options);
            this.completeEntities(source, rows, entities);
            const toRemove = entities.filter(e => e.view && e.mapping !== undefined && !names.includes(e.mapping));
            for (const entity of toRemove) {
                const index = entities.indexOf(entity);
                entities.splice(index, 1);
            }
        });
    }
    completeEntities(source, rows, entities) {
        var _a, _b;
        const dialect = this.languages.getDialect(source.dialect);
        const columnsByTable = {};
        // create or update entities
        for (const row of rows) {
            if (columnsByTable[row.tableName] === undefined) {
                columnsByTable[row.tableName] = [];
            }
            columnsByTable[row.tableName].push(row.columnName);
            let entity = entities.find(e => this.helper.equalName(e.mapping, row.tableName));
            if (entity === undefined) {
                entity = { name: this.helper.entityName(row.tableName), mapping: row.tableName, properties: [] };
                entities.push(entity);
            }
            let property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => this.helper.equalName(p.mapping, row.columnName));
            const _type = dialect.type(row.dbType);
            const _length = row.length && row.length !== 80 ? row.length : undefined;
            if (property === undefined) {
                property = {
                    name: this.helper.propertyName(row.columnName),
                    mapping: row.columnName,
                    type: _type,
                    required: row.required ? true : undefined,
                    autoIncrement: row.autoIncrement ? true : undefined,
                    length: _length
                };
                (_b = entity.properties) === null || _b === void 0 ? void 0 : _b.push(property);
            }
            else {
                property.required = row.required ? true : undefined;
                property.autoIncrement = row.autoIncrement ? true : undefined;
                property.length = _length;
                property.type = _type;
            }
        }
    }
    solvePrimaryKeys(source, names, entities) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = this.builder(source).primaryKeys(names);
            const rows = yield this.executor.execute(query, {}, this.options);
            for (const row of rows) {
                const entity = entities.find(e => this.helper.equalName(e.mapping, row.tableName));
                if (entity) {
                    const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => this.helper.equalName(p.mapping, row.columnName));
                    if (property) {
                        if (entity.primaryKey === undefined)
                            entity.primaryKey = [];
                        entity.primaryKey.push(this.helper.propertyName(row.columnName));
                        property.primaryKey = true;
                    }
                }
            }
        });
    }
    solveUniqueKeys(source, names, entities) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = this.builder(source).uniqueKeys(names);
            const rows = yield this.executor.execute(query, {}, this.options);
            for (const row of rows) {
                const entity = entities.find(e => this.helper.equalName(e.mapping, row.tableName));
                if (entity) {
                    const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => this.helper.equalName(p.mapping, row.columnName));
                    if (property) {
                        if (entity.uniqueKey === undefined)
                            entity.uniqueKey = [];
                        entity.uniqueKey.push(this.helper.propertyName(row.columnName));
                    }
                }
            }
        });
    }
    solveIndexes(source, names, entities) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = this.builder(source).indexes(names);
            const rows = yield this.executor.execute(query, {}, this.options);
            for (const row of rows) {
                const entity = entities.find(e => this.helper.equalName(e.mapping, row.tableName));
                if (entity) {
                    const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => this.helper.equalName(p.mapping, row.columnName));
                    if (property) {
                        if (entity.indexes === undefined)
                            entity.indexes = [];
                        const index = entity.indexes.find(i => this.helper.equalName(i.name, row.indexName));
                        if (index) {
                            index.fields.push(this.helper.propertyName(row.columnName));
                        }
                        else {
                            entity.indexes.push({ name: this.helper.indexName(row.indexName), fields: [this.helper.propertyName(row.columnName)] });
                        }
                    }
                }
            }
        });
    }
    solveSequences(dialect, source, entities) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = this.builder(source).sequences();
            const rows = yield this.executor.execute(query, {}, this.options);
            for (const row of rows) {
                const entity = entities.find(e => { var _a; return e.mapping && this.helper.equalName((_a = dialect.other('sequenceName')) === null || _a === void 0 ? void 0 : _a.replace('{name}', e.mapping), row.sequenceName); });
                if (entity) {
                    entity.sequence = row.sequenceName;
                }
            }
        });
    }
    solveRelations(source, names, entities) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const query = this.builder(source).foreignKeys(names);
            const rows = yield this.executor.execute(query, {}, this.options);
            for (const row of rows) {
                const entity = entities.find(e => e.mapping === row.tableName);
                const referenceEntity = entities.find(e => this.helper.equalName(e.mapping, row.refTableName));
                if (entity && referenceEntity) {
                    const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => this.helper.equalName(p.mapping, row.columnName));
                    const referenceProperty = (_b = referenceEntity === null || referenceEntity === void 0 ? void 0 : referenceEntity.properties) === null || _b === void 0 ? void 0 : _b.find(p => this.helper.equalName(p.mapping, row.refColumnName));
                    if (property && referenceProperty) {
                        if (entity.relations === undefined)
                            entity.relations = [];
                        const relationName = this.helper.relationName(row.constraintName.split('_')[1]);
                        const relation = {
                            name: relationName,
                            from: property.name,
                            entity: referenceEntity.name,
                            to: referenceProperty.name,
                            type: lambdaorm_base_1.RelationType.oneToMany
                        };
                        entity.relations.push(relation);
                    }
                }
            }
        });
    }
    builder(source) {
        const language = this.languages.getByDialect(source.dialect);
        const mapping = this.schemaState.mapping.getInstance(source.mapping);
        return language.ddlBuilder(source, mapping);
    }
}
exports.StageFetch = StageFetch;
//# sourceMappingURL=fetch.js.map