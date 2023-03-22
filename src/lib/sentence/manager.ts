
import { MetadataParameter, SintaxisError, MetadataConstraint, MetadataModel, Metadata, source, Sentence, SentenceInfo, ObservableAction } from '../contract'
import { SchemaManager, Routing, ViewConfig, helper } from '../manager'
import { IExpressions, Type, Kind, Operand } from '3xpr'
import { MemoryCache, ICache } from 'h3lp'
import { SentenceCompleter, SentenceBuilder, SentenceSerializer, SentenceNormalizer, SentenceHelper } from '.'

export class SentenceManager {
	private builder: SentenceBuilder
	private schema: SchemaManager
	private routing: Routing
	private completer: SentenceCompleter
	private operandCache: ICache<number, Operand>
	private sentenceCache: ICache<string, Sentence>
	private expressions: IExpressions
	private serializer:SentenceSerializer
	private normalizer: SentenceNormalizer
	private helper:SentenceHelper

	constructor (schema: SchemaManager, expressions: IExpressions, routing: Routing) {
		this.schema = schema
		this.routing = routing
		this.expressions = expressions
		this.helper = new SentenceHelper(this.schema.model)
		this.builder = new SentenceBuilder(schema, expressions, this.helper)
		this.completer = new SentenceCompleter(expressions)
		this.operandCache = new MemoryCache<number, Operand>()
		this.sentenceCache = new MemoryCache<string, Sentence>()
		this.serializer = new SentenceSerializer()
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
			const operand = this.toOperand(expression)
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
		const sentence = this.toSentence(expression)
		return this.modelFromSentence(sentence)
	}

	/**
	 * Get constraints of expression
	 * @param expression expression
	 * @returns constraints
	 */
	public constraints (expression: string): MetadataConstraint {
		const sentence = this.toSentence(expression)
		return this.constraintsFromSentence(sentence)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): MetadataParameter[] {
		const sentence = this.toSentence(expression)
		return this.parametersFromSentence(sentence)
	}

	/**
	 * Get metadata of expression
	 * @param expression expression
	 * @returns metadata of expression
	 */
	public metadata (expression: string): Metadata {
		const sentence = this.toSentence(expression)
		return this.metadataFromSentence(sentence)
	}

	public create (expression: string, view: ViewConfig, stage:string): Sentence {
		const expressionKey = helper.utils.hashCode(expression)
		const key = `${expressionKey}-${stage}-${view.name}`
		const value = this.sentenceCache.get(key)
		if (value) {
			return value
		}
		const sentence = this.toSentence(expression)
		const completed = this.complete(sentence, view, stage)
		this.sentenceCache.set(key, completed)
		return completed
	}

	public getDataSource (sentence: Sentence, stage: string): source {
		const sentenceInfo: SentenceInfo = { entity: sentence.entity, action: ObservableAction[sentence.action] }
		const dataSourceName = this.routing.getDataSource(sentenceInfo, stage)
		return this.schema.source.get(dataSourceName)
	}

	private toOperand (expression: string): Operand {
		const key = helper.utils.hashCode(expression)
		const value = this.operandCache.get(key)
		if (value) {
			return value
		}
		const operand = this.expressions.build(expression)
		const normalized = this.normalizer.normalize(operand)
		this.operandCache.set(key, normalized)
		return normalized
	}

	private toSentence (expression: string): Sentence {
		const operand = this.toOperand(expression)
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
			type: Type.toString(sentence.returnType),
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

	private complete (sentence: Sentence, view: ViewConfig, stage: string): Sentence {
		// it clones the operand because it is going to modify it and it should not alter the operand passed by parameter
		const cloned = this.serializer.clone(sentence)
		this._complete(cloned, view, stage)
		return cloned
	}

	private _complete (sentence: Sentence, view: ViewConfig, stage: string): void {
		const sentenceIncludes = sentence.getIncludes()
		for (const p in sentenceIncludes) {
			const sentenceInclude = sentenceIncludes[p]
			this._complete(sentenceInclude.children[0] as Sentence, view, stage)
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
