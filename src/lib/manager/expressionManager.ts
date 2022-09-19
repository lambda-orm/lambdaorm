import { ObservableAction, Query, OrmOptions, SintaxisError, Include, MetadataParameter, MetadataConstraint, MetadataSentence, MetadataModel, Metadata, Sentence, source, SentenceInfo } from '../model'
import { SchemaManager, ExpressionNormalizer, Routing, OperandManager, Languages, ViewConfig, SentenceCompleter } from '.'
import { Helper } from './'
import { Expressions, Cache } from 'js-expressions'

export class ExpressionManager {
	private cache: Cache
	private schema: SchemaManager
	private languages: Languages
	private expressionNormalizer: ExpressionNormalizer
	private routing: Routing
	private expressions: Expressions
	private operandManager: OperandManager
	private sentenceCompleter: SentenceCompleter

	constructor (cache: Cache, schema: SchemaManager, languages: Languages, expressions: Expressions, routing: Routing) {
		this.cache = cache
		this.schema = schema
		this.languages = languages
		this.expressions = expressions
		this.expressionNormalizer = new ExpressionNormalizer(schema)
		this.routing = routing
		this.operandManager = new OperandManager(schema.model, this.expressions.config, this.expressions)
		this.sentenceCompleter = new SentenceCompleter(expressions)
	}

	/**
	 * normalize the expression. Since in some cases the expressions use simplifications, this method is in charge of returning a normalized expression from a expression.
	 * @param expression expression that can be simplified
	 * @returns full expression
	 */
	public normalize (expression: string): string {
		try {
			const node = this.expressions.parser.parse(expression)
			const normalizeNode = this.expressionNormalizer.normalize(node)
			this.expressions.parser.setParent(normalizeNode)
			return this.expressions.parser.toExpression(normalizeNode)
		} catch (error: any) {
			throw new SintaxisError('complete expression: ' + expression + ' error: ' + error.toString())
		}
	}

	/**
	 * Build expression
	 * @param expression expression to build
	 * @returns Sentence
	 */
	private toSentence (expression: string): Sentence {
		const minifyExpression = this.expressions.parser.minify(expression)
		const key = `${minifyExpression}_toOperand`
		const value = this.cache.get(key)
		if (!value) {
			const node = this.expressions.parser.parse(minifyExpression)
			const completeNode = this.expressionNormalizer.normalize(node)
			this.expressions.parser.setParent(completeNode)
			const operand = this.operandManager.build(completeNode)
			this.cache.set(key, this.operandManager.serialize(operand))
			return operand
		} else {
			return this.operandManager.deserialize(value) as Sentence
		}
	}

	public toQuery (expression: string, options: OrmOptions): Query {
		const minifyExpression = this.expressions.parser.minify(expression)
		const _view = this.schema.view.get(options.view)
		const key = `${minifyExpression}_${options.stage}_${options.view}`
		const value = this.cache.get(key)
		if (!value) {
			const sentence = this.toSentence(minifyExpression)
			const view = this.schema.view.getInstance(_view.name)
			this.complete(sentence, view, options.stage as string)
			const query = this.dmlBuild(sentence, view, options.stage as string)
			this.cache.set(key, JSON.stringify(query))
			return query
		} else {
			return JSON.parse(value) as Query
		}
	}

	private getDataSource (sentence: Sentence, stage: string): source {
		const sentenceInfo: SentenceInfo = { entity: sentence.entity, action: ObservableAction[sentence.action] }
		const dataSourceName = this.routing.getDataSource(sentenceInfo, stage)
		return this.schema.source.get(dataSourceName)
	}

	private complete (sentence: Sentence, view: ViewConfig, stage: string) {
		const sentenceIncludes = sentence.getIncludes()
		for (const p in sentenceIncludes) {
			const sentenceInclude = sentenceIncludes[p]
			this.complete(sentenceInclude.children[0] as Sentence, view, stage)
		}
		const source = this.getDataSource(sentence, stage)
		const mapping = this.schema.mapping.getInstance(source.mapping)
		this.sentenceCompleter.complete(mapping, view, sentence)
	}

	private dmlBuild (sentence: Sentence, view: ViewConfig, stage: string): Query {
		const includes:Include[] = []
		const source = this.getDataSource(sentence, stage)
		const language = this.languages.getByDialect(source.dialect)
		const dialect = this.languages.getDialect(source.dialect)
		const mapping = this.schema.mapping.getInstance(source.mapping)
		const sentenceIncludes = sentence.getIncludes()
		for (const p in sentenceIncludes) {
			const sentenceInclude = sentenceIncludes[p]
			if (!sentenceInclude.relation.composite || !dialect.solveComposite) {
				const queryInclude = this.dmlBuild(sentenceInclude.children[0] as Sentence, view, stage)
				const include = new Include(sentenceInclude.name, queryInclude, sentenceInclude.relation)
				includes.push(include)
			}
		}
		const query = language.dmlBuild(source, mapping, sentence)
		query.includes = query.includes.concat(includes)
		return query
	}

	/**
	 * Read lambda expression
	 * @param func lambda expression
	 * @returns String expression
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	public toExpression (func: Function): string {
		if (!func) {
			throw new SintaxisError('empty lambda function}')
		}
		const expression = Helper.clearLambda(func)
		const node = this.expressions.parser.parse(expression)
		let aux = node
		while (aux.type !== 'var') {
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
		return this.expressions.parser.toExpression(node)
	}

	/**
	 * Get model of expression
	 * @param expression expression
	 * @returns Model of expression
	 */
	public model (expression: string): MetadataModel[] {
		const sentence = this.toSentence(expression)
		return this.operandManager.model(sentence)
	}

	/**
	 * Get constraints of expression
	 * @param expression expression
	 * @returns constraints
	 */
	public constraints (expression: string): MetadataConstraint {
		const sentence = this.toSentence(expression)
		return this.operandManager.constraints(sentence)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string): MetadataParameter[] {
		const sentence = this.toSentence(expression)
		return this.operandManager.parameters(sentence)
	}

	public sentence (expression: string, options: OrmOptions): MetadataSentence {
		const query = this.toQuery(expression, options)
		return this._sentence(query)
	}

	private _sentence (query: Query): MetadataSentence {
		const mainSentence: MetadataSentence = { entity: query.entity, dialect: query.dialect, source: query.source, sentence: query.sentence, children: [] }
		for (const p in query.includes) {
			const include = query.includes[p]
			const includeSentence = this._sentence(include.query)
			mainSentence.children?.push(includeSentence)
		}
		return mainSentence
	}

	/**
	 * Get metadata of expression
	 * @param expression expression
	 * @returns metadata of expression
	 */
	public metadata (expression: string): Metadata {
		const sentence = this.toSentence(expression)
		return JSON.parse(this.operandManager.serialize(sentence)) as Metadata
	}
}
