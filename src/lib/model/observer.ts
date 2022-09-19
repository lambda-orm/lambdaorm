
import { Query, OrmOptions } from './index'

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
	options: OrmOptions
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

	public abstract before (args:ActionObserverArgs):void;
	public abstract after (args:ActionObserverArgs):void;
	public abstract error (args:ActionObserverArgs):void;
}
