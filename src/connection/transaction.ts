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
    public async execute(sql:string,params:any[]):Promise<any>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        return this.connection.execute(sql,params);
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