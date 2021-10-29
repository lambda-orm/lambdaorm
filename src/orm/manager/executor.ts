
import { Query, Database } from '../model'
import { ConnectionManager, ExecutionResult, ExecutionSentenceResult } from '../connection'
import { LanguageManager } from 'orm/language'
import { ExpressionManager, QueryExecutor, Transaction } from '.'

export class Executor {
	private languageManager: LanguageManager
	private expressionManager: ExpressionManager
	private connectionManager: ConnectionManager
	constructor (connectionManager: ConnectionManager, languageManager: LanguageManager, expressionManager:ExpressionManager) {
		this.connectionManager = connectionManager
		this.languageManager = languageManager
		this.expressionManager = expressionManager
	}

	public async execute (database:Database, query: Query, context: any = {}): Promise<any> {
		return await new QueryExecutor(this.connectionManager, this.languageManager, database, false).execute(query, context)
	}

	public async executeList (database:Database, queries: Query[], tryAllCan = false):Promise<ExecutionResult> {
		const results: ExecutionSentenceResult[] = []
		let query:Query
		if (tryAllCan) {
			for (let i = 0; i < queries.length; i++) {
				query = queries[i]
				try {
					const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, database, false)
					const result = await queryExecutor.execute(query)
					results.push({ result: result, sentence: query.sentence })
				} catch (error) {
					results.push({ error: error, sentence: query.sentence })
				}
			}
		} else {
			const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, database, true)
			try {
				for (let i = 0; i < queries.length; i++) {
					query = queries[i]
					const result = await queryExecutor.execute(query)
					results.push({ result: result, sentence: query.sentence })
				}
				queryExecutor.commit()
			} catch (error: any) {
				queryExecutor.rollback()
				throw new Error(`error: ${error.toString()}`)
			}
		}
		return { results: results }
	}

	/**
 * Crea una transaccion
 * @param database Database name
 * @param callback Codigo que se ejecutara en transaccion
 */
	public async transaction (database:Database, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, database, true)
		try {
			const transaction = new Transaction(this.expressionManager, queryExecutor)
			await callback(transaction)
			await queryExecutor.commit()
		} catch (error) {
			console.log(error)
			queryExecutor.rollback()
			throw error
		}
	}
}
