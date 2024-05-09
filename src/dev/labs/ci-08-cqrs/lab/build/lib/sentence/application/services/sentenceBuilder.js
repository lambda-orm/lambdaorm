"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceBuilder = void 0;
/* eslint-disable no-case-declarations */
const lambdaorm_base_1 = require("lambdaorm-base");
const _3xpr_1 = require("3xpr");
const typeService_1 = require("./typeService");
const sentenceHelper_1 = require("./sentenceHelper");
const typ3s_1 = require("typ3s");
class EntityContext {
    // eslint-disable-next-line no-use-before-define
    constructor(parent) {
        this.parent = parent;
        if (parent)
            parent.children.push(this);
        this.entityName = '';
        this.alias = '';
        this.arrowVar = '';
        this.children = [];
        this.joins = {};
        this.fields = [];
        this.groupByFields = [];
    }
}
class ExpressionContext {
    constructor(current) {
        this.current = current;
        this.aliases = {};
    }
}
class SentenceSolveConstraints {
    // eslint-disable-next-line no-useless-constructor
    constructor(modelConfig, helper, expressions) {
        this.modelConfig = modelConfig;
        this.helper = helper;
        this.expressions = expressions;
    }
    solve(sentence) {
        if (sentence.name === lambdaorm_base_1.SentenceAction.update ||
            sentence.name === lambdaorm_base_1.SentenceAction.insert ||
            sentence.name === lambdaorm_base_1.SentenceAction.bulkInsert) {
            sentence.constraints = this.getConstraints(sentence.entity, sentence.parameters);
        }
    }
    getConstraints(entityName, parameters) {
        const queryProperties = this.helper.getPropertiesFromParameters(entityName, parameters);
        const entity = this.modelConfig.getEntity(entityName);
        if (entity === undefined) {
            return [];
        }
        const constraints = [];
        this.addEntityConstraints(entity, queryProperties, constraints);
        this.addPropertiesConstraints(entityName, queryProperties, constraints);
        return constraints;
    }
    addEntityConstraints(entity, queryProperties, constraints) {
        if (entity.constraints) {
            for (const constraint of entity.constraints) {
                const conditionProperties = this.expressions.parameters(constraint.condition);
                let all = true;
                for (const conditionParameter of conditionProperties) {
                    if (!queryProperties.find(p => p.name === conditionParameter.name)) {
                        all = false;
                        break;
                    }
                }
                if (all) {
                    constraints.push(constraint);
                }
            }
        }
    }
    addPropertiesConstraints(entityName, queryProperties, constraints) {
        for (const property of queryProperties) {
            if (property.required && property.default === undefined && property.key === undefined) {
                const constraint = {
                    message: `Cannot be null property ${property.name} in entity ${entityName}`,
                    condition: `isNotNull(${property.name})`
                };
                constraints.push(constraint);
            }
            if (property.enum) {
                const _enum = this.modelConfig.getEnum(property.enum);
                if (_enum && _enum.values) {
                    const values = _enum.values.map(p => typeof p.value === 'number' ? p.value : '"' + p.value + '"').join(',');
                    const constraint = {
                        message: `invalid value for property ${property.name} in entity ${entityName}`,
                        condition: `${property.name}.in(${values})`
                    };
                    constraints.push(constraint);
                }
            }
        }
    }
}
class SentenceSolveBehaviors {
    constructor(modelConfig, helper) {
        this.modelConfig = modelConfig;
        this.helper = helper;
    }
    solve(sentence) {
        switch (sentence.name) {
            case lambdaorm_base_1.SentenceAction.select:
                this.solveSelect(sentence);
                break;
            case lambdaorm_base_1.SentenceAction.insert:
            case lambdaorm_base_1.SentenceAction.bulkInsert:
                this.solveInsert(sentence);
                break;
            case lambdaorm_base_1.SentenceAction.update:
                this.solveUpdate(sentence);
                break;
        }
    }
    solveSelect(sentence) {
        const map = sentence.children.find(p => p.name === 'map');
        sentence.values = this.getBehaviorReadValues(sentence.entity, map);
    }
    solveInsert(sentence) {
        sentence.values = this.getBehaviorWriteValues(sentence.entity, sentence.parameters);
        sentence.defaults = this.getBehaviorDefaults(sentence.entity);
    }
    solveUpdate(sentence) {
        sentence.values = this.getBehaviorWriteValues(sentence.entity, sentence.parameters);
    }
    getBehaviorDefaults(entityName) {
        const behaviors = [];
        const entity = this.modelConfig.getEntity(entityName);
        if (entity && entity.properties) {
            for (const i in entity.properties) {
                const property = entity.properties[i];
                if (property.default) {
                    behaviors.push({ property: property.name, expression: property.default });
                }
            }
        }
        return behaviors;
    }
    getBehaviorReadValues(entityName, operand) {
        var _a;
        const entity = this.modelConfig.getEntity(entityName);
        if (entity === undefined || operand.children.length !== 1) {
            return [];
        }
        const child = (operand.children[0].type === _3xpr_1.OperandType.CallFunc && operand.children[0].name === 'distinct')
            ? operand.children[0].children[0]
            : operand.children[0];
        if (!(child.type === _3xpr_1.OperandType.Obj)) {
            return [];
        }
        const behaviors = [];
        const obj = child;
        for (const keyVal of obj.children) {
            if (!(keyVal.children[0] instanceof lambdaorm_base_1.Field)) {
                continue;
            }
            const field = keyVal.children[0];
            const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(q => q.name === field.name);
            if (property && property.readValue) {
                const behavior = { alias: keyVal.name, property: property.name, expression: property.readValue };
                behaviors.push(behavior);
            }
        }
        return behaviors;
    }
    getBehaviorWriteValues(entityName, parameters) {
        const behaviors = [];
        const properties = this.helper.getPropertiesFromParameters(entityName, parameters);
        if (properties) {
            for (const property of properties) {
                if (property.writeValue) {
                    behaviors.push({ property: property.name, expression: property.writeValue });
                }
            }
        }
        return behaviors;
    }
}
class SentenceBuilder {
    constructor(schemaState, operandFacade, expressions, ormHelper) {
        this.schemaState = schemaState;
        this.operandFacade = operandFacade;
        this.expressions = expressions;
        this.domainConfigService = this.schemaState.domain;
        this.typeService = new typeService_1.SentenceTypeService(expressions, this.schemaState.domain, ormHelper);
        this.helper = new sentenceHelper_1.SentenceHelper(this.schemaState, ormHelper);
        this.solveBehaviors = new SentenceSolveBehaviors(this.schemaState.domain, this.helper);
        this.solveConstraints = new SentenceSolveConstraints(this.domainConfigService, this.helper, this.expressions);
    }
    build(expression) {
        const operand = this.operandFacade.build(expression);
        // it clones the operand because it is going to modify it and it should not alter the operand passed by parameter
        const cloned = this.expressions.clone(operand);
        const sentence = this.createSentence(cloned, new ExpressionContext(new EntityContext()));
        return sentence;
    }
    createSentence(operand, expressionContext) {
        expressionContext.current = new EntityContext(expressionContext.current);
        const clauses = this.operandFacade.getClauses(operand);
        expressionContext.current.entityName = clauses.from.name;
        // expressionContext.curreOrders.bulkInsert().include(p => [p.details, p.customer])nt.metadata = this.modelConfig.getEntity(expressionContext.current.entityName)
        expressionContext.current.alias = this.createAlias(expressionContext, expressionContext.current.entityName);
        const children = [];
        let child;
        if (clauses.filter) {
            // TODO: If the statement is Select, Update or Delete and the entity has one or more properties with key.
            // The filter must be added by this key
            const clause = clauses.filter;
            child = this.createClause(clause, expressionContext);
            children.push(child);
        }
        if (clauses.from) {
            child = new lambdaorm_base_1.From(operand.pos, 'from', [], expressionContext.current.entityName, expressionContext.current.alias);
            children.push(child);
        }
        let sentence;
        if (clauses.map) {
            sentence = this.createSentenceSelect(operand.pos, clauses, expressionContext, children);
        }
        else if (clauses.insert) {
            sentence = this.createSentenceModify(operand.pos, lambdaorm_base_1.SentenceAction.insert, clauses, expressionContext, children);
        }
        else if (clauses.bulkInsert) {
            sentence = this.createSentenceModify(operand.pos, lambdaorm_base_1.SentenceAction.bulkInsert, clauses, expressionContext, children);
        }
        else if (clauses.update) {
            sentence = this.createSentenceModify(operand.pos, lambdaorm_base_1.SentenceAction.update, clauses, expressionContext, children);
        }
        else if (clauses.delete) {
            sentence = this.createSentenceDelete(operand.pos, clauses, expressionContext, children);
        }
        expressionContext.current = expressionContext.current.parent ? expressionContext.current.parent : new EntityContext();
        if (!sentence) {
            throw new lambdaorm_base_1.SintaxisError('Sentence incomplete');
        }
        this.typeService.getType(sentence);
        // Solve columns
        sentence.columns = this.helper.getColumns(sentence);
        sentence.parameters = this.helper.getParameters(sentence);
        this.solveBehaviors.solve(sentence);
        this.solveConstraints.solve(sentence);
        return sentence;
    }
    createSentenceSelect(pos, clauses, expressionContext, children) {
        const mapOperand = this.createMapClause(clauses.map, expressionContext);
        this.solveAsteriskFields(mapOperand, expressionContext);
        expressionContext.current.fields = this.helper.fieldsInSelect(mapOperand);
        expressionContext.current.groupByFields = this.helper.groupByFields(mapOperand);
        children.push(mapOperand);
        const entityName = expressionContext.current.entityName;
        const alias = expressionContext.current.alias;
        if (expressionContext.current.groupByFields.length > 0) {
            const fields = [];
            for (const groupByField of expressionContext.current.groupByFields) {
                fields.push(groupByField.clone());
            }
            if (fields.length === 1) {
                children.push(new lambdaorm_base_1.GroupBy(pos, 'groupBy', fields, entityName, alias));
            }
            else {
                const array = new _3xpr_1.Operand(pos, 'array', _3xpr_1.OperandType.List, fields);
                children.push(new lambdaorm_base_1.GroupBy(pos, 'groupBy', [array], entityName, alias));
            }
        }
        if (clauses.having) {
            children.push(this.createClause(clauses.having, expressionContext));
        }
        if (clauses.sort) {
            children.push(this.createClause(clauses.sort, expressionContext));
        }
        if (clauses.page) {
            if (!clauses.sort) {
                throw new lambdaorm_base_1.SintaxisError('Sort clause is required when using Page clause');
            }
            const pageChildren = clauses.page.children.filter((p) => p.type !== _3xpr_1.OperandType.Arrow).map((q) => this.solveFields(q, expressionContext, false));
            children.push(new lambdaorm_base_1.Page(pos, clauses.page.name, pageChildren, entityName, alias));
        }
        if (clauses.include) {
            this.createSentenceAddIncludes(expressionContext, clauses, this.createSelectInclude, children);
        }
        this.createSentenceAddJoins(mapOperand.pos, expressionContext, children);
        return new lambdaorm_base_1.Sentence(pos, lambdaorm_base_1.SentenceAction.select, children, expressionContext.current.entityName, expressionContext.current.alias);
    }
    createSentenceModify(pos, name, clauses, expressionContext, children) {
        // TODO: If the entity has one or more properties with key.
        // These properties must be added using the key
        let operand;
        if (name === lambdaorm_base_1.SentenceAction.insert) {
            operand = this.createInsertClause(clauses.insert, expressionContext);
        }
        else if (name === lambdaorm_base_1.SentenceAction.bulkInsert) {
            operand = this.createInsertClause(clauses.bulkInsert, expressionContext);
        }
        else if (name === lambdaorm_base_1.SentenceAction.update) {
            operand = this.createUpdateClause(clauses.update, expressionContext);
        }
        else {
            throw new lambdaorm_base_1.SintaxisError('clause modify undefined');
        }
        expressionContext.current.fields = this.helper.fieldsInModify(operand, expressionContext.current.entityName);
        children.push(operand);
        if (clauses.include) {
            this.createSentenceAddIncludes(expressionContext, clauses, this.createInclude, children);
        }
        return new lambdaorm_base_1.Sentence(pos, name, children, expressionContext.current.entityName, expressionContext.current.alias);
    }
    createSentenceDelete(pos, clauses, expressionContext, children) {
        const operand = new lambdaorm_base_1.Delete(pos, 'delete', [], expressionContext.current.entityName, expressionContext.current.alias);
        children.push(operand);
        if (clauses.include) {
            this.createSentenceAddIncludes(expressionContext, clauses, this.createInclude, children);
        }
        return new lambdaorm_base_1.Sentence(pos, lambdaorm_base_1.SentenceAction.delete, children, expressionContext.current.entityName, expressionContext.current.alias);
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    createSentenceAddIncludes(expressionContext, clauses, createInclude, children) {
        if (!createInclude) {
            throw new lambdaorm_base_1.SintaxisError('Include not implemented!!!');
        }
        expressionContext.current.arrowVar = clauses.include.children[1].name;
        const body = clauses.include.children[2];
        if (body.type === 'List') {
            for (const child of body.children) {
                const include = createInclude.bind(this)(child, expressionContext);
                children.push(include);
            }
        }
        else {
            const include = createInclude.bind(this)(body, expressionContext);
            children.push(include);
        }
    }
    createSentenceAddJoins(pos, expressionContext, children) {
        var _a, _b;
        for (const key in expressionContext.current.joins) {
            const info = this.domainConfigService.getRelation(expressionContext.current.entityName, key);
            const relatedEntity = info.previousEntity.name;
            const relatedAlias = info.previousRelation !== '' ? expressionContext.current.joins[info.previousRelation] : expressionContext.current.alias;
            const relatedProperty = (_a = info.previousEntity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.name === info.relation.from);
            const relationEntity = info.entity.name;
            const relationAlias = expressionContext.current.joins[key];
            const relationProperty = (_b = info.entity.properties) === null || _b === void 0 ? void 0 : _b.find(p => p.name === info.relation.to);
            // TODO: Here use the key to add the corresponding filter
            // if an entity has one or more properties with a key, a filter must be added by the key
            const relatedField = new lambdaorm_base_1.Field(pos, relatedEntity, info.relation.from, typ3s_1.Type.to(relatedProperty.type || 'string'), relatedAlias);
            const relationField = new lambdaorm_base_1.Field(pos, relationEntity, info.relation.to, typ3s_1.Type.to(relationProperty.type || 'string'), relationAlias);
            const equal = new _3xpr_1.Operand(pos, '==', _3xpr_1.OperandType.Operator, [relationField, relatedField], typ3s_1.Type.boolean);
            const operand = new lambdaorm_base_1.Join(pos, relationEntity, [equal], relatedEntity, relationAlias);
            children.push(operand);
        }
    }
    createClause(clause, expressionContext) {
        expressionContext.current.arrowVar = clause.children[1].name;
        const child = this.solveFields(clause.children[2], expressionContext, false);
        switch (clause.name) {
            case 'filter': return new lambdaorm_base_1.Filter(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias);
            case 'having': return new lambdaorm_base_1.Having(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias);
            case 'sort': return new lambdaorm_base_1.Sort(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias);
            default: throw new lambdaorm_base_1.SintaxisError('clause : ' + clause.name + ' not supported');
        }
    }
    createMapClause(clause, expressionContext) {
        if (clause.children.length === 3) {
            expressionContext.current.arrowVar = clause.children[1].name;
            const child = this.solveFields(clause.children[2], expressionContext, true);
            return new lambdaorm_base_1.Map(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias);
        }
        throw new lambdaorm_base_1.SintaxisError('Sentence Map incorrect!!!');
    }
    createInsertClause(clause, expressionContext) {
        if (clause.children.length === 2 && clause.children[1].type === _3xpr_1.OperandType.Obj) {
            // Example: Categories.insert({ name: name, description: description })
            const child = this.solveFields(clause.children[1], expressionContext, false);
            if (clause.name === 'bulkInsert') {
                return new lambdaorm_base_1.BulkInsert(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias);
            }
            else {
                return new lambdaorm_base_1.Insert(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias);
            }
        }
        throw new lambdaorm_base_1.SintaxisError('Sentence Insert incorrect!!!');
    }
    createUpdateClause(clause, expressionContext) {
        if (clause.children.length === 3 && clause.children[2].type === _3xpr_1.OperandType.Obj) {
            // Example: Categories.update(p=>{name:entity.name,description:entity.description})
            expressionContext.current.arrowVar = clause.children[1].name;
            const child = this.solveFields(clause.children[2], expressionContext, false);
            return new lambdaorm_base_1.Update(clause.pos, clause.name, [child], expressionContext.current.entityName, expressionContext.current.alias);
        }
        throw new lambdaorm_base_1.SintaxisError('Sentence Update incorrect!!!');
    }
    createSelectInclude(operand, expressionContext) {
        let current = operand;
        while (current) {
            if (current.type === _3xpr_1.OperandType.Var) {
                // p.details
                const parts = current.name.split('.');
                const relationName = parts[1];
                const relationInfo = this.domainConfigService.getRelation(expressionContext.current.entityName, relationName);
                current.name = relationInfo.entity.name;
                const child = this.createSentence(operand, expressionContext);
                return new lambdaorm_base_1.SentenceInclude(current.pos, relationInfo.relation.name, [child], relationInfo.relation);
            }
            if (current.children.length > 0) {
                current = current.children[0];
            }
            else {
                break;
            }
        }
        throw new lambdaorm_base_1.SintaxisError('Error to create SentenceInclude');
    }
    createInclude(operand, expressionContext) {
        let current = operand;
        while (current) {
            if (current.type === _3xpr_1.OperandType.Var) {
                // p.details
                const parts = current.name.split('.');
                const relationName = parts[1];
                const relationInfo = this.domainConfigService.getRelation(expressionContext.current.entityName, relationName);
                current.name = relationInfo.entity.name;
                const child = this.createSentence(operand, expressionContext);
                return new lambdaorm_base_1.SentenceInclude(current.pos, relationName, [child], relationInfo.relation);
            }
            if (current.children.length > 0) {
                current = current.children[0];
            }
            else {
                break;
            }
        }
        throw new lambdaorm_base_1.SintaxisError('Error to create SentenceInclude');
    }
    solveFields(operand, expressionContext, enableAsteriskField) {
        if (operand.type === _3xpr_1.OperandType.Var && !(operand instanceof lambdaorm_base_1.Field)) {
            const parts = operand.name.split('.');
            if (parts[0] === expressionContext.current.arrowVar) {
                if (parts.length === 1) {
                    if (!enableAsteriskField) {
                        throw new lambdaorm_base_1.SintaxisError(`${expressionContext.current.entityName}.* fields are not allowed`);
                    }
                    return new lambdaorm_base_1.Field(operand.pos, expressionContext.current.entityName, '*', typ3s_1.Type.any, expressionContext.current.alias, true);
                }
                else if (parts.length === 2) {
                    return this.createSimpleField(operand.pos, parts, expressionContext, enableAsteriskField);
                }
                else {
                    return this.createRelationField(operand.pos, parts, expressionContext, enableAsteriskField);
                }
            }
        }
        else if (operand instanceof lambdaorm_base_1.Field) {
            const parts = operand.name.split('.');
            if (parts.length > 1 && parts[0] === expressionContext.current.arrowVar && expressionContext.current.arrowVar !== expressionContext.current.alias) {
                operand.alias = expressionContext.current.alias;
                operand.name = `${expressionContext.current.alias}.${parts.slice(1).join('.')}`;
            }
        }
        else {
            for (let i = 0; i < operand.children.length; i++) {
                operand.children[i] = this.solveFields(operand.children[i], expressionContext, enableAsteriskField);
            }
        }
        return operand;
    }
    createSimpleField(pos, parts, expressionContext, enableAsteriskField) {
        const _field = expressionContext.current.fields.find(p => p.name === parts[1]);
        if (_field) {
            return new lambdaorm_base_1.Field(pos, expressionContext.current.entityName, _field.name, typ3s_1.Type.to(_field.type || 'string'), expressionContext.current.alias, true);
        }
        else {
            if (this.domainConfigService.existsProperty(expressionContext.current.entityName, parts[1])) {
                const property = this.domainConfigService.getProperty(expressionContext.current.entityName, parts[1]);
                return new lambdaorm_base_1.Field(pos, expressionContext.current.entityName, property.name, typ3s_1.Type.to(property.type || 'string'), expressionContext.current.alias, true);
            }
            else {
                const relationInfo = this.domainConfigService.getRelation(expressionContext.current.entityName, parts[1]);
                if (relationInfo) {
                    const relation = this.addJoins(parts, parts.length, expressionContext);
                    const relationAlias = expressionContext.current.joins[relation];
                    if (!enableAsteriskField) {
                        throw new lambdaorm_base_1.SintaxisError(`${relation}.* fields are not allowed`);
                    }
                    return new lambdaorm_base_1.Field(pos, relation, '*', typ3s_1.Type.any, relationAlias, true);
                }
                else {
                    throw new lambdaorm_base_1.SintaxisError('Property ' + parts[1] + ' not fount in ' + expressionContext.current.entityName);
                }
            }
        }
    }
    createRelationField(pos, parts, expressionContext, enableAsteriskField) {
        var _a;
        const propertyName = parts[parts.length - 1];
        const relation = this.addJoins(parts, parts.length - 1, expressionContext);
        const info = this.domainConfigService.getRelation(expressionContext.current.entityName, relation);
        const relationAlias = expressionContext.current.joins[relation];
        const property = (_a = info.entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.name === propertyName);
        if (property) {
            return new lambdaorm_base_1.Field(pos, info.entity.name, property.name, typ3s_1.Type.to(property.type || 'string'), relationAlias, false);
        }
        else {
            const childRelation = info.entity.relations ? info.entity.relations.find(p => p.name === propertyName) : undefined;
            if (childRelation) {
                const relation2 = this.addJoins(parts, parts.length, expressionContext);
                const relationAlias2 = expressionContext.current.joins[relation2];
                if (!enableAsteriskField) {
                    throw new lambdaorm_base_1.SintaxisError(`${relation2}.* fields are not allowed`);
                }
                return new lambdaorm_base_1.Field(pos, relation2, '*', typ3s_1.Type.any, relationAlias2, false);
            }
            else {
                throw new lambdaorm_base_1.SintaxisError('Property ' + propertyName + ' not fount in ' + relation);
            }
        }
    }
    solveAsteriskFields(mapOperand, expressionContext) {
        if (mapOperand.children[0].type === _3xpr_1.OperandType.Obj) {
            const obj = mapOperand.children[0];
            const asteriskFields = [];
            for (let i = 0; i < obj.children.length; i++) {
                const keyVal = obj.children[i];
                if (keyVal.children[0] instanceof lambdaorm_base_1.Field && keyVal.children[0].name === '*') {
                    const field = keyVal.children[0];
                    if (expressionContext.current.alias === field.alias) {
                        const asteriskField = { index: i, fields: [] };
                        const entity = this.domainConfigService.getEntity(expressionContext.current.entityName);
                        if (entity === undefined) {
                            throw new lambdaorm_base_1.SintaxisError(`entity ${expressionContext.current.entityName} not found`);
                        }
                        for (const property of entity.properties || []) {
                            const newField = new lambdaorm_base_1.Field(field.pos, entity.name, property.name, typ3s_1.Type.to(property.type || 'string'), field.alias, false);
                            asteriskField.fields.push(newField);
                        }
                        asteriskFields.push(asteriskField);
                    }
                    else {
                        const asteriskField = { index: i, relation: field.entity, fields: [] };
                        const relationInfo = this.domainConfigService.getRelation(expressionContext.current.entityName, field.entity);
                        for (const relationProperty of relationInfo.entity.properties || []) {
                            const newField = new lambdaorm_base_1.Field(field.pos, relationInfo.entity.name, relationProperty.name, typ3s_1.Type.to(relationProperty.type || 'string'), field.alias, false);
                            asteriskField.fields.push(newField);
                        }
                        asteriskFields.push(asteriskField);
                    }
                }
            }
            if (asteriskFields.length > 0) {
                for (const asteriskField of asteriskFields.sort(p => p.index).reverse()) {
                    obj.children.splice(asteriskField.index, 1);
                    for (let i = 0; i < asteriskField.fields.length; i++) {
                        const newField = asteriskField.fields[i];
                        const name = (asteriskField.relation !== undefined ? asteriskField.relation + '.' : '') + newField.name;
                        const keyVal = new _3xpr_1.Operand(newField.pos, name, _3xpr_1.OperandType.KeyVal, [newField], newField.returnType);
                        obj.children.splice(asteriskField.index + i, 0, keyVal);
                    }
                }
            }
        }
    }
    addJoins(parts, to, expressionContext) {
        let relation = '';
        for (let i = 1; i < to; i++) {
            relation = (i > 1 ? relation + '.' : '') + parts[i];
            if (!expressionContext.current.joins[relation]) {
                expressionContext.current.joins[relation] = this.createAlias(expressionContext, parts[i], relation);
            }
        }
        return relation;
    }
    createAlias(expressionContext, name, relation) {
        const c = name.charAt(0).toLowerCase();
        let alias = c;
        let i = 1;
        while (expressionContext.aliases[alias]) {
            alias = alias + i;
            i++;
        }
        expressionContext.aliases[alias] = relation || name;
        return alias;
    }
    getPropertiesFromParameters(entityName, parameters) {
        const entity = this.domainConfigService.getEntity(entityName);
        const properties = [];
        if (entity && entity.properties && parameters) {
            for (const parameter of parameters) {
                const property = entity.properties.find(p => p.name === parameter.name);
                if (property) {
                    properties.push(property);
                }
            }
        }
        return properties;
    }
}
exports.SentenceBuilder = SentenceBuilder;
//# sourceMappingURL=sentenceBuilder.js.map