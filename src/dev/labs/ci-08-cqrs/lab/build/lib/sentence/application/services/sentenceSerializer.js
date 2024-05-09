"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceSerializerImp = void 0;
const lambdaorm_base_1 = require("lambdaorm-base");
const _3xpr_1 = require("3xpr");
const typ3s_1 = require("typ3s");
class SentenceSerializerImp {
    clone(sentence) {
        const serialized = this.serialize(sentence);
        const deserialized = this.deserialize(serialized);
        return deserialized;
    }
    serialize(sentence) {
        return JSON.stringify(this._serialize(sentence));
    }
    deserialize(value) {
        return (this._deserialize(JSON.parse(value)));
    }
    _serialize(operand) {
        const children = [];
        for (const child of operand.children) {
            children.push(this._serialize(child));
        }
        if (operand instanceof lambdaorm_base_1.Sentence) {
            return { classtype: operand.constructor.name, pos: operand.pos, name: operand.name, children, type: operand.type, returnType: typ3s_1.Type.stringify(operand.returnType), columns: operand.columns, parameters: operand.parameters, entity: operand.entity, alias: operand.alias, constraints: operand.constraints };
        }
        else if (operand instanceof lambdaorm_base_1.SentenceInclude) {
            return { classtype: operand.constructor.name, pos: operand.pos, name: operand.name, children, type: operand.type, returnType: typ3s_1.Type.stringify(operand.returnType), relation: operand.relation };
        }
        else if (operand instanceof lambdaorm_base_1.Map || operand instanceof lambdaorm_base_1.From || operand instanceof lambdaorm_base_1.Filter || operand instanceof lambdaorm_base_1.Join ||
            operand instanceof lambdaorm_base_1.Update || operand instanceof lambdaorm_base_1.Insert || operand instanceof lambdaorm_base_1.BulkInsert || operand instanceof lambdaorm_base_1.Delete ||
            operand instanceof lambdaorm_base_1.GroupBy || operand instanceof lambdaorm_base_1.Having || operand instanceof lambdaorm_base_1.Sort || operand instanceof lambdaorm_base_1.Page) {
            return { classtype: operand.constructor.name, pos: operand.pos, name: operand.name, children, type: operand.type, returnType: typ3s_1.Type.stringify(operand.returnType), entity: operand.entity, alias: operand.alias };
        }
        else if (operand instanceof lambdaorm_base_1.Field) {
            return { classtype: operand.constructor.name, pos: operand.pos, name: operand.name, children, type: operand.type, returnType: typ3s_1.Type.stringify(operand.returnType), entity: operand.entity, alias: operand.alias, isRoot: operand.isRoot };
        }
        else {
            return { classtype: operand.constructor.name, pos: operand.pos, name: operand.name, children, number: operand.number, type: operand.type, returnType: typ3s_1.Type.stringify(operand.returnType) };
        }
    }
    _deserialize(value) {
        const children = [];
        if (value.children) {
            for (const child of value.children) {
                const deserialized = this._deserialize(child);
                children.push(deserialized);
            }
        }
        switch (value.classtype) {
            case 'Sentence':
                // eslint-disable-next-line no-case-declarations
                const sentence = new lambdaorm_base_1.Sentence(value.pos, value.name, children, value.entity || '', value.alias || '');
                sentence.parameters = value.parameters || [];
                sentence.constraints = value.constraints || [];
                sentence.values = value.values || [];
                sentence.defaults = value.defaults || [];
                sentence.columns = value.columns || [];
                return sentence;
            case 'SentenceInclude':
                return new lambdaorm_base_1.SentenceInclude(value.pos, value.name, children, value.relation);
            case 'Delete':
                return new lambdaorm_base_1.Delete(value.pos, value.name, children, value.entity || '', value.alias || '');
            case 'Update':
                return new lambdaorm_base_1.Update(value.pos, value.name, children, value.entity || '', value.alias || '');
            case 'Insert':
                return new lambdaorm_base_1.Insert(value.pos, value.name, children, value.entity || '', value.alias || '');
            case 'BulkInsert':
                return new lambdaorm_base_1.BulkInsert(value.pos, value.name, children, value.entity || '', value.alias || '');
            case 'Page':
                return new lambdaorm_base_1.Page(value.pos, value.name, children, value.entity || '', value.alias || '');
            case 'Sort':
                return new lambdaorm_base_1.Sort(value.pos, value.name, children, value.entity || '', value.alias || '');
            case 'Having':
                return new lambdaorm_base_1.Having(value.pos, value.name, children, value.entity || '', value.alias || '');
            case 'GroupBy':
                return new lambdaorm_base_1.GroupBy(value.pos, value.name, children, value.entity || '', value.alias || '');
            case 'Filter':
                return new lambdaorm_base_1.Filter(value.pos, value.name, children, value.entity || '', value.alias || '');
            case 'Map':
                return new lambdaorm_base_1.Map(value.pos, value.name, children, value.entity || '', value.alias || '');
            case 'Join':
                return new lambdaorm_base_1.Join(value.pos, value.name, children, value.entity || '', value.alias || '');
            case 'From':
                return new lambdaorm_base_1.From(value.pos, value.name, children, value.entity || '', value.alias || '');
            case 'Field':
                return new lambdaorm_base_1.Field(value.pos, value.entity, value.name, typ3s_1.Type.to(value.returnType), value.alias, value.isRoot);
            default:
                // eslint-disable-next-line no-case-declarations
                const operand = new _3xpr_1.Operand(value.pos, value.name, _3xpr_1.OperandType[value.type], children, typ3s_1.Type.to(value.returnType));
                operand.number = value.number;
                return operand;
        }
    }
}
exports.SentenceSerializerImp = SentenceSerializerImp;
//# sourceMappingURL=sentenceSerializer.js.map