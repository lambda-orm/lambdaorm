import { Cache } from './../model/index'
import { ExpressionFacade, Transaction, DatabaseFacade } from './../manager'

export interface IOrm
{
	get workspace(): string
	dialect (database:string): string
	get database():DatabaseFacade
	setCache (value: Cache):void
	init(configPath?: string, connect?: boolean): Promise<void>
	end (): Promise<void>
	expression(expression: string): ExpressionFacade
	transaction(database:string, callback:{(tr:Transaction): Promise<void>}):Promise<void>
}
