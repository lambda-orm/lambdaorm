
import { SentenceInfo } from '../model'
import { SchemaManager } from './index'
import { Expressions } from 'js-expressions'

export class Routing {
	private schema: SchemaManager
	private expressions: Expressions

	constructor (schema: SchemaManager, expressions: Expressions) {
		this.schema = schema
		this.expressions = expressions
	}

	public async getDataSource (sentenceInfo: SentenceInfo, context: any, stage?: string):Promise<string> {
		const _context = {
			entity: sentenceInfo.entity,
			sentence: sentenceInfo.name,
			read: sentenceInfo.name === 'select',
			write: sentenceInfo.name !== 'select',
			dml: ['select', 'insert', 'update', 'delete'].includes(sentenceInfo.name),
			ddl: !['insert', 'update', 'delete'].includes(sentenceInfo.name),
			context: context
		}
		const _stage = this.schema.stage.get(stage)
		for (const i in _stage.dataSources) {
			const dataSource = _stage.dataSources[i]
			if (dataSource.condition === undefined) {
				return dataSource.name
			} else {
				const result = await this.expressions.eval(dataSource.condition, _context)
				if (result) {
					return dataSource.name
				}
			}
		}
		throw new Error(`Undefined data source on stage ${_stage.name}`)
	}
}
