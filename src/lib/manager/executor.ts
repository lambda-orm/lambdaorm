
import { Query, ExecuteResult, QueryOptions } from '../contract'
import { ConnectionManager } from '../connection'
import { SchemaManager, Transaction } from '.'
import { Languages } from '../language'
import { QueryManager, QueryExecutor } from '../query'
import { IExpressions } from '3xpr'

export class Executor {
	private languages: Languages
	private connectionManager: ConnectionManager
	private schemaManager: SchemaManager
	private queryManager: QueryManager
	private expressions: IExpressions

	constructor (connectionManager: ConnectionManager, languages: Languages, schemaManager: SchemaManager, queryManager: QueryManager, expressions: IExpressions) {
		this.connectionManager = connectionManager
		this.languages = languages
		this.schemaManager = schemaManager
		this.queryManager = queryManager
		this.expressions = expressions
	}

	public async execute (query: Query, data: any, options: QueryOptions): Promise<any> {
		let error: any
		let result: any
		if (query.includes && query.includes.length > 0) {
			await this.transaction(options, async function (tr: Transaction) {
				result = await tr.executeQuery(query, data)
			})
		} else {
			const queryExecutor = new QueryExecutor(this.connectionManager, this.languages, this.schemaManager, this.expressions, options, false)
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

	public async executeList (queries: Query[], options: QueryOptions): Promise<ExecuteResult[]> {
		const results: ExecuteResult[] = []

		if (options.tryAllCan) {
			for (const query of queries) {
				const queryExecutor = new QueryExecutor(this.connectionManager, this.languages, this.schemaManager, this.expressions, options, false)
				try {
					const result = await queryExecutor.execute(query, {})
					results.push(result)
				} catch (error: any) {
					results.push({ error })
				} finally {
					await queryExecutor.release()
				}
			}
		} else {
			await this.transaction(options, async function (tr: Transaction) {
				for (const query of queries) {
					const result = await tr.executeQuery(query)
					results.push({ result })
				}
			})
		}
		return results
	}

	/**
 * Create a transaction
 * @param source Database name
 * @param callback Code to be executed in transaction
 */
	public async transaction (options: QueryOptions, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const queryExecutor = new QueryExecutor(this.connectionManager, this.languages, this.schemaManager, this.expressions, options, true)
		let error: any
		try {
			const transaction = new Transaction(this.queryManager, queryExecutor)
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
