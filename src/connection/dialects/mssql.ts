import {Connection,ConnectionConfig} from  './..'
import {Parameter} from '../../model'
import { debug } from 'console';

//https://github.com/tediousjs/tedious
//https://tediousjs.github.io/tedious/getting-started.html
//https://tediousjs.github.io/tedious/api-datatypes.html
//https://github.com/tediousjs/tedious/blob/master/examples/transaction.js
//https://docs.microsoft.com/es-es/sql/connect/node-js/step-3-proof-of-concept-connecting-to-sql-using-node-js?view=sql-server-ver15
//https://tediousjs.github.io/node-mssql/


export class MssqlConnection extends Connection
{
    private static mssqlLib:any
    constructor(config:ConnectionConfig){        
        super(config);
        if(!MssqlConnection.mssqlLib)
            MssqlConnection.mssqlLib= require('tedious')
    }
    public async connect():Promise<void>
    { 
        this.cnx = new MssqlConnection.mssqlLib.Connection(this.config.connectionString);
        if (this.cnx.state === this.cnx.STATE.INITIALIZED) {
            this.cnx.connect();
        }
    }
    public async disconnect():Promise<void>
    {           
        if (this.cnx.closed) {
            return;
        }
        this.cnx.queue.close();      
        return new Promise(resolve => {
            this.cnx.on('end', resolve);
            this.cnx.close();
            debug('connection closed');
        });
    }
    public async validate():Promise<Boolean> 
    {
        return !!this.cnx && this.cnx.isValid();
    }
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
    public async bulkInsert(sql:string,params:Parameter[],array:any[]):Promise<number[]>
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
        if(!this.cnx)
            await this.connect();        
        await this.cnx.beginTransaction();
        this.inTransaction=true;
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
    private async _execute(sql:string,params:Parameter[]=[]){
        if(!this.cnx){
            if(!this.inTransaction)await this.connect()
            else throw 'Connection is closed' 
        }        
        let request = new MssqlConnection.mssqlLib.Request(sql);
        for(let i=0;i<params.length;i++){
            let param = params[i];
            if(param.value=='array')
                request.addParameter(param.name,MssqlConnection.mssqlLib.TYPES.NVarChar,param.value.join(','));
            else if(param.value=='string')
                request.addParameter(param.name, MssqlConnection.mssqlLib.TYPES.NVarChar,param.value);
            else if(param.value=='number')
                request.addParameter(param.name, MssqlConnection.mssqlLib.TYPES.Numeric,param.value);    
            else if(param.value=='integer')
                request.addParameter(param.name, MssqlConnection.mssqlLib.TYPES.Int,param.value);
            else if(param.value=='decimal')
                request.addParameter(param.name, MssqlConnection.mssqlLib.TYPES.Decimal,param.value);
            else if(param.value=='boolean')
                request.addParameter(param.name, MssqlConnection.mssqlLib.TYPES.Bit,param.value);
            else if(param.value=='datetime')
                request.addParameter(param.name, MssqlConnection.mssqlLib.TYPES.DateTime,param.value);
        }  
        let result = await this.cnx.execSql(request);
        // return result[0];
        throw 'NotImplemented'
    }   
}