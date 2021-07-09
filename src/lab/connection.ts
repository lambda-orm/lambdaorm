import mysql from 'mysql2/promise';
import { promisify } from 'util';
// import genericPool from 'generic-pool';
const genericPool = require('generic-pool')

interface ConnectionConfig {
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
interface IExecutor {
    execute(sql:string,params:any[]):Promise<any>
}

class Connection implements IExecutor
{
    public config:ConnectionConfig
    public inTransaction:boolean
    private cnx?:mysql.Connection

    constructor(config:ConnectionConfig){        
        this.config=config;
        this.inTransaction=false;
    }
    public async connect():Promise<void>
    {
        this.cnx = await mysql.createConnection({
            host: this.config.host ,
            port: this.config.port | 3306,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });
    }
    public async disconnect():Promise<void>
    {
        // // Don't disconnect connections with CLOSED state
        // if (this.cnx._closing) {
        //   debug('connection tried to disconnect but was already at CLOSED state');
        //   return;
        // }
        if(this.cnx)  
          await promisify(callback => this.cnx?.end(callback))();
    }
    public async validate():Promise<Boolean> 
    {
        return !!this.cnx;
    }


    
    public async execute(sql:string,params:any[]):Promise<any>
    {
        if(!this.cnx){
           if(!this.inTransaction)await this.connect()
           else throw 'Connection is closed' 
        }
        let result = await this.cnx?.execute(sql,params);
        return result?.values;
    }
    public async beginTransaction():Promise<void>
    {
        if(!this.cnx)await this.connect()
        this.inTransaction=true;
        await this.cnx?.beginTransaction();
    }
    public async commit():Promise<void>
    {
        if(!this.cnx)
            throw 'Connection is closed'
        await this.cnx.commit();
        this.inTransaction=false;
    }
    public async rollback():Promise<void>
    {
        if(!this.cnx)
            throw 'Connection is closed'
        await this.cnx.rollback();
        this.inTransaction=false;
    }


}

class Transaction implements IExecutor
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

class Executor implements IExecutor
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


class ConnectionManager
{    
    private connectionTypes:any
    private pools:any
    constructor(){
        this.connectionTypes={}; 
        this.pools={}; 
    }
    public addConnectionType(name:string,value:any){
        this.connectionTypes[name] =value;
    }
    public add(value:ConnectionConfig){
        this.pools[value.name] = this.createPool(value);
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


(async () => { 

    let manager = new ConnectionManager();

    //ejecuciones separadas
    await manager.execute('myConnection','select',[]);
    await manager.execute('myConnection','select',[]);
    await manager.execute('myConnection','select',[]);

    //transaccion
    await manager.transaction('myConnection',async function(tr){
        await tr.execute('select',[]);
        await tr.execute('select',[]);
        await tr.execute('select',[]);
        await tr.execute('select',[]);
        await tr.execute('select',[]);
    });

})();