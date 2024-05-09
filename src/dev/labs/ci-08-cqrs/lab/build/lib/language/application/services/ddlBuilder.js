"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DDLBuilderService = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
class DDLBuilderService {
    constructor(schemaState, languages, stage, helper) {
        this.schemaState = schemaState;
        this.languages = languages;
        this.stage = stage;
        this.helper = helper;
        this.domain = schemaState.domain;
    }
    drop(mappings) {
        const queries = [];
        const stage = this.schemaState.stage.get(this.stage);
        for (const ruleDataSource of stage.sources) {
            const source = this.schemaState.source.get(ruleDataSource.name);
            const mapping = mappings.find(p => this.equal(p.name, source.mapping));
            if (mapping !== undefined && mapping.entities !== undefined) {
                this._drop(source, ruleDataSource, mapping.entities, queries);
            }
        }
        return queries;
    }
    truncate(mappings) {
        const queries = [];
        const stage = this.schemaState.stage.get(this.stage);
        for (const ruleDataSource of stage.sources) {
            const source = this.schemaState.source.get(ruleDataSource.name);
            const mapping = mappings.find(p => this.equal(p.name, source.mapping));
            if (mapping !== undefined && mapping.entities !== undefined) {
                this._truncate(source, ruleDataSource, mapping.entities, queries);
            }
        }
        return queries;
    }
    sync(mappings) {
        const queries = [];
        const stage = this.schemaState.stage.get(this.stage);
        for (const ruleDataSource of stage.sources) {
            const source = this.schemaState.source.get(ruleDataSource.name);
            const oldMapping = mappings.find(p => this.equal(p.name, source.mapping));
            const oldEntities = oldMapping !== undefined && oldMapping.entities !== undefined ? oldMapping.entities : null;
            const currentMapping = this.schemaState.mapping.mappings.find(p => this.equal(p.name, source.mapping));
            const currentEntities = currentMapping !== undefined && currentMapping.entities !== undefined ? currentMapping.entities : null;
            const delta = this.helper.obj.delta(currentEntities, oldEntities, { ignore: ['dependents'] });
            if (delta.children && delta.children.length > 0) {
                for (const child of delta.children) {
                    if (!child.change)
                        continue;
                    this._sync(source, ruleDataSource, currentEntities || [], oldEntities || [], child.delta, queries);
                }
            }
            else {
                this._sync(source, ruleDataSource, currentEntities || [], oldEntities || [], delta, queries);
            }
        }
        return queries;
    }
    _sync(source, ruleDataSource, currentEntities, oldEntities, delta, queries) {
        // remove for entities changes
        this._syncRemoveForEntitiesChanges(source, ruleDataSource, oldEntities || [], delta, queries);
        // remove for entities removed
        this._syncRemoveForRemovedEntities(source, ruleDataSource, delta, queries);
        // create entities
        this._syncCreateEntities(source, ruleDataSource, delta, queries);
        // create for entities changes
        this._syncCreateForEntitiesChanges(source, ruleDataSource, delta, queries);
        // create for new entities
        this._syncCreateForNewEntities(source, ruleDataSource, currentEntities || [], delta, queries);
    }
    _drop(source, sourceRule, entitiesMapping, queries) {
        const dialect = this.languages.getDialect(source.dialect);
        const entities = entitiesMapping.map(p => p.name);
        const sortedEntities = this.domain.sortByDependencies(entities);
        // drop all constraint
        for (const entityName of sortedEntities) {
            // evaluate if entity apply in source
            if (this.evalDataSource(sourceRule, entityName)) {
                const entity = entitiesMapping.find(q => this.equal(q.name, entityName));
                if (entity === undefined) {
                    throw new lambdaorm_base_1.SchemaError(`entity ${entityName} not found in mapping for drop constraint action`);
                }
                this._dropRelations(source, sourceRule, entity, entitiesMapping, dialect, queries);
            }
        }
        // drop indexes and tables
        for (const entityName of sortedEntities) {
            // evaluate if entity apply in source
            if (this.evalDataSource(sourceRule, entityName)) {
                // const entity = this.domain.getEntity(entityName) as Entity
                const entity = entitiesMapping.find(p => this.equal(p.name, entityName));
                if (entity === undefined) {
                    throw new lambdaorm_base_1.SchemaError(`entity ${entityName} not found in mapping for drop indexes action`);
                }
                this._dropEntity(source, entity, dialect, queries);
            }
        }
    }
    _dropRelations(source, sourceRule, entity, entitiesMapping, dialect, queries) {
        if (entity.relations && !entity.view && (!entity.composite || !dialect.solveComposite)) {
            for (const relation of entity.relations) {
                const relationEntity = entitiesMapping.find(r => this.equal(r.name, relation.entity));
                // evaluate if entity relation is not view and apply in source
                if (relationEntity && !relationEntity.view && (!relationEntity.composite || !dialect.solveComposite) && this.evalDataSource(sourceRule, relation.entity)) {
                    this._dropRelation(source, entity, relation, queries);
                }
            }
        }
    }
    _dropRelation(source, entity, relation, queries) {
        var _a;
        if (!relation.weak) {
            // look for the related property to see if the relation is not required
            const fromProperty = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(r => this.equal(r.name, relation.from));
            if (fromProperty === undefined) {
                throw new lambdaorm_base_1.SchemaError(`property ${relation.from} not found in ${entity.name} `);
            }
            const isNullable = !fromProperty.required;
            if (isNullable) {
                this.addQuery(queries, this.builder(source).setNull(entity, relation));
            }
            this.addQuery(queries, this.builder(source).dropFk(entity, relation));
        }
    }
    _dropEntity(source, entity, dialect, queries) {
        if (!entity.view && (!entity.composite || !dialect.solveComposite)) {
            this._dropIndexes(source, entity, queries);
            if (entity.sequence) {
                this.addQuery(queries, this.builder(source).dropSequence(entity));
            }
            this.addQuery(queries, this.builder(source).dropEntity(entity));
        }
    }
    _dropIndexes(source, entity, queries) {
        if (entity.indexes) {
            for (const index of entity.indexes) {
                this.addQuery(queries, this.builder(source).dropIndex(entity, index));
            }
        }
    }
    _truncate(source, sourceRule, entitiesMapping, queries) {
        const dialect = this.languages.getDialect(source.dialect);
        const entities = entitiesMapping.map(p => p.name);
        const sortedEntities = this.domain.sortByDependencies(entities);
        for (const entityName of sortedEntities) {
            // evaluate if entity apply in source
            if (this.evalDataSource(sourceRule, entityName)) {
                // const entity = this.domain.getEntity(entityName) as Entity
                const entity = entitiesMapping.find(p => this.equal(p.name, entityName));
                if (entity === undefined) {
                    throw new lambdaorm_base_1.SchemaError(`entity ${entityName} not found in mapping for truncate action`);
                }
                if (!entity.view && (!entity.composite || !dialect.solveComposite)) {
                    this.addQuery(queries, this.builder(source).truncateEntity(entity));
                }
            }
        }
    }
    _syncRemoveForEntitiesChanges(source, sourceRule, oldMapping, delta, queries) {
        if (delta.changed === undefined)
            return;
        for (const entityChanged of delta.changed) {
            // if entity is view is excluded
            // evaluate if entity apply in source
            if (!entityChanged.delta || !entityChanged.delta.changed || entityChanged.old.view || (!this.evalDataSource(sourceRule, entityChanged.name)))
                continue;
            for (const changed of entityChanged.delta.changed) {
                if (!changed.delta)
                    continue;
                switch (changed.name) {
                    case 'primaryKey':
                        this._syncRemovePrimaryKey(source, entityChanged, changed.delta, queries);
                        break;
                    case 'uniqueKey':
                        this._syncRemoveUniqueKey(source, entityChanged, changed.delta, queries);
                        break;
                    case 'index':
                        this._syncRemoveIndexForChanges(source, entityChanged, changed.delta, queries);
                        break;
                    case 'relation':
                        this._syncRemoveFkForChanges(source, sourceRule, oldMapping, entityChanged, changed.delta, queries);
                        break;
                }
            }
        }
    }
    _syncRemovePrimaryKey(source, entityChanged, delta, queries) {
        if (delta.remove && delta.remove.length > 0) {
            this.addQuery(queries, this.builder(source).dropPk(entityChanged.old));
        }
        if (delta.changed && delta.changed.length > 0) {
            this.addQuery(queries, this.builder(source).dropPk(entityChanged.old));
        }
    }
    _syncRemoveUniqueKey(source, entityChanged, delta, queries) {
        if (delta.remove && delta.remove.length > 0) {
            this.addQuery(queries, this.builder(source).dropUk(entityChanged.old));
        }
        if (delta.changed && delta.changed.length > 0) {
            this.addQuery(queries, this.builder(source).dropUk(entityChanged.old));
        }
    }
    _syncRemoveIndexForChanges(source, entityChanged, delta, queries) {
        if (delta.changed) {
            for (const oldIndex of delta.changed) {
                this.addQuery(queries, this.builder(source).dropIndex(entityChanged.new, oldIndex.old));
            }
        }
        if (delta.remove) {
            for (const removeIndex of delta.remove) {
                this.addQuery(queries, this.builder(source).dropIndex(entityChanged.new, removeIndex.old));
            }
        }
    }
    _syncRemoveFkForChanges(source, sourceRule, oldMapping, entityChanged, delta, queries) {
        if (delta.changed) {
            for (const changedItem of delta.changed) {
                const newRelation = changedItem.new;
                const oldRelation = changedItem.old;
                const oldRelationEntity = oldMapping.find(r => this.equal(r.name, oldRelation.entity));
                // evaluate if entity relation apply in source
                if ((oldRelationEntity && !oldRelationEntity.view) && this.evalDataSource(sourceRule, newRelation.entity) && this.changeRelation(oldRelation, newRelation) && !oldRelation.weak) {
                    this.addQuery(queries, this.builder(source).dropFk(entityChanged.new, oldRelation));
                }
            }
        }
        if (delta.remove) {
            for (const removeItem of delta.remove) {
                const removeRelation = removeItem.old;
                const oldRelationEntity = oldMapping.find(s => this.equal(s.name, removeRelation.entity));
                // evaluate if entity relation apply in source
                if ((oldRelationEntity && !oldRelationEntity.view) && this.evalDataSource(sourceRule, removeRelation.entity)) {
                    this.addQuery(queries, this.builder(source).dropFk(entityChanged.new, removeRelation));
                }
            }
        }
    }
    _syncRemoveForRemovedEntities(source, sourceRule, delta, queries) {
        if (!delta.remove)
            return;
        for (const removeItem of delta.remove) {
            const removeEntity = removeItem.old;
            // if entity is view is excluded
            if (removeEntity.view)
                continue;
            // evaluate if entity apply in source
            if (this.evalDataSource(sourceRule, removeEntity.name)) {
                if (removeEntity.indexes) {
                    for (const index of removeEntity.indexes) {
                        this.addQuery(queries, this.builder(source).dropIndex(removeEntity, index));
                    }
                }
                if (removeEntity.sequence) {
                    this.addQuery(queries, this.builder(source).createSequence(removeEntity));
                }
                this.addQuery(queries, this.builder(source).dropEntity(removeEntity));
            }
        }
    }
    _syncCreateEntities(source, sourceRule, delta, queries) {
        if (!delta.new)
            return;
        const dialect = this.languages.getDialect(source.dialect);
        for (const newItem of delta.new) {
            const newEntity = newItem.new;
            // evaluate if entity apply in source
            if (!newEntity.view && (!newEntity.composite || !dialect.solveComposite) && this.evalDataSource(sourceRule, newEntity.name)) {
                if (newEntity.sequence) {
                    this.addQuery(queries, this.builder(source).createSequence(newEntity));
                }
                this.addQuery(queries, this.builder(source).createEntity(newEntity));
                if (newEntity.uniqueKey && newEntity.uniqueKey.length > 0) {
                    this.addQuery(queries, this.builder(source).addUk(newEntity, newEntity.uniqueKey));
                }
            }
        }
    }
    _syncCreateForEntitiesChanges(source, sourceRule, delta, queries) {
        if (delta.changed === undefined)
            return;
        for (const entityChanged of delta.changed) {
            // if entity is view is excluded & evaluate if entity apply in source
            if (entityChanged.new.view || (!this.evalDataSource(sourceRule, entityChanged.name)))
                continue;
            if (entityChanged.delta && entityChanged.delta.children && entityChanged.delta.children.length > 0) {
                for (const child of entityChanged.delta.children) {
                    if (!child.change || !child.delta || !child.delta.changed)
                        continue;
                    for (const changed of child.delta.changed) {
                        if (!changed.delta)
                            continue;
                        const propertyChanged = changed.new;
                        switch (changed.name) {
                            case 'properties':
                                this._syncModifyPropertyForEntitiesChanges(source, entityChanged, propertyChanged, changed.delta, queries);
                                break;
                        }
                    }
                }
            }
            else if (entityChanged.delta && entityChanged.delta.changed) {
                for (const changed of entityChanged.delta.changed) {
                    if (!changed.delta)
                        continue;
                    switch (changed.name) {
                        case 'property':
                            this._syncAddPropertyForEntitiesChanges(source, entityChanged, changed.delta, queries);
                            this._syncRemovePropertyForEntityChanges(source, entityChanged, changed.delta, queries);
                            break;
                        case 'primaryKey':
                            this._syncCreatePkForChangesInEntity(source, entityChanged, changed.delta, queries);
                            break;
                        case 'uniqueKey':
                            this._syncCreateUkForChangesInEntity(source, entityChanged, changed.delta, queries);
                            break;
                        case 'index':
                            this._syncCreateIndexesForChangesInEntity(source, entityChanged, changed.delta, queries);
                            break;
                        case 'relation':
                            this._syncCreateFksForChangesInEntity(source, sourceRule, entityChanged, changed.delta, queries);
                            break;
                        case 'sequence':
                            this._syncCreateSequencesForChangesInEntity(source, entityChanged, queries);
                            break;
                    }
                }
            }
        }
        // TODO:
        // Solve rename column: se debe resolver en cascada los indexes, Fks, Uk and Pk que esta haciendo referencia la columns
        // Solve rename table: se debe resolver en cascada los indexes, Fks, Uk and Pk que esta haciendo referencia la columns
        // en ambos casos se debe resolver que se hará con los datos para que estos no se pierdan
    }
    _syncAddPropertyForEntitiesChanges(source, entityChanged, delta, queries) {
        if (delta.new) {
            for (const n in delta.new) {
                const newProperty = delta.new[n].new;
                this.addQuery(queries, this.builder(source).addProperty(entityChanged.new, newProperty));
            }
        }
        if (delta.changed) {
            for (const changedItem of delta.changed) {
                const newProperty = changedItem.new;
                const oldProperty = changedItem.old;
                if (this.equal(newProperty.mapping, oldProperty.mapping) && !newProperty.view) {
                    this.addQuery(queries, this.builder(source).alterProperty(entityChanged.new, newProperty));
                }
            }
        }
    }
    _syncModifyPropertyForEntitiesChanges(source, entityChanged, propertyChanged, delta, queries) {
        if (!delta.changed)
            return;
        for (const changed of delta.changed) {
            switch (changed.name) {
                case 'length':
                case 'type':
                    this.addQuery(queries, this.builder(source).alterPropertyType(entityChanged.new, propertyChanged));
                    break;
                case 'required':
                    this.addQuery(queries, this.builder(source).alterPropertyRequired(entityChanged.new, propertyChanged));
                    break;
            }
        }
    }
    _syncRemovePropertyForEntityChanges(source, entityChanged, delta, queries) {
        if (delta.remove) {
            for (const removeItem of delta.remove) {
                const oldProperty = removeItem.old;
                if (!oldProperty.view) {
                    this.addQuery(queries, this.builder(source).dropProperty(entityChanged.old, oldProperty));
                }
            }
        }
    }
    _syncCreatePkForChangesInEntity(source, entityChanged, delta, queries) {
        if (delta.new) {
            for (const newItem of delta.new) {
                const newPrimaryKey = newItem.new;
                this.addQuery(queries, this.builder(source).addPk(entityChanged.new, newPrimaryKey));
            }
        }
        if (delta.changed) {
            for (const changedItem of delta.changed) {
                const changePrimaryKey = changedItem.new;
                this.addQuery(queries, this.builder(source).addPk(entityChanged.new, changePrimaryKey));
            }
        }
    }
    _syncCreateUkForChangesInEntity(source, entityChanged, delta, queries) {
        if (delta.new) {
            for (const newItem of delta.new) {
                const newUniqueKey = newItem.new;
                this.addQuery(queries, this.builder(source).addUk(entityChanged.new, newUniqueKey));
            }
        }
        if (delta.changed) {
            for (const changedItem of delta.changed) {
                const changeUniqueKey = changedItem.new;
                this.addQuery(queries, this.builder(source).addUk(entityChanged.new, changeUniqueKey));
            }
        }
    }
    _syncCreateIndexesForChangesInEntity(source, entityChanged, delta, queries) {
        if (delta.new) {
            for (const newItem of delta.new) {
                const newIndex = newItem.new;
                this.addQuery(queries, this.builder(source).createIndex(entityChanged.new, newIndex));
            }
        }
        if (delta.changed) {
            for (const changedItem of delta.changed) {
                const changeIndex = changedItem.new;
                this.addQuery(queries, this.builder(source).createIndex(entityChanged.new, changeIndex));
            }
        }
    }
    _syncCreateFksForChangesInEntity(source, sourceRule, entityChanged, delta, queries) {
        if (delta.new) {
            for (const newItem of delta.new) {
                const newRelation = newItem.new;
                // evaluate if entity relation apply in source
                if (this.evalDataSource(sourceRule, newRelation.entity) && !newRelation.weak) {
                    this.addQuery(queries, this.builder(source).addFk(entityChanged.new, newRelation));
                }
            }
        }
        if (delta.changed) {
            for (const changedItem of delta.changed) {
                const newRelation = changedItem.new;
                const oldRelation = changedItem.old;
                // evaluate if entity relation apply in source
                if (this.evalDataSource(sourceRule, newRelation.entity) && this.changeRelation(oldRelation, newRelation) && (!newRelation.weak)) {
                    this.addQuery(queries, this.builder(source).addFk(entityChanged.new, newRelation));
                }
            }
        }
    }
    _syncCreateSequencesForChangesInEntity(source, entityChanged, queries) {
        this.addQuery(queries, this.builder(source).createSequence(entityChanged.new));
    }
    _syncCreateForNewEntities(source, sourceRule, newMapping, delta, queries) {
        if (delta.new) {
            for (const newItem of delta.new) {
                const newEntity = newItem.new;
                // if entity is view is excluded
                // evaluate if entity apply in source
                if (newEntity.view || (!this.evalDataSource(sourceRule, newEntity.name)))
                    continue;
                this._syncCreateIndexesForNewEntity(source, newEntity, queries);
                this._syncCreateFksForNewEntity(source, sourceRule, newMapping, newEntity, queries);
            }
        }
    }
    _syncCreateFksForNewEntity(source, sourceRule, newMapping, newEntity, queries) {
        if (newEntity.relations) {
            for (const relation of newEntity.relations) {
                const relationEntity = newMapping.find(q => this.equal(q.name, relation.entity));
                // evaluate if entity relation apply in source
                if ((relationEntity && relationEntity.view) || (!this.evalDataSource(sourceRule, relation.entity)) || relation.weak)
                    continue;
                this.addQuery(queries, this.builder(source).addFk(newEntity, relation));
            }
        }
    }
    _syncCreateIndexesForNewEntity(source, newEntity, queries) {
        if (newEntity.indexes) {
            for (const index of newEntity.indexes) {
                this.addQuery(queries, this.builder(source).createIndex(newEntity, index));
            }
        }
    }
    evalDataSource(sourceRule, entity) {
        return this.schemaState.evalSourceRule(sourceRule, this.helper.query.getInfo(lambdaorm_base_1.SentenceAction.undefined, entity, lambdaorm_base_1.SentenceType.dml));
    }
    builder(source) {
        const language = this.languages.getByDialect(source.dialect);
        const mapping = this.schemaState.mapping.getInstance(source.mapping);
        return language.ddlBuilder(source, mapping);
    }
    addQuery(queries, query) {
        if (query)
            queries.push(query);
    }
    changeRelation(a, b) {
        return !this.equal(a.entity, b.entity) || !this.equal(a.from, b.from) || !this.equal(a.name, b.name) || !this.equal(a.to, b.to) || !this.equal(a.type, b.type);
    }
    equal(a, b) {
        return this.helper.schema.equalName(a, b);
    }
}
exports.DDLBuilderService = DDLBuilderService;
//# sourceMappingURL=ddlBuilder.js.map