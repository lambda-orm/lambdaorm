/* eslint-disable @typescript-eslint/ban-types */
import { Query } from '../../query/domain'
import { QueryExecutor } from './executor'
import { QueryOptions } from 'lambdaorm-base'

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
