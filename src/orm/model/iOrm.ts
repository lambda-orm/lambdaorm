import { ConfigInfo, Cache } from './../model/index'
import { LanguageManager, Operand, Query } from '../language'
import { ConnectionManager } from '../connection'
import { ParserManager } from '../parser/index'
import { Expression, Transaction, LibManager } from './../manager'
import { SchemaManager } from './../schema/index'
import { DatabaseManager } from '../database'

export interface IOrm
{
	configInfo: ConfigInfo
	get lib (): LibManager
	get parser():ParserManager
	get language():LanguageManager
	get schema():SchemaManager
	get connection():ConnectionManager
	get database():DatabaseManager
	set cache(value:Cache)
	init(configPath?:string, connect?:boolean):Promise<void>
	expression(expression: string): Expression
	// eslint-disable-next-line @typescript-eslint/ban-types
	lambda(lambda:Function):Expression
	complete(expression:string, schema:string):string
	build(expression:string, schema:string):Promise<Operand>
	query(expression:string, dialect:string, schema:string):Promise<Query>
	eval(expression:string, context:any, schema:string):Promise<any>
	execute(expression:string, database:string, context:any):Promise<any>
	executeSentence(sentence:any, database:string):Promise<any>
	transaction(database:string, callback:{(tr:Transaction): Promise<void>}):Promise<void>
}
