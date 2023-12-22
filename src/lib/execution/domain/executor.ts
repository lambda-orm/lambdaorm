/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { SentenceAction, QueryOptions } from 'lambdaorm-base'
import { ExecuteResult, Query } from '../../query/domain'
import { Transaction } from '.'

export interface ActionObserverArgs{
	// expression:string
	query: Query
	data: any
	options: QueryOptions
	result?:any
	error?:any
}

export abstract class ActionObserver {
	public on:SentenceAction[]
	public condition?:string
	public transactional?:boolean
	constructor (on:SentenceAction[], condition?:string, transactional?:boolean) {
		this.on = on
		this.condition = condition
		this.transactional = transactional
	}

	public async before (args:ActionObserverArgs):Promise<void> {}
	public async after (args:ActionObserverArgs):Promise<void> {}
	public async error (args:ActionObserverArgs):Promise<void> {}
}

export interface QueryExecutor {
	get options() : QueryOptions
	commit (): Promise<void>
	rollback (): Promise<void>
	release (): Promise<void>
	execute (query: Query, data: any): Promise<any>
}

export interface Executor {
	execute (query: Query, data: any, options: QueryOptions): Promise<any>
	executeList (queries: Query[], options: QueryOptions): Promise<ExecuteResult[]>
	transaction (options: QueryOptions, callback: { (tr: Transaction): Promise<void> }): Promise<void>
}

export interface ObservableExecutor {
	subscribe (observer:ActionObserver):void
	unsubscribe (observer:ActionObserver): void
}

export interface ObservableExecutorDecorator extends Executor, ObservableExecutor {}
