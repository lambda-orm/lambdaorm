
import { IExpressions } from '3xpr'
import { ObservableAction, RuleDataSource, SchemaError } from '../../../schema/domain'
import { SchemaService } from '../../../schema/application'
import { ClauseInfo, ContextInfo, IRouteService } from '../../../query/domain'

export class RouteService implements IRouteService {
	private schema: SchemaService
	private expressions: IExpressions

	constructor (schema: SchemaService, expressions: IExpressions) {
		this.schema = schema
		this.expressions = expressions
	}

	public eval (source:RuleDataSource, clauseInfo: ClauseInfo):boolean {
		const contextInfo = this.getContextInfo(clauseInfo)
		if (source.condition === undefined) return true
		return this.expressions.eval(source.condition, contextInfo)
	}

	private getContextInfo (clauseInfo: ClauseInfo):ContextInfo {
		return {
			entity: clauseInfo.entity,
			action: clauseInfo.action,
			read: clauseInfo.action === ObservableAction.select,
			write: clauseInfo.action !== ObservableAction.select,
			dml: clauseInfo.action !== ObservableAction.ddl,
			ddl: clauseInfo.action === ObservableAction.ddl
		}
	}

	public getSource (clauseInfo: ClauseInfo, stage?: string):string {
		const contextInfo = this.getContextInfo(clauseInfo)
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
