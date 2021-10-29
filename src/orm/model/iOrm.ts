import { Cache } from './../model/index'
// import { Operand } from '../language'
import { ExpressionFacade, Transaction } from './../manager'
import { DatabaseFacade } from '../database'

export interface IOrm
{
	// configManager: ConfigManager
	get workspace(): string
	dialect (database:string): string
	get dialects():any
	// get lib (): LibManager
	// get parser():ParserManager
	get database():DatabaseFacade
	setCache (value: Cache):void
	init(configPath?: string, connect?: boolean): Promise<void>
	end (): Promise<void>
	expression(expression: string): ExpressionFacade
	// eslint-disable-next-line @typescript-eslint/ban-types
	// lambda(lambda:Function):ExpressionFacade
	// complete(expression:string, schema:string):string
	// build(expression:string, schema:string):Promise<Operand>
	// query (expression: string, database?: string): Promise<Query>
	// eval(expression:string, context:any, schema:string):Promise<any>
	// execute(expression:string, context:any, database?: string):Promise<any>
	transaction(database:string, callback:{(tr:Transaction): Promise<void>}):Promise<void>
}
