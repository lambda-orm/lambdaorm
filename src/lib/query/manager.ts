import { Query, QueryOptions, QueryInfo } from '../contract'
import { SchemaManager, helper } from '../manager'
import { QueryBuilder } from './index'
import { Languages } from '../language'
import { SentenceManager } from '../sentence'
import { MemoryCache, ICache } from 'h3lp'
import { IExpressions } from '3xpr'

export class QueryManager {
	private cache: ICache<string, string>
	private builder: QueryBuilder
	private expressions: IExpressions

	constructor (sentenceManager: SentenceManager, schema: SchemaManager, languages: Languages, expressions: IExpressions) {
		this.cache = new MemoryCache<string, string>()
		this.builder = new QueryBuilder(sentenceManager, schema, languages)
		this.expressions = expressions
	}

	public create (expression: string, options: QueryOptions): Query {
		const expressionKey = helper.utils.hashCode(expression)
		const key = `${expressionKey}-${options.stage}-${options.view || 'default'}`
		const value = this.cache.get(key)
		if (!value) {
			const query = this.builder.build(expression, options)
			this.cache.set(key, JSON.stringify(query))
			return query
		} else {
			return JSON.parse(value) as Query
		}
	}

	public getInfo (expression: string, options: QueryOptions): QueryInfo {
		const query = this.create(expression, options)
		return this._getInfo(query)
	}

	private _getInfo (query: Query): QueryInfo {
		const mainSentence: QueryInfo = { entity: query.entity, dialect: query.dialect, source: query.source, sentence: query.sentence, children: [] }
		for (const p in query.includes) {
			const include = query.includes[p]
			const includeSentence = this._getInfo(include.query)
			mainSentence.children?.push(includeSentence)
		}
		return mainSentence
	}

	// /**
	//  * Convert a lambda expression to a query expression
	//  * @param lambda lambda expression
	//  * @returns Expression manager
	//  */
	// // eslint-disable-next-line @typescript-eslint/ban-types
	// public toExpression (func: Function): string {
	// if (!func) {
	// throw new SintaxisError('empty lambda function}')
	// }
	// const expression = helper.clearLambda(func)
	// const node = this.expressions.parser.parse(expression)
	// let aux = node
	// while (aux.type !== 'var') {
	// if (aux.children.length > 0) {
	// aux = aux.children[0]
	// }
	// }
	// if (aux.name.includes('.')) {
	// // Example: __model_1.Products.map(p=>p) =>  Products.map(p=>p)
	// // Example: __model_1.Orders.details.map(p=>p) =>  Orders.details.map(p=>p)
	// const names:string[] = aux.name.split('.')
	// if (names[0].startsWith('__')) {
	// aux.name = names.slice(1).join('.')
	// }
	// }
	// return this.expressions.parser.toExpression(node)
	// }
}
