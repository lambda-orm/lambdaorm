import { IOrm, Query } from '../model/index'
import { SchemaHelper } from './schemaHelper'
import { ExecutionResult, ExecutionSentenceResult } from '../connection'

export abstract class SchemaActionDDL {
	protected orm:IOrm
	protected schema:SchemaHelper
	constructor (orm: IOrm, schema: SchemaHelper) {
		this.orm = orm
		this.schema = schema
	}

	public sentence (dialect: string): string[] {
		const sentences: string[] = []
		const list = this.queries(dialect)
		for (const p in list) {
			sentences.push(list[p].sentence)
		}
		return sentences
	}

	public abstract queries(dialect:string):Query[]
	public async execute (database:string, tryAllCan = false):Promise<ExecutionResult> {
		const config = this.orm.connection.get(database)
		const queries = this.queries(config.dialect)
		const results:ExecutionSentenceResult[] = []
		await this.orm.transaction(database, async (tr) => {
			let query:Query
			if (tryAllCan) {
				for (let i = 0; i < queries.length; i++) {
					query = queries[i]
					try {
						const result = await tr.execute(query)
						results.push({ result: result, sentence: query.sentence })
					} catch (error) {
						results.push({ error: error, sentence: query.sentence })
					}
				}
			} else {
				try {
					for (let i = 0; i < queries.length; i++) {
						query = queries[i]
						const result = await tr.execute(query)
						results.push({ result: result, sentence: query.sentence })
					}
				} catch (error: any) {
					throw new Error(`error: ${error.toString()}`)
				}
			}
		})
		return { results: results }
	}
}
