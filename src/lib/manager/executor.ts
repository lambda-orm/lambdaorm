
import { Query, ExecuteResult } from '../model'
import { ConnectionManager } from '../connection'
import { LanguageManager } from '../language'
import { ExpressionManager, QueryExecutor, Transaction } from '.'
import { SchemaManager } from './schema'
import { Expressions } from 'js-expressions'

export class Executor {
	private languageManager: LanguageManager
	private connectionManager: ConnectionManager
	private schemaManager: SchemaManager
	private expressionManager: ExpressionManager
	private expressions: Expressions

	constructor (connectionManager: ConnectionManager, languageManager: LanguageManager, schemaManager: SchemaManager, expressionManager:ExpressionManager, expressions: Expressions) {
		this.connectionManager = connectionManager
		this.languageManager = languageManager
		this.schemaManager = schemaManager
		this.expressionManager = expressionManager
		this.expressions = expressions
	}

	public async execute (query: Query, data: any, stage:string): Promise<any> {
		let error: any
		let result:any
		if (query.children && query.children.length > 0) {
			await this.transaction(stage, async function (tr: Transaction) {
				result = await tr.execute(query, data)
			})
		} else {
			const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, this.schemaManager, this.expressions, stage, false)
			try {
				result = await queryExecutor.execute(query, data)
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

	public async executeList (stage: string, queries: Query[], tryAllCan = false): Promise<ExecuteResult[]> {
		const results: ExecuteResult[] = []
		let query: Query
		if (tryAllCan) {
			for (let i = 0; i < queries.length; i++) {
				query = queries[i]
				const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, this.schemaManager, this.expressions, stage, false)
				try {
					const result = await queryExecutor.execute(query, {})
					results.push(result)
				} catch (error:any) {
					results.push({ error: error })
				} finally {
					await queryExecutor.release()
				}
			}
		} else {
			await this.transaction(stage, async function (tr: Transaction) {
				for (let i = 0; i < queries.length; i++) {
					query = queries[i]
					const result = await tr.execute(query)
					results.push({ result: result })
				}
			})
		}
		return results
	}

	/**
 * Crea una transaccion
 * @param dataSource Database name
 * @param callback Codigo que se ejecutara en transaccion
 */
	public async transaction (stage: string, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, this.schemaManager, this.expressions, stage, true)
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
