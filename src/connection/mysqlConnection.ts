import {Connection} from './connection'
import {ConnectionConfig} from './../model'
import { promisify } from 'util';

export class MySqlConnection extends Connection
{
    private cnx:any
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