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

	constructor(cache: Cache, schema: SchemaManager, languages: Languages, expressions: Expressions, routing: Routing) {
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
	public normalize(expression: string): string {
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
	public toOperand(expression: string): Operand {
		const minfyExpression = this.expressions.parser.minify(expression)
		const key = `${minfyExpression}_toOperand`
		const value = this.cache.get(key)
		if (!value) {
			const node = this.expressions.parser.parse(minfyExpression)
			const completeNode = this.expressionNormalizer.normalize(node)
			this.expressions.parser.setParent(completeNode)
			const operand = this.operandManager.build(completeNode)
			this.cache.set(key, this.operandManager.serialize(operand))
			return operand
		} else {
			return this.operandManager.deserialize(value)
		}
	}

	public toQuery(expression: string, stage: string, view?: string): Query {
		const minfyExpression = this.expressions.parser.minify(expression)
		const _view = this.schema.view.get(view)
		const key = `${minfyExpression}_${stage}_${view}`
		const value = this.cache.get(key)
		if (!value) {
			const sentence = this.toOperand(minfyExpression) as Sentence
			const view = this.schema.view.getInstance(_view.name)
			this.complete(sentence, view, stage)
			const query = this.dmlBuild(sentence, view, stage)
			this.cache.set(key, JSON.stringify(query))
			return query
		} else {
			return JSON.parse(value) as Query
		}
	}
	private getDataSource(sentence: Sentence, stage: string): DataSource {
		const sentenceInfo: SentenceInfo = { entity: sentence.entity, name: sentence.name }
		const datasourceName = this.routing.getDataSource(sentenceInfo, stage)
		return this.schema.dataSource.get(datasourceName)
	}

	private complete(sentence: Sentence, view: ViewConfig, stage: string) {
		const sentenceIncludes = sentence.getIncludes()
		for (const p in sentenceIncludes) {
			const sentenceInclude = sentenceIncludes[p]
			this.complete(sentenceInclude.children[0] as Sentence, view, stage)
		}
		const dataSource = this.getDataSource(sentence, stage)
		const mapping = this.schema.mapping.getInstance(dataSource.mapping)
		this.sentenceCompleter.complete(mapping, view, sentence)
	}

	private dmlBuild(sentence: Sentence, view: ViewConfig, stage: string): Query {
		const includes = []
		const dataSource = this.getDataSource(sentence, stage)
		const language = this.languages.getByDiatect(dataSource.dialect)
		const mapping = this.schema.mapping.getInstance(dataSource.mapping)
		const sentenceIncludes = sentence.getIncludes()
		for (const p in sentenceIncludes) {
			const sentenceInclude = sentenceIncludes[p]
			if (!sentenceInclude.relation.composite || !language.solveComposite) {
				const query = this.dmlBuild(sentenceInclude.children[0] as Sentence, view, stage)
				const include = new Include(sentenceInclude.name, query, sentenceInclude.relation)
				includes.push(include)
			}
		}
		const query = language.dmlBuild(dataSource, mapping, sentence)
		query.includes = includes
		return query

		// const includes = []
		// const sentenceIncludes = sentence.getIncludes()
		// for (const p in sentenceIncludes) {
		// 	const sentenceInclude = sentenceIncludes[p]
		// 	const query = this.dmlBuild(sentenceInclude.children[0] as Sentence, view, stage)
		// 	const include = new Include(sentenceInclude.name, query, sentenceInclude.relation)
		// 	includes.push(include)
		// }
		// const dataSource = this.getDataSource(sentence, stage)
		// const language = this.languages.getByDiatect(dataSource.dialect)
		// const mapping = this.schema.mapping.getInstance(dataSource.mapping)
		// const query = language.dmlBuild(dataSource, mapping, sentence)
		// query.includes = includes
		// return query
	}



	/**
	 * Read lambda expression
	 * @param func lambda expression
	 * @returns String expression
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	public toExpression(func: Function): string {
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
	public model(expression: string): MetadataModel[] {
		const operand = this.toOperand(expression)
		return this.operandManager.model(operand as Sentence)
	}

	/**
	 * Get constraints of expression
	 * @param expression expression
	 * @returns constraints
	 */
	public constraints(expression: string): MetadataConstraint {
		const operand = this.toOperand(expression)
		return this.operandManager.constraints(operand as Sentence)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters(expression: string): MetadataParameter[] {
		const operand = this.toOperand(expression)
		return this.operandManager.parameters(operand as Sentence)
	}

	public sentence(expression: string, stage: string, view: string): MetadataSentence {
		const query = this.toQuery(expression, stage, view)
		return this._sentence(query)
	}

	private _sentence(query: Query): MetadataSentence {
		const mainSentence: MetadataSentence = { entity: query.entity, dialect: query.dialect, dataSource: query.dataSource, sentence: query.sentence, childs: [] }
		for (const p in query.includes) {
			const include = query.includes[p]
			const includeSentence = this._sentence(include.query)
			mainSentence.childs?.push(includeSentence)
		}
		return mainSentence
	}

	/**
	 * Get metadata of expression
	 * @param expression expression
	 * @returns metadata of expression
	 */
	public metadata(expression: string): Metadata {
		const operand = this.toOperand(expression)
		return JSON.parse(this.operandManager.serialize(operand)) as Metadata
	}
}
