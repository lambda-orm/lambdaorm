import { RuleDataSource } from '../../schema/domain'
import { ClauseInfo } from '../../query/domain'

export interface IRouteService {
	eval (source:RuleDataSource, clauseInfo: ClauseInfo):boolean
}
