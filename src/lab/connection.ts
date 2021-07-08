import mysql from 'mysql2/promise';
import { promisify } from 'util';

interface ConnectionConfig {
    name:string
    dialect:string // "mysql"| "mssql"| "oracle" | "postgres" | "nomgo"
    schema:string
    host:string
    port:number
    user:string
    password:string    
    database:string
}
interface IExecutor {
    execute(sql:string,params:any[]):Promise<any>
}

class Connection implements IExecutor
{
    public config:ConnectionConfig
    private cnx?:mysql.Connection

    constructor(config:ConnectionConfig){        
        this.config=config;
    }
    private async connect():Promise<mysql.Connection>
    {
        return await mysql.createConnection({
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
    async disconnect() {
        // // Don't disconnect connections with CLOSED state
        // if (this.cnx._closing) {
        //   debug('connection tried to disconnect but was already at CLOSED state');
        //   return;
        // }
        if(!this.cnx)return;  
        return await promisify(callback => this.cnx?this.cnx.end(callback):null)();
    }
    public async execute(sql:string,params:any[]):Promise<any>
    {
        if(!this.cnx)this.cnx = await this.connect()
        let result = await this.cnx.execute(sql,params);
        return result.values;
    }
    public async beginTransaction():Promise<void>
    {
        if(!this.cnx)this.cnx = await this.connect()
        await this.cnx.beginTransaction();
    }
    public async commit():Promise<void>
    {
        if(!this.cnx)
            throw 'Connection is closed'
        await this.cnx.commit();
    }
    public async rollback():Promise<void>
    {
        if(!this.cnx)
            throw 'Connection is closed'
        await this.cnx.rollback();
    }


}

class Transaction implements IExecutor
{
    public connection:Connection

    constructor(connection:Connection)
    {
        this.connection=connection;
    }
    public async execute(sql:string,params:any[]):Promise<any>
    {
        return this.connection.execute(sql,params);
    }
    public async beginTransaction():Promise<void>
    {
        this.connection.beginTransaction();
    }
    public async commit():Promise<void>
    {
        this.connection.commit();
    }
    public async rollback():Promise<void>
    {
        this.connection.rollback();
    }
}


class Executor
{
    private configs:any
    private connectionTypes:any
    constructor(){
        this.connectionTypes={}; 
        this.configs={}; 
    }
    public addConnectionType(name:string,value:any){
        this.connectionTypes[name] =value;
    }
    public addConfig(value:ConnectionConfig){
        this.configs[value.name] = value;
    }
    protected getConnection(name:string): Connection
    {
        let config = this.configs[name];
        let ConnectionType = this.connectionTypes[config.dialect]; 
        return new ConnectionType(config) as Connection; 
    }
    /**
     * Release a pooled connection so it can be utilized by other connection requests
     * @param connection 
     * @returns {Promise}
     */
    protected async releaseConnection(connection:Connection):Promise<void>
    {
        //TODO
    }
    public async execute(connectionName:string,sql:string,params:any[]):Promise<any>
    {
        const connection = this.getConnection(connectionName);
        let result= await connection.execute(sql,params);
        await this.releaseConnection(connection);
        return result;
    }
    public async transaction(connectionName:string,callback:{(tr:IExecutor): Promise<void>;})
    {
        const connection = this.getConnection(connectionName);
        const tr = new Transaction(connection);
        try{
            await tr.beginTransaction();
            await callback(tr);
            await tr.commit();
        }
        catch(error)
        {
            tr.rollback();
            throw error;
        }
        finally{
            await this.releaseConnection(connection);
        }
        
    }
}

let executor = new Executor();

//ejecuciones separadas
executor.execute('myConnection','select',[]);
executor.execute('myConnection','select',[]);
executor.execute('myConnection','select',[]);

//transaccion
executor.transaction('myConnection',async function(tr){
    await tr.execute('select',[]);
    await tr.execute('select',[]);
    await tr.execute('select',[]);
    await tr.execute('select',[]);
    await tr.execute('select',[]);
})