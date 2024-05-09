"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DmlBuilderBase = void 0;
const _3xpr_1 = require("3xpr");
const typ3s_1 = require("typ3s");
const lambdaorm_base_1 = require("lambdaorm-base");
class DmlBuilderBase {
    // eslint-disable-next-line no-useless-constructor
    constructor(source, mapping, dialect, helper) {
        this.source = source;
        this.mapping = mapping;
        this.dialect = dialect;
        this.helper = helper;
    }
    buildSentence(sentence) {
        const info = this.helper.query.getInfo(sentence.action, sentence.entity);
        switch (info.category) {
            case lambdaorm_base_1.SentenceCategory.select:
                return this.buildSelectSentence(sentence);
            case lambdaorm_base_1.SentenceCategory.insert:
                return this.buildInsertSentence(sentence);
            case lambdaorm_base_1.SentenceCategory.update:
                return this.buildUpdateSentence(sentence);
            case lambdaorm_base_1.SentenceCategory.delete:
                return this.buildDeleteSentence(sentence);
            default:
                throw new lambdaorm_base_1.SintaxisError(`sentence ${info.category} category not supported`);
        }
    }
    buildOperand(operand) {
        if (operand instanceof lambdaorm_base_1.Sentence) {
            return this.buildSentence(operand);
        }
        else if (operand.type === _3xpr_1.OperandType.Arrow) {
            return this.buildArrowFunction(operand);
        }
        else if (operand.type === _3xpr_1.OperandType.CallFunc || operand.type === _3xpr_1.OperandType.ChildFunc) {
            return this.buildFunctionRef(operand);
        }
        else if (operand.type === _3xpr_1.OperandType.Operator) {
            return this.buildOperator(operand);
        }
        else if (operand.type === _3xpr_1.OperandType.Block) {
            return this.buildBlock(operand);
        }
        else if (operand.type === _3xpr_1.OperandType.Obj) {
            return this.buildObject(operand);
        }
        else if (operand.type === _3xpr_1.OperandType.List) {
            return this.buildList(operand);
        }
        else if (operand.type === _3xpr_1.OperandType.KeyVal) {
            return this.buildKeyValue(operand);
        }
        else if (operand instanceof lambdaorm_base_1.Field) {
            return this.buildField(operand);
        }
        else if (operand.type === _3xpr_1.OperandType.Var) {
            return this.buildVariable(operand);
        }
        else if (operand.type === _3xpr_1.OperandType.Const) {
            return this.buildConstant(operand);
        }
        else {
            throw new lambdaorm_base_1.SintaxisError(`Operand ${operand.type} ${operand.name} not supported`);
        }
    }
    buildPage(sentence, operand) {
        let template = this.dialect.dml('page');
        let page = 1;
        let records = 10;
        if (operand.children.length === 2) {
            page = parseInt(operand.children[0].name);
            records = parseInt(operand.children[1].name);
        }
        else if (operand.children.length === 3) {
            page = parseInt(operand.children[1].name);
            records = parseInt(operand.children[2].name);
        }
        if (page < 1)
            page = 1;
        template = this.helper.str.replace(template, '{sentence}', sentence);
        template = this.helper.str.replace(template, '{offset}', ((page - 1) * records).toString());
        template = this.helper.str.replace(template, '{records}', records.toString());
        return template.trim() + ' ';
    }
    buildArrowFunction(operand) {
        let template = this.dialect.dml(operand.name);
        for (let i = 0; i < operand.children.length; i++) {
            const text = this.buildOperand(operand.children[i]);
            template = this.helper.str.replace(template, '{' + i + '}', text);
        }
        return template.trim();
    }
    buildFunctionRef(operand) {
        const funcData = this.dialect.function(operand.name);
        if (!funcData)
            throw new lambdaorm_base_1.SintaxisError('Function ' + operand.name + ' not found');
        let text = '';
        if (['startWith', 'startsWith', 'like'].includes(operand.name) && operand.children.length === 2) {
            text = funcData.template;
            const firstOperand = this.buildOperand(operand.children[0]);
            const secondOperand = this.helper.str.replace(this.buildOperand(operand.children[1]), '\'', '');
            text = this.helper.str.replace(text, '{0}', firstOperand);
            text = this.helper.str.replace(text, '{1}', secondOperand);
        }
        else if (funcData.type === 'multiple') {
            const template = funcData.template;
            text = this.buildOperand(operand.children[0]);
            for (let i = 1; i < operand.children.length; i++) {
                text = this.helper.str.replace(template, '{accumulated}', text);
                text = this.helper.str.replace(text, '{value}', this.buildOperand(operand.children[i]));
            }
        }
        else {
            text = funcData.template;
            for (let i = 0; i < operand.children.length; i++) {
                const value = this.buildOperand(operand.children[i]);
                text = this.helper.str.replace(text, '{' + i + '}', value);
            }
        }
        return text;
    }
    buildOperator(operand) {
        let text = this.dialect.operator(operand.name, operand.children.length);
        for (let i = 0; i < operand.children.length; i++) {
            text = this.helper.str.replace(text, '{' + i + '}', this.buildOperand(operand.children[i]));
        }
        return text;
    }
    buildBlock(operand) {
        let text = '';
        for (const child of operand.children) {
            text += (this.buildOperand(child) + '');
        }
        return text;
    }
    buildList(operand) {
        let text = '';
        for (let i = 0; i < operand.children.length; i++) {
            text += (i > 0 ? ', ' : '') + this.buildOperand(operand.children[i]);
        }
        return text;
    }
    buildKeyValue(operand) {
        return this.buildOperand(operand.children[0]);
    }
    buildVariable(operand) {
        const number = operand.number ? operand.number : 0;
        let text = this.dialect.other('variable');
        text = this.helper.str.replace(text, '{name}', this.helper.query.transformParameter(operand.name));
        text = this.helper.str.replace(text, '{number}', number.toString());
        return text;
    }
    buildConstant(operand) {
        if (operand.returnType === undefined) {
            return this.helper.query.escape(operand.name);
        }
        switch (operand.returnType.primitive) {
            case typ3s_1.Primitive.string:
                return this.helper.query.escape(operand.name);
            case typ3s_1.Primitive.boolean:
                return this.dialect.other(operand.name.toString());
            case typ3s_1.Primitive.integer:
                return parseInt(operand.name).toString();
            case typ3s_1.Primitive.number:
            case typ3s_1.Primitive.decimal:
                return parseFloat(operand.name).toString();
            default:
                return this.helper.query.escape(operand.name);
        }
    }
}
exports.DmlBuilderBase = DmlBuilderBase;
//# sourceMappingURL=dmlBuilder.js.map