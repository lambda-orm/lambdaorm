"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoSqlDmlBuilder = void 0;
/* eslint-disable no-tabs */
const _3xpr_1 = require("3xpr");
const lambdaorm_base_1 = require("lambdaorm-base");
const domain_1 = require("../../../../query/domain");
const dmlBuilder_1 = require("../base/dmlBuilder");
class NoSqlDmlBuilder extends dmlBuilder_1.DmlBuilderBase {
    build(sentence) {
        const info = this.helper.query.getInfo(sentence.action, sentence.entity);
        const includes = [];
        if (info.type !== lambdaorm_base_1.SentenceType.dql) {
            const sentenceIncludes = sentence.getCompositeIncludes();
            for (const sentenceInclude of sentenceIncludes) {
                const childSentence = sentenceInclude.children[0];
                const childQuery = this.build(childSentence);
                const include = new domain_1.Include(sentenceInclude.name, childQuery, sentenceInclude.relation);
                includes.push(include);
            }
        }
        const textSentence = this.buildSentence(sentence);
        return new domain_1.Query({
            action: info.action,
            type: info.type,
            category: info.category,
            description: `${info.action} ${sentence.entity}`,
            dialect: this.source.dialect,
            source: this.source.name,
            sentence: textSentence,
            entity: sentence.entity,
            columns: sentence.columns,
            parameters: sentence.parameters,
            constraints: sentence.constraints,
            values: sentence.values,
            defaults: sentence.defaults,
            includes
        });
    }
    buildSelectSentence(sentence) {
        const map = sentence.children.find(p => p.name === 'map');
        const joins = sentence.children.filter(p => p instanceof lambdaorm_base_1.Join);
        const filter = sentence.children.find(p => p.name === 'filter');
        const groupBy = sentence.children.find(p => p.name === 'groupBy');
        const having = sentence.children.find(p => p.name === 'having');
        const sort = sentence.children.find(p => p.name === 'sort');
        const page = sentence.children.find(p => p.name === 'page');
        const entity = this.mapping.getEntity(sentence.entity);
        if (entity === undefined) {
            throw new lambdaorm_base_1.SchemaError(`mapping undefined on ${sentence.entity} entity`);
        }
        if (map === undefined) {
            throw new lambdaorm_base_1.SchemaError('map operator not found');
        }
        const query = [];
        if (entity.composite) {
            query.push(...this.buildReplaceRoot(entity));
        }
        if (joins.length > 0) {
            query.push(...this.buildJoins(entity, joins));
        }
        if (filter) {
            query.push(...this.buildFilter(filter));
        }
        if (groupBy || this.hadGroupFunction(map)) {
            query.push(...this.getGroupBy(map, sentence));
            if (having) {
                query.push(...this.getHaving(query, having));
            }
        }
        else {
            query.push(...this.getMap(map, sentence));
        }
        if (sort) {
            const sortText = this.buildArrowFunction(sort);
            query.push(JSON.parse(sortText));
        }
        const projects = query.filter(p => p.$project !== undefined);
        if (projects.length > 0) {
            // replace the number values with $literal
            for (const project of projects) {
                for (const entry of Object.entries(project.$project)) {
                    if (entry[0] !== '_id' && this.helper.val.isNumber(entry[1])) {
                        project.$project[entry[0]] = { $literal: entry[1] };
                    }
                }
            }
        }
        else {
            query.push({ $project: { _id: 0 } });
        }
        let text = JSON.stringify(query);
        if (page) {
            // remove the first "[" and last "]" character
            text = text.substring(1);
            text = text.substring(0, text.length - 1);
            text = this.buildPage(text, page);
            return '[' + text + ']';
        }
        else {
            return text;
        }
    }
    buildInsertSentence(sentence) {
        var _a;
        const insert = sentence.action === 'bulkInsert'
            ? sentence.children.find(p => p instanceof lambdaorm_base_1.BulkInsert)
            : sentence.children.find(p => p instanceof lambdaorm_base_1.Insert);
        const entity = this.mapping.getEntity(sentence.entity);
        if (entity === undefined) {
            throw new lambdaorm_base_1.SchemaError(`mapping undefined on ${sentence.entity} entity`);
        }
        if (insert === undefined) {
            throw new lambdaorm_base_1.SchemaError('insert operand not found');
        }
        const assigns = [];
        const template = this.dialect.dml('insert');
        const templateAssign = this.dialect.operator('=', 2);
        if (insert.children[0].type === _3xpr_1.OperandType.Obj) {
            const obj = insert.children[0];
            for (const p in obj.children) {
                const keyVal = obj.children[p];
                let name;
                const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(q => q.name === keyVal.name);
                if (property) {
                    name = property.mapping;
                }
                else {
                    name = keyVal.name;
                }
                // let name: string
                // if (keyVal.property !== undefined) {
                // const property = entity.properties.find(q => q.name === keyVal.property)
                // if (property === undefined) {
                // throw new SchemaError(`not found property ${entity.name}.${keyVal.property}`)
                // }
                // name = property.mapping
                // } else {
                // name = keyVal.name
                // }
                const value = this.buildOperand(keyVal.children[0]);
                let assign = this.helper.str.replace(templateAssign, '{0}', name);
                assign = this.helper.str.replace(assign, '{1}', value);
                assigns.push(assign);
            }
        }
        return this.helper.str.replace(template, '{assigns}', assigns.join(','));
    }
    buildUpdateSentence(sentence) {
        var _a;
        const filter = sentence.children.find(p => p instanceof lambdaorm_base_1.Filter);
        // Keep in mind that when there are includes, the set must only be in the root.
        // maybe the set should be in the connection
        const entity = this.mapping.getEntity(sentence.entity);
        const update = sentence.children.find(p => p instanceof lambdaorm_base_1.Update);
        if (entity === undefined) {
            throw new lambdaorm_base_1.SchemaError(`mapping undefined on ${sentence.entity} entity`);
        }
        if (update === undefined) {
            throw new lambdaorm_base_1.SintaxisError('update operand not found');
        }
        const template = this.dialect.dml('update');
        const templateAssign = this.dialect.operator('=', 2);
        const assigns = [];
        if (update.children[0].type === _3xpr_1.OperandType.Obj) {
            const obj = update.children[0];
            for (const p in obj.children) {
                const keyVal = obj.children[p];
                let name;
                const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(q => q.name === keyVal.name);
                if (property) {
                    name = property.mapping;
                }
                else {
                    name = keyVal.name;
                }
                const field = this.dialect.delimiter(name, false, true);
                const value = this.buildOperand(keyVal.children[0]);
                let assign = this.helper.str.replace(templateAssign, '{0}', field);
                assign = this.helper.str.replace(assign, '{1}', value);
                assigns.push(assign);
            }
        }
        const set = this.helper.str.replace(template, '{assigns}', assigns.join(','));
        const data = {
            set,
            filter: filter ? this.buildArrowFunction(filter) : '{}'
        };
        return JSON.stringify(data);
    }
    buildDeleteSentence(sentence) {
        const entity = this.mapping.getEntity(sentence.entity);
        const filter = sentence.children.find(p => p.name === 'filter');
        if (entity === undefined) {
            throw new lambdaorm_base_1.SchemaError(`mapping undefined on ${sentence.entity} entity`);
        }
        // keep in mind that when there are includes
        const data = {
            filter: filter ? this.buildArrowFunction(filter) : {}
        };
        return JSON.stringify(data);
    }
    buildField(operand) {
        if (this.mapping.existsProperty(operand.entity, operand.name)) {
            const property = this.mapping.getProperty(operand.entity, operand.name);
            let templateKey;
            if (operand.alias === undefined) {
                templateKey = 'column';
            }
            else if (operand.isRoot) {
                templateKey = 'field';
            }
            else {
                templateKey = operand.prefix ? 'projectJoinField' : 'joinField';
            }
            let text = this.dialect.other(templateKey);
            text = this.helper.str.replace(text, '{entityAlias}', operand.alias || '');
            text = this.helper.str.replace(text, '{prefix}', operand.prefix || '');
            text = this.helper.str.replace(text, '{name}', property.mapping);
            return text;
        }
        else {
            return this.dialect.delimiter(operand.name, true);
        }
    }
    buildObject(operand) {
        let text = '';
        const template = this.dialect.function('as').template;
        for (let i = 0; i < operand.children.length; i++) {
            const child = operand.children[i];
            const value = this.buildOperand(child);
            if (child.children.length === 1 && [_3xpr_1.OperandType.List, _3xpr_1.OperandType.Obj].includes(child.children[0].type)) {
                text = value;
            }
            else {
                const alias = this.dialect.delimiter(child.name, true);
                let fieldText = this.helper.str.replace(template, '{value}', value);
                fieldText = this.helper.str.replace(fieldText, '{alias}', alias);
                text += (i > 0 ? ', ' : '') + fieldText;
            }
        }
        return text;
    }
    buildReplaceRoot(entity) {
        const parts = entity.name.split('.');
        const mappings = [];
        for (let i = 1; i < parts.length; i++) {
            const childEntityName = parts.slice(0, i + 1).join('.');
            const childEntity = this.mapping.getEntity(childEntityName);
            if (childEntity === undefined) {
                throw new lambdaorm_base_1.SchemaError(`child entity  ${childEntityName} not found in ${entity.name}`);
            }
            mappings.push(this.dialect.delimiter(childEntity.mapping || childEntity.name, true));
        }
        const parentEntityName = parts.slice(0, parts.length - 1).join('.');
        const parentEntity = this.mapping.getEntity(parentEntityName);
        if (parentEntity === undefined) {
            throw new lambdaorm_base_1.SchemaError(`parent entity  ${parentEntityName} not found in ${entity.name}`);
        }
        const relationName = parts[parts.length - 1];
        const relation = parentEntity.relations ? parentEntity.relations.find(p => p.name === relationName) : undefined;
        if (relation === undefined) {
            throw new lambdaorm_base_1.SchemaError(`relation ${relationName} not found in ${parentEntityName}`);
        }
        let newRoot = `$${mappings.join('.')}`;
        newRoot = this.helper.str.replace(newRoot, '"', '\\"');
        let text = '';
        if (relation.type === lambdaorm_base_1.RelationType.manyToOne) {
            text = this.helper.str.replace(this.dialect.dml('unwind'), '{0}', newRoot);
        }
        const replaceRootTemplate = this.dialect.dml('replaceRoot');
        newRoot = this.helper.str.replace(replaceRootTemplate, '{0}', newRoot);
        text = text !== '' ? `${text}, ${newRoot}` : newRoot;
        return JSON.parse('[' + text + ']');
    }
    getHaving(query, having) {
        // const groupByClause = JSON.parse('[' + groupByStringClause + ']')
        const groupByClause = query.find((p) => p.$group !== undefined);
        const groupKeyValues = Object.entries(groupByClause.$group);
        const toReplaces = [];
        this.solveHaving(having.children[0], groupKeyValues, toReplaces);
        let havingStringClause = this.buildArrowFunction(having);
        for (const toReplace of toReplaces) {
            havingStringClause = this.helper.str.replace(havingStringClause, toReplace[0], `"${toReplace[1]}"`);
        }
        havingStringClause = this.helper.str.replace(havingStringClause, '{ {', '{');
        havingStringClause = this.helper.str.replace(havingStringClause, '} }', '}');
        return JSON.parse('[' + havingStringClause + ']');
    }
    solveHaving(operand, groupKeyValues, toReplaces) {
        for (let i = 0, length = operand.children.length; i < length; i++) {
            const child = operand.children[i];
            if (this.hadGroupFunction(child)) {
                const clause = this.buildOperand(child);
                const groupKeyValue = groupKeyValues.find(p => this.helper.str.equal(JSON.stringify(p[1]), clause, { normalize: true }));
                if (groupKeyValue) {
                    toReplaces.push([clause, groupKeyValue[0]]);
                }
            }
            else if (child.children && child.children.length > 0) {
                this.solveHaving(child, groupKeyValues, toReplaces);
            }
        }
        /* Solve the problem of having with groupBy
        / example: Products.having(p => max(p.price) > 100).map(p => ({ category: p.category.name, largestPrice: max(p.price) }))
        / { "$match" : { "max(p.price)": { "$gt": 100 } } }
        / replace for
        / { "$match" : { "largestPrice": { "$gt": 100 } } }
        */
    }
    getGroupBy(map, sentence) {
        this.setPrefixToField(map, '$');
        let projectColumns = '';
        const columns = [];
        const groupColumns = [];
        if (map.children[0].type === _3xpr_1.OperandType.Obj) {
            const obj = map.children[0];
            for (const p in obj.children) {
                const keyValue = obj.children[p];
                let column;
                if (this.hadGroupFunction(keyValue.children[0])) {
                    groupColumns.push(keyValue);
                    column = `"${keyValue.name}":"$${keyValue.name}"`;
                }
                else {
                    columns.push(keyValue);
                    column = `"${keyValue.name}":"$_id.${keyValue.name}"`;
                }
                if (projectColumns) {
                    projectColumns = `${projectColumns} , ${column}`;
                }
                else {
                    projectColumns = `${column}`;
                }
            }
        }
        let columnsText = this.buildOperand(new _3xpr_1.Operand(map.pos, 'obj', _3xpr_1.OperandType.Obj, columns));
        const groupColumnsText = this.buildOperand(new _3xpr_1.Operand(map.pos, 'obj', _3xpr_1.OperandType.Obj, groupColumns));
        const composite = this.getComposite(sentence);
        if (composite) {
            columnsText = `${columnsText} ,${composite}`;
        }
        const templateGroup = this.dialect.dml('rootGroupBy');
        const templateProject = this.dialect.dml('rootMap');
        let text = this.helper.str.replace(templateGroup, '{0}', columnsText);
        text = this.helper.str.replace(text, '{1}', groupColumnsText);
        text = text + ', ' + this.helper.str.replace(templateProject, '{0}', projectColumns);
        // In the templates process $$ is being replaced by $, for this $this is replaced. for $$this.
        text = this.helper.str.replace(text, '"$this.', '"$$this.');
        return JSON.parse('[' + text + ']');
    }
    getMap(map, sentence) {
        this.setPrefixToField(map, '$');
        let mapText = this.buildArrowFunction(map);
        const composite = this.getComposite(sentence);
        if (composite) {
            mapText = `${mapText} ,${composite}`;
        }
        if (map.children[0].type === _3xpr_1.OperandType.CallFunc && map.children[0].name === 'distinct') {
            // https://www.MongoDB.com/docs/manual/reference/operator/aggregation/group/
            return JSON.parse('[' + mapText + ']');
        }
        else {
            const template = this.dialect.dml('rootMap');
            const text = this.helper.str.replace(template, '{0}', mapText);
            return JSON.parse('[' + text + ']');
            // 			$map: {
            // 				input: '$"Order Details"',
            // 				in: {
            // 					price: "$$this.UnitPrice",
            // 					qty: "$$this.Quantity"
            // 				}
            // 			}
            // 		}
            // 	}
            // }
        }
    }
    getComposite(sentence) {
        const includes = sentence.getCompositeIncludes();
        if (includes.length > 0) {
            let text = '';
            const compositeTemplate = this.dialect.dml('composite');
            for (const p in includes) {
                const include = includes[p];
                const relationEntity = this.mapping.getEntity(include.relation.entity);
                if (relationEntity === undefined) {
                    throw new lambdaorm_base_1.SchemaError(`EntityMapping ${include.relation.entity} not found`);
                }
                // see what happens when the property to be related is already a child
                // see if $$This should go. instead of $
                // const relationProperty = `"$\\\"${relationEntity.mapping}\\\""`
                const relationProperty = `"$\\"${relationEntity.mapping}\\""`;
                const relationMap = this.getChildrenMap(include.children[0]);
                let compositeText = this.helper.str.replace(compositeTemplate, '{name}', include.relation.name);
                compositeText = this.helper.str.replace(compositeText, '{input}', relationProperty);
                compositeText = this.helper.str.replace(compositeText, '{in}', relationMap);
                text = text === '' ? compositeText : `${text} ,${compositeText}`;
            }
            return text;
        }
        else {
            return undefined;
        }
    }
    getChildrenMap(sentence) {
        // https://stackoverflow.com/questions/61173117/MongoDB-get-index-of-current-element-in-array
        const mapOperator = sentence.children.find(p => p.name === 'map');
        if (mapOperator === undefined) {
            throw new lambdaorm_base_1.SchemaError('map operator not found');
        }
        this.setPrefixToField(mapOperator, '$$this.');
        let map = this.buildArrowFunction(mapOperator);
        const composite = this.getComposite(sentence);
        if (composite) {
            map = `${map} ,${composite}`;
        }
        return map;
    }
    buildJoins(entity, joins) {
        // Example: https://www.w3schools.com/nodejs/nodejs_mongodb_join.asp
        // Example: https://stackoverflow.com/questions/69097870/how-to-join-multiple-collection-in-MongoDB
        // https://javascript.tutorialink.com/MongoDB-get-sum-of-fields-in-last-stage-of-aggregate/
        let text = '';
        const template = this.dialect.dml('join');
        for (const join of joins) {
            this.setPrefixToField(join, '$');
            const joinEntity = this.mapping.getEntity(join.name);
            if (joinEntity === undefined) {
                throw new lambdaorm_base_1.SchemaError(`not found mapping for ${join.name}`);
            }
            const foreignField = join.children[0].children[0];
            const localField = join.children[0].children[1];
            const alias = entity.name !== join.entity ? localField.alias : undefined;
            let joinTemplate = this.helper.str.replace(template, '{name}', this.dialect.delimiter(joinEntity.mapping || joinEntity.name, true));
            joinTemplate = this.helper.str.replace(joinTemplate, '{fromProperty}', this.getFieldMapping(localField));
            joinTemplate = this.helper.str.replace(joinTemplate, '{toProperty}', this.getFieldMapping(foreignField, alias));
            joinTemplate = this.helper.str.replace(joinTemplate, '{alias}', this.dialect.delimiter(join.alias, true));
            text = text !== '' ? `${text}, ${joinTemplate}` : joinTemplate;
        }
        return JSON.parse('[' + text + ']');
        // Example
        // {
        // 	$lookup: {
        // 		from: "Categories",
        // 		localField: "CategoryID",
        // 		foreignField: "_id",
        // 		as: "p"
        // 	}
        // },
        // {
        // 	$project: {
        // 		"name": "$ProductName",
        // 		"category": { $arrayElemAt: ["$p.CategoryName", 0] },
        // 	}
        // }
        // Example multiple joins
        // [
        // 	//https://stackoverflow.com/questions/64515836/how-to-replace-root-with-an-array-field-during-MongoDB-aggregation-pipeline
        // 	// unwind solo aplica si el child es un array
        // 	{ $unwind: "$\"Order Details\"" },
        // 	{ $replaceRoot: { newRoot: "$\"Order Details\"" } },
        // 	{
        // 		"$lookup": {
        // 			"from": "Orders",
        // 			"localField": "OrderID",
        // 			"foreignField": "_id",
        // 			"as": "o1"
        // 		}
        // 	},
        // 	{
        // 		"$lookup": {
        // 			"from": "Products",
        // 			"localField": "ProductID",
        // 			"foreignField": "_id",
        // 			"as": "p"
        // 		}
        // 	},
        // 	{
        // 		"$lookup": {
        // 			"from": "Categories",
        // 			"localField": "CategoryID",
        // 			"foreignField": "p._id",
        // 			"as": "c"
        // 		}
        // 	},
        // 	{
        // 		"$match": {
        // 			"$and": [{ "UnitPrice": { "$gt": 10 } }, { "o1.ShippedDate": { $gte: "1997-01-01", $lt: "1997-12-31" } }]
        // 		}
        // 	},
        // 	{
        // 		"$project": {
        // 			"_id": 0,
        // 			"category": {
        // 				"$arrayElemAt": ["$c.CategoryName", 0]
        // 			},
        // 			"product": {
        // 				"$arrayElemAt": ["$p.ProductName", 0]
        // 			},
        // 			"unitPrice": "$UnitPrice",
        // 			"quantity": "$Quantity"
        // 		}
        // 	}
        // 	, {
        // 		"$sort": {
        // 			"category": 1,
        // 			"product": 1
        // 		}
        // 	}
        // ]
    }
    buildFilter(operand) {
        // TODO: It remains to be resolved if the fields to filter correspond to an include composite.
        // this.setPrefixToField(operand, '$')
        const template = this.dialect.dml('rootFilter');
        const text = this.helper.str.replace(template, '{0}', this.buildArrowFunction(operand));
        return JSON.parse('[' + text + ']');
    }
    getFieldMapping(operand, alias) {
        let name = '';
        if (this.mapping.existsProperty(operand.entity, operand.name)) {
            const property = this.mapping.getProperty(operand.entity, operand.name);
            name = property.mapping;
        }
        else {
            name = operand.name;
        }
        if (alias) {
            return this.dialect.delimiter(alias + '.' + name, true);
        }
        else {
            return this.dialect.delimiter(name, true);
        }
    }
    setPrefixToField(operand, prefix) {
        if (operand instanceof lambdaorm_base_1.Field) {
            operand.prefix = prefix;
        }
        if (operand.children !== null && operand.children !== undefined) {
            for (const p in operand.children) {
                const child = operand.children[p];
                if (child.type === _3xpr_1.OperandType.Operator && (child.name === '=' || child.name === '==' || child.name === '===' || child.name === '!=' || child.name === '!==')) {
                    // solo debe agregar $ si el field esta del lado del value   {key:value}
                    // pero en este caso { "$match" : { "$_id":{{id}} } }  no debería agregarlo al key = _id"
                    const valueOperand = child.children[1];
                    this.setPrefixToField(valueOperand, prefix);
                }
                else {
                    this.setPrefixToField(child, prefix);
                }
            }
        }
    }
    hadGroupFunction(operand) {
        if (operand.type === _3xpr_1.OperandType.CallFunc && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].includes(operand.name)) {
            return true;
        }
        if (operand.children) {
            for (const p in operand.children) {
                const child = operand.children[p];
                if (this.hadGroupFunction(child)) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.NoSqlDmlBuilder = NoSqlDmlBuilder;
//# sourceMappingURL=NoSqlDmlBuilder.js.map