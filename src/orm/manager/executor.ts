
import { Query, Datastore } from './../model/index'
import { ConnectionManager } from './../connection'
import { LanguageManager } from './../language'
import { ExpressionManager, QueryExecutor, Transaction } from './'
import { ConfigManager } from './configManager'

export class Executor {
	private languageManager: LanguageManager
	private expressionManager: ExpressionManager
	private connectionManager: ConnectionManager
	private configManager: ConfigManager
	constructor (connectionManager: ConnectionManager, languageManager: LanguageManager, expressionManager:ExpressionManager, configManager: ConfigManager) {
		this.connectionManager = connectionManager
		this.languageManager = languageManager
		this.expressionManager = expressionManager
		this.configManager = configManager
	}

	public async execute (datastore: Datastore, query: Query, dataContext: any = {}): Promise<any> {
		let error: any
		let result:any
		if (query.children && query.children.length > 0) {
			await this.transaction(datastore, async function (tr: Transaction) {
				result = await tr.execute(query, dataContext)
			})
		} else {
			const schema = this.configManager.schema.getInstance(datastore.schema)
			const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, datastore, schema, false)
			try {
				result = await queryExecutor.execute(query, dataContext)
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

	public async executeList (datastore:Datastore, queries: Query[], tryAllCan = false):Promise<any> {
		const results: any[] = []
		let query: Query
		if (tryAllCan) {
			for (let i = 0; i < queries.length; i++) {
				query = queries[i]
				const schema = this.configManager.schema.getInstance(datastore.schema)
				const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, datastore, schema, false)
				try {
					const result = await queryExecutor.execute(query)
					results.push(result)
				} catch (error) {
					console.error(`error: ${error} on sentence:${query.sentence}`)
				} finally {
					await queryExecutor.release()
				}
			}
		} else {
			await this.transaction(datastore, async function (tr: Transaction) {
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
 * @param datastore Database name
 * @param callback Codigo que se ejecutara en transaccion
 */
	public async transaction (datastore: Datastore, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		const schema = this.configManager.schema.getInstance(datastore.schema)
		const queryExecutor = new QueryExecutor(this.connectionManager, this.languageManager, datastore, schema, true)
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
