/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { Query, QueryOptions } from './index'

export enum ObservableAction {
	select = 'select',
	insert = 'insert',
	bulkInsert = 'bulkInsert',
	update = 'update',
	delete = 'delete',
	ddl = 'ddl'
}

export interface ActionObserverArgs{
	expression:string
	query: Query
	data: any
	options: QueryOptions
	result?:any
	error?:any
}

export abstract class ActionObserver {
	public action:ObservableAction
	public condition?:string
	constructor (action:ObservableAction, condition?:string) {
		this.action = action
		this.condition = condition
	}

	public async before (args:ActionObserverArgs):Promise<void> {}
	public async after (args:ActionObserverArgs):Promise<void> {}
	public async error (args:ActionObserverArgs):Promise<void> {}
}
