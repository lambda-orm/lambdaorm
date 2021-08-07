import {Operand,Config } from './../model/index';
import {ILanguage} from '../language'
import {ITransaction,IConnectionManager} from '../connection'
import {Parser} from './../parser/index'
import {Expression,CompiledExpression}  from './../manager'
import {SchemaManager}  from './../schema'
import {NamespaceManager}  from './../namespace'

export interface IOrm
{       
    languages:any
    dialects:any
    config:Config
    get parser():Parser;
    get schema():SchemaManager;
    get namespace():NamespaceManager;
    language(dialect:string):ILanguage
    loadConfig(config:Config):Promise<void> 
    get connection():IConnectionManager;
    expression(value:string):Expression;
    lambda(value:Function):Expression;
    deserialize(serialized:string,language:string):CompiledExpression;
    compile(expression:string,dialect:string,schemaName?:string):Promise<Operand>;
    createTransaction(connectionName:string,callback:{(tr:ITransaction): Promise<void>;}):Promise<void>;
    execute(operand:Operand,context:any,namespace:string,transaction?:ITransaction):Promise<any>;
    executeSentence(sentence:any,namespace:string,transaction?:ITransaction):Promise<any>;
}