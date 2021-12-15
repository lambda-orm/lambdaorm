
import { Query, DataSource } from './../model/index'
import { ConnectionManager } from './../connection'
import { LanguageManager } from './../language'
import { ExpressionManager, QueryExecutor, Transaction } from './'
import { SchemaConfig } from './schema'

export class Executor {
	private languageManager: LanguageManager
	private expressionManager: ExpressionManager
	private connectionManager: ConnectionManager
	private configManager: SchemaConfig
	constructor (connectionManager: ConnectionManager, languageManager: LanguageManager, expressionManager:ExpressionManager, configManager: SchemaConfig) {
		this.connectionManager = connectionManager
		this.languageManager = languageManager
		this.expressionManager = expressionManager
		this.configManager = configManager
	}

	public async execute (dataSource: DataSource, query: Query, data: any, context: any): Promise<any> {
		let error: any
		let result:any
		if (query.children && query.children.length > 0) {
			await this.transaction(dataSource, context, async function (tr: Transaction) {
				result = await tr.execute(query, data)
			})
		} else {
			const mapping = this.configManager.mapping.getInstance(dataSource.mapping)
			const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, this.expressionManager, dataSource, mapping, false)
			try {
				result = await queryExecutor.execute(query, data, context)
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

	public async executeList (dataSource:DataSource, queries: Query[], context: any, tryAllCan = false):Promise<any> {
		const results: any[] = []
		let query: Query
		if (tryAllCan) {
			for (let i = 0; i < queries.length; i++) {
				query = queries[i]
				const mapping = this.configManager.mapping.getInstance(dataSource.mapping)
				const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, this.expressionManager, dataSource, mapping, false)
				try {
					const result = await queryExecutor.execute(query, context, {})
					results.push(result)
				} catch (error) {
					console.error(`error: ${error} on sentence:${query.sentence}`)
				} finally {
					await queryExecutor.release()
				}
			}
		} else {
			await this.transaction(dataSource, context, async function (tr: Transaction) {
				for (let i = 0; i < queries.length; i++) {
					query = queries[i]
					const result = await tr.execute(query)
					results.push(result)
				}
			})
		}
		return { results: results }
	}

	/**
 * Crea una transaccion
 * @param dataSource Database name
 * @param callback Codigo que se ejecutara en transaccion
 */
	public async transaction (dataSource: DataSource, context:any, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const mapping = this.configManager.mapping.getInstance(dataSource.mapping)
		const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, this.expressionManager, dataSource, mapping, true)
		let error:any
		try {
			const transaction = new Transaction(context, this.expressionManager, queryExecutor)
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
