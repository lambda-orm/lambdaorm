import { Query } from '../../../../query/domain'
import { Data } from 'lambdaorm-base'

export interface QueryInternalExecutor {
	_execute (query: Query, data: Data): Promise<any>
}
