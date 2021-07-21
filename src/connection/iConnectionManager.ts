import {ConnectionConfig } from './connectionConfig'
import {Connection} from './connection'
import {IExecutor} from './iexecutor'
import {ITransaction} from './iTransaction'

export interface IConnectionManager
{    
    addType(name:string,value:any):void
    add(value:ConnectionConfig):void
    get(name:string):ConnectionConfig
    acquire(name:string):Promise<Connection>
    release(connection:Connection):Promise<void>
    createExecutor(connectionName:string):IExecutor
    createTransaction(connectionName:string):ITransaction
}