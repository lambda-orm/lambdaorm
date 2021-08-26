import {Parameter} from '../model'
import {Connection } from './connection'
import {Executor } from './executor'
import {ConnectionManager } from './connectionManager'

export class Transaction extends Executor
{
    private connection?:Connection
    constructor(connectionManager:ConnectionManager,connectionName:string){
        super(connectionManager,connectionName);
    }    
    public async begin():Promise<void>
    {
        this.connection = await this.connectionManager.acquire(this.connectionName);
        await this.connection.beginTransaction();
    }
    public async select(sql:string,params:Parameter[]):Promise<any>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        return this.connection.select(sql,params);
    }
    public async insert(sql:string,params:Parameter[]):Promise<number>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        return this.connection.insert(sql,params);
    }
    public async bulkInsert(sql:string,array:any[],parameters:Parameter[],fieldId?:string):Promise<number[]>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        return this.connection.bulkInsert(sql,array,parameters,fieldId);
    }
    public async update(sql:string,params:Parameter[]):Promise<number>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        return this.connection.update(sql,params);
    }
    public async delete(sql:string,params:Parameter[]):Promise<number>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        return this.connection.delete(sql,params);
    }
    public async execute(sql:string):Promise<any>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        return this.connection.execute(sql);
    }
    public async commit():Promise<void>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        await this.connection.commit();
        await this.connectionManager.release(this.connection);
    }
    public async rollback():Promise<void>
    {
        if(!this.connection)
            throw 'Connection is closed' 
        await this.connection.rollback();
        await this.connectionManager.release(this.connection);
    }
}