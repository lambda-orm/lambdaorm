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
exports.MongodbConnectionAdapter = exports.MongoDBConnectionPoolAdapter = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-tabs */
const connectionPool_1 = require("./base/connectionPool");
const connection_1 = require("./base/connection");
const lambdaorm_base_1 = require("lambdaorm-base");
const typ3s_1 = require("typ3s");
class MongoDBConnectionPoolAdapter extends connectionPool_1.ConnectionPoolAdapter {
    constructor(config, helper) {
        super(config, helper);
        if (!MongoDBConnectionPoolAdapter.lib) {
            MongoDBConnectionPoolAdapter.lib = require('mongodb');
        }
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.helper.logger.log(`connection MongoDB: ${this.config.name} initialized`);
        });
    }
    create(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield MongoDBConnectionPoolAdapter.lib.MongoClient.connect(this.config.connection.url);
            const db = client.db(this.config.connection.database);
            const cnx = { client, db };
            return new MongodbConnectionAdapter(id, cnx, this, this.helper);
        });
    }
}
exports.MongoDBConnectionPoolAdapter = MongoDBConnectionPoolAdapter;
class MongodbConnectionAdapter extends connection_1.ConnectionAdapter {
    end() {
        return __awaiter(this, void 0, void 0, function* () {
            this.cnx.client.close();
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    insertConditional(mapping, dialect, query, data) {
        throw new Error('Method not implemented.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    upsert(mapping, dialect, query, data) {
        throw new Error('Method not implemented.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    merge(mapping, dialect, query, data) {
        throw new Error('Method not implemented.');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    bulkMerge(mapping, dialect, query, array) {
        throw new Error('Method not implemented.');
    }
    select(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // https://medium.com/@tomas.knezek/handle-pagination-with-nodejs-and-MongoDB-2910ff5e272b
            // https://www.MongoDB.com/docs/manual/reference/operator/aggregation-pipeline/
            const collectionName = query.entity.includes('.') ? query.entity.split('.')[0] : query.entity;
            const collection = mapping.entityMapping(collectionName);
            const params = this.dataToParameters(mapping, dialect, query, data);
            const aggregate = this.parseTemplate(mapping, dialect, query.sentence, params);
            // TODO:solve transaction
            // const result = this.session
            // 	? await this.cnx.db.collection(collection).find(filter, this.session).aggregate(aggregate).toArray()
            // 	: await this.cnx.db.collection(collection).find(filter).aggregate(aggregate).toArray()
            const result = yield this.cnx.db.collection(collection).aggregate(aggregate || []).toArray();
            if (result && result.length > 0 && result[0].__distinct) {
                return result.map((p) => p.__distinct);
            }
            else {
                return result;
            }
        });
    }
    insert(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const entity = mapping.getEntity(query.entity);
            if (entity === undefined) {
                throw new lambdaorm_base_1.SchemaError(`EntityMapping not found for entity ${query.entity}`);
            }
            const list = yield this.getInsertList(mapping, dialect, query, entity, [data.data]);
            const obj = list[0];
            if (entity.sequence && entity.primaryKey && entity.primaryKey.length === 1) {
                const propertyPk = entity.primaryKey[0];
                const mappingPk = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.name === propertyPk);
                if (mappingPk) {
                    obj[mappingPk.mapping] = yield this.getNextSequenceValue(entity.sequence);
                }
            }
            const result = this.session
                ? yield this.cnx.db.collection(entity.mapping).insertOne(obj, this.session)
                : yield this.cnx.db.collection(entity.mapping).insertOne(obj);
            return typeof result.insertedId === 'object' ? result.insertedId.toString() : result.insertedId;
        });
    }
    bulkInsert(mapping, dialect, query, array) {
        return __awaiter(this, void 0, void 0, function* () {
            const entity = mapping.getEntity(query.entity);
            if (entity === undefined) {
                throw new lambdaorm_base_1.SchemaError(`EntityMapping ${query.entity} not found`);
            }
            const list = yield this.getInsertList(mapping, dialect, query, entity, array);
            const result = this.session
                ? yield this.cnx.db.collection(entity.mapping).insertMany(list, this.session)
                : yield this.cnx.db.collection(entity.mapping).insertMany(list);
            const ids = [];
            for (const p in result.insertedIds) {
                const id = result.insertedIds[p];
                ids.push(typeof id === 'object' ? id.toString() : id);
            }
            return ids;
        });
    }
    getInsertList(mapping, dialect, query, entity, array) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const list = this.arrayToList(mapping, dialect, query, query.sentence, array);
            if (entity.sequence && entity.primaryKey && entity.primaryKey.length === 1) {
                const propertyPk = entity.primaryKey[0];
                const mappingPk = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.name === propertyPk);
                if (mappingPk) {
                    const first = yield this.getNextSequenceValue(entity.sequence, list.length);
                    for (let i = 0; i < list.length; i++) {
                        list[i][mappingPk.mapping] = first + i;
                    }
                }
            }
            yield this.getInsertListIncludes(mapping, dialect, query, array, list);
            return list;
        });
    }
    getInsertListIncludes(mapping, dialect, query, array, list) {
        return __awaiter(this, void 0, void 0, function* () {
            for (const include of query.includes) {
                if (include.relation.composite) {
                    const relationEntity = mapping.getEntity(include.relation.entity);
                    if (relationEntity === undefined) {
                        throw new lambdaorm_base_1.SchemaError(`EntityMapping ${include.relation.entity} not found`);
                    }
                    yield this.getInsertListInclude(mapping, dialect, query, include, relationEntity, array, list);
                }
            }
        });
    }
    getInsertListInclude(mapping, dialect, query, include, relationEntity, array, list) {
        return __awaiter(this, void 0, void 0, function* () {
            if (relationEntity.mapping === undefined) {
                throw new lambdaorm_base_1.SchemaError(`EntityMapping ${include.relation.entity} not found`);
            }
            const relationEntityMapping = dialect.delimiter(relationEntity.mapping);
            for (let i = 0; i < array.length; i++) {
                const source = array[i];
                const target = list[i];
                const children = source[include.relation.name];
                const fromProperty = mapping.getProperty(query.entity, include.relation.from);
                if (include.relation.type === lambdaorm_base_1.RelationType.manyToOne || (include.relation.type === lambdaorm_base_1.RelationType.oneToOne && !fromProperty.required)) {
                    // Assign parentID to child relation property
                    for (const _children of children) {
                        const toProperty = mapping.getProperty(include.relation.entity, include.relation.to);
                        _children[toProperty.name] = target[fromProperty.mapping];
                    }
                }
                if (include.relation.type === lambdaorm_base_1.RelationType.manyToOne) {
                    target[relationEntityMapping] = yield this.getInsertList(mapping, dialect, include.query, relationEntity, children);
                }
                else {
                    const result = yield this.getInsertList(mapping, dialect, include.query, relationEntity, [children]);
                    if (result && result.length > 0) {
                        target[relationEntityMapping] = result[0];
                    }
                }
            }
        });
    }
    update(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = mapping.entityMapping(query.entity);
            const sentence = JSON.parse(query.sentence);
            const params = this.dataToParameters(mapping, dialect, query, data);
            const obj = this.getObject(mapping, dialect, query, data);
            const filter = this.parseTemplate(mapping, dialect, sentence.filter, params);
            const result = this.session
                ? yield this.cnx.db.collection(collection).updateMany(filter, { $set: obj }, this.session)
                : yield this.cnx.db.collection(collection).updateMany(filter, { $set: obj });
            return result.modifiedCount;
        });
    }
    bulkUpdate(_mapping, _dialect, _query, _array) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new lambdaorm_base_1.MethodNotImplemented('MongodbConnection', 'bulkUpdate');
        });
    }
    getObject(mapping, dialect, query, data) {
        const sentence = JSON.parse(query.sentence);
        const params = this.dataToParameters(mapping, dialect, query, data);
        const obj = this.parseTemplate(mapping, dialect, sentence.set, params);
        for (const include of query.includes) {
            const children = data.get(include.relation.name);
            if (!children || !include.relation.composite) {
                continue;
            }
            const relationEntity = mapping.getEntity(include.relation.entity);
            if (relationEntity === undefined) {
                throw new lambdaorm_base_1.SchemaError(`EntityMapping ${include.relation.entity} not found`);
            }
            if (relationEntity.mapping === undefined) {
                throw new lambdaorm_base_1.SchemaError(`EntityMapping ${include.relation.entity} not found`);
            }
            const relationProperty = dialect.delimiter(relationEntity.mapping);
            if (include.relation.type === lambdaorm_base_1.RelationType.manyToOne) {
                const childList = [];
                for (const child of children) {
                    const childData = new lambdaorm_base_1.Data(child, data);
                    const childObj = this.getObject(mapping, dialect, include.query, childData);
                    childList.push(childObj);
                }
                obj[relationProperty] = childList;
            }
            else {
                const childData = new lambdaorm_base_1.Data(children, data);
                const childObj = this.getObject(mapping, dialect, include.query, childData);
                obj[relationProperty] = childObj;
            }
        }
        return obj;
    }
    delete(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = mapping.entityMapping(query.entity);
            const sentence = JSON.parse(query.sentence);
            const params = this.dataToParameters(mapping, dialect, query, data);
            const filter = this.parseTemplate(mapping, dialect, sentence.filter, params);
            const result = this.session
                ? yield this.cnx.db.collection(collection).deleteMany(filter, this.session)
                : yield this.cnx.db.collection(collection).deleteMany(filter);
            return result.modifiedCount;
        });
    }
    execute(_query) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new lambdaorm_base_1.MethodNotImplemented('MongodbConnection', 'execute');
        });
    }
    executeSentence(_sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new lambdaorm_base_1.MethodNotImplemented('MongodbConnection', 'executeSentence');
        });
    }
    executeDDL(_query) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new lambdaorm_base_1.MethodNotImplemented('MongodbConnection', 'executeDDL');
        });
    }
    beginTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            // https://www.MongoDB.com/docs/drivers/node/current/fundamentals/transactions/
            // https://hevodata.com/learn/MongoDB-transactions-on-nodejs/
            this.session = this.cnx.client.startSession();
            const transactionOptions = {
                readPreference: 'primary',
                readConcern: { level: 'local' },
                writeConcern: { w: 'majority' }
            };
            yield this.session.startTransaction(transactionOptions);
            this.inTransaction = true;
        });
    }
    commit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.session.endSession();
            this.inTransaction = false;
            this.session = null;
        });
    }
    rollback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.session.abortTransaction();
            this.inTransaction = false;
            this.session = null;
        });
    }
    arrayToList(mapping, dialect, query, template, array) {
        const list = [];
        for (const item of array) {
            let strObj;
            if (query.parameters && query.parameters.length > 0) {
                for (const param of query.parameters) {
                    const paramName = this.helper.query.transformParameter(param.name);
                    const itemValue = this.helper.obj.getValue(item, param.name);
                    const value = this.getValue(mapping, dialect, itemValue, param.type ? param.type : typ3s_1.Primitive.any);
                    strObj = this.helper.str.replace(strObj || template, `"$${paramName}$"`, value);
                }
            }
            else {
                strObj = template;
            }
            const obj = strObj ? JSON.parse(strObj) : {};
            list.push(obj);
        }
        return list;
    }
    parseTemplate(mapping, dialect, template, params) {
        let result;
        const row = {};
        if (params.length && params.length > 0) {
            for (const param of params) {
                const paramName = this.helper.query.transformParameter(param.name);
                const value = this.getValue(mapping, dialect, param.value, param.type ? param.type : typ3s_1.Primitive.any);
                result = this.helper.str.replace(result || template, `"$${paramName}$"`, value);
            }
        }
        else {
            result = template;
        }
        return result ? JSON.parse(result) : undefined;
    }
    getValue(mapping, dialect, source, type) {
        let value;
        if (source === undefined || source === null) {
            return 'null';
        }
        if (type === typ3s_1.Primitive.any) {
            return this.getAnyValue(mapping, dialect, source);
        }
        else if (typ3s_1.Type.isList(type)) {
            if (source.length === 0) {
                return '';
            }
            if (typeof source[0] === 'string') {
                return source.map((p) => `"${p}"`).join(',');
            }
            else {
                return source.join(',');
            }
        }
        else {
            switch (type) {
                case typ3s_1.Primitive.boolean:
                    return source ? 'true' : 'false';
                case typ3s_1.Primitive.string:
                    value = typeof source === 'string' ? source : source.toString();
                    value = this.helper.str.replace(value, '\n', '\\n');
                    value = this.helper.str.replace(value, '"', '\\"');
                    return `"${value}"`;
                case typ3s_1.Primitive.dateTime:
                    return `"${this.writeDateTime(source, mapping, dialect)}"`;
                case typ3s_1.Primitive.date:
                    return `"${this.writeDate(source, mapping, dialect)}"`;
                case typ3s_1.Primitive.time:
                    return `"${this.writeTime(source, mapping, dialect)}"`;
                default:
                    if (typeof source === 'string') {
                        value = this.helper.str.replace(source, '\n', '\\n');
                        value = this.helper.str.replace(value, '"', '\\"');
                        return `"${value}"`;
                    }
                    else {
                        return source;
                    }
            }
        }
    }
    getAnyValue(mapping, dialect, source) {
        if (source === undefined || source === null) {
            return null;
        }
        if (this.helper.val.isString(source)) {
            let value = this.helper.str.replace(source, '\n', '\\n');
            value = this.helper.str.replace(value, '"', '\\"');
            return `"${value}"`;
        }
        if (this.helper.val.isNumber(source)) {
            return source;
        }
        if (this.helper.val.isBoolean(source)) {
            return source ? 'true' : 'false';
        }
        if (this.helper.val.isDateTime(source)) {
            return `"${this.writeDateTime(source, mapping, dialect)}"`;
        }
        if (this.helper.val.isDate(source)) {
            return `"${this.writeDate(source, mapping, dialect)}"`;
        }
        if (this.helper.val.isTime(source)) {
            return `"${this.writeTime(source, mapping, dialect)}"`;
        }
        if (this.helper.val.isObject(source)) {
            return source;
        }
        if (this.helper.val.isArray(source)) {
            const value = [];
            for (const item of source) {
                value.push(this.getAnyValue(mapping, dialect, item));
            }
            return value;
        }
        return source;
    }
    getNextSequenceValue(sequence_1) {
        return __awaiter(this, arguments, void 0, function* (sequence, count = 1) {
            // https://www.MongoDB.com/docs/manual/reference/method/db.collection.findOneAndUpdate/#MongoDB-method-db.collection.findOneAndUpdate
            const sequenceDocument = yield this.cnx.db.collection('__sequences').findOneAndUpdate({ _id: sequence }, { $inc: { sequence_value: count } }, { returnNewDocument: true });
            return sequenceDocument.sequence_value;
        });
    }
    truncateEntity(mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = mapping.entityMapping(query.entity);
            yield this.cnx.db.collection(collection).delete_many({});
        });
    }
    createEntity(mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = mapping.entityMapping(query.entity);
            yield this.cnx.db.createCollection(collection);
        });
    }
    createSequence(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.cnx.db.collection('__sequences').insertOne(JSON.parse(query.sentence));
        });
    }
    createIndex(mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = mapping.entityMapping(query.entity);
            const data = JSON.parse(query.sentence);
            yield this.cnx.db.collection(collection).createIndex(data.properties, data.options);
        });
    }
    addPk(mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createIndex(mapping, query);
        });
    }
    addUk(mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createIndex(mapping, query);
        });
    }
    dropSequence(_mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const filter = JSON.parse(query.sentence);
            yield this.cnx.db.collection('__sequences').deleteOne(filter);
        });
    }
    dropEntity(mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            // https://www.w3schools.com/nodejs/nodejs_mongodb_drop.asp
            const collection = mapping.entityMapping(query.entity);
            yield this.cnx.db.collection(collection).drop();
        });
    }
    dropPk(mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = mapping.entityMapping(query.entity);
            yield this.cnx.db.collection(collection).dropIndex(query.sentence);
        });
    }
    dropUk(mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = mapping.entityMapping(query.entity);
            yield this.cnx.db.collection(collection).dropIndex(query.sentence);
        });
    }
    dropIndex(mapping, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = mapping.entityMapping(query.entity);
            yield this.cnx.db.collection(collection).dropIndex(query.sentence);
        });
    }
    objects(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const collectionNames = yield this.collectionNames();
            const entities = yield this.getEntities(mapping, collectionNames);
            for (const entity of entities) {
                result.push({ type: 'table', name: entity.name, tablespace: null });
            }
            return result;
        });
    }
    tables(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const collectionNames = JSON.parse(query.sentence);
            const entities = yield this.getEntities(mapping, collectionNames);
            for (const entity of entities) {
                if (!entity.properties)
                    continue;
                for (const property of entity.properties) {
                    const dbType = property.type || this.helper.schema.DEFAULT_TYPE;
                    const length = dbType === 'string' && !property.length ? this.helper.schema.DEFAULT_LENGTH : property.length;
                    result.push({
                        tableName: entity.name,
                        tablespace: null,
                        columnName: property.name,
                        dbType,
                        required: property.required,
                        autoIncrement: null,
                        length,
                        precision: null,
                        scale: null,
                        time: null
                    });
                }
            }
            return result;
        });
    }
    views(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    partitions(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new lambdaorm_base_1.MethodNotImplemented('MongodbConnection', 'partitions');
        });
    }
    sequences(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const sequences = yield this.cnx.db.collection('__sequences').find().toArray();
            for (const sequence of sequences) {
                result.push({
                    sequenceName: sequence._id,
                    startValue: 1,
                    increment: 1
                });
            }
            return result;
        });
    }
    foreignKeys(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const entityNames = JSON.parse(query.sentence);
            const entities = yield this.getEntities(mapping, entityNames);
            for (const entityName of entityNames) {
                const entity = entities.find(e => this.helper.schema.equalName(e.name, entityName));
                if (!entity || !entity.relations)
                    continue;
                for (const relation of entity.relations) {
                    result.push({
                        tableName: entity.name,
                        columnName: relation.from,
                        constraintName: `${relation.entity}${relation.to.startsWith('_') ? relation.to : '_' + relation.to}`,
                        refTableName: relation.entity,
                        refColumnName: relation.to,
                        composite: relation.composite,
                        type: relation.type
                    });
                }
            }
            return result;
        });
    }
    primaryKeys(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const collectionsNames = yield this.collectionNames();
            const entityNames = JSON.parse(query.sentence);
            const entities = yield this.getEntities(mapping, entityNames);
            for (const entityName of entityNames) {
                if (!collectionsNames.includes(entityName))
                    continue;
                const indexes = yield this.cnx.db.collection(entityName).listIndexes().toArray();
                const entity = entities.find(e => this.helper.schema.equalName(e.name, entityName));
                if (!entity || !entity.primaryKey)
                    continue;
                for (const primaryKey of entity.primaryKey) {
                    if (indexes.some((p) => Object.keys(p.key).includes(primaryKey))) {
                        result.push({
                            tableName: entity.name,
                            columnName: primaryKey,
                            constraintName: null
                        });
                    }
                }
            }
            return result;
        });
    }
    uniqueKeys(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = [];
            const collectionsNames = yield this.collectionNames();
            const entityNames = JSON.parse(query.sentence);
            const entities = yield this.getEntities(mapping, entityNames);
            for (const entityName of entityNames) {
                if (!collectionsNames.includes(entityName))
                    continue;
                const indexes = yield this.cnx.db.collection(entityName).listIndexes().toArray();
                const entity = entities.find(e => this.helper.schema.equalName(e.name, entityName));
                if (!entity || !entity.uniqueKey)
                    continue;
                for (const uniqueProperty of entity.uniqueKey) {
                    if (indexes.some((p) => p.unique && Object.keys(p.key).includes(uniqueProperty))) {
                        result.push({
                            tableName: entity.name,
                            columnName: uniqueProperty,
                            constraintName: null
                        });
                    }
                }
            }
            return result;
        });
    }
    indexes(mapping, dialect, query, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const result = [];
            const collectionsNames = yield this.collectionNames();
            const entityNames = JSON.parse(query.sentence);
            const entities = yield this.getEntities(mapping, entityNames);
            for (const entityName of entityNames) {
                if (!collectionsNames.includes(entityName))
                    continue;
                const indexes = yield this.cnx.db.collection(entityName).listIndexes().toArray();
                const entity = entities.find(e => this.helper.schema.equalName(e.name, entityName));
                for (const index of indexes) {
                    const keys = Object.keys(index.key);
                    for (const key of keys) {
                        if (!entity || (((_a = entity.primaryKey) === null || _a === void 0 ? void 0 : _a.includes(key)) || ((_b = entity.uniqueKey) === null || _b === void 0 ? void 0 : _b.includes(key))))
                            continue;
                        result.push({
                            tableName: entity.name,
                            indexName: index.name,
                            columnName: key,
                            isUnique: (index.unique || index.name === '_id_'),
                            isPrimary: index.name === '_id_'
                        });
                    }
                }
            }
            return result;
        });
    }
    collectionNames() {
        return __awaiter(this, void 0, void 0, function* () {
            const collections = yield this.cnx.db.listCollections().toArray();
            return collections.filter((p) => p.name !== '__sequences').map((p) => p.name);
        });
    }
    getEntities(mapping, collectionNames) {
        return __awaiter(this, void 0, void 0, function* () {
            const createEntitiesService = new lambdaorm_base_1.CreateEntitiesService(this.helper.schema);
            const result = [];
            for (const collectionName of collectionNames) {
                const collection = mapping.entityMapping(collectionName);
                if (!collection)
                    continue;
                const data = yield this.cnx.db.collection(collection).find().toArray();
                const type = typ3s_1.Type.type(data, { info: true, describe: true });
                const entities = createEntitiesService.getEntities(collectionName, type);
                result.push(...entities);
            }
            return result;
        });
    }
}
exports.MongodbConnectionAdapter = MongodbConnectionAdapter;
//# sourceMappingURL=MongoDB.js.map