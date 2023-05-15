/* eslint-disable @typescript-eslint/ban-types */

import { SentenceFacade } from '../../sentence/application'
import { ExecutionFacade } from '../../execution/application'
import { Query, QueryInfo, QueryOptions } from '../../query/domain'
import { QueryHelper } from './services/queryHelper'
import { GetInfoQuery } from './useCases/getInfo'
import { SchemaFacade } from '../../schema/application'
import { LanguagesService } from '../../language/application'
import { IQueryBuilder } from '../domain'
import { QueryBuilder } from './services/queryBuilder'
import { QueryBuilderCacheDecorator } from './services/queryBuilderCacheDecorator'
import { ExecuteQuery } from './useCases/execute'
import { ExpressionTransaction } from './useCases/transaction'
import { ICache } from 'h3lp'
import { Expressions } from '3xpr'

export class QueryFacade {
	private queryHelper:QueryHelper
	private getInfoQuery:GetInfoQuery
	private builder:IQueryBuilder
	private _executeQuery:ExecuteQuery
	constructor (
		private readonly sentenceFacade: SentenceFacade,
		private readonly schemaFacade: SchemaFacade,
		private readonly languages: LanguagesService,
		private readonly executionFacade:ExecutionFacade,
		expressions: Expressions,
		cache: ICache<string, string>) {
		this.builder = new QueryBuilderCacheDecorator(new QueryBuilder(this.sentenceFacade, this.schemaFacade, this.languages), cache)
		this.getInfoQuery = new GetInfoQuery(this.builder)
		this.queryHelper = new QueryHelper(this.schemaFacade.stage)
		this._executeQuery = new ExecuteQuery(this.builder, this.queryHelper, executionFacade, expressions)
	}

	public build (expression: string, options: QueryOptions): Query {
		return this.builder.build(expression, options)
	}

	public getInfo (expression: string, options: QueryOptions): QueryInfo {
		return this.getInfoQuery.getInfo(expression, options)
	}

	public solveOptions (options?: QueryOptions):QueryOptions {
		return this.queryHelper.solveOptions(options)
	}

	public async execute (expression: string|Function, data: any = {}, options: QueryOptions|undefined = undefined): Promise<any> {
		return this._executeQuery.execute(expression, data, options)
	}

	public async executeQuery (query: Query, data: any, options: QueryOptions): Promise<any> {
		return this._executeQuery.executeQuery(query, data, options)
	}

	public async executeList (queries: Query[], options: QueryOptions): Promise<any> {
		return this.executionFacade.executeList(queries, options)
	}

	public async transaction (options: QueryOptions, callback: { (tr: ExpressionTransaction): Promise<void> }): Promise<void> {
		return this._executeQuery.transaction(options, callback)
	}
}
