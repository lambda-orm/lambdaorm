
import { Expressions } from '3xpr'
import { ObservableAction, DataSourceRule, SchemaError, ClauseInfo, ContextInfo, IRouteService } from '../../domain'
import { StageConfigService } from './config/stageConfigService'

export class RouteService implements IRouteService {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly stageConfigService: StageConfigService,
		private readonly expressions:Expressions) {}

	public eval (source:DataSourceRule, clauseInfo: ClauseInfo):boolean {
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
		const _stage = this.stageConfigService.get(stage)
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
