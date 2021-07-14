export interface IExecutor {
    connectionName:string
    query(sql:string,params:any[]):Promise<any>
    insert(sql:string,params:any[]):Promise<number>
    update(sql:string,params:any[]):Promise<number>
    delete(sql:string,params:any[]):Promise<number>
}