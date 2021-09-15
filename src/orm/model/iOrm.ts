import {Config,Cache} from './../model/index'
import {LanguageManager,Operand,Query} from '../language'
import {ConnectionManager} from '../connection'
import {NodeManager} from '../node/index'
import {Expression,Transaction}  from './../manager'
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
    execute(expression:string,context:any,database:string):Promise<any>
    executeSentence(sentence:any,database:string):Promise<any>
    transaction(database:string,callback:{(tr:Transaction): Promise<void>}):Promise<void>
}