export interface IExecutor {
    execute(sql:string,params:any[]):Promise<any>
}