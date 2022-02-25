
import { SentenceInfo, RuleDataSource, ContextInfo, SchemaError } from '../model'
import { SchemaManager } from './index'
import { Expressions } from 'js-expressions'

export class Routing {
	private schema: SchemaManager
	private expressions: Expressions

	constructor (schema: SchemaManager, expressions: Expressions) {
		this.schema = schema
		this.expressions = expressions
	}

	public eval (dataSource:RuleDataSource, sentenceInfo: SentenceInfo):boolean {
		const contextInfo = this.getContextInfo(sentenceInfo)
		if (dataSource.condition === undefined) return true
		return this.expressions.eval(dataSource.condition, contextInfo)
	}

	private getContextInfo (sentenceInfo: SentenceInfo):ContextInfo {
		return {
			entity: sentenceInfo.entity,
			sentence: sentenceInfo.name,
			read: sentenceInfo.name === 'select',
			write: sentenceInfo.name !== 'select',
			dml: sentenceInfo.name !== 'ddl',
			ddl: sentenceInfo.name === 'ddl'
		}
	}

	public getDataSource (sentenceInfo: SentenceInfo, stage?: string):string {
		const contextInfo = this.getContextInfo(sentenceInfo)
		const _stage = this.schema.stage.get(stage)
		for (const i in _stage.dataSources) {
			const dataSource = _stage.dataSources[i]
			if (dataSource.condition === undefined) {
				return dataSource.name
			} else {
				const result = this.expressions.eval(dataSource.condition, contextInfo)
				if (result) {
					return dataSource.name
				}
			}
		}
		throw new SchemaError(`Undefined data source on stage ${_stage.name}`)
	}
}
