import { Cache, Query, Data, IEvaluator } from './../model'
import { ParserManager } from './../parser/index'
import { ConfigManager, ExpressionCompleter } from './index'
import { LanguageManager, Operand, Sentence, DMLBuilder } from './../language'
import { Helper } from './../helper'

export class ExpressionManager implements IEvaluator {
	private cache: Cache
	private parserManager: ParserManager
	private config: ConfigManager
	private languageManager: LanguageManager
	private expressionCompleter: ExpressionCompleter

	constructor (cache: Cache, config:ConfigManager, languageManager:LanguageManager) {
		this.cache = cache
		this.config = config
		this.languageManager = languageManager
		this.parserManager = new ParserManager(languageManager.expressionConfig)
		this.expressionCompleter = new ExpressionCompleter(config)
	}

	/**
	 * complete the expression. Since in some cases the expressions use simplifications, this method is in charge of returning a complete expression from a simplified expression.
	 * @param expression expression that can be simplified
	 * @returns full expression
	 */
	public complete (expression: string): string {
		try {
			const node = this.parserManager.parse(expression)
			const completeNode = this.expressionCompleter.complete(node)
			this.parserManager.setParent(completeNode)
			return this.parserManager.toExpression(completeNode)
		} catch (error: any) {
			console.log(error)
			throw new Error('complete expression: ' + expression + ' error: ' + error.toString())
		}
	}

	/**
	 * Build expression
	 * @param expression expression to build
	 * @param schema schema name
	 * @returns Operand
	 */
	public async toOperand (expression: string): Promise<Operand> {
		try {
			const key = 'operand_' + expression
			let operand = await this.cache.get(key)
			if (!operand) {
				const node = this.parserManager.parse(expression)
				const completeNode = this.expressionCompleter.complete(node)
				this.parserManager.setParent(completeNode)
				operand = this.languageManager.build(completeNode)
				await this.cache.set(key, operand)
			}
			return operand as Operand
		} catch (error: any) {
			console.log(error)
			throw new Error('build expression: ' + expression + ' error: ' + error.toString())
		}
	}

	public async toQuery (expression: string, datastore: string): Promise<Query> {
		try {
			const db = this.config.datastore.get(datastore)
			const key = db.name + 'query_' + expression
			let query = await this.cache.get(key)
			if (!query) {
				const schema = this.config.schema.getInstance(db.schema)
				const sentence = await this.toOperand(expression) as Sentence
				query = new DMLBuilder(schema, this.languageManager, db.dialect).build(sentence)
				await this.cache.set(key, query)
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
		const node = this.parserManager.parse(expression)
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
		return this.parserManager.toExpression(node)
	}

	/**
	 * Evaluate and solve expression
	 * @param expression  string expression
	 * @param data Data with variables
	 * @returns Result of the evaluale expression
	 */
	public async eval (expression: string, data: any): Promise<any> {
		const operand = await this.toOperand(expression)
		const _data = new Data(data)
		return this.languageManager.eval(operand, _data)
	}

	/**
	 * Get model of expression
	 * @param expression expression
	 * @returns Model of expression
	 */
	public async model (expression: string):Promise<any> {
		const operand = await this.toOperand(expression)
		return this.languageManager.model(operand as Sentence)
	}

	/**
	 * Get parameters of expression
	 * @param expression  expression
	 * @returns Parameters of expression
	 */
	public async parameters (expression: string):Promise<any> {
		const operand = await this.toOperand(expression)
		return this.languageManager.parameters(operand as Sentence)
	}

	public async sentence (expression: string, datastore: string):Promise<string> {
		const query = await this.toQuery(expression, datastore)
		return this.languageManager.sentence(query)
	}

	/**
	 * Get metadata of expression
	 * @param expression expression
	 * @returns metadata of expression
	 */
	public async metadata (expression: string):Promise<any> {
		const operand = await this.toOperand(expression)
		return this.languageManager.serialize(operand)
	}
}
