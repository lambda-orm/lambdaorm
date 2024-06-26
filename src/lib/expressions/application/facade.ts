/* eslint-disable @typescript-eslint/ban-types */

import { SentenceFacade } from '../../sentence/application'
import { Query } from '../../query/domain'
import { QueryPlan, SchemaState, QueryOptions } from 'lambdaorm-base'
import { QueryHelper } from './services/queryHelper'
import { GeQueryPlan } from './useCases/plan'
import { LanguagesService } from '../../language/application'
import { IQueryBuilder } from '../domain'
import { QueryBuilder } from './services/queryBuilder'
import { QueryBuilderCacheDecorator } from './services/queryBuilderCacheDecorator'
import { ExpressionExecute } from './useCases/execute'
import { QueryTransaction } from './useCases/transaction'
import { ICache } from 'h3lp'
import { Expressions } from '3xpr'
import { Executor } from '../../execution/domain'
import { OrmH3lp } from '../../shared/infrastructure'

export class ExpressionFacade {
	private queryHelper:QueryHelper
	private getQueryPlan:GeQueryPlan
	private builder:IQueryBuilder
	private expressionExecute:ExpressionExecute
	constructor (
		private readonly sentenceFacade: SentenceFacade,
		private readonly schemaState: SchemaState,
		private readonly languages: LanguagesService,
		executor:Executor,
		expressions: Expressions,
		cache: ICache<string, string>,
		helper:OrmH3lp) {
		this.builder = new QueryBuilderCacheDecorator(new QueryBuilder(this.sentenceFacade, this.schemaState, this.languages), cache, helper)
		this.getQueryPlan = new GeQueryPlan(this.builder)
		this.queryHelper = new QueryHelper(this.schemaState.stage, this.schemaState.view)
		this.expressionExecute = new ExpressionExecute(this.builder, executor, expressions, helper)
	}

	public build (query: string, options?: QueryOptions): Query {
		return this.builder.build(query, this.solveQueryOptions(options))
	}

	public plan (query: string, options?: QueryOptions): QueryPlan {
		return this.getQueryPlan.plan(query, this.solveQueryOptions(options))
	}

	public solveQueryOptions (options?: QueryOptions):QueryOptions {
		return this.queryHelper.solveQueryOptions(options)
	}

	public async execute (query: string, data: any = {}, options?: QueryOptions): Promise<any> {
		return this.expressionExecute.execute(query, data, this.solveQueryOptions(options))
	}

	public async executeList (queries: string[], options?: QueryOptions): Promise<any> {
		return this.expressionExecute.executeList(queries, this.solveQueryOptions(options))
	}

	public async transaction (options: QueryOptions|undefined = undefined, callback: { (tr: QueryTransaction): Promise<void> }): Promise<void> {
		return this.expressionExecute.transaction(this.solveQueryOptions(options), callback)
	}
}
