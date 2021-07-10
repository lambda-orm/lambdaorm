import {IExecutor,IConnectionManager} from '../model'
import {Connection } from './connection'

export class Transaction implements IExecutor
{
    private connectionManager:IConnectionManager
    private connectionName:string
    private connection?:Connection
    constructor(connectionManager:IConnectionManager,connectionName:string){
        this.connectionManager=connectionManager;
        this.connectionName=connectionName; 
    }    
    public async begin():Promise<void>
    {
        this.connection = await this.connectionManager.acquire(this.connectionName);
        this.connection.beginTransaction();
    }
    public async query(sql:string,params:any[]):Promise<any>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        return this.connection.query(sql,params);
    }
    public async insert(sql:string,params:any[]):Promise<number>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        return this.connection.insert(sql,params);
    }
    public async update(sql:string,params:any[]):Promise<number>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        return this.connection.update(sql,params);
    }
    public async delete(sql:string,params:any[]):Promise<number>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        return this.connection.delete(sql,params);
    }
    public async commit():Promise<void>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        this.connection.commit();
        await this.connectionManager.release(this.connection);
    }
    public async rollback():Promise<void>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        this.connection.rollback();
        await this.connectionManager.release(this.connection);
    }
}