
import { Query, Data } from '../../../../query/domain'

export interface IQueryInternalExecutor {
	_execute (query: Query, data: Data): Promise<any>
}
