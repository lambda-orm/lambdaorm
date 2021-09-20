import { IOrm } from '../model/index'
import { SchemaHelper } from './schemaHelper'
import { ExecutionResult, ExecutionSentenceResult } from '../connection'

export abstract class SchemaActionDDL {
	protected orm:IOrm
	protected schema:SchemaHelper
	constructor (orm: IOrm, schema: SchemaHelper) {
		this.orm = orm
		this.schema = schema
	}

	public abstract sentence(dialect:string):any[]
	public async execute (database:string, tryAllCan = false):Promise<ExecutionResult> {
	// let _database= this.orm.database.get(database)
		const config = this.orm.connection.get(database)
		const sentences = this.sentence(config.dialect)
		const results:ExecutionSentenceResult[] = []
		await this.orm.transaction(database, async (tr) => {
			let sentence:any
			if (tryAllCan) {
				for (let i = 0; i < sentences.length; i++) {
					sentence = sentences[i]
					try {
						const result = await tr.executeSentence(sentence)
						results.push({ result: result, sentence: sentence })
					} catch (error) {
						results.push({ error: error, sentence: sentence })
					}
				}
			} else {
				try {
					for (let i = 0; i < sentences.length; i++) {
						sentence = sentences[i]
						const result = await tr.executeSentence(sentence)
						results.push({ result: result, sentence: sentence })
					}
				} catch (error:any) {
					throw new Error(`sentence: ${sentence.toString()} error: ${error.toString()}`)
				}
			}
		})
		return { results: results }
	}
}
