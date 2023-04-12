
import {
	MetadataParameter, SintaxisError, MetadataConstraint, MetadataModel, Metadata, Source, Sentence,
	SentenceInfo, ObservableAction, ISchemaService, IViewConfigService
} from '../../domain'
import { Routing } from '..'
import { helper } from '../../helper'
import { IExpressions, Operand, OperandSerializer } from '3xpr'
import { Type, Kind } from 'json-light'
import { MemoryCache, ICache } from 'h3lp'
import { SentenceCompleter, SentenceBuilder, SentenceSerializer, SentenceNormalizer, SentenceHelper } from '.'

export class SentenceService {
	private builder: SentenceBuilder
	private schema: ISchemaService
	private routing: Routing
	private completer: SentenceCompleter
	private operandCache: ICache<number, string>
	private sentenceCache: ICache<string, string>
	private expressions: IExpressions
	private serializer:SentenceSerializer
	private operandSerializer:OperandSerializer
	private normalizer: SentenceNormalizer
	private helper:SentenceHelper

	constructor (schema: ISchemaService, expressions: IExpressions, routing: Routing) {
		this.schema = schema
		this.routing = routing
		this.expressions = expressions
		this.helper = new SentenceHelper(this.schema.model)
		this.builder = new SentenceBuilder(schema, expressions, this.helper)
		this.completer = new SentenceCompleter(expressions)
		this.operandCache = new MemoryCache<number, string>()
		this.sentenceCache = new MemoryCache<string, string>()
		this.serializer = new SentenceSerializer()
		this.operandSerializer = new OperandSerializer()
		this.normalizer = new SentenceNormalizer(expressions.model, schema, expressions)
	}

	/**
	 * Convert a lambda expression to a query expression
	 * @param lambda lambda expression
	 * @returns Expression manager
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	public toExpression (func: Function): string {
		return this.expressions.toExpression(func)
	}

	public normalize (expression: string): string {
		try {
			const operand = this.toOperand(expression, true)
			const result = this.helper.toExpression(operand)
			return result
		} catch (error: any) {
			throw new SintaxisError('complete expression: ' + expression + ' error: ' + error.toString())
		}
	}

	/**
	 * Get model of expression
	 * @param expression expression
	 * @returns Model of expression
	 */
	public model (expression: string): MetadataModel[] {
		const sentence = this.toSentence(expression, true)
		return this.modelFromSentence(sentence)
	}

	/**
	 * Get constraints of expression
	 * @param expression expression
	 * @returns constraints
	 */
	public constraints (expression: string): MetadataConstraint {
		const sentence = this.toSentence(expression, true)
		return this.constraintsFromSentence(sentence)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): MetadataParameter[] {
		const sentence = this.toSentence(expression, true)
		return this.parametersFromSentence(sentence)
	}

	/**
	 * Get metadata of expression
	 * @param expression expression
	 * @returns metadata of expression
	 */
	public metadata (expression: string): Metadata {
		const sentence = this.toSentence(expression, true)
		return this.metadataFromSentence(sentence)
	}

	public create (expression: string, view: IViewConfigService, stage:string, useCache:boolean): Sentence {
		if (!useCache) {
			const sentence = this.toSentence(expression, false)
			this.complete(sentence, view, stage)
			return sentence
		}
		const expressionKey = helper.utils.hashCode(expression)
		const key = `${expressionKey}-${stage}-${view.name}`
		const value = this.sentenceCache.get(key)
		if (value) {
			return this.serializer.deserialize(value)
		}
		const sentence = this.toSentence(expression, false)
		this.complete(sentence, view, stage)
		this.sentenceCache.set(key, this.serializer.serialize(sentence))
		return sentence
	}

	public getDataSource (sentence: Sentence, stage: string): Source {
		const sentenceInfo: SentenceInfo = { entity: sentence.entity, action: ObservableAction[sentence.action] }
		const sourceName = this.routing.getSource(sentenceInfo, stage)
		return this.schema.source.get(sourceName)
	}

	private toOperand (expression: string, useCache:boolean): Operand {
		if (!useCache) {
			const operand = this.expressions.build(expression, false)
			const normalized = this.normalizer.normalize(operand)
			return normalized
		}
		const key = helper.utils.hashCode(expression)
		const value = this.operandCache.get(key)
		if (value) {
			return this.operandSerializer.deserialize(value)
		}
		const operand = this.expressions.build(expression, false)
		const normalized = this.normalizer.normalize(operand)
		this.operandCache.set(key, this.operandSerializer.serialize(normalized))
		return normalized
	}

	private toSentence (expression: string, useCache:boolean): Sentence {
		const operand = this.toOperand(expression, useCache)
		const sentence = this.builder.build(operand)
		return sentence
	}

	private metadataFromSentence (sentence: Sentence): Metadata {
		const children: Metadata[] = []
		for (const sentenceInclude of sentence.getIncludes()) {
			const child = this.metadataFromSentence(sentenceInclude.children[0] as Sentence)
			children.push(child)
		}
		return {
			classtype: sentence.constructor.name,
			pos: sentence.pos,
			name: sentence.name,
			children,
			type: Type.stringify(sentence.returnType),
			entity: sentence.entity,
			columns: sentence.columns,
			// property: sentence.p
			parameters: sentence.parameters,
			constraints: sentence.constraints,
			values: sentence.values,
			defaults: sentence.defaults,
			// relation: sentence.rel,
			clause: sentence.action,
			alias: sentence.alias,
			// isRoot: sentence.
			number: sentence.number
		}
	}

	private complete (sentence: Sentence, view: IViewConfigService, stage: string): void {
		const sentenceIncludes = sentence.getIncludes()
		for (const p in sentenceIncludes) {
			const sentenceInclude = sentenceIncludes[p]
			this.complete(sentenceInclude.children[0] as Sentence, view, stage)
		}
		const source = this.getDataSource(sentence, stage)
		const mapping = this.schema.mapping.getInstance(source.mapping)
		this.completer.complete(mapping, view, sentence)
	}

	private modelFromSentence (sentence: Sentence): MetadataModel[] {
		const result: MetadataModel[] = []
		for (const column of sentence.columns) {
			if (!column.name.startsWith('__')) {
				result.push({ name: column.name, type: column.type })
			}
		}
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const childType = include.relation.entity + (include.relation.type === 'manyToOne' ? '[]' : '')
			const child: MetadataModel = { name: include.relation.name, type: childType, children: [] }
			child.children = this.modelFromSentence(include.children[0] as Sentence)
			result.push(child)
		}
		return result
	}

	private parametersFromSentence (sentence: Sentence): MetadataParameter[] {
		const parameters: MetadataParameter[] = []
		for (const parameter of sentence.parameters) {
			if (parameters.find(p => p.name === parameter.name) === undefined) {
				parameters.push({ name: parameter.name, type: parameter.type ? parameter.type : Kind.any })
			}
		}
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const relationParameter: MetadataParameter = {
				name: include.relation.name,
				type: include.relation.entity,
				children: []
			}
			const children = this.parametersFromSentence(include.children[0] as Sentence)
			for (const q in children) {
				const child = children[q]
				relationParameter.children?.push(child)
			}
			parameters.push(relationParameter)
		}
		return parameters
	}

	private constraintsFromSentence (sentence: Sentence): MetadataConstraint {
		const result: MetadataConstraint = { entity: sentence.entity, constraints: sentence.constraints }
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const include = includes[p]
			const child = this.constraintsFromSentence(include.children[0] as Sentence)
			if (!result.children) {
				result.children = []
			}
			result.children.push(child)
		}
		return result
	}
}
