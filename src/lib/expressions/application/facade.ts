/* eslint-disable @typescript-eslint/ban-types */

import { Executor } from '../../execution/application'
import { QueryInfo, QueryOptions } from '../../query/domain'
import { GetInfoQuery } from './useCases/getInfo'

export class QueryFacade {
	// eslint-disable-next-line no-useless-constructor
	constructor (private readonly getInfoQuery:GetInfoQuery,
		private readonly executor:Executor) {}

	public getInfo (expression: string, options: QueryOptions): QueryInfo {
		return this.getInfoQuery.getInfo(expression, options)
	}
}
