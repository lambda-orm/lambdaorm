"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrmOperandNormalizer = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
const _3xpr_1 = require("3xpr");
const typ3s_1 = require("typ3s");
/**
 *  Expression completer
 */
class OrmOperandNormalizer {
    // eslint-disable-next-line no-useless-constructor
    constructor(modelConfigService, expressions, cloner, helper) {
        this.modelConfigService = modelConfigService;
        this.expressions = expressions;
        this.cloner = cloner;
        this.helper = helper;
    }
    normalize(operand) {
        // it clones the operand because it is going to modify it and it should not alter the operand passed by parameter
        const cloned = this.cloner.clone(operand);
        this.normalizeOperand(cloned);
        if (cloned.type === _3xpr_1.OperandType.Var && cloned.children.length === 0) {
            // Example: Products => Products.map(p=>p)
            const arrowVariable = new _3xpr_1.Operand(cloned.pos, 'p', _3xpr_1.OperandType.Var);
            const allFields = new _3xpr_1.Operand(cloned.pos, 'p', _3xpr_1.OperandType.Var);
            const map = new _3xpr_1.Operand(cloned.pos, 'map', _3xpr_1.OperandType.Arrow, [cloned, arrowVariable, allFields]);
            this.normalizeSentence(map);
            return map;
        }
        else {
            this.normalizeSentence(cloned);
            return cloned;
        }
    }
    normalizeOperand(operand) {
        if (operand.type === _3xpr_1.OperandType.Arrow || operand.type === _3xpr_1.OperandType.ChildFunc || operand.type === _3xpr_1.OperandType.CallFunc) {
            const alias = this.expressions.functionAlias.find(p => p[0] === operand.name);
            if (alias) {
                operand.name = alias[1];
            }
        }
        else if (operand.type === _3xpr_1.OperandType.Operator) {
            const alias = this.expressions.operatorAlias.find(p => p[0] === operand.name);
            if (alias) {
                operand.name = alias[1];
            }
        }
        else if (operand.type === _3xpr_1.OperandType.Const && operand.returnType !== undefined && operand.returnType.primitive === typ3s_1.Primitive.boolean) {
            operand.name = (operand.name.toString().toLowerCase() === 'true');
        }
        for (const child of operand.children) {
            this.normalizeOperand(child);
        }
    }
    getClauses(operand) {
        const clauses = {};
        let current = operand;
        while (current) {
            let name = current.type === _3xpr_1.OperandType.Var ? 'from' : current.name;
            if (name === 'push') {
                name = 'insert';
                current.name = 'insert';
            }
            else if (name === 'remove') {
                name = 'delete';
                current.name = 'delete';
            }
            clauses[name] = current;
            if (current.children.length > 0) {
                current = current.children[0];
            }
            else {
                break;
            }
        }
        return clauses;
    }
    normalizeSentence(mainOperand, entityName) {
        let compeleInclude;
        const clauses = this.getClauses(mainOperand);
        const entity = this.modelConfigService.getForcedEntity(entityName || clauses.from.name);
        if (clauses.insert) {
            compeleInclude = this.completeInsertInclude;
            this.normalizeInsert(entity, clauses.insert);
        }
        else if (clauses.bulkInsert) {
            compeleInclude = this.completeBulkInsertInclude;
            this.normalizeInsert(entity, clauses.bulkInsert);
        }
        else if (clauses.update) {
            compeleInclude = this.completeUpdateInclude;
            this.completeFilter(entity, clauses, clauses.update);
            this.normalizeUpdate(entity, clauses.update);
        }
        else if (clauses.updateAll) {
            compeleInclude = this.completeUpdateInclude;
            this.normalizeUpdate(entity, clauses.updateAll);
            clauses.updateAll.name = 'update';
        }
        else if (clauses.delete) {
            compeleInclude = this.completeDeleteInclude;
            this.completeFilter(entity, clauses, clauses.delete);
            this.normalizeDelete(clauses.delete);
        }
        else if (clauses.deleteAll) {
            compeleInclude = this.completeDeleteInclude;
            this.normalizeDelete(clauses.deleteAll);
            clauses.deleteAll.name = 'delete';
        }
        else if (clauses.map) {
            compeleInclude = this.completeMapInclude;
            this.normalizeMap(entity, clauses.map);
        }
        else if (clauses.distinct) {
            compeleInclude = this.completeMapInclude;
            this.normalizeDistinct(clauses, entity);
        }
        else if (clauses.first) {
            compeleInclude = this.completeMapInclude;
            this.normalizeFirst(clauses, mainOperand, entity);
        }
        else if (clauses.last) {
            compeleInclude = this.completeMapInclude;
            this.normalizeLast(clauses, mainOperand, entity);
        }
        else {
            // Solve expresión without map example: Products.filter(p=> id==1)
            compeleInclude = this.completeMapInclude;
            const varArrow = new _3xpr_1.Operand(mainOperand.pos, 'p', _3xpr_1.OperandType.Var);
            const varAll = new _3xpr_1.Operand(mainOperand.pos, 'p', _3xpr_1.OperandType.Var);
            mainOperand.children[0] = new _3xpr_1.Operand(mainOperand.pos, 'map', _3xpr_1.OperandType.Arrow, [mainOperand.children[0], varArrow, varAll]);
            clauses.map = mainOperand.children[0];
            this.normalizeMap(entity, clauses.map);
        }
        if (clauses.sort) {
            this.normalizeSort(clauses);
        }
        if (clauses.page && !clauses.sort) {
            this.addSortNode(clauses, mainOperand, 'asc');
        }
        if (clauses.include) {
            this.normalizeInclude(clauses, compeleInclude, entity);
        }
    }
    completeFilter(entity, clauses, clause) {
        if (!clauses.filter) {
            this.createClauseFilter(entity, clause);
        }
    }
    normalizeDistinct(clauses, entity) {
        // Replace distinct for map and add function distinct to child of map
        clauses.map = clauses.distinct;
        clauses.map.name = 'map';
        this.normalizeMap(entity, clauses.map);
        clauses.map.children[2] = new _3xpr_1.Operand(clauses.map.pos, 'distinct', _3xpr_1.OperandType.CallFunc, [clauses.map.children[2]]);
    }
    normalizeFirst(clauses, mainOperand, entity) {
        // Add orderby and limit , replace first for map
        // example: SELECT * FROM Orders ORDER BY OrderId LIMIT 0,1
        clauses.map = clauses.first;
        clauses.map.name = 'map';
        this.normalizeMap(entity, clauses.map);
        if (!clauses.sort) {
            this.addSortNode(clauses, mainOperand, 'asc');
        }
        if (!clauses.page) {
            const constPage = new _3xpr_1.Operand(mainOperand.pos, '1', _3xpr_1.OperandType.Const, []);
            const constRecords = new _3xpr_1.Operand(mainOperand.pos, '1', _3xpr_1.OperandType.Const, []);
            mainOperand.children[0] = new _3xpr_1.Operand(mainOperand.pos, 'page', _3xpr_1.OperandType.ChildFunc, [mainOperand.children[0], constPage, constRecords]);
        }
    }
    normalizeLast(clauses, mainOperand, entity) {
        // Add orderby desc and limit, replace last for map
        // example: SELECT * FROM Orders ORDER BY OrderId DESC LIMIT 0,1
        clauses.map = clauses.last;
        clauses.map.name = 'map';
        this.normalizeMap(entity, clauses.map);
        if (!clauses.sort) {
            this.addSortNode(clauses, mainOperand, 'desc');
        }
        if (!clauses.page) {
            const constPage = new _3xpr_1.Operand(mainOperand.pos, '1', _3xpr_1.OperandType.Const, []);
            const constRecords = new _3xpr_1.Operand(mainOperand.pos, '1', _3xpr_1.OperandType.Const, []);
            mainOperand.children[0] = new _3xpr_1.Operand(mainOperand.pos, 'page', _3xpr_1.OperandType.ChildFunc, [mainOperand.children[0], constPage, constRecords]);
        }
    }
    addSortNode(clauses, mainOperand, order) {
        // if the order is not defined, order by the first field
        const firstKeyVal = clauses.map.children[2].children[0];
        const varArrow = new _3xpr_1.Operand(mainOperand.pos, 'p', _3xpr_1.OperandType.Var, []);
        const varSort = new _3xpr_1.Operand(mainOperand.pos, 'p.' + firstKeyVal.name, _3xpr_1.OperandType.Var, []);
        const funcAsc = new _3xpr_1.Operand(mainOperand.pos, order, _3xpr_1.OperandType.CallFunc, [varSort]);
        mainOperand.children[0] = new _3xpr_1.Operand(mainOperand.pos, 'sort', _3xpr_1.OperandType.Arrow, [mainOperand.children[0], varArrow, funcAsc]);
    }
    normalizeSort(clauses) {
        // sets ascending order in the case that it has not already been specified
        const body = clauses.sort.children[2];
        if (body.type === _3xpr_1.OperandType.List) {
            for (let i = 0; i < body.children.length; i++) {
                if (body.children[i].type !== _3xpr_1.OperandType.CallFunc || !(['asc', 'desc'].includes(body.children[i].name))) {
                    // Example: .sort(p => [p.category, p.name])
                    body.children[i] = new _3xpr_1.Operand(body.pos, 'asc', _3xpr_1.OperandType.CallFunc, [body.children[i]]);
                }
            }
        }
        else if (body.type !== _3xpr_1.OperandType.CallFunc || !(['asc', 'desc'].includes(body.name))) {
            // Example: .sort(p => p.name)
            clauses.sort.children[2] = new _3xpr_1.Operand(clauses.sort.pos, 'asc', _3xpr_1.OperandType.CallFunc, [body]);
        }
    }
    normalizeInclude(clauses, compeleInclude, entity) {
        if (!compeleInclude) {
            throw new lambdaorm_base_1.SchemaError('Include not implemented!!!');
        }
        const clauseInclude = clauses.include;
        const arrowVar = clauseInclude.children[1].name;
        const body = clauseInclude.children[2];
        if (body.type === _3xpr_1.OperandType.List) {
            for (let i = 0; i < body.children.length; i++) {
                body.children[i] = compeleInclude.bind(this)(entity, arrowVar, body.children[i]);
                if (clauses.map) {
                    this.addChildFieldField(clauses.map, entity, body.children[i]);
                }
            }
        }
        else {
            clauseInclude.children[2] = compeleInclude.bind(this)(entity, arrowVar, body);
            if (clauses.map) {
                this.addChildFieldField(clauses.map, entity, body);
            }
        }
    }
    addChildFieldField(map, entity, include) {
        const relation = this.getIncludeRelation(entity, include);
        const objArrowVar = map.children[1].name;
        const fieldToAdd = new _3xpr_1.Operand(map.pos, objArrowVar + '.' + relation.from, _3xpr_1.OperandType.Var);
        const keyVal = new _3xpr_1.Operand(map.pos, '__' + relation.from, _3xpr_1.OperandType.KeyVal, [fieldToAdd]);
        map.children[2].children.push(keyVal);
    }
    normalizeMap(entity, operand) {
        if (operand.children && operand.children.length === 3) {
            const arrowVar = operand.children[1].name;
            const fields = operand.children[2];
            if (fields.children.length === 0 && fields.name === arrowVar) {
                // Example: Entity.map(p=> p) to  Entity.map(p=> {field1:p.field1,field2:p.field2,field3:p.field3,...})
                operand.children[2] = this.createReadFields(operand.pos, entity, arrowVar);
            }
            else if (fields.type === _3xpr_1.OperandType.Var) {
                // Example: Entity.map(p=> p.name) to  Entity.map(p=> {name:p.name})
                const keyVal = this.fieldToKeyVal(arrowVar, fields);
                operand.children[2] = new _3xpr_1.Operand(operand.pos, _3xpr_1.OperandType.Obj, _3xpr_1.OperandType.Obj, [keyVal]);
            }
            else if (fields.type === _3xpr_1.OperandType.List) {
                // Example: Entity.map(p=> [p.id, p.name]) to  Entity.map(p=> {id:p.id,name:p.name})
                const obj = new _3xpr_1.Operand(operand.pos, _3xpr_1.OperandType.Obj, _3xpr_1.OperandType.Obj, []);
                for (const child of fields.children) {
                    const keyVal = this.fieldToKeyVal(arrowVar, child);
                    obj.children.push(keyVal);
                }
                operand.children[2] = obj;
            }
        }
        else {
            const varArrow = new _3xpr_1.Operand(operand.pos, 'p', _3xpr_1.OperandType.Var, []);
            const fields = this.createReadFields(operand.pos, entity, 'p');
            operand.children.push(varArrow);
            operand.children.push(fields);
        }
    }
    fieldToKeyVal(arrowVar, field) {
        let key;
        if (field.name.startsWith(arrowVar + '.')) {
            key = field.name.replace(arrowVar + '.', '');
            if (key.includes('.')) {
                key = this.helper.str.replace(key, '.', '_');
            }
        }
        else {
            key = field.name;
        }
        return new _3xpr_1.Operand(field.pos, key, _3xpr_1.OperandType.KeyVal, [field]);
    }
    normalizeInsert(entity, operand) {
        if (operand.children.length === 1) {
            // example: Categories.insert() to: Categories.insert({name:name,description:description})
            const fields = this.createWriteVars(operand.pos, entity, undefined, false, true);
            operand.children.push(fields);
        }
        else if (operand.children.length === 2 && operand.children[1].type === _3xpr_1.OperandType.Var) {
            // example: Categories.insert(entity) to: Categories.insert({name:entity.name,description:entity.description})
            operand.children[1] = this.createWriteVars(operand.pos, entity, operand.children[1].name, false, true);
        }
        else if (operand.children.length === 2 && operand.children[1].type === _3xpr_1.OperandType.List) {
            // example: Categories.insert([name,description]) to: Categories.insert({name:name,description:description})
            operand.children[1] = this.writeVarsFromList(entity, operand.children[1]);
        }
        else if (operand.children.length === 3 && operand.children[2].type === _3xpr_1.OperandType.Obj) {
            // example: 'Categories.insert(p=>{name:p.name,description:p.description}) to: Categories.insert({name:name,description:description})
            const variable = operand.children[1].name;
            for (const child of operand.children[2].children) {
                child.name = child.name.replace(`${variable}.`, '');
            }
            operand.children[1] = operand.children[2];
            // remove index 2
            operand.children.pop();
        }
        else if (operand.children.length === 3 && operand.children[2].type === _3xpr_1.OperandType.List) {
            // example: 'Categories.insert(p=>[p.name,p.description]) to: Categories.insert({name:name,description:description})
            const variable = operand.children[1].name;
            for (const child of operand.children[2].children) {
                child.name = child.name.replace(`${variable}.`, '');
            }
            operand.children[1] = this.writeVarsFromList(entity, operand.children[2]);
            // remove index 2
            operand.children.pop();
        }
    }
    normalizeUpdate(entity, operand) {
        if (operand.children.length === 1) {
            // Example: Categories.update() to: Categories.update(p=>{name:name,description:description})
            // In the case that the mapping is not defined, it assumes that the data will be the entity to update
            const variable = new _3xpr_1.Operand(operand.pos, 'p', _3xpr_1.OperandType.Var, [], typ3s_1.Type.any);
            const fields = this.createWriteVars(operand.pos, entity, undefined, false, true);
            operand.children.push(variable);
            operand.children.push(fields);
        }
        else if (operand.children.length === 2 && operand.children[1].type === _3xpr_1.OperandType.Var) {
            // Example: Categories.update(entity) to: Categories.update(p=>{name:entity.name,description:entity.description})
            // In the case that a mapping was not defined but a variable is passed, it is assumed that this variable will be the entity to update
            const variable = new _3xpr_1.Operand(operand.pos, 'p', _3xpr_1.OperandType.Var, [], typ3s_1.Type.any);
            const fields = this.createWriteVars(operand.pos, entity, operand.children[1].name, true);
            operand.children[1] = variable;
            operand.children.push(fields);
        }
        else if (operand.children.length === 2 && operand.children[1].type === _3xpr_1.OperandType.List) {
            // Example: Categories.update([name, description]) to: Categories.update(p=>{name:name,description:description})
            const variable = new _3xpr_1.Operand(operand.pos, 'p', _3xpr_1.OperandType.Var, [], typ3s_1.Type.any);
            const fields = this.writeVarsFromList(entity, operand.children[1]);
            operand.children[1] = variable;
            operand.children.push(fields);
        }
        else if (operand.children.length === 2 && operand.children[1].type === _3xpr_1.OperandType.Obj) {
            // Example: Categories.update({ name: entity.name }) to: Categories.update(p=>{name:entity.name})
            const variable = new _3xpr_1.Operand(operand.pos, 'p', _3xpr_1.OperandType.Var, [], typ3s_1.Type.any);
            const fields = operand.children[1];
            operand.children[1] = variable;
            operand.children.push(fields);
        }
        else if (operand.children.length === 3 && operand.children[2].type === _3xpr_1.OperandType.Var) {
            if (operand.children[2].name === operand.children[1].name) {
                // Example: Categories.update(p => p) to: Categories.update(p=>{name:name,description:description})
                operand.children[2] = this.createWriteVars(operand.pos, entity, undefined, true);
            }
            else {
                // Example: Categories.update(p => entity) to: Categories.update(p=>{name:entity.name,description:entity.description})
                operand.children[2] = this.createWriteVars(operand.pos, entity, operand.children[2].name, true);
            }
        }
        else if (operand.children.length === 3 && operand.children[2].type === _3xpr_1.OperandType.List) {
            // Example: Categories.update(p=>[name, description]) to: Categories.update(p=>{name:name,description:description})
            operand.children[2] = this.writeVarsFromList(entity, operand.children[2]);
        }
    }
    normalizeDelete(operand) {
        if (operand.children.length === 2) {
            // example: Categories.delete(entity) to: Categories.delete().filter(p=>(p.id==entity.id))
            operand.children.pop();
        }
        else if (operand.children.length === 3) {
            // example: Categories.delete(p => entity) to: Categories.delete().filter(p=>(p.id==entity.id))
            operand.children.pop();
            operand.children.pop();
        }
    }
    createReadFields(pos, entity, parent) {
        const obj = new _3xpr_1.Operand(pos, _3xpr_1.OperandType.Obj, _3xpr_1.OperandType.Obj, []);
        for (const property of entity.properties || []) {
            // const field = new Operand(pos, parent ? parent + '.' + property.name : property.name, OperandType.Var, [], Type.to(property.type))
            const name = parent ? parent + '.' + property.name : property.name;
            const field = new lambdaorm_base_1.Field(pos, entity.name, name, typ3s_1.Type.to(property.type || 'string'), parent, true);
            const type = typ3s_1.Type.to(property.type || 'string');
            const keyVal = new _3xpr_1.Operand(pos, property.name, _3xpr_1.OperandType.KeyVal, [field], type);
            obj.children.push(keyVal);
        }
        return obj;
    }
    createWriteVars(pos, entity, parent, excludePrimaryKey = false, excludeAutoIncrement = false) {
        const obj = new _3xpr_1.Operand(pos, _3xpr_1.OperandType.Obj, _3xpr_1.OperandType.Obj, []);
        for (const property of entity.properties || []) {
            if ((!property.autoIncrement || !excludeAutoIncrement) && ((entity.primaryKey !== undefined && !entity.primaryKey.includes(property.name)) || !excludePrimaryKey)) {
                // const field = new Operand(pos, parent ? parent + '.' + property.name : property.name, OperandType.Var, [], Type.to(property.type))
                const name = parent ? parent + '.' + property.name : property.name;
                const variable = new _3xpr_1.Operand(pos, name, _3xpr_1.OperandType.Var, [], typ3s_1.Type.to(property.type || 'string'));
                const keyVal = new _3xpr_1.Operand(pos, property.name, _3xpr_1.OperandType.KeyVal, [variable], typ3s_1.Type.to(property.type || 'string'));
                obj.children.push(keyVal);
            }
        }
        return obj;
    }
    writeVarsFromList(entity, list) {
        var _a;
        const obj = new _3xpr_1.Operand(list.pos, _3xpr_1.OperandType.Obj, _3xpr_1.OperandType.Obj, []);
        for (const child of list.children) {
            const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.name === child.name);
            if (property === undefined) {
                throw new Error(`${entity.name}.${child.name} not found`);
            }
            const variable = new _3xpr_1.Operand(list.pos, property.name, _3xpr_1.OperandType.Var, [], typ3s_1.Type.to(property.type || 'string'));
            const keyVal = new _3xpr_1.Operand(list.pos, property.name, _3xpr_1.OperandType.KeyVal, [variable], typ3s_1.Type.to(property.type || 'string'));
            obj.children.push(keyVal);
        }
        return obj;
    }
    createClauseFilter(entity, operand) {
        if (operand.children.length === 1 || (operand.children.length === 3 && operand.children[2].type === _3xpr_1.OperandType.Obj)) {
            // Example operand.children.length === 1: Entity.delete()
            // Example operand.children.length === 3:
            // Entity.update({name:entity.name}).include(p=> p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })))
            // Aplica al update del include, en el caso del ejemplo seria a: p.details.update(p=> ({unitPrice:p.unitPrice,productId:p.productId })
            const condition = this.createFilter(operand.pos, entity, 'p');
            const arrowVar = new _3xpr_1.Operand(operand.pos, 'p', _3xpr_1.OperandType.Var, []);
            operand.children[0] = new _3xpr_1.Operand(operand.pos, 'filter', _3xpr_1.OperandType.Arrow, [operand.children[0], arrowVar, condition]);
        }
        else if (operand.children.length === 2 && (operand.children[1].type === _3xpr_1.OperandType.Var || operand.children[1].type === _3xpr_1.OperandType.Obj)) {
            // Example operand.children[1].type === OperandType.Var: Entity.update(entity) ,Entity.delete(entity)
            // Example operand.children[1].type === OperandType.Obj: Entity.update({unitPrice:unitPrice,productId:productId})
            // const condition = this.createFilter(entity, 'p', operand.children[1].name)
            const parentVariable = operand.children[1].type === _3xpr_1.OperandType.Var ? operand.children[1].name : undefined;
            const condition = this.createFilter(operand.pos, entity, 'p', parentVariable);
            const arrowVar = new _3xpr_1.Operand(operand.pos, 'p', _3xpr_1.OperandType.Var, []);
            operand.children[0] = new _3xpr_1.Operand(operand.pos, 'filter', _3xpr_1.OperandType.Arrow, [operand.children[0], arrowVar, condition]);
        }
        else if (operand.children.length === 3 && operand.children[2].type === _3xpr_1.OperandType.Var) {
            // Example: Categories.delete(p => entity)
            // Example: Categories.delete(p => p )
            const parentVariable = operand.children[1].name !== operand.children[2].name ? operand.children[2].name : undefined;
            const condition = this.createFilter(operand.pos, entity, 'p', parentVariable);
            const arrowVar = new _3xpr_1.Operand(operand.pos, 'p', _3xpr_1.OperandType.Var, []);
            operand.children[0] = new _3xpr_1.Operand(operand.pos, 'filter', _3xpr_1.OperandType.Arrow, [operand.children[0], arrowVar, condition]);
        }
    }
    createFilter(pos, entity, parent, parentVariable) {
        var _a;
        if (entity.primaryKey === undefined || entity.primaryKey.length === 0) {
            throw new lambdaorm_base_1.SchemaError(`Entity ${entity.name} cannot be create filter because the primary key is empty`);
        }
        let condition;
        for (const name of entity.primaryKey) {
            const field = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.name === name);
            if (field === undefined) {
                throw new lambdaorm_base_1.SchemaError(`Entity ${entity.name} not found property ${name} defined in primary key`);
            }
            const fieldOperand = new _3xpr_1.Operand(pos, parent ? parent + '.' + field.name : field.name, _3xpr_1.OperandType.Var, [], typ3s_1.Type.to(field.type || 'string'));
            const variableOperand = new _3xpr_1.Operand(pos, parentVariable ? parentVariable + '.' + name : name, _3xpr_1.OperandType.Var, [], typ3s_1.Type.to(field.type || 'string'));
            const equal = new _3xpr_1.Operand(pos, '==', _3xpr_1.OperandType.Operator, [fieldOperand, variableOperand], typ3s_1.Type.boolean);
            condition = condition ? new _3xpr_1.Operand(pos, '&&', _3xpr_1.OperandType.Operator, [condition, equal], typ3s_1.Type.boolean) : equal;
        }
        return condition;
    }
    completeMapInclude(entity, arrowVar, operand) {
        return this.completeSelectInclude(entity, arrowVar, operand, 'map');
    }
    completeSelectInclude(entity, _arrowVar, operand, clause) {
        let map, relation;
        if (operand.type === _3xpr_1.OperandType.Arrow) {
            // resuelve el siguiente caso  .includes(details.map(p=>p))
            let current = operand;
            while (current) {
                if (current.type === _3xpr_1.OperandType.Var) {
                    // p.details
                    const parts = current.name.split('.');
                    const relationName = parts[1];
                    relation = entity.relations ? entity.relations.find(p => p.name === relationName) : undefined;
                    break;
                }
                if (current.children.length > 0) {
                    current = current.children[0];
                }
                else {
                    break;
                }
            }
            map = operand; // new Node(clause,'childFunc',[operand])
            if (relation === undefined) {
                throw Error('Relation not found');
            }
            this.normalizeSentence(map, relation.entity);
        }
        else if (operand.type === _3xpr_1.OperandType.Var) {
            // resuelve el caso que solo esta la variable que representa la relación , ejemplo: .include(p=> p.details)
            // entones agregar map(p=>p) a la variable convirtiéndolo en .include(p=> p.details.map(p=>p))
            const varArrowNode = new _3xpr_1.Operand(operand.pos, 'p', _3xpr_1.OperandType.Var, []);
            const varAll = new _3xpr_1.Operand(operand.pos, 'p', _3xpr_1.OperandType.Var, []);
            const parts = operand.name.split('.');
            const relationName = parts[1];
            relation = entity.relations ? entity.relations.find(p => p.name === relationName) : undefined;
            if (relation === undefined) {
                throw Error('Relation not found');
            }
            map = new _3xpr_1.Operand(operand.pos, clause, _3xpr_1.OperandType.Arrow, [operand, varArrowNode, varAll]);
            this.normalizeSentence(map, relation.entity);
        }
        else {
            throw new lambdaorm_base_1.SintaxisError('Error to add include operand ' + operand.type + ':' + operand.name);
        }
        // add filter with parent
        const clauses = this.getClauses(map);
        const childFilter = clauses.filter;
        const arrowFilterVar = childFilter ? childFilter.children[1].name : 'p';
        const propertyTo = this.modelConfigService.getProperty(relation.entity, relation.to);
        const fieldRelation = new lambdaorm_base_1.Field(operand.pos, relation.entity, arrowFilterVar + '.' + relation.to, typ3s_1.Type.to(propertyTo.type || 'string'));
        // new SqlField(relation.entity,relation.to,toField.type,child.alias + '.' + toField.mapping)
        const varRelation = new _3xpr_1.Operand(operand.pos, 'LambdaOrmParentId', _3xpr_1.OperandType.Var, [], typ3s_1.Type.List(typ3s_1.Type.to(propertyTo.type || 'string')));
        const filterInclude = new _3xpr_1.Operand(operand.pos, 'in', _3xpr_1.OperandType.CallFunc, [fieldRelation, varRelation]);
        if (!childFilter) {
            const varFilterArrowNode = new _3xpr_1.Operand(operand.pos, arrowFilterVar, _3xpr_1.OperandType.Var, []);
            map.children[0] = new _3xpr_1.Operand(operand.pos, 'filter', _3xpr_1.OperandType.Arrow, [map.children[0], varFilterArrowNode, filterInclude]);
        }
        else {
            childFilter.children[0] = new _3xpr_1.Operand(operand.pos, '&&', _3xpr_1.OperandType.Operator, [childFilter.children[0], filterInclude]);
        }
        // If the column for which the include is to be resolved is not in the select, it must be added
        const arrowSelect = clauses.map.children[1].name;
        // const field = new Operand(operand.pos, arrowSelect + '.' + relation.to, OperandType.Var)
        const field = new lambdaorm_base_1.Field(operand.pos, relation.target, arrowSelect + '.' + relation.to, typ3s_1.Type.to(propertyTo.type || 'string'));
        clauses.map.children[2].children.push(new _3xpr_1.Operand(operand.pos, 'LambdaOrmParentId', _3xpr_1.OperandType.KeyVal, [field]));
        return map;
    }
    completeBulkInsertInclude(entity, arrowVar, operand) {
        return this.completeInclude(entity, arrowVar, operand, 'bulkInsert');
    }
    completeInsertInclude(entity, arrowVar, operand) {
        return this.completeInclude(entity, arrowVar, operand, 'insert');
    }
    completeUpdateInclude(entity, arrowVar, operand) {
        return this.completeInclude(entity, arrowVar, operand, 'update');
    }
    completeDeleteInclude(entity, arrowVar, operand) {
        return this.completeInclude(entity, arrowVar, operand, 'delete');
    }
    getIncludeRelation(entity, operand) {
        if (operand.type === _3xpr_1.OperandType.CallFunc || operand.type === _3xpr_1.OperandType.ChildFunc || operand.type === _3xpr_1.OperandType.Arrow) {
            // resuelve el siguiente caso  .includes(details.insert())
            let current = operand;
            while (current) {
                if (current.type === _3xpr_1.OperandType.Var) {
                    // p.details
                    const parts = current.name.split('.');
                    const relationName = parts[1];
                    return entity.relations ? entity.relations.find(p => p.name === relationName) : undefined;
                }
                if (current.children.length > 0) {
                    current = current.children[0];
                }
                else {
                    break;
                }
            }
        }
        else if (operand.type === _3xpr_1.OperandType.Var) {
            // resuelve el caso que solo esta la variable que representa la relación , ejemplo: .include(p=> p.details)
            // entones agregar map(p=>p) a la variable convirtiéndolo en Details.insert()
            const parts = operand.name.split('.');
            const relationName = parts[1];
            return entity.relations ? entity.relations.find(p => p.name === relationName) : undefined;
        }
        else {
            throw new lambdaorm_base_1.SchemaError('not found relation in include operand ' + operand.type + ':' + operand.name);
        }
    }
    completeInclude(entity, _arrowVar, operand, clause) {
        if (operand.type === _3xpr_1.OperandType.Arrow) {
            // resuelve el siguiente caso  .includes(details.insert())
            const relation = this.getIncludeRelation(entity, operand);
            const clauses = this.getClauses(operand);
            const clauseOperand = clauses[clause] ? clauses[clause] : new _3xpr_1.Operand(operand.pos, clause, _3xpr_1.OperandType.CallFunc, [operand]);
            this.normalizeSentence(clauseOperand, relation.entity);
            return clauseOperand;
        }
        else if (operand.type === _3xpr_1.OperandType.Var) {
            // resuelve el caso que solo esta la variable que representa la relación , ejemplo: .include(p=> p.details)
            // entones agregar map(p=>p) a la variable convirtiéndolo en Details.insert()
            const relation = this.getIncludeRelation(entity, operand);
            if (!relation) {
                throw new lambdaorm_base_1.SchemaError(`Relation ${operand.name} not found in ${entity.name}`);
            }
            const clauseOperand = new _3xpr_1.Operand(operand.pos, clause, _3xpr_1.OperandType.CallFunc, [operand]);
            this.normalizeSentence(clauseOperand, relation.entity);
            return clauseOperand;
        }
        else if (operand.type === _3xpr_1.OperandType.CallFunc || operand.type === _3xpr_1.OperandType.ChildFunc) {
            // Example .include(p=>p.details.insert({orderId:orderId,productId:productId,...}))
            // Example .include(p=>p.details.insert())
            const relation = this.getIncludeRelation(entity, operand);
            if (!relation) {
                throw new lambdaorm_base_1.SchemaError(`Relation ${operand.name} not found in ${entity.name}`);
            }
            this.normalizeSentence(operand, relation.entity);
            return operand;
        }
        else {
            throw new lambdaorm_base_1.SchemaError('Error to add include operand ' + operand.type + ':' + operand.name);
        }
    }
}
exports.OrmOperandNormalizer = OrmOperandNormalizer;
//# sourceMappingURL=operandNormalizer.js.map