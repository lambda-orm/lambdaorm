import { Cache, Query, DataContext } from './../model'
import { Model, ParserManager } from './../parser/index'
import { ConfigManager, ExpressionCompleter } from './index'
import { LanguageManager, Operand, Sentence, QueryBuilder } from './../language'
import modelConfig from './../parser/config.json'
import { Helper } from './../helper'

export class ExpressionManager {
	private cache: Cache
	private languageModel: Model
	private parserManager: ParserManager
	private configManager: ConfigManager
	private languageManager: LanguageManager
	private expressionCompleter: ExpressionCompleter

	constructor (cache: Cache, configManager:ConfigManager, languageManager:LanguageManager) {
		this.cache = cache
		this.languageModel = new Model()
		this.languageModel.load(modelConfig)
		this.parserManager = new ParserManager(this.languageModel)
		this.expressionCompleter = new ExpressionCompleter()
		this.configManager = configManager
		this.languageManager = languageManager
	}

	/**
	 * complete the expression. Since in some cases the expressions use simplifications, this method is in charge of returning a complete expression from a simplified expression.
	 * @param expression expression that can be simplified
	 * @param schema schema name
	 * @returns full expression
	 */
	public complete (expression: string, database?: string): string {
		try {
			const db = this.configManager.database.get(database)
			const _schema = this.configManager.schema.getInstance(db.schema)
			const node = this.parserManager.parse(expression)
			const completeNode = this.expressionCompleter.complete(node, _schema)
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
	public async toOperand (expression: string, database?: string): Promise<Operand> {
		try {
			const key = 'operand_' + expression
			let operand = await this.cache.get(key)
			if (!operand) {
				const db = this.configManager.database.get(database)
				const _schema = this.configManager.schema.getInstance(db.schema)
				const node = this.parserManager.parse(expression)
				const completeNode = this.expressionCompleter.complete(node, _schema)
				this.parserManager.setParent(completeNode)
				operand = this.languageManager.build(completeNode, _schema)
				await this.cache.set(key, operand)
			}
			return operand as Operand
		} catch (error: any) {
			console.log(error)
			throw new Error('build expression: ' + expression + ' error: ' + error.toString())
		}
	}

	public async toQuery (expression: string, database?: string): Promise<Query> {
		try {
			const db = this.configManager.database.get(database)
			const key = db.name + 'query_' + expression
			let query = await this.cache.get(key)
			if (!query) {
				const sentence = await this.toOperand(expression, db.name) as Sentence
				const _schema = this.configManager.schema.getInstance(db.schema)
				query = new QueryBuilder(this.configManager, _schema, this.languageManager, db).build(sentence)
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
	 * @param context DataContext with variables
	 * @param schema Schema name
	 * @returns Result of the evaluale expression
	 */
	public async eval (expression: string, dataContext: any, database?: string): Promise<any> {
		const operand = await this.toOperand(expression, database)
		const _context = new DataContext(dataContext)
		return this.languageManager.eval(operand, _context)
	}

	/**
	 * Get model of expression
	 * @param schema Schema name
	 * @returns Model of expression
	 */
	public async model (expression: string, database?: string):Promise<any> {
		const operand = await this.toOperand(expression, database)
		return this.languageManager.model(operand as Sentence)
	}

	/**
	 * Get parameters of expression
	 * @param schema  Schema name
	 * @returns Parameters of expression
	 */
	public async parameters (expression: string, database?: string):Promise<any> {
		const operand = await this.toOperand(expression, database)
		return this.languageManager.parameters(operand as Sentence)
	}

	public async sentence (expression: string, database?: string):Promise<string> {
		const query = await this.toQuery(expression, database)
		return this.languageManager.sentence(query)
	}

	/**
	 * Get metadata of expression
	 * @param schema Schema name
	 * @returns metadata of expression
	 */
	public async metadata (expression: string, database?: string):Promise<any> {
		const operand = await this.toOperand(expression, database)
		return this.languageManager.serialize(operand)
	}
}
