const genericPool = require('generic-pool')

export interface ConnectionConfig {
    name:string
    dialect:string // "mysql"| "mssql"| "oracle" | "postgres" | "nomgo"
    schema:string
    host:string
    port:number
    user:string
    password:string    
    database:string
    max?:number
    min?:number
}
export interface IExecutor {
    execute(sql:string,params:any[]):Promise<any>
}
export abstract class Connection implements IExecutor
{
    public config:ConnectionConfig
    public inTransaction:boolean

    constructor(config:ConnectionConfig){        
        this.config=config;
        this.inTransaction=false;
    }
    public abstract connect():Promise<void>;
    public abstract disconnect():Promise<void>;
    public abstract validate():Promise<Boolean>;
    public abstract execute(sql:string,params:any[]):Promise<any>;
    public abstract beginTransaction():Promise<void>;
    public abstract commit():Promise<void>;
    public abstract rollback():Promise<void>;
}
export class Transaction implements IExecutor
{
    private connectionManager:ConnectionManager
    private connectionName:string
    private connection?:Connection
    constructor(connectionManager:ConnectionManager,connectionName:string){
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
export class Executor implements IExecutor
{
    private connectionManager:ConnectionManager
    private connectionName:string
    constructor(connectionManager:ConnectionManager,connectionName:string){
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
export class ConnectionManager
{    
    private connectionTypes:any
    private pools:any
    private configs:any
    constructor(){
        this.connectionTypes={}; 
        this.pools={};
        this.configs={}; 
    }
    public addConnectionType(name:string,value:any){
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
    public async execute(connectionName:string,sql:string,params:any[]):Promise<any>
    {
        return await this.createExecutor(connectionName).execute(sql,params);
    }
    public async transaction(connectionName:string,callback:{(tr:IExecutor): Promise<void>;}):Promise<void>
    {        
        const tr = this.createTransaction(connectionName);
        try
        {
            await tr.begin();
            await callback(tr);
            await tr.commit();
        }
        catch(error)
        {
            tr.rollback();
            throw error;
        }        
    }    
}