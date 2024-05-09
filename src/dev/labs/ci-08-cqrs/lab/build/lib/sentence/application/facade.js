"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceFacade = void 0;
const sentenceBuilder_1 = require("./services/sentenceBuilder");
const sentenceCompleteBuilder_1 = require("./services/sentenceCompleteBuilder");
const sentenceCompleteBuilderCacheDecorator_1 = require("./services/sentenceCompleteBuilderCacheDecorator");
const sentenceHelper_1 = require("./services/sentenceHelper");
const getConstraints_1 = require("./useCases/getConstraints");
const getMetadata_1 = require("./useCases/getMetadata");
const getModel_1 = require("./useCases/getModel");
const getParameters_1 = require("./useCases/getParameters");
class SentenceFacade {
    constructor(schemaState, operandFacade, expressions, cache, serializer, helper) {
        this.schemaState = schemaState;
        this.operandFacade = operandFacade;
        this.expressions = expressions;
        this.sentenceHelper = new sentenceHelper_1.SentenceHelper(this.schemaState, helper);
        this.builder = new sentenceBuilder_1.SentenceBuilder(this.schemaState, this.operandFacade, this.expressions, helper);
        this.builderComplete = new sentenceCompleteBuilderCacheDecorator_1.SentenceCompleteBuilderCacheDecorator(new sentenceCompleteBuilder_1.SentenceCompleteBuilder(this.builder, this.schemaState, this.sentenceHelper, this.expressions), cache, serializer, helper);
        this.getConstraints = new getConstraints_1.GetConstraints(this.builder);
        this.getMetadata = new getMetadata_1.GetMetadata(this.builder);
        this.getModel = new getModel_1.GetModel(this.builder);
        this.getParameters = new getParameters_1.GetParameters(this.builder);
    }
    build(expression, view, stage) {
        return this.builderComplete.build(expression, view, stage);
    }
    constraints(expression) {
        return this.getConstraints.constraints(expression);
    }
    metadata(expression) {
        return this.getMetadata.metadata(expression);
    }
    model(expression) {
        return this.getModel.model(expression);
    }
    parameters(expression) {
        return this.getParameters.parameters(expression);
    }
    getSource(sentence, stage) {
        return this.sentenceHelper.getSource(sentence, stage);
    }
}
exports.SentenceFacade = SentenceFacade;
//# sourceMappingURL=facade.js.map