import {Operand,Config,Cache} from './../model/index';
import {LanguageManager} from '../language'
import {Transaction,ConnectionManager} from '../connection'
import {NodeManager} from '../node/index'
import {Expression}  from './../manager'
import {SchemaManager}  from './../schema'
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
    compile(expression:string,dialect:string,schema:string):Promise<Operand>  
    execute(operand:Operand,context:any,database:string,transaction?:Transaction):Promise<any>
    executeSentence(sentence:any,database:string,transaction?:Transaction):Promise<any>
    transaction(database:string,callback:{(tr:Transaction): Promise<void>;}):Promise<void>
}