import {Parameter } from '../model'
import {ConnectionManager } from './connectionManager'
import {IExecutor } from './iExecutor'

export class Executor implements IExecutor
{
    private connectionManager:ConnectionManager
    public connectionName:string
    constructor(connectionManager:ConnectionManager,connectionName:string){
        this.connectionManager=connectionManager;
        this.connectionName=connectionName; 
    }    
    public async select(sql:string,params:Parameter[]):Promise<any>
    {
        const connection = await this.connectionManager.acquire(this.connectionName);
        let result= await connection.select(sql,params);
        await this.connectionManager.release(connection);
        return result;
    }
    public async insert(sql:string,params:Parameter[]):Promise<number>
    {
        const connection = await this.connectionManager.acquire(this.connectionName);
        let result= await connection.insert(sql,params);
        await this.connectionManager.release(connection);
        return result;
    }
    public async bulkInsert(sql:string,array:any[],parameters:Parameter[],fieldId?:string):Promise<number[]>
    {
        const connection = await this.connectionManager.acquire(this.connectionName);
        let result= await connection.bulkInsert(sql,array,parameters,fieldId);
        await this.connectionManager.release(connection);
        return result;
    }
    public async update(sql:string,params:Parameter[]):Promise<number>
    {
        const connection = await this.connectionManager.acquire(this.connectionName);
        let result= await connection.update(sql,params);
        await this.connectionManager.release(connection);
        return result;
    }
    public async delete(sql:string,params:Parameter[]):Promise<number>
    {
        const connection = await this.connectionManager.acquire(this.connectionName);
        let result= await connection.delete(sql,params);
        await this.connectionManager.release(connection);
        return result;
    }
    public async execute(sql:string):Promise<any>
    {
        const connection = await this.connectionManager.acquire(this.connectionName);
        let result= await connection.execute(sql);
        await this.connectionManager.release(connection);
        return result;
    }
}