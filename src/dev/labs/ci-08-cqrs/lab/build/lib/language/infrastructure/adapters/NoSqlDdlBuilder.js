"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlDDLBuilder = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const lambdaorm_base_1 = require("lambdaorm-base");
const DdlBuilderBase_1 = require("./DdlBuilderBase");
class NoSqlDDLBuilder extends DdlBuilderBase_1.DdlBuilderBase {
    truncateEntity(entity) {
        // https://www.codegrepper.com/code-examples/c/truncate+collection+MongoDB
        return this.createQuery(lambdaorm_base_1.SentenceAction.truncateEntity, '', entity.name, `truncate collection ${entity.name}`);
    }
    createEntity(entity) {
        return this.createQuery(lambdaorm_base_1.SentenceAction.createEntity, '', entity.name, `create collection ${entity.name}`);
    }
    createFk(_entity, _relation) {
        return undefined;
    }
    createSequence(entity) {
        // https://www.tutorialspoint.com/MongoDB/mongodb_autoincrement_sequence.htm
        if (entity.sequence === undefined) {
            return undefined;
        }
        const sentence = `{ "_id" : "${this.dialect.delimiter(entity.sequence)}", "sequence_value": 1 }`;
        return this.createQuery(lambdaorm_base_1.SentenceAction.createSequence, sentence, entity.name, `create sequence ${entity.sequence}`);
    }
    createIndex(entity, index) {
        var _a;
        const columns = [];
        for (const field of index.fields) {
            const propertyMapping = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.name === field);
            columns.push(this.dialect.delimiter(propertyMapping.mapping));
        }
        const properties = {};
        for (const i in columns) {
            properties[columns[i]] = 1;
        }
        const sentence = JSON.stringify({
            properties,
            options: { name: this.dialect.delimiter(entity.mapping + '_' + index.name) }
        });
        return this.createQuery(lambdaorm_base_1.SentenceAction.createIndex, sentence, entity.name, `create index ${entity.mapping + '_' + index.name}`);
    }
    alterProperty(_entity, _property) {
        return undefined;
    }
    alterPropertyType(entity, property) {
        return undefined;
    }
    alterPropertyRequired(_entity, _property) {
        return undefined;
    }
    addProperty(_entity, _property) {
        return undefined;
    }
    addPk(entity, primaryKey) {
        var _a;
        const columns = [];
        for (const primaryKeyItem of primaryKey) {
            const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.name === primaryKeyItem);
            columns.push(this.dialect.delimiter(property.mapping));
        }
        const properties = {};
        for (const i in columns) {
            if (columns[i] !== '_id') {
                properties[columns[i]] = 1;
            }
        }
        const sentence = JSON.stringify({
            properties,
            options: { name: this.dialect.delimiter(entity.mapping + '_PK'), unique: true }
        });
        return this.createQuery(lambdaorm_base_1.SentenceAction.addPk, sentence, entity.name, 'add primary key');
    }
    addUk(entity, uniqueKey) {
        var _a;
        // https://www.MongoDB.com/docs/drivers/node/current/fundamentals/indexes/#:~:text=By%20default%2C%20MongoDB%20creates%20a,the%20unique%20option%20to%20true%20.
        const columns = [];
        for (const uniqueKeyItem of uniqueKey) {
            const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.name === uniqueKeyItem);
            columns.push(this.dialect.delimiter(property.mapping));
        }
        const properties = {};
        for (const i in columns) {
            properties[columns[i]] = 1;
        }
        const sentence = JSON.stringify({
            properties,
            options: { name: this.dialect.delimiter(entity.mapping + '_UK'), unique: true }
        });
        return this.createQuery(lambdaorm_base_1.SentenceAction.addUk, sentence, entity.name, `add unique key ${entity.mapping + '_UK'}`);
    }
    addFk(_entity, _relation) {
        return undefined;
    }
    dropEntity(entity) {
        return this.createQuery(lambdaorm_base_1.SentenceAction.dropEntity, '', entity.name, `drop collection ${entity.name}`);
    }
    dropProperty(_entity, _property) {
        return undefined;
    }
    dropPk(entity) {
        // https://www.MongoDB.com/docs/manual/reference/method/db.collection.dropIndex/
        const sentence = this.dialect.delimiter(entity.mapping + '_PK');
        return this.createQuery(lambdaorm_base_1.SentenceAction.dropPk, sentence, entity.name, `drop primary key ${entity.mapping + '_PK'}`);
    }
    dropUk(entity) {
        // https://www.MongoDB.com/docs/manual/reference/method/db.collection.dropIndex/
        const sentence = this.dialect.delimiter(entity.mapping + '_UK');
        return this.createQuery(lambdaorm_base_1.SentenceAction.dropUk, sentence, entity.name, `drop unique key ${entity.mapping + '_UK'}`);
    }
    setNull(_entity, _relation) {
        return undefined;
    }
    dropFk(_entity, _relation) {
        return undefined;
    }
    dropIndex(entity, index) {
        // https://www.MongoDB.com/docs/manual/reference/method/db.collection.dropIndex/
        const sentence = this.dialect.delimiter(entity.mapping + '_' + index.name);
        return this.createQuery(lambdaorm_base_1.SentenceAction.dropIndex, sentence, entity.name, `drop index ${entity.mapping + '_' + index.name}`);
    }
    dropSequence(entity) {
        if (entity.sequence === undefined) {
            return undefined;
        }
        const sentence = JSON.stringify({
            _id: this.dialect.delimiter(entity.sequence)
        });
        return this.createQuery(lambdaorm_base_1.SentenceAction.dropSequence, sentence, entity.name, `drop sequence ${entity.sequence}`);
    }
}
exports.NoSqlDDLBuilder = NoSqlDDLBuilder;
//# sourceMappingURL=NoSqlDdlBuilder.js.map