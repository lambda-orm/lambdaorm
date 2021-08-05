import {Operand,Namespace } from './../model/index';
import {ILanguage} from '../language'
import {ITransaction,IConnectionManager} from '../connection'
import {Parser} from './../parser/index'
import {Expression,CompiledExpression}  from './../manager'
import {SchemaManager}  from './../schema'

export interface IOrm
{       
    languages:any
    dialects:any
    get parser():Parser;
    get schema():SchemaManager;
    language(dialect:string):ILanguage 
    get connection():IConnectionManager;
    addNamespace(namespace:Namespace):void;
    namespace(name:string):Namespace;
    expression(value:string):Expression;
    lambda(value:Function):Expression;
    deserialize(serialized:string,language:string):CompiledExpression;
    compile(expression:string,dialect:string,schemaName?:string):Promise<Operand>;
    createTransaction(connectionName:string,callback:{(tr:ITransaction): Promise<void>;}):Promise<void>;
    execute(operand:Operand,context:any,namespace:string,transaction?:ITransaction):Promise<any>;
    executeSentence(sentence:any,namespace:string,transaction?:ITransaction):Promise<any>;
}