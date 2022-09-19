
import { Query, ExecuteResult, OrmOptions } from '../model'
import { ConnectionManager } from '../connection'
import { ExpressionManager, QueryExecutor, Transaction, Languages } from '.'
import { SchemaManager } from './schema'
import { Expressions } from 'js-expressions'

export class Executor {
	private languages: Languages
	private connectionManager: ConnectionManager
	private schemaManager: SchemaManager
	private expressionManager: ExpressionManager
	private expressions: Expressions

	constructor (connectionManager: ConnectionManager, languages: Languages, schemaManager: SchemaManager, expressionManager: ExpressionManager, expressions: Expressions) {
		this.connectionManager = connectionManager
		this.languages = languages
		this.schemaManager = schemaManager
		this.expressionManager = expressionManager
		this.expressions = expressions
	}

	public async execute (query: Query, data: any, options: OrmOptions): Promise<any> {
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

	public async executeList (options: OrmOptions, queries: Query[]): Promise<ExecuteResult[]> {
		const results: ExecuteResult[] = []

		if (options.tryAllCan) {
			for (const query of queries) {
				const queryExecutor = new QueryExecutor(this.connectionManager, this.languages, this.schemaManager, this.expressions, options, false)
				try {
					const result = await queryExecutor.execute(query, {})
					results.push(result)
				} catch (error: any) {
					results.push({ error: error })
				} finally {
					await queryExecutor.release()
				}
			}
		} else {
			await this.transaction(options, async function (tr: Transaction) {
				for (const query of queries) {
					const result = await tr.executeQuery(query)
					results.push({ result: result })
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
	public async transaction (options: OrmOptions, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const queryExecutor = new QueryExecutor(this.connectionManager, this.languages, this.schemaManager, this.expressions, options, true)
		let error: any
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
