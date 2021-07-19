import {Parameter } from './parameter'
export interface IExecutor {
    connectionName:string
    query(sql:string,params:Parameter[]):Promise<any>
    insert(sql:string,params:Parameter[]):Promise<number>
    update(sql:string,params:Parameter[]):Promise<number>
    delete(sql:string,params:Parameter[]):Promise<number>
}