"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlDdlBuilder = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const lambdaorm_base_1 = require("lambdaorm-base");
const DdlBuilderBase_1 = require("./DdlBuilderBase");
class SqlDdlBuilder extends DdlBuilderBase_1.DdlBuilderBase {
    truncateEntity(entity) {
        if (entity.mapping === undefined) {
            return undefined;
        }
        let text = this.dialect.ddl('truncateEntity');
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping));
        return this.createQuery(lambdaorm_base_1.SentenceAction.truncateEntity, text, entity.name, `truncate table ${entity.mapping}`);
    }
    createEntity(entity) {
        const define = [];
        for (const i in entity.properties) {
            const property = entity.properties[i];
            if (!property.view) {
                define.push(this.createColumn(entity, property));
            }
        }
        if (entity.primaryKey && entity.primaryKey.length > 0) {
            define.push(this.createPk(entity, entity.primaryKey));
        }
        let text = this.dialect.ddl('createEntity');
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        text = text.replace('{define}', define.join(','));
        return this.createQuery(lambdaorm_base_1.SentenceAction.createEntity, text, entity.name, `create table ${entity.mapping}`);
    }
    createColumn(entity, property) {
        let type = this.dialect.dbType(property.type || 'string');
        if (type === undefined) {
            throw new lambdaorm_base_1.SchemaError(`Undefined type for ${entity.name}.${property.name}`);
        }
        type = property.length ? type.replace('{0}', property.length.toString()) : type;
        const required = property.required ? this.dialect.other('notNullable') : '';
        let text = property.autoIncrement ? this.dialect.ddl('incrementalColumDefine') : this.dialect.ddl('columnDefine');
        text = text.replace('{name}', this.dialect.delimiter(property.mapping));
        text = text.replace('{type}', type);
        text = text.replace('{required}', required);
        return text;
    }
    createPk(entity, primaryKey) {
        var _a;
        const columns = [];
        const columnTemplate = this.dialect.other('column');
        for (const primaryKeyItem of primaryKey) {
            const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => this.equal(p.name, primaryKeyItem));
            if (!property) {
                throw new lambdaorm_base_1.SchemaError(`Property ${primaryKeyItem} not found in entity ${entity.name}`);
            }
            columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(property.mapping)));
        }
        let text = this.dialect.ddl('createPk');
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_PK'));
        text = text.replace('{columns}', columns.join(','));
        return text;
    }
    createFk(entity, relation) {
        var _a, _b;
        const column = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => this.equal(p.name, relation.from));
        const fEntity = this.mapping.getEntity(relation.entity);
        const fColumn = (_b = fEntity.properties) === null || _b === void 0 ? void 0 : _b.find(p => this.equal(p.name, relation.to));
        const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        let text = this.dialect.ddl('createFk');
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + relation.name + '_FK'));
        text = text.replace('{column}', this.dialect.delimiter(column.mapping));
        text = text.replace('{fTable}', this.dialect.delimiter(fEntity.mapping || fEntity.name));
        text = text.replace('{fColumn}', this.dialect.delimiter(fColumn.mapping));
        text = `${alterEntity} ${text}`;
        return this.createQuery(lambdaorm_base_1.SentenceAction.addFk, text, entity.name, `create foreign key ${entity.mapping + '_' + relation.name + '_FK'}`);
    }
    createSequence(entity) {
        if (entity.sequence === undefined) {
            return undefined;
        }
        let text = this.dialect.ddl('createSequence');
        text = text.replace('{name}', this.dialect.delimiter(entity.sequence));
        return this.createQuery(lambdaorm_base_1.SentenceAction.createSequence, text, entity.name, `create sequence ${entity.sequence}`);
    }
    createIndex(entity, index) {
        var _a;
        const columns = [];
        const columnTemplate = this.dialect.other('column');
        for (const field of index.fields) {
            const propertyMapping = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => this.equal(p.name, field));
            if (propertyMapping) {
                columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(propertyMapping.mapping)));
            }
        }
        let text = this.dialect.ddl('createIndex');
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + index.name));
        text = text.replace('{table}', this.dialect.delimiter(entity.mapping || entity.name));
        text = text.replace('{columns}', columns.join(','));
        return this.createQuery(lambdaorm_base_1.SentenceAction.createIndex, text, entity.name, `create index ${entity.mapping + '_' + index.name}`);
    }
    /**
     * @deprecated This method is obsolete, since to alter a property you must call alterPropertyType or alterPropertyNullable
     */
    alterProperty(entity, property) {
        let text = this.property(entity, property);
        text = this.dialect.ddl('alterProperty').replace('{columnDefine}', text);
        const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        text = `${alterEntity} ${text}`;
        return this.createQuery(lambdaorm_base_1.SentenceAction.alterProperty, text, entity.name, `alter property ${entity.name}.${property.name}`);
    }
    alterPropertyType(entity, property) {
        const propertyMapping = this.mapping.getProperty(entity.name, property.name);
        let type = this.dialect.dbType(property.type || 'string');
        if (type === undefined) {
            throw new lambdaorm_base_1.SchemaError(`Undefined type for ${entity.name}.${property.name}`);
        }
        type = property.length ? type.replace('{0}', property.length.toString()) : type;
        let text = this.dialect.ddl('alterPropertyType');
        text = text.replace('{name}', this.dialect.delimiter(propertyMapping.mapping));
        text = text.replace('{type}', type);
        text = this.dialect.ddl('alterProperty').replace('{columnDefine}', text);
        const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        text = `${alterEntity} ${text}`;
        return this.createQuery(lambdaorm_base_1.SentenceAction.alterProperty, text, entity.name, `alter property ${entity.name}.${property.name}`);
    }
    alterPropertyRequired(entity, property) {
        const propertyMapping = this.mapping.getProperty(entity.name, property.name);
        let text = property.required ? this.dialect.ddl('alterPropertyNotNullable') : this.dialect.ddl('alterPropertyNullable');
        text = text.replace('{name}', this.dialect.delimiter(propertyMapping.mapping));
        text = this.dialect.ddl('alterProperty').replace('{columnDefine}', text);
        const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        text = `${alterEntity} ${text}`;
        return this.createQuery(lambdaorm_base_1.SentenceAction.alterProperty, text, entity.name, `alter property ${entity.name}.${property.name}`);
    }
    addProperty(entity, property) {
        let text = this.property(entity, property);
        text = this.dialect.ddl('addProperty').replace('{columnDefine}', text);
        const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        text = `${alterEntity} ${text}`;
        return this.createQuery(lambdaorm_base_1.SentenceAction.addProperty, text, entity.name, `add property ${entity.name}.${property.name}`);
    }
    property(entity, property) {
        const propertyMapping = this.mapping.getProperty(entity.name, property.name);
        let type = this.dialect.dbType(property.type || 'string');
        if (type === undefined) {
            throw new lambdaorm_base_1.SchemaError(`Undefined type for ${entity.name}.${property.name}`);
        }
        type = property.length ? type.replace('{0}', property.length.toString()) : type;
        const required = property.required ? this.dialect.other('notNullable') : '';
        let text = property.autoIncrement ? this.dialect.ddl('incrementalColumDefine') : this.dialect.ddl('columnDefine');
        text = text.replace('{name}', this.dialect.delimiter(propertyMapping.mapping));
        text = text.replace('{type}', type);
        return text.replace('{required}', required);
    }
    addPk(entity, primaryKeys) {
        return this.addKeys(entity, lambdaorm_base_1.SentenceAction.addPk, '_PK', primaryKeys);
    }
    addUk(entity, uniqueKeys) {
        return this.addKeys(entity, lambdaorm_base_1.SentenceAction.addUk, '_UK', uniqueKeys);
    }
    addKeys(entity, ddl, suffix, keys) {
        var _a;
        const columns = [];
        const columnTemplate = this.dialect.other('column');
        for (const key of keys) {
            const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => this.equal(p.name, key));
            if (property) {
                columns.push(columnTemplate.replace('{name}', this.dialect.delimiter(property.mapping)));
            }
        }
        const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        let text = this.dialect.ddl(ddl);
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping + suffix));
        text = text.replace('{columns}', columns.join(','));
        text = `${alterEntity} ${text}`;
        return this.createQuery(ddl, text, entity.name, `add ${ddl} ${entity.mapping + suffix}`);
    }
    addFk(entity, relation) {
        var _a, _b;
        const column = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => this.equal(p.name, relation.from));
        if (!column) {
            throw new lambdaorm_base_1.SchemaError(`Property ${relation.from} not found in entity ${entity.name}`);
        }
        const fEntity = this.mapping.getEntity(relation.entity);
        if (!fEntity) {
            throw new lambdaorm_base_1.SchemaError(`Entity ${relation.entity} not found`);
        }
        const fColumn = (_b = fEntity.properties) === null || _b === void 0 ? void 0 : _b.find(p => this.equal(p.name, relation.to));
        if (!fColumn) {
            throw new lambdaorm_base_1.SchemaError(`Property ${relation.to} not found in entity ${fEntity.name}`);
        }
        const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.addFk);
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + relation.name + '_FK'));
        text = text.replace('{column}', this.dialect.delimiter(column.mapping));
        text = text.replace('{fTable}', this.dialect.delimiter(fEntity.mapping || fEntity.name));
        text = text.replace('{fColumn}', this.dialect.delimiter(fColumn.mapping));
        text = `${alterEntity} ${text}`;
        return this.createQuery(lambdaorm_base_1.SentenceAction.addFk, text, entity.name, `add foreign key ${entity.mapping + '_' + relation.name + '_FK'}`);
    }
    dropEntity(entity) {
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.dropEntity);
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        return this.createQuery(lambdaorm_base_1.SentenceAction.dropEntity, text, entity.name, `drop table ${entity.mapping}`);
    }
    dropProperty(entity, property) {
        const propertyMapping = this.mapping.getProperty(entity.name, property.name);
        const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        let text = this.dialect.ddl('dropProperty');
        text = text.replace('{name}', this.dialect.delimiter(propertyMapping.mapping));
        text = `${alterEntity} ${text}`;
        return this.createQuery(lambdaorm_base_1.SentenceAction.dropProperty, text, entity.name, `drop property ${entity.name}.${property.name}`);
    }
    dropPk(entity) {
        const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.dropPk);
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_PK'));
        text = `${alterEntity} ${text}`;
        return this.createQuery(lambdaorm_base_1.SentenceAction.dropPk, text, entity.name, `drop primary key ${entity.mapping + '_PK'}`);
    }
    dropUk(entity) {
        const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.dropUk);
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_UK'));
        text = `${alterEntity} ${text}`;
        return this.createQuery(lambdaorm_base_1.SentenceAction.dropUk, text, entity.name, `drop unique key ${entity.mapping + '_UK'}`);
    }
    setNull(entity, relation) {
        var _a;
        const alias = 'a';
        const templateColumn = this.dialect.other('column');
        const propertyFrom = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => this.equal(p.name, relation.from));
        if (!propertyFrom) {
            throw new lambdaorm_base_1.SchemaError(`not found relation form ${entity.name}.${relation.name}.${relation.from} `);
        }
        const column = templateColumn.replace('{name}', propertyFrom.mapping);
        const templateAssign = this.dialect.operator('=', 2);
        let assign = templateAssign.replace('{0}', column);
        const _null = this.dialect.other('null');
        assign = assign.replace('{1}', _null);
        let text = this.dialect.dml(lambdaorm_base_1.SentenceAction.update);
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        text = this.helper.str.replace(text, '{alias}', alias);
        text = text.replace('{assigns}', assign);
        const query = `${entity.name}.update(p => p.${relation.from} = null)`;
        return this.createQuery(lambdaorm_base_1.SentenceAction.update, text, entity.name, `set null ${relation.from} in ${entity.name}`, query);
    }
    dropFk(entity, relation) {
        const alterEntity = this.dialect.ddl('alterTable').replace('{name}', this.dialect.delimiter(entity.mapping || entity.name));
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.dropFk);
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + relation.name + '_FK'));
        text = `${alterEntity} ${text}`;
        return this.createQuery(lambdaorm_base_1.SentenceAction.dropFk, text, entity.name, `drop foreign key ${entity.mapping + '_' + relation.name + '_FK'}`);
    }
    dropIndex(entity, index) {
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.dropIndex);
        text = text.replace('{name}', this.dialect.delimiter(entity.mapping + '_' + index.name));
        text = text.replace('{table}', this.dialect.delimiter(entity.mapping || entity.name));
        return this.createQuery(lambdaorm_base_1.SentenceAction.dropIndex, text, entity.name, `drop index ${entity.mapping + '_' + index.name}`);
    }
    dropSequence(entity) {
        if (entity.sequence === undefined) {
            return undefined;
        }
        let text = this.dialect.ddl(lambdaorm_base_1.SentenceAction.dropSequence);
        text = text.replace('{name}', this.dialect.delimiter(entity.sequence));
        return this.createQuery(lambdaorm_base_1.SentenceAction.dropSequence, text, entity.name, `drop sequence ${entity.sequence}`);
    }
    equal(a, b) {
        return this.helper.schema.equalName(a, b);
    }
}
exports.SqlDdlBuilder = SqlDdlBuilder;
//# sourceMappingURL=SqlDdlBuilder.js.map