import {Config,Cache} from './../model/index';
import {LanguageManager,Operand,Query} from '../language'
import {Transaction,ConnectionManager} from '../connection'
import {NodeManager} from '../node/index'
import {Expression,TransactionManager}  from './../manager'
import {SchemaManager}  from './../schema/index'
import {DatabaseManager}  from '../database'

export interface IOrm
{    
    config:Config
    get node():NodeManager
    get language():LanguageManager
    get schema():SchemaManager
    get connection():ConnectionManager
    get database():DatabaseManager
    set cache(value:Cache)
    init(configPath:string):Promise<void> 
    expression(value:string):Expression
    lambda(value:Function):Expression
    complete(expression:string,schema:string):string
    build(expression:string,schema:string):Promise<Operand>
    query(expression:string,dialect:string,schema:string):Promise<Query>
    eval(expression:string,context:any,schema:string):Promise<any>  
    execute(expression:string,context:any,database:string,transaction?:Transaction):Promise<any>
    executeSentence(sentence:any,database:string):Promise<any>
    transaction(database:string,callback:{(tr:TransactionManager): Promise<void>;}):Promise<void>
}