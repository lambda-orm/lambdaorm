/* eslint-disable @typescript-eslint/ban-types */
import { Query, QueryOptions } from '../../query/domain'
import { QueryExecutor } from '../application/services/queryExecutor/queryExecutor'

export class Transaction {
	constructor (private readonly queryExecutor: QueryExecutor) {
		this.queryExecutor = queryExecutor
	}

	public async execute (query: Query, data: any = {}): Promise<any> {
		return this.queryExecutor.execute(query, data)
	}

	public get options ():QueryOptions {
		return this.queryExecutor.options
	}
}
