import {Operand } from './../model/index';
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
    expression(value:string):Expression;
    lambda(value:Function):Expression;
    deserialize(serialized:string,language:string):CompiledExpression;
    compile(expression:string,dialect:string,schemaName?:string):Promise<Operand>;
    createTransaction(connectionName:string,callback:{(tr:ITransaction): Promise<void>;}):Promise<void>;
    execute(operand:Operand,dialect:string,context:any,connection?:string|ITransaction):Promise<any>;
    executeSql(sql:string,connection?:string|ITransaction):Promise<any>;
}