"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceTypeService = void 0;
const _3xpr_1 = require("3xpr");
const typ3s_1 = require("typ3s");
const lambdaorm_base_1 = require("lambdaorm-base");
class SentenceTypeService extends _3xpr_1.TypeServiceImpl {
    constructor(model, config, helper) {
        super(model);
        this.config = config;
        this.helper = helper;
    }
    getType(operand) {
        if (operand instanceof lambdaorm_base_1.Sentence) {
            const sentence = operand;
            this.solveSentence(sentence);
            for (const child of sentence.children) {
                if (child.children.length > 0 && !(child instanceof lambdaorm_base_1.From) && !(child instanceof lambdaorm_base_1.SentenceInclude)) {
                    this.solveTemplate(child.children[0]);
                    this.setUndefinedAsAny(child.children[0]);
                }
            }
        }
        else {
            this.solveType(operand);
            this.solveTemplate(operand);
            this.setUndefinedAsAny(operand);
        }
        return operand.returnType || typ3s_1.Type.any;
    }
    solveSentence(sentence) {
        const info = this.helper.query.getInfo(sentence.action, sentence.entity);
        switch (info.type) {
            case lambdaorm_base_1.SentenceType.dql:
                this.solveSelect(sentence);
                break;
            case lambdaorm_base_1.SentenceType.dml:
                this.solveModify(sentence);
                break;
            default:
                throw new lambdaorm_base_1.SintaxisError(`sentence ${info.type} type not found`);
        }
    }
    solveSelect(sentence) {
        const map = sentence.children.find(p => p instanceof lambdaorm_base_1.Map);
        const joins = sentence.children.filter(p => p instanceof lambdaorm_base_1.Join);
        const filter = sentence.children.find(p => p instanceof lambdaorm_base_1.Filter);
        const groupBy = sentence.children.find(p => p instanceof lambdaorm_base_1.GroupBy);
        const having = sentence.children.find(p => p instanceof lambdaorm_base_1.Having);
        const sort = sentence.children.find(p => p instanceof lambdaorm_base_1.Sort);
        const page = sentence.children.find(p => p instanceof lambdaorm_base_1.Page);
        this.solveFields(map.children[0], sentence.entity);
        this.solveType(map.children[0]);
        if (joins) {
            for (const join of joins) {
                this.solveFields(join.children[0], sentence.entity, map.children[0].children);
                this.solveType(join.children[0]);
            }
        }
        if (filter) {
            this.solveFields(filter.children[0], sentence.entity, map.children[0].children);
            this.solveType(filter.children[0]);
        }
        if (groupBy) {
            this.solveFields(groupBy.children[0], sentence.entity, map.children[0].children);
            this.solveType(groupBy.children[0]);
        }
        if (having) {
            this.solveFields(having.children[0], sentence.entity, map.children[0].children);
            this.solveType(having.children[0]);
        }
        if (sort) {
            this.solveFields(sort.children[0], sentence.entity, map.children[0].children);
            this.solveType(sort.children[0]);
        }
        if (page) {
            this.solveType(page.children[0]);
            this.solveType(page.children[1]);
        }
    }
    solveModify(sentence) {
        const insert = sentence.children.find(p => p instanceof lambdaorm_base_1.Insert);
        const bulkInsert = sentence.children.find(p => p instanceof lambdaorm_base_1.BulkInsert);
        const update = sentence.children.find(p => p instanceof lambdaorm_base_1.Update);
        // const _delete = sentence.children.find(p => p instanceof Delete) as Delete| undefined
        const filter = sentence.children.find(p => p instanceof lambdaorm_base_1.Filter);
        if (insert) {
            this.solveFieldsModify(insert.children[0], sentence.entity);
            this.solveType(insert.children[0]);
        }
        if (bulkInsert) {
            this.solveFieldsModify(bulkInsert.children[0], sentence.entity);
            this.solveType(bulkInsert.children[0]);
        }
        if (update) {
            this.solveFieldsModify(update.children[0], sentence.entity);
            this.solveType(update.children[0]);
        }
        if (filter) {
            this.solveFields(filter.children[0], sentence.entity);
            this.solveType(filter.children[0]);
        }
    }
    solveFields(operand, entityName, keyVals = []) {
        if (operand instanceof lambdaorm_base_1.Field && (operand.returnType === undefined || operand.returnType.primitive === typ3s_1.Primitive.any)) {
            const keyVal = keyVals.find(p => p.name === operand.name);
            if (keyVal) {
                // Example: Users.map(=> { name: firstname + ", " + lastname }).sort(p=> p.name)
                operand.returnType = keyVal.returnType;
            }
            else {
                // Example: Users.map(=> { name: firstname + ", " + lastname }).sort(p=> p.lastname)
                // Users.map(=> { name: firstname + ", " + lastname }).sort(p=> p.username)
                const property = this.config.getProperty(entityName, operand.name);
                if (property) {
                    operand.returnType = typ3s_1.Type.to(property.type || 'string');
                }
            }
        }
        else {
            for (const child of operand.children) {
                this.solveFields(child, entityName, keyVals);
            }
        }
    }
    solveFieldsModify(operand, entityName) {
        if (operand.type === _3xpr_1.OperandType.Obj) {
            for (const keyVal of operand.children) {
                const property = this.config.getProperty(entityName, keyVal.name);
                if (keyVal.returnType === undefined || keyVal.returnType === typ3s_1.Type.any) {
                    keyVal.returnType = typ3s_1.Type.to(property.type || 'string');
                }
                if (keyVal.children[0].returnType === undefined || keyVal.children[0].returnType === typ3s_1.Type.any) {
                    keyVal.children[0].returnType = typ3s_1.Type.to(property.type || 'string');
                }
            }
        }
    }
}
exports.SentenceTypeService = SentenceTypeService;
//# sourceMappingURL=typeService.js.map