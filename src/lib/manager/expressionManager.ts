import { Query } from '../model'
// import { ParserManager } from '../parser/index'
import { SchemaManager, ExpressionCompleter, Routing } from './index'
import { LanguageManager, Sentence, DMLBuilder } from '../language'
import { Helper } from './helper'
import { Expressions, Operand, Cache } from 'js-expressions'

export class ExpressionManager {
	private cache: Cache
	private schema: SchemaManager
	private languageManager: LanguageManager
	private expressionCompleter: ExpressionCompleter
	private routing: Routing
	private expressions:Expressions

	constructor (cache: Cache, schema:SchemaManager, languageManager:LanguageManager, expressions:Expressions, routing:Routing) {
		this.cache = cache
		this.schema = schema
		this.languageManager = languageManager
		this.expressions = expressions
		this.expressionCompleter = new ExpressionCompleter(schema)
		this.routing = routing
	}

	/**
	 * complete the expression. Since in some cases the expressions use simplifications, this method is in charge of returning a complete expression from a simplified expression.
	 * @param expression expression that can be simplified
	 * @returns full expression
	 */
	public complete (expression: string): string {
		try {
			const node = this.expressions.parser.parse(expression)
			const completeNode = this.expressionCompleter.complete(node)
			this.expressions.parser.setParent(completeNode)
			return this.expressions.parser.toExpression(completeNode)
		} catch (error: any) {
			console.log(error)
			throw new Error('complete expression: ' + expression + ' error: ' + error.toString())
		}
	}

	/**
	 * Build expression
	 * @param expression expression to build
	 * @returns Operand
	 */
	public toOperand (expression: string): Operand {
		try {
			const key = 'operand_' + expression
			let operand = this.cache.get(key)
			if (!operand) {
				const node = this.expressions.parser.parse(expression)
				const completeNode = this.expressionCompleter.complete(node)
				this.expressions.parser.setParent(completeNode)
				operand = this.languageManager.build(completeNode)
				this.cache.set(key, operand)
			}
			return operand as Operand
		} catch (error: any) {
			console.log(error)
			throw new Error('build expression: ' + expression + ' error: ' + error.toString())
		}
	}

	public toQuery (expression: string, stage: string): Query {
		try {
			const key = stage + '_query_' + expression
			let query = this.cache.get(key)
			if (!query) {
				const sentence = this.toOperand(expression) as Sentence
				query = new DMLBuilder(this.schema, this.routing, this.languageManager, stage).build(sentence)
				this.cache.set(key, query)
			}
			return query as Query
		} catch (error: any) {
			throw new Error('query expression: ' + expression + ' error: ' + error.toString())
		}
	}

	/**
	 * Read lambda expression
	 * @param func lambda expression
	 * @returns String expression
	 */
	// eslint-disable-next-line @typescript-eslint/ban-types
	public toExpression (func: Function): string {
		if (!func) {
			throw new Error('empty lambda function}')
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
	public model (expression: string):any {
		const operand = this.toOperand(expression)
		return this.languageManager.model(operand as Sentence)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public parameters (expression: string):any {
		const operand = this.toOperand(expression)
		return this.languageManager.parameters(operand as Sentence)
	}

	public sentence (expression: string, stage: string):string {
		const query = this.toQuery(expression, stage)
		return this.languageManager.sentence(query)
	}

	/**
	 * Get metadata of expression
	 * @param expression expression
	 * @returns metadata of expression
	 */
	public metadata (expression: string):any {
		const operand = this.toOperand(expression)
		return this.languageManager.serialize(operand)
	}
}
