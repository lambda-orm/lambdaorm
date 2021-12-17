
import { IEvaluator, SentenceInfo } from './../model'
import { SchemaConfig } from './index'

export class Routing {
	private schema: SchemaConfig
	private evaluator: IEvaluator

	constructor (schema: SchemaConfig, evaluator: IEvaluator) {
		this.schema = schema
		this.evaluator = evaluator
	}

	public async getDataSource (sentenceInfo: SentenceInfo, context: any, stage?: string):Promise<string> {
		const _context = { sentence: sentenceInfo, context: context }
		const _stage = this.schema.stage.get(stage)
		for (const i in _stage.dataSources) {
			const dataSource = _stage.dataSources[i]
			if (await this.evaluator.eval(dataSource.condition, _context) === true) {
				return dataSource.name
			}
		}
		return _stage.defaultDataSource
	}
}
