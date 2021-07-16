import {Connection} from './connection'
import {ConnectionConfig} from './../model'
import { promisify } from 'util';

// import * as mysql from 'mysql2/promise'



export class MySqlConnection extends Connection
{
    private cnx:any //mysql.Connection
    private lib:any
    constructor(config:ConnectionConfig){        
        super(config);
        this.lib= require('mysql2/promise');
    }
    public async connect():Promise<void>
    { 
        this.cnx = await this.lib.createConnection({
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
    public async query(sql:string,params:any[]):Promise<any>
    {        
        return await this.execute(sql,params);
    }
    public async insert(sql:string,params:any[]):Promise<number>
    {        
        let result = await this.execute(sql,params);
        return result.insertId;
    }
    public async update(sql:string,params:any[]):Promise<number>
    {        
        let result = await this.execute(sql,params);
        return result.affectedRows;
    }
    public async delete(sql:string,params:any[]):Promise<number>
    {        
        let result = await this.execute(sql,params);
        return result.affectedRows;
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
    private async execute(sql:string,params:any[]){
        if(!this.cnx){
            if(!this.inTransaction)await this.connect()
            else throw 'Connection is closed' 
        }
        //Solve array parameters , example IN(?) where ? is array[]
        // https://github.com/sidorares/node-mysql2/issues/476
        for(let i=0;i<params.length;i++){
            let param = params[i];
            if(Array.isArray(param))
               params[i]=param.join(',');
        }  
        let result = await this.cnx.execute(sql,params);
        return result[0];
    }   
}