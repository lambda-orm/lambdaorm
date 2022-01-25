
import { SentenceInfo, RuleDataSource, ContextInfo } from '../model'
import { SchemaManager } from './index'
import { Expressions } from 'js-expressions'

export class Routing {
	private schema: SchemaManager
	private expressions: Expressions

	constructor (schema: SchemaManager, expressions: Expressions) {
		this.schema = schema
		this.expressions = expressions
	}

	public eval (dataSource:RuleDataSource, sentenceInfo: SentenceInfo, context: any):boolean {
		const contextInfo = this.getContextInfo(sentenceInfo, context)
		if (dataSource.condition === undefined) return true
		return this.expressions.eval(dataSource.condition, contextInfo)
	}

	private getContextInfo (sentenceInfo: SentenceInfo, context: any):ContextInfo {
		const _context = {
			entity: sentenceInfo.entity,
			sentence: sentenceInfo.name,
			read: sentenceInfo.name === 'select',
			write: sentenceInfo.name !== 'select',
			dml: ['select', 'insert', 'update', 'delete'].includes(sentenceInfo.name),
			ddl: !['insert', 'update', 'delete'].includes(sentenceInfo.name),
			context: context
		}
		return _context
	}

	public getDataSource (sentenceInfo: SentenceInfo, context: any, stage?: string):string {
		const contextInfo = this.getContextInfo(sentenceInfo, context)
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
		throw new Error(`Undefined data source on stage ${_stage.name}`)
	}
}
