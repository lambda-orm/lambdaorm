/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */

import { SentenceAction } from '../../schema/domain'
import { Query, QueryOptions } from '../../query/domain'

export interface ActionObserverArgs{
	expression:string
	query: Query
	data: any
	options: QueryOptions
	result?:any
	error?:any
}

export abstract class ActionObserver {
	public actions:SentenceAction[]
	public condition?:string
	public transactional?:boolean
	constructor (actions:SentenceAction[], condition?:string, transactional?:boolean) {
		this.actions = actions
		this.condition = condition
		this.transactional = transactional
	}

	public async before (args:ActionObserverArgs):Promise<void> {}
	public async after (args:ActionObserverArgs):Promise<void> {}
	public async error (args:ActionObserverArgs):Promise<void> {}
}
