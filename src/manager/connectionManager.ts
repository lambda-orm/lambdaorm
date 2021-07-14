import {IExecutor,ConnectionConfig,IConnectionManager } from '../model/index'
import {Connection,Executor,Transaction} from '../connection/index'
const genericPool = require('generic-pool')

export class ConnectionManager implements IConnectionManager
{    
    private connectionTypes:any
    private pools:any
    private configs:any
    constructor(){
        this.connectionTypes={}; 
        this.pools={};
        this.configs={}; 
    }
    public addType(name:string,value:any){
        this.connectionTypes[name] =value;
    }
    public add(value:ConnectionConfig){
        this.configs[value.name] = value;
        this.pools[value.name] = this.createPool(value);
    }
    public get(name:string):ConnectionConfig
    {
        return this.configs[name];
    }
    private createPool(config:ConnectionConfig)
    {        
        return genericPool.createPool({
                create: async () => {
                    let ConnectionType = this.connectionTypes[config.dialect]; 
                    let connection:Connection= new ConnectionType(config) as Connection;
                    await connection.connect();
                    return connection;    
                },
                destroy: async (connection:Connection) => {
                    await connection.disconnect();
                },
                validate: async (connection:Connection) => {
                    await connection.validate();
                }
              }
              ,{
                max: config.max?config.max:10, // maximum size of the pool
                min: config.min?config.min:2 // minimum size of the pool
              });        
    }
    public async acquire(name:string):Promise<Connection>
    {
        return (await this.pools[name].acquire()) as Connection;
    }
    public async release(connection:Connection):Promise<void>
    {
        await this.pools[connection.config.name].release(connection);
    }
    public createExecutor(connectionName:string):Executor
    {
        return new Executor(this,connectionName);
    }
    public createTransaction(connectionName:string):Transaction
    {
        return new Transaction(this,connectionName);
    }
    // public async execute(connectionName:string,sql:string,params:any[]):Promise<any>
    // {
    //     return await this.createExecutor(connectionName).execute(sql,params);
    // }
    // public async transaction(connectionName:string,callback:{(tr:IExecutor): Promise<void>;}):Promise<void>
    // {        
    //     const tr = this.createTransaction(connectionName);
    //     try
    //     {
    //         await tr.begin();
    //         await callback(tr);
    //         await tr.commit();
    //     }
    //     catch(error)
    //     {
    //         tr.rollback();
    //         throw error;
    //     }        
    // }    
}