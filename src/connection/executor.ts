import {IExecutor,IConnectionManager } from '../model'


export class Executor implements IExecutor
{
    private connectionManager:IConnectionManager
    private connectionName:string
    constructor(connectionManager:IConnectionManager,connectionName:string){
        this.connectionManager=connectionManager;
        this.connectionName=connectionName; 
    } 
    public async execute(sql:string,params:any[]):Promise<any>
    {
        const connection = await this.connectionManager.acquire(this.connectionName);
        let result= await connection.execute(sql,params);
        await this.connectionManager.release(connection);
        return result;
    }
}