
import { SentenceInfo } from '../model'
import { SchemaConfig } from './index'
import { Expressions } from 'js-expressions'

export class Routing {
	private schema: SchemaConfig
	private expressions: Expressions

	constructor (schema: SchemaConfig, expressions: Expressions) {
		this.schema = schema
		this.expressions = expressions
	}

	public async getDataSource (sentenceInfo: SentenceInfo, context: any, stage?: string):Promise<string> {
		const _context = { sentence: sentenceInfo, context: context }
		const _stage = this.schema.stage.get(stage)
		for (const i in _stage.dataSources) {
			const dataSource = _stage.dataSources[i]
			if (dataSource.condition === undefined) {
				return dataSource.name
			} else if (await this.expressions.eval(dataSource.condition, _context) === true) {
				return dataSource.name
			}
		}
		throw new Error(`Undefined data source on stage ${_stage.name}`)
	}
}
