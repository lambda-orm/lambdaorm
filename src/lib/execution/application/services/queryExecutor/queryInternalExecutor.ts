import { Query, Data } from '../../../../query/domain'

export interface QueryInternalExecutor {
	_execute (query: Query, data: Data): Promise<any>
}
