import {IExecutor,ConnectionConfig,Dialect,Cache,Schema,IConnectionManager,Operand } from './../model/index';
import {Model,Parser} from './../parser/index'
import {SchemaManager,LanguageManager,Expression,CompiledExpression,MemoryCache,ConnectionManager}  from './../manager/index'

export interface IOrm
{    
    get parser():Parser;
    get schema():SchemaManager;
    get language():LanguageManager;
    get connection():IConnectionManager;    
    expression(value:string):Expression;
    lambda(value:Function):Expression;
    deserialize(serialized:string,language:string):CompiledExpression;
    compile(expression:string,dialect:string,schemaName?:string):Promise<Operand>;
    createTransaction(connectionName:string,callback:{(tr:IExecutor): Promise<void>;}):Promise<void>;
    execute(operand:Operand,dialect:string,context:any,connection?:string|IExecutor):Promise<any>;
    // transaction(operand:Operand,dialect:string,context:any,transaction:IExecutor):Promise<any>;
}