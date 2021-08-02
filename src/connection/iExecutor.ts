import {Parameter } from './../model'
export interface IExecutor {
    connectionName:string
    select(sql:string,params:Parameter[]):Promise<any>
    insert(sql:string,params:Parameter[]):Promise<number>
    update(sql:string,params:Parameter[]):Promise<number>
    delete(sql:string,params:Parameter[]):Promise<number>
    execute(sql:string):Promise<any>
    bulkInsert(sql:string,array:any[]):Promise<number[]>
}