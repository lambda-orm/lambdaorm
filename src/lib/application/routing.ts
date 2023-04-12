
import { ObservableAction, SentenceInfo, RuleDataSource, ContextInfo, SchemaError } from '../domain/model'
import { SchemaManager } from './index'
import { IExpressions } from '3xpr'

export class Routing {
	private schema: SchemaManager
	private expressions: IExpressions

	constructor (schema: SchemaManager, expressions: IExpressions) {
		this.schema = schema
		this.expressions = expressions
	}

	public eval (source:RuleDataSource, sentenceInfo: SentenceInfo):boolean {
		const contextInfo = this.getContextInfo(sentenceInfo)
		if (source.condition === undefined) return true
		return this.expressions.eval(source.condition, contextInfo)
	}

	private getContextInfo (sentenceInfo: SentenceInfo):ContextInfo {
		return {
			entity: sentenceInfo.entity,
			action: sentenceInfo.action,
			read: sentenceInfo.action === ObservableAction.select,
			write: sentenceInfo.action !== ObservableAction.select,
			dml: sentenceInfo.action !== ObservableAction.ddl,
			ddl: sentenceInfo.action === ObservableAction.ddl
		}
	}

	public getDataSource (sentenceInfo: SentenceInfo, stage?: string):string {
		const contextInfo = this.getContextInfo(sentenceInfo)
		const _stage = this.schema.stage.get(stage)
		for (const i in _stage.sources) {
			const source = _stage.sources[i]
			if (source.condition === undefined) {
				return source.name
			} else {
				const result = this.expressions.eval(source.condition, contextInfo)
				if (result) {
					return source.name
				}
			}
		}
		throw new SchemaError(`Undefined data source on stage ${_stage.name}`)
	}
}
