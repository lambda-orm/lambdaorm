import {ITransaction,IConnectionManager,Operand,ILanguage } from './../model/index';
import {Parser} from './../parser/index'
import {SchemaManager,Expression,CompiledExpression}  from './../manager/index'

export interface IOrm
{    
    
    get parser():Parser;
    get schema():SchemaManager;
    getLanguage(dialect:string):ILanguage 
    // get dialect():DialectManager;
    get connection():IConnectionManager;    
    expression(value:string):Expression;
    lambda(value:Function):Expression;
    deserialize(serialized:string,language:string):CompiledExpression;
    compile(expression:string,dialect:string,schemaName?:string):Promise<Operand>;
    createTransaction(connectionName:string,callback:{(tr:ITransaction): Promise<void>;}):Promise<void>;
    execute(operand:Operand,dialect:string,context:any,connection?:string|ITransaction):Promise<any>;
}