"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceCompleter = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
const _3xpr_1 = require("3xpr");
const typ3s_1 = require("typ3s");
class SentenceCompleter {
    // eslint-disable-next-line no-useless-constructor
    constructor(expressions) {
        this.expressions = expressions;
    }
    complete(mapping, view, sentence) {
        const entity = mapping.getEntity(sentence.entity);
        if (!entity) {
            throw new lambdaorm_base_1.SchemaError(`${sentence.entity} entity in ${mapping.name} mapping not found`);
        }
        if (entity.filter || entity.hadKeys) {
            if (sentence.name !== lambdaorm_base_1.SentenceAction.insert && sentence.name !== lambdaorm_base_1.SentenceAction.bulkInsert) {
                this.solveFilter(sentence, entity);
            }
            if (entity.hadKeys && [lambdaorm_base_1.SentenceAction.insert, lambdaorm_base_1.SentenceAction.bulkInsert, lambdaorm_base_1.SentenceAction.update].includes(sentence.action)) {
                this.solveKeys(sentence, entity);
            }
            if (sentence.action === lambdaorm_base_1.SentenceAction.select) {
                this.solveJoin(sentence, mapping);
            }
        }
        if (sentence.action === lambdaorm_base_1.SentenceAction.select && (entity.hadReadExps || entity.hadReadMappingExp || entity.hadViewReadExp)) {
            this.solveProperties(sentence, mapping, view);
        }
    }
    solveFilter(sentence, entity) {
        let newFilter;
        // add filter for filter in entity
        if (entity.filter) {
            const filterOperand = this.expressions.build(entity.filter);
            newFilter = this.replaceField(entity, sentence.alias, filterOperand);
        }
        // add filter for keys in properties
        if (entity.hadKeys) {
            const expressionKeys = this.filterByKeys(sentence, entity);
            if (expressionKeys) {
                if (newFilter) {
                    newFilter = new _3xpr_1.Operand(sentence.pos, '&&', _3xpr_1.OperandType.Operator, [newFilter, expressionKeys]);
                }
                else {
                    newFilter = expressionKeys;
                }
            }
        }
        // if exists newFilter  add to current filter
        if (newFilter) {
            const filter = sentence.children.find(p => p.name === 'filter');
            if (filter) {
                filter.children[0] = new _3xpr_1.Operand(sentence.pos, '&&', _3xpr_1.OperandType.Operator, [filter.children[0], newFilter]);
            }
            else {
                sentence.children.push(new lambdaorm_base_1.Filter(sentence.pos, 'filter', [newFilter], sentence.entity, sentence.alias));
            }
        }
    }
    solveKeys(sentence, entity) {
        const insert = sentence.children.find(p => p instanceof lambdaorm_base_1.Insert);
        const update = sentence.children.find(p => p instanceof lambdaorm_base_1.Update);
        for (const p in entity.properties) {
            const property = entity.properties[p];
            if (property.key) {
                if (insert) {
                    this.solveKey(property, insert);
                }
                else if (update) {
                    this.solveKey(property, update);
                }
                // TODO: see how to solve in cases where the parameter does not have the same name as the field
                const index = sentence.parameters.findIndex(q => q.name === property.name);
                if (index >= 0) {
                    sentence.parameters.splice(index, 1);
                }
            }
        }
    }
    solveKey(property, operand) {
        for (const i in operand.children) {
            const child = operand.children[i];
            if (child.type === _3xpr_1.OperandType.KeyVal) {
                if (child.name === property.name) {
                    child.children[0] = new _3xpr_1.Operand(child.pos, property.key, _3xpr_1.OperandType.Const);
                }
            }
            else if (child.children && child.children.length > 0) {
                operand.children[i] = this.solveKey(property, child);
            }
        }
        return operand;
    }
    filterByKeys(sentence, entity) {
        let expression;
        for (const i in entity.properties) {
            const property = entity.properties[i];
            if (property.key) {
                const condition = (typeof property.key === 'string')
                    ? `${property.name} == '${property.key}' `
                    : `${property.name} == ${property.key} `;
                expression = expression ? expression + '&&' + condition : condition;
            }
        }
        if (expression) {
            const operand = this.expressions.build(expression);
            return this.replaceField(entity, sentence.alias, operand);
        }
        else {
            return undefined;
        }
    }
    solveJoin(sentence, mapping) {
        const joins = sentence.children.filter(p => p instanceof lambdaorm_base_1.Join);
        for (const join of joins) {
            const parts = join.name.split('.');
            const entity = mapping.getEntity(parts[0]);
            if (entity === undefined) {
                throw new lambdaorm_base_1.SchemaError(`not found mapping for ${parts[0]}`);
            }
            let newFilter;
            // add filter for filter in entity
            if (entity.filter) {
                const operand = this.expressions.build(entity.filter);
                newFilter = this.replaceField(entity, parts[1], operand);
            }
            // add filter for keys in properties
            const expressionKeys = this.filterByKeys(sentence, entity);
            if (expressionKeys) {
                if (newFilter) {
                    newFilter = new _3xpr_1.Operand(sentence.pos, '&&', _3xpr_1.OperandType.Operator, [newFilter, expressionKeys]);
                }
                else {
                    newFilter = expressionKeys;
                }
            }
            // if exists newFilter  add to current filter
            if (newFilter) {
                join.children[0] = new _3xpr_1.Operand(sentence.pos, '&&', _3xpr_1.OperandType.Operator, [join.children[0], newFilter]);
            }
        }
    }
    solveProperties(operand, mapping, view) {
        var _a;
        for (const i in operand.children) {
            const child = operand.children[i];
            if (child instanceof lambdaorm_base_1.Field) {
                const alias = child.alias;
                const entity = mapping.getEntity(child.entity);
                const property = (_a = entity === null || entity === void 0 ? void 0 : entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.name === child.name);
                if (entity === undefined || property === undefined || alias === undefined) {
                    continue;
                }
                const viewProperty = view.getProperty(entity.name, property.name);
                if (property.readMappingExp || property.readExp || (viewProperty && viewProperty.readExp)) {
                    operand.children[i] = this.solveProperty(child, entity, property, viewProperty);
                }
            }
            else if (child instanceof lambdaorm_base_1.SentenceInclude === false) {
                this.solveProperties(child, mapping, view);
            }
        }
    }
    solveProperty(child, entity, property, viewProperty) {
        const alias = child.alias;
        let sourceOperand = child;
        if (property.readMappingExp) {
            const operand = this.expressions.build(property.readMappingExp);
            sourceOperand = this.replaceField(entity, alias, operand, child.name, sourceOperand);
        }
        if (property.readExp) {
            const operand = this.expressions.build(property.readExp);
            sourceOperand = this.replaceField(entity, alias, operand, child.name, sourceOperand);
        }
        if (viewProperty && viewProperty.readExp) {
            const operand = this.expressions.build(viewProperty.readExp);
            sourceOperand = this.replaceField(entity, alias, operand, child.name, sourceOperand);
        }
        return sourceOperand;
    }
    replaceField(entity, alias, operand, sourceName, source) {
        var _a;
        for (const i in operand.children) {
            const child = operand.children[i];
            if (child.type === _3xpr_1.OperandType.Var) {
                const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(p => p.name === child.name);
                if (property) {
                    if (sourceName && source && property.name === sourceName) {
                        operand.children[i] = source;
                    }
                    else {
                        operand.children[i] = new lambdaorm_base_1.Field(operand.pos, entity.name, child.name, typ3s_1.Type.to(property.type || 'string'), alias);
                    }
                }
            }
            else if (child.children && child.children.length > 0) {
                operand.children[i] = this.replaceField(entity, alias, child, sourceName, source);
            }
        }
        return operand;
    }
}
exports.SentenceCompleter = SentenceCompleter;
//# sourceMappingURL=sentenceCompleter.js.map