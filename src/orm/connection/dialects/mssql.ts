import {Connection,ConnectionConfig,ConnectionPool} from  './..'
import {Parameter} from '../../model'
import { debug } from 'console';

//https://github.com/tediousjs/tedious
//https://tediousjs.github.io/tedious/getting-started.html
//https://tediousjs.github.io/tedious/api-datatypes.html
//https://github.com/tediousjs/tedious/blob/master/examples/transaction.js
//https://docs.microsoft.com/es-es/sql/connect/node-js/step-3-proof-of-concept-connecting-to-sql-using-node-js?view=sql-server-ver15
//https://tediousjs.github.io/node-mssql/


export class MssqlConnectionPool extends ConnectionPool
{
    public static tedious:any
    protected pool:any
    constructor(config:ConnectionConfig){        
        super(config);
        if(!MssqlConnectionPool.tedious)
            MssqlConnectionPool.tedious= require('tedious');

        let _config = { ...config.connection, ...{waitForConnections: true,connectionLimit: 10,queueLimit: 0}};         
        this.pool = MssqlConnectionPool.tedious.createPool(_config);    
    }
    public async acquire():Promise<Connection>
    {
        let cnx = await MssqlConnectionPool.tedious.Connection(this.config.connection);
        if (cnx.state === cnx.STATE.INITIALIZED) {
            cnx.connect();
        }
        return new MssqlConnection(cnx,this);
    }
    public async release(connection:Connection):Promise<void>
    {
        if (connection.cnx.closed) {
            return;
        }
        connection.cnx.queue.close();      
        return new Promise(resolve => {
            connection.cnx.on('end', resolve);
            connection.cnx.close();
            debug('connection closed');
        });
    }
}




export class MssqlConnection extends Connection
{        
    public async select(sql:string,params:Parameter[]):Promise<any>
    {        
        return await this._execute(sql,params);
    }
    public async insert(sql:string,params:Parameter[]):Promise<number>
    {      
        throw 'NotImplemented'  
        // let result = await this._execute(sql,params);
        // return result.insertId;
    }
    public async bulkInsert(sql:string,array:any[],parameters:Parameter[],fieldId?:string):Promise<number[]>
    { 
        throw 'NotImplemented' 
    }
    public async update(sql:string,params:Parameter[]):Promise<number>
    {     
        throw 'NotImplemented'   
        // let result = await this._execute(sql,params);
        // return result.affectedRows;
    }
    public async delete(sql:string,params:Parameter[]):Promise<number>
    {       
        throw 'NotImplemented' 
        // let result = await this._execute(sql,params);
        // return result.affectedRows;
    }
    public async execute(sql:string):Promise<any>
    {        
        return await this._execute(sql);
    }
    public async beginTransaction():Promise<void>
    {
        await this.cnx.beginTransaction();
        this.inTransaction=true;
    }
    public async commit():Promise<void>
    {
        await this.cnx.commit();
        this.inTransaction=false;
    }
    public async rollback():Promise<void>
    {
        await this.cnx.rollback();
        this.inTransaction=false;
    }
    private async _execute(sql:string,params:Parameter[]=[]){
             
        let request = new MssqlConnectionPool.tedious.Request(sql);
        for(let i=0;i<params.length;i++){
            let param = params[i];
            if(param.value=='array')
                request.addParameter(param.name,MssqlConnectionPool.tedious.TYPES.NVarChar,param.value.join(','));
            else if(param.value=='string')
                request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.NVarChar,param.value);
            else if(param.value=='number')
                request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Numeric,param.value);    
            else if(param.value=='integer')
                request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Int,param.value);
            else if(param.value=='decimal')
                request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Decimal,param.value);
            else if(param.value=='boolean')
                request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.Bit,param.value);
            else if(param.value=='datetime')
                request.addParameter(param.name, MssqlConnectionPool.tedious.TYPES.DateTime,param.value);
        }  
        let result = await this.cnx.execSql(request);
        // return result[0];
        throw 'NotImplemented'
    }   
}