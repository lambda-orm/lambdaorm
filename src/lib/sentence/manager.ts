
import { MetadataParameter, MetadataConstraint, MetadataModel, Metadata, source, Sentence, SentenceInfo, ObservableAction } from '../contract'
import { SchemaManager, Routing, ViewConfig, helper } from '../manager'
import { IExpressions, Type, OperandType } from '3xpr'
import { MemoryCache, ICache } from 'h3lp'
import { SentenceCompleter, SentenceBuilder, SentenceSerializer } from '.'

export class SentenceManager {
	// private serializer: SentenceSerializer
	private builder: SentenceBuilder
	private schema: SchemaManager
	private routing: Routing
	private completer: SentenceCompleter
	private cache: ICache<string, Sentence>
	private expressions: IExpressions
	private serializer:SentenceSerializer

	constructor (schema: SchemaManager, expressions: IExpressions, routing: Routing) {
		this.schema = schema
		this.routing = routing
		this.expressions = expressions
		this.builder = new SentenceBuilder(schema, expressions)
		this.completer = new SentenceCompleter(expressions)
		this.cache = new MemoryCache<string, Sentence>()
		this.serializer = new SentenceSerializer()
	}

	public normalize (expression: string): string {
		return this.builder.normalize(expression)
	}

	/**
	 * Get model of expression
	 * @param expression expression
	 * @returns Model of expression
	 */
	public model (expression: string): MetadataModel[] {
		const sentence = this.builder.build(expression)
		return this.modelFromSentence(sentence)
	}

	/**
	 * Get constraints of expression
	 * @param expression expression
	 * @returns constraints
	 */
	public constraints (expression: string): MetadataConstraint {
		const sentence = this.builder.build(expression)
		return this.constraintsFromSentence(sentence)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): MetadataParameter[] {
		const sentence = this.builder.build(expression)
		return this.parametersFromSentence(sentence)
	}

	/**
	 * Get metadata of expression
	 * @param expression expression
	 * @returns metadata of expression
	 */
	public metadata (expression: string): Metadata {
		const sentence = this.builder.build(expression)
		return this.metadataFromSentence(sentence)
	}

	public create (expression: string, view: ViewConfig, stage:string): Sentence {
		const expressionKey = helper.utils.hashCode(expression)
		const key = `${expressionKey}-${stage}-${view.name}`
		const value = this.cache.get(key)
		if (value) {
			return value
		}
		const sentence = this.builder.build(expression)
		// It should be cloned, since completing the sentence is modified
		const cloned = this.serializer.clone(sentence)
		this.complete(cloned, view, stage)
		this.cache.set(key, cloned)
		return cloned
	}

	public getDataSource (sentence: Sentence, stage: string): source {
		const sentenceInfo: SentenceInfo = { entity: sentence.entity, action: ObservableAction[sentence.action] }
		const dataSourceName = this.routing.getDataSource(sentenceInfo, stage)
		return this.schema.source.get(dataSourceName)
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

	private complete (sentence: Sentence, view: ViewConfig, stage: string) {
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
			parameters.push({ name: parameter.name, type: parameter.type ? parameter.type : 'any' })
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

	/**
	 * Convert a lambda expression to a query expression
	 * @param lambda lambda expression
	 * @returns Expression manager
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	public toExpression (func: Function): string {
		if (!func) {
			throw new Error('empty lambda function}')
		}
		const expression = helper.sentence.clearLambda(func)
		const operand = this.expressions.build(expression)
		let aux = operand
		while (aux.type !== OperandType.Var) {
			if (aux.children.length > 0) {
				aux = aux.children[0]
			}
		}
		if (aux.name.includes('.')) {
			// Example: __model_1.Products.map(p=>p) =>  Products.map(p=>p)
			// Example: __model_1.Orders.details.map(p=>p) =>  Orders.details.map(p=>p)
			const names:string[] = aux.name.split('.')
			if (names[0].startsWith('__')) {
				aux.name = names.slice(1).join('.')
			}
		}
		return helper.operand.toExpression(operand)
	}

	// private serialize (sentence: Sentence): string {
	// return this.serializer.serialize(sentence)
	// }
	// private deserialize (value: string): Sentence {
	// return this.serializer.deserialize(value)
	// }
}
