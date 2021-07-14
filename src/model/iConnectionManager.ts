import {IExecutor,ConnectionConfig } from '../model'
import {Connection,Executor,Transaction} from '../connection'

export interface IConnectionManager
{    
    addType(name:string,value:any):void
    add(value:ConnectionConfig):void
    get(name:string):ConnectionConfig
    acquire(name:string):Promise<Connection>
    release(connection:Connection):Promise<void>
    createExecutor(connectionName:string):Executor
    createTransaction(connectionName:string):Transaction
    // execute(connectionName:string,sql:string,params:any[]):Promise<any>
    // transaction(connectionName:string,callback:{(tr:IExecutor): Promise<void>;}):Promise<void>
}