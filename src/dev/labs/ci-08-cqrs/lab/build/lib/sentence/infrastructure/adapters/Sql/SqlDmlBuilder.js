"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlDmlBuilder = void 0;
const dmlBuilder_1 = require("../base/dmlBuilder");
const _3xpr_1 = require("3xpr");
const lambdaorm_base_1 = require("lambdaorm-base");
const domain_1 = require("../../../../query/domain");
class SqlDmlBuilder extends dmlBuilder_1.DmlBuilderBase {
    build(sentence) {
        return new domain_1.Query({
            action: sentence.action,
            category: this.helper.query.getSentenceCategory(sentence.action),
            type: this.helper.query.getSentenceType(sentence.action),
            description: `${sentence.action} ${sentence.entity}`,
            dialect: this.source.dialect,
            source: this.source.name,
            sentence: this.buildSentence(sentence),
            entity: sentence.entity,
            columns: sentence.columns,
            parameters: sentence.parameters,
            constraints: sentence.constraints,
            values: sentence.values,
            defaults: sentence.defaults
        });
    }
    buildSelectSentence(sentence) {
        const map = sentence.children.find(p => p.name === 'map');
        const from = sentence.children.find(p => p instanceof lambdaorm_base_1.From);
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
            throw new lambdaorm_base_1.SchemaError('map operand not found');
        }
        if (from === undefined) {
            throw new lambdaorm_base_1.SchemaError('from operand not found');
        }
        let text = this.buildArrowFunction(map) + ' ' + this.buildFrom(from) + ' ' + this.buildJoins(entity, joins);
        if (filter) {
            text = text + this.buildArrowFunction(filter) + ' ';
        }
        if (groupBy) {
            text = text + this.buildArrowFunction(groupBy) + ' ';
        }
        if (having) {
            text = text + this.buildArrowFunction(having) + ' ';
        }
        if (sort) {
            text = text + this.buildArrowFunction(sort) + ' ';
        }
        if (page) {
            text = this.buildPage(text, page);
        }
        return text;
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
        let template = this.dialect.dml(insert instanceof lambdaorm_base_1.BulkInsert ? 'bulkInsert' : 'insert');
        const templateColumn = this.dialect.other('column');
        const fields = [];
        const values = [];
        const autoIncrement = this.mapping.getAutoIncrement(entity.name);
        if (autoIncrement && entity.sequence) {
            const templateSequenceNextVal = this.dialect.other('sequenceNextVal');
            fields.push(this.helper.str.replace(templateColumn, '{name}', this.dialect.delimiter(autoIncrement.mapping)));
            values.push(this.helper.str.replace(templateSequenceNextVal, '{name}', entity.sequence));
        }
        if (insert.children[0].type === _3xpr_1.OperandType.Obj) {
            const obj = insert.children[0];
            for (const p in obj.children) {
                const keyVal = obj.children[p];
                const property = (_a = entity.properties) === null || _a === void 0 ? void 0 : _a.find(q => q.name === keyVal.name);
                let name;
                if (property) {
                    name = property.mapping;
                }
                else {
                    name = keyVal.name;
                }
                fields.push(this.helper.str.replace(templateColumn, '{name}', this.dialect.delimiter(name)));
                values.push(this.buildOperand(keyVal.children[0]));
            }
        }
        template = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entity.mapping || entity.name));
        template = this.helper.str.replace(template, '{fields}', fields.join(','));
        template = this.helper.str.replace(template, '{values}', values.join(','));
        template = this.helper.str.replace(template, '{autoIncrementField}', autoIncrement && autoIncrement.mapping ? autoIncrement.mapping : '0');
        return template.trim();
    }
    buildUpdateSentence(sentence) {
        var _a;
        const update = sentence.children.find(p => p instanceof lambdaorm_base_1.Update);
        const filter = sentence.children.find(p => p.name === 'filter');
        const entity = this.mapping.getEntity(sentence.entity);
        if (entity === undefined) {
            throw new lambdaorm_base_1.SchemaError(`mapping undefined on ${sentence.entity} entity`);
        }
        if (update === undefined) {
            throw new lambdaorm_base_1.SchemaError('update operand not found');
        }
        let template = this.dialect.dml('update');
        const templateColumn = this.dialect.other('column');
        const templateAssign = this.dialect.operator('=', 2);
        const assigns = [];
        if (update.children[0] instanceof Object) {
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
                const column = this.helper.str.replace(templateColumn, '{name}', this.dialect.delimiter(name));
                const value = this.buildOperand(keyVal.children[0]);
                let assign = this.helper.str.replace(templateAssign, '{0}', column);
                assign = this.helper.str.replace(assign, '{1}', value);
                assigns.push(assign);
            }
        }
        template = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entity.mapping || entity.name));
        template = this.helper.str.replace(template, '{alias}', update.alias);
        template = this.helper.str.replace(template, '{assigns}', assigns.join(','));
        let text = template.trim() + ' ';
        if (filter)
            text = text + this.buildArrowFunction(filter) + ' ';
        return text;
    }
    buildDeleteSentence(sentence) {
        const _delete = sentence.children.find(p => p instanceof lambdaorm_base_1.Delete);
        const filter = sentence.children.find(p => p.name === 'filter');
        const entity = this.mapping.getEntity(sentence.entity);
        if (entity === undefined) {
            throw new lambdaorm_base_1.SchemaError(`mapping undefined on ${sentence.entity} entity`);
        }
        if (_delete === undefined) {
            throw new lambdaorm_base_1.SchemaError('delete operand not found');
        }
        let template = this.dialect.dml('delete');
        template = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entity.mapping || entity.name));
        template = this.helper.str.replace(template, '{alias}', _delete.alias);
        let text = template.trim() + ' ';
        if (filter)
            text = text + this.buildArrowFunction(filter) + ' ';
        return text;
    }
    buildFrom(from) {
        let template = this.dialect.dml('from');
        const entityMapping = this.mapping.entityMapping(from.entity);
        if (entityMapping === undefined) {
            throw new lambdaorm_base_1.SchemaError(`not found mapping for ${from.entity}`);
        }
        template = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entityMapping));
        template = this.helper.str.replace(template, '{alias}', from.alias);
        return template.trim();
    }
    buildJoins(_entity, joins) {
        const list = [];
        const template = this.dialect.dml('join');
        for (const join of joins) {
            const entity = this.mapping.getEntity(join.name);
            if (entity === undefined) {
                throw new lambdaorm_base_1.SchemaError(`not found mapping for ${join.name}`);
            }
            let joinText = this.helper.str.replace(template, '{name}', this.dialect.delimiter(entity.mapping || entity.name));
            joinText = this.helper.str.replace(joinText, '{alias}', join.alias);
            joinText = this.helper.str.replace(joinText, '{relation}', this.buildOperand(join.children[0])).trim();
            list.push(joinText);
        }
        return list.join(' ') + ' ';
    }
    buildField(field) {
        if (this.mapping.existsProperty(field.entity, field.fieldName())) {
            const property = this.mapping.getProperty(field.entity, field.fieldName());
            if (field.alias === undefined) {
                return this.helper.str.replace(this.dialect.other('column'), '{name}', this.dialect.delimiter(property.mapping, true));
            }
            else {
                let text = this.dialect.other('field');
                text = this.helper.str.replace(text, '{entityAlias}', field.alias);
                text = this.helper.str.replace(text, '{name}', this.dialect.delimiter(property.mapping));
                return text;
            }
        }
        else {
            const forceDelimiter = ['PostgreSQL', 'Oracle'].includes(this.dialect.name);
            return this.helper.str.replace(this.dialect.other('column'), '{name}', this.dialect.delimiter(field.name, forceDelimiter));
        }
    }
    buildObject(operand) {
        let text = '';
        const template = this.dialect.function('as').template;
        for (let i = 0; i < operand.children.length; i++) {
            const value = this.buildOperand(operand.children[i]);
            const forceDelimiter = ['PostgreSQL', 'Oracle'].includes(this.dialect.name);
            const alias = this.dialect.delimiter(operand.children[i].name, forceDelimiter);
            let fieldText = this.helper.str.replace(template, '{value}', value);
            fieldText = this.helper.str.replace(fieldText, '{alias}', alias);
            text += (i > 0 ? ', ' : '') + fieldText;
        }
        return text;
    }
}
exports.SqlDmlBuilder = SqlDmlBuilder;
//# sourceMappingURL=SqlDmlBuilder.js.map