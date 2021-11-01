
import { Query, Database } from './../model/index'
import { ConnectionManager, ExecutionResult, ExecutionSentenceResult } from './../connection'
import { LanguageManager } from './../language'
import { ExpressionManager, QueryExecutor, Transaction } from './'

export class Executor {
	private languageManager: LanguageManager
	private expressionManager: ExpressionManager
	private connectionManager: ConnectionManager
	constructor (connectionManager: ConnectionManager, languageManager: LanguageManager, expressionManager:ExpressionManager) {
		this.connectionManager = connectionManager
		this.languageManager = languageManager
		this.expressionManager = expressionManager
	}

	public async execute (database: Database, query: Query, context: any = {}): Promise<any> {
		let error: any
		let result:any
		if (query.children && query.children.length > 0) {
			await this.transaction(database, async function (tr: Transaction) {
				result = await tr.execute(query, context)
			})
		} else {
			const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, database, false)
			try {
				result = await queryExecutor.execute(query, context)
			} catch (_error) {
				error = _error
			} finally {
				await queryExecutor.release()
			}
			if (error) {
				throw error
			}
		}
		return result
	}

	public async executeList (database:Database, queries: Query[], tryAllCan = false):Promise<ExecutionResult> {
		const results: ExecutionSentenceResult[] = []
		let query: Query
		if (tryAllCan) {
			for (let i = 0; i < queries.length; i++) {
				query = queries[i]
				const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, database, false)
				try {
					const result = await queryExecutor.execute(query)
					results.push({ result: result, sentence: query.sentence })
				} catch (error) {
					results.push({ error: error, sentence: query.sentence })
				} finally {
					await queryExecutor.release()
				}
			}
		} else {
			const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, database, false)
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
			} finally {
				await queryExecutor.release()
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
		let error:any
		try {
			const transaction = new Transaction(this.expressionManager, queryExecutor)
			await callback(transaction)
			await queryExecutor.commit()
		} catch (_error) {
			error = _error
			await queryExecutor.rollback()
		} finally {
			await queryExecutor.release()
		}
		if (error) {
			throw error
		}
	}
}
