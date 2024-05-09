"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceHelper = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
const _3xpr_1 = require("3xpr");
const typ3s_1 = require("typ3s");
class SentenceHelper {
    // private model: ModelConfigService
    // eslint-disable-next-line no-useless-constructor
    constructor(schemaState, helper) {
        this.schemaState = schemaState;
        this.helper = helper;
    }
    getSource(sentence, stage) {
        const sentenceInfo = this.helper.query.getInfo(sentence.action, sentence.entity);
        const sourceName = this.schemaState.getSource(sentenceInfo, stage);
        return this.schemaState.source.get(sourceName);
    }
    getPropertiesFromParameters(entityName, parameters) {
        const entity = this.schemaState.domain.getEntity(entityName);
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
    groupByFields(operand) {
        const data = { fields: [], groupBy: false };
        this._groupByFields(operand, data);
        return data.groupBy ? data.fields : [];
    }
    _groupByFields(operand, data) {
        if (operand instanceof lambdaorm_base_1.Field) {
            data.fields.push(operand);
        }
        else if (operand.type === _3xpr_1.OperandType.CallFunc && ['avg', 'count', 'first', 'last', 'max', 'min', 'sum'].indexOf(operand.name) > -1) {
            data.groupBy = true;
        }
        else if (!(operand instanceof lambdaorm_base_1.Sentence)) {
            for (const k in operand.children) {
                const p = operand.children[k];
                this._groupByFields(p, data);
            }
        }
    }
    fieldsInSelect(operand) {
        const fields = [];
        if (operand.children.length === 1) {
            let child;
            if (operand.children[0].type === _3xpr_1.OperandType.CallFunc && operand.children[0].name === 'distinct') {
                child = operand.children[0].children[0];
            }
            else {
                child = operand.children[0];
            }
            if (child.type === _3xpr_1.OperandType.Obj) {
                const obj = child;
                for (const keyVal of obj.children) {
                    if (keyVal.returnType !== undefined && keyVal.returnType.primitive !== typ3s_1.Primitive.any) {
                        fields.push({ name: keyVal.name, type: keyVal.returnType.primitive });
                    }
                    else {
                        fields.push({ name: keyVal.name, type: typ3s_1.Type.stringify(keyVal.children[0].returnType) });
                    }
                }
            }
        }
        return fields;
    }
    fieldsInModify(operand, entityName, addAutoIncrement = false) {
        const fields = [];
        if (operand.children.length === 1) {
            if (operand.children[0].type === _3xpr_1.OperandType.Obj) {
                const obj = operand.children[0];
                for (const p in obj.children) {
                    const keyVal = obj.children[p];
                    const property = this.schemaState.domain.getProperty(entityName, keyVal.name);
                    const field = { name: keyVal.name, type: property.type };
                    fields.push(field);
                }
            }
        }
        if (addAutoIncrement) {
            const autoIncrement = this.schemaState.domain.getAutoIncrement(entityName);
            if (autoIncrement) {
                fields.unshift(autoIncrement);
            }
        }
        return fields;
    }
    getColumns(sentence) {
        const sentenceInfo = this.helper.query.getInfo(sentence.action, sentence.entity);
        switch (sentenceInfo.category) {
            case lambdaorm_base_1.SentenceCategory.select:
                // eslint-disable-next-line no-case-declarations
                const map = sentence.children.find(p => p.name === 'map');
                return this.fieldsInSelect(map);
            case lambdaorm_base_1.SentenceCategory.insert:
                // eslint-disable-next-line no-case-declarations
                const insert = sentence.action === 'bulkInsert'
                    ? sentence.children.find(p => p instanceof lambdaorm_base_1.BulkInsert)
                    : sentence.children.find(p => p instanceof lambdaorm_base_1.Insert);
                return this.fieldsInModify(insert, sentence.entity, true);
            case lambdaorm_base_1.SentenceCategory.update:
                // eslint-disable-next-line no-case-declarations
                const update = sentence.children.find(p => p instanceof lambdaorm_base_1.Update);
                return this.fieldsInModify(update, sentence.entity);
            case lambdaorm_base_1.SentenceCategory.delete:
                // eslint-disable-next-line no-case-declarations
                const _delete = sentence.children.find(p => p instanceof lambdaorm_base_1.Delete);
                return this.fieldsInModify(_delete, sentence.entity);
            default:
                throw new lambdaorm_base_1.SintaxisError(`sentence ${sentenceInfo.category} category not found`);
        }
    }
    getParameters(sentence) {
        const map = sentence.children.find(p => p instanceof lambdaorm_base_1.Map);
        const filter = sentence.children.find(p => p instanceof lambdaorm_base_1.Filter);
        const groupBy = sentence.children.find(p => p instanceof lambdaorm_base_1.GroupBy);
        const having = sentence.children.find(p => p instanceof lambdaorm_base_1.Having);
        const sort = sentence.children.find(p => p instanceof lambdaorm_base_1.Sort);
        const insert = sentence.children.find(p => p instanceof lambdaorm_base_1.Insert);
        const bulkInsert = sentence.children.find(p => p instanceof lambdaorm_base_1.BulkInsert);
        const update = sentence.children.find(p => p instanceof lambdaorm_base_1.Update);
        const _delete = sentence.children.find(p => p instanceof lambdaorm_base_1.Delete);
        const variables = [];
        if (map)
            this.loadVariables(map, variables);
        if (insert)
            this.loadVariables(insert, variables);
        if (bulkInsert)
            this.loadVariables(bulkInsert, variables);
        if (update)
            this.loadVariables(update, variables);
        if (_delete)
            this.loadVariables(_delete, variables);
        if (filter)
            this.loadVariables(filter, variables);
        if (groupBy)
            this.loadVariables(groupBy, variables);
        if (having)
            this.loadVariables(having, variables);
        if (sort)
            this.loadVariables(sort, variables);
        const parameters = [];
        for (let i = 0; i < variables.length; i++) {
            const variable = variables[i];
            variable.number = i + 1;
            parameters.push({ name: variable.name, type: typ3s_1.Type.stringify(variable.returnType) });
        }
        return parameters;
    }
    loadVariables(operand, variables) {
        if (operand.type === _3xpr_1.OperandType.Var && !(operand instanceof lambdaorm_base_1.Field)) {
            variables.push(operand);
        }
        for (const child of operand.children) {
            this.loadVariables(child, variables);
        }
    }
}
exports.SentenceHelper = SentenceHelper;
//# sourceMappingURL=sentenceHelper.js.map