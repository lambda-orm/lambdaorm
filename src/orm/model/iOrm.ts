import { Cache, Config } from './../model/index'
import { ExpressionFacade, Transaction, DatastoreFacade } from './../manager'

export interface IOrm
{
	get workspace(): string
	dialect (datastore:string): string
	get datastore (): DatastoreFacade
	setCache (value: Cache):void
	init(configPath?: string, connect?: boolean): Promise<Config>
	end (): Promise<void>
	expression(expression: string): ExpressionFacade
	transaction(datastore:string, context:any, callback:{(tr:Transaction): Promise<void>}):Promise<void>
}
