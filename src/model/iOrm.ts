import {Operand,Config,Cache} from './../model/index';
import {ILanguage} from '../language'
import {Transaction,ConnectionManager} from '../connection'
import {Parser} from './../parser/index'
import {Expression,CompiledExpression}  from './../manager'
import {SchemaManager}  from './../schema'
import {DatabaseManager}  from '../database'

export interface IOrm
{    
    config:Config
    get parser():Parser
    get schema():SchemaManager
    get connection():ConnectionManager
    get database():DatabaseManager
    set cache(value:Cache)
    loadConfig(path:string):Promise<void>    
    language(dialect:string):ILanguage   
    expression(value:string):Expression
    lambda(value:Function):Expression
    compile(expression:string,dialect:string,schema:string):Promise<Operand>  
    execute(operand:Operand,context:any,database:string,transaction?:Transaction):Promise<any>
    executeSentence(sentence:any,database:string,transaction?:Transaction):Promise<any>
    transaction(database:string,callback:{(tr:Transaction): Promise<void>;}):Promise<void>
}