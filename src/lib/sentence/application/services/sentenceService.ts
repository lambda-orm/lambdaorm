// import { ObservableAction, Source } from '../../../schema/domain'
// import { RouteService } from '../../../execution/application/services/routeService'
// import { ClauseInfo, IRouteService } from '../../../query/domain'
// import { SchemaService } from '../../../schema/application'
// import { Sentence } from '../../domain'
// export class SentenceService {
// private routeService: IRouteService
// constructor (private readonly schemaService: SchemaService) {
// this.routeService = new RouteService(this.schemaService.stage)
// }

// public getSource (sentence: Sentence, stage: string): Source {
// const sentenceInfo: ClauseInfo = { entity: sentence.entity, action: ObservableAction[sentence.action] }
// const sourceName = this.routeService.getSource(sentenceInfo, stage)
// return this.schemaService.source.get(sourceName)
// }
// }

// import { SintaxisError, IOrmExpressions } from '../../../shared/domain'
// import { helper } from '../../../shared/application'
// import { MetadataParameter, MetadataConstraint, MetadataModel, Metadata, Sentence } from '../../domain'
// import { ClauseInfo } from '../../../query/domain'
// import { Source, ObservableAction } from '../../../schema/domain'
// import { Type, Primitive } from 'typ3s'
// import { MemoryCache, ICache } from 'h3lp'
// import { SchemaService, ViewConfigService } from '../../../schema/application'
// import { RouteService } from '../../../execution/application'
// import { SentenceCompleter } from './sentenceCompleter'
// import { SentenceHelper } from './helper'
// import { OrmOperandNormalizer } from './normalizer'
// import { SentenceSerializer } from './serialize'
// import { SentenceBuilder } from './sentenceBuilder'
// import { Operand, OperandSerializer } from '3xpr'

// export class SentenceService {
// private builder: SentenceBuilder
// private completer: SentenceCompleter
// private operandCache: ICache<number, string>
// private sentenceCache: ICache<string, string>
// private serializer:SentenceSerializer
// private operandSerializer:OperandSerializer
// private normalizer: OrmOperandNormalizer
// private helper:SentenceHelper

// constructor (private readonly schema: SchemaService,
// private readonly expressions: IOrmExpressions,
// private readonly sentenceRoute: RouteService
// ) {
// this.helper = new SentenceHelper(this.schema.model)
// this.builder = new SentenceBuilder(this.schema.model)
// this.completer = new SentenceCompleter(expressions)
// this.operandCache = new MemoryCache<number, string>()
// this.sentenceCache = new MemoryCache<string, string>()
// this.serializer = new SentenceSerializer()
// this.operandSerializer = new OperandSerializer()
// this.normalizer = new OrmOperandNormalizer(this.schema.model)
// }

// /**
//  * Convert a lambda expression to a query expression
//  * @param lambda lambda expression
//  * @returns Expression manager
//  */
// // eslint-disable-next-line @typescript-eslint/ban-types
// // public toExpression (func: Function): string {
// // return this.expressions.convert(func, 'function')[0]
// // }

// // public normalize (expression: string): string {
// // try {
// // const operand = this.toOperand(expression, true)
// // const result = this.helper.toExpression(operand)
// // return result
// // } catch (error: any) {
// // throw new SintaxisError('normalize expression: ' + expression + ' error: ' + error.toString())
// // }
// // }

// /**
//  * Get model of expression
//  * @param expression expression
//  * @returns Model of expression
//  */
// // public model (expression: string): MetadataModel[] {
// // const sentence = this.toSentence(expression, true)
// // return this.modelFromSentence(sentence)
// // }

// /**
//  * Get constraints of expression
//  * @param expression expression
//  * @returns constraints
//  */
// // public constraints (expression: string): MetadataConstraint {
// // const sentence = this.toSentence(expression, true)
// // return this.constraintsFromSentence(sentence)
// // }

// /**
//  * Get parameters of expression
//  * @param expression  expression
//  * @returns Parameters of expression
//  */
// // public parameters (expression: string): MetadataParameter[] {
// // const sentence = this.toSentence(expression, true)
// // return this.parametersFromSentence(sentence)
// // }

// /**
//  * Get metadata of expression
//  * @param expression expression
//  * @returns metadata of expression
//  */
// // public metadata (expression: string): Metadata {
// // const sentence = this.toSentence(expression, true)
// // return this.metadataFromSentence(sentence)
// // }

// public create (expression: string, view: ViewConfigService, stage:string, useCache:boolean): Sentence {
// if (!useCache) {
// const sentence = this.toSentence(expression, false)
// this.complete(sentence, view, stage)
// return sentence
// }
// const expressionKey = helper.utils.hashCode(expression)
// const key = `${expressionKey}-${stage}-${view.name}`
// const value = this.sentenceCache.get(key)
// if (value) {
// return this.serializer.deserialize(value)
// }
// const sentence = this.toSentence(expression, false)
// this.complete(sentence, view, stage)
// this.sentenceCache.set(key, this.serializer.serialize(sentence))
// return sentence
// }

// public getDataSource (sentence: Sentence, stage: string): Source {
// const sentenceInfo: ClauseInfo = { entity: sentence.entity, action: ObservableAction[sentence.action] }
// const sourceName = this.sentenceRoute.getSource(sentenceInfo, stage)
// return this.schema.source.get(sourceName)
// }

// private toOperand (expression: string, useCache:boolean): Operand {
// if (!useCache) {
// const operand = this.expressions.build(expression, false)
// const normalized = this.normalizer.normalize(operand)
// return normalized
// }
// const key = helper.utils.hashCode(expression)
// const value = this.operandCache.get(key)
// if (value) {
// return this.operandSerializer.deserialize(value)
// }
// const operand = this.expressions.build(expression, false)
// const normalized = this.normalizer.normalize(operand)
// this.operandCache.set(key, this.operandSerializer.serialize(normalized))
// return normalized
// }

// private toSentence (expression: string, useCache:boolean): Sentence {
// const operand = this.toOperand(expression, useCache)
// const sentence = this.builder.build(operand)
// return sentence
// }
// }
