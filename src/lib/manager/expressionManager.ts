import { Query, SintaxisError, Include, MetadataParameter, MetadataConstraint, MetadataSentence, MetadataModel, Metadata, Sentence, DataSource, SentenceInfo } from '../model'
import { SchemaManager, ExpressionNormalizer, Routing, OperandManager, Languages, ViewConfig, SentenceCompleter } from '.'
import { Helper } from './helper'
import { Expressions, Operand, Cache } from 'js-expressions'

export class ExpressionManager {
	private cache: Cache
	private schema: SchemaManager
	private languages: Languages
	private expressionNormalizer: ExpressionNormalizer
	private routing: Routing
	private expressions: Expressions
	private operandManager: OperandManager
	private sentenceCompleter: SentenceCompleter

	constructor (cache: Cache, schema:SchemaManager, languages:Languages, expressions:Expressions, routing:Routing) {
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
	 * @returns Operand
	 */
	public toOperand (expression: string): Operand {
		try {
			const key = `${expression}_operand`
			let operand = this.cache.get(key)
			if (!operand) {
				const node = this.expressions.parser.parse(expression)
				const completeNode = this.expressionNormalizer.normalize(node)
				this.expressions.parser.setParent(completeNode)
				operand = this.operandManager.build(completeNode)
				this.cache.set(key, operand)
			}
			return operand as Operand
		} catch (error: any) {
			throw new SintaxisError('build expression: ' + expression + ' error: ' + error.toString())
		}
	}

	public toQuery (expression: string, stage: string, view?:string): Query {
		try {
			const _view = this.schema.view.get(view)
			const key = `${expression}_${stage}_${view}`
			let query = this.cache.get(key)
			if (!query) {
				const sentence = this.toOperand(expression) as Sentence
				const view = this.schema.view.getInstance(_view.name)
				query = this.dmlBuild(sentence, view, stage)
				// query = new DMLBuilder(this.schema, this.routing, this.languages, stage, _view.name, this.expressions).build(sentence)
				this.cache.set(key, query)
			}
			return query as Query
		} catch (error: any) {
			throw new SintaxisError('query expression: ' + expression + ' error: ' + error.toString())
		}
	}

	private getDataSource (sentence: Sentence, stage:string): DataSource {
		const sentenceInfo: SentenceInfo = { entity: sentence.entity, name: sentence.name }
		const datasourceName = this.routing.getDataSource(sentenceInfo, stage)
		return this.schema.dataSource.get(datasourceName)
	}

	private dmlBuild (sentence:Sentence, view: ViewConfig, stage:string):Query {
		const children = []
		const includes = sentence.getIncludes()
		for (const p in includes) {
			const sentenceInclude = includes[p]
			const query = this.dmlBuild(sentenceInclude.children[0] as Sentence, view, stage)
			const include = new Include(sentenceInclude.name, [query], sentenceInclude.relation)
			children.push(include)
		}

		const dataSource = this.getDataSource(sentence, stage)
		const language = this.languages.getByDiatect(dataSource.dialect)
		const mapping = this.schema.mapping.getInstance(dataSource.mapping)
		const completeSentence = this.sentenceCompleter.complete(mapping, view, sentence)
		const query = language.dmlBuild(dataSource, mapping, completeSentence)
		// const query = dmlBuilder.build(completeSentence)

		query.children = children
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
			// Example: model_1.Products.map(p=>p) =>  Products.map(p=>p)
			aux.name = aux.name.split('.')[1]
		}
		return this.expressions.parser.toExpression(node)
	}

	/**
	 * Get model of expression
	 * @param expression expression
	 * @returns Model of expression
	 */
	public model (expression: string):MetadataModel[] {
		const operand = this.toOperand(expression)
		return this.operandManager.model(operand as Sentence)
	}

	/**
	 * Get constraints of expression
	 * @param expression expression
	 * @returns constraints
	 */
	public constraints (expression: string):MetadataConstraint {
		const operand = this.toOperand(expression)
		return this.operandManager.constraints(operand as Sentence)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string):MetadataParameter[] {
		const operand = this.toOperand(expression)
		return this.operandManager.parameters(operand as Sentence)
	}

	public sentence (expression: string, stage: string, view:string):MetadataSentence {
		const query = this.toQuery(expression, stage, view)
		return this._sentence(query)
	}

	private _sentence (query: Query): MetadataSentence {
		const mainSentence: MetadataSentence = { entity: query.entity, dialect: query.dialect, dataSource: query.dataSource, sentence: query.sentence, childs: [] }
		for (const p in query.children) {
			const include = query.children[p] as Include
			const includeSentence = this._sentence(include.children[0] as Query)
			mainSentence.childs?.push(includeSentence)
		}
		return mainSentence
	}

	/**
	 * Get metadata of expression
	 * @param expression expression
	 * @returns metadata of expression
	 */
	public metadata (expression: string):Metadata {
		const operand = this.toOperand(expression)
		return this.operandManager.serialize(operand)
	}
}
