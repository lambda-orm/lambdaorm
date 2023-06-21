import { DataSourceRule } from '.'
import { ClauseInfo } from './info'

export interface IRouteService {
	eval (source:DataSourceRule, clauseInfo: ClauseInfo):boolean
	getSource (clauseInfo: ClauseInfo, stage?: string):string
}
