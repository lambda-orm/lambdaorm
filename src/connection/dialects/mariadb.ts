import {Connection} from './../connection'
import {ConnectionConfig,Parameter} from '../../model'
import { debug } from 'console';

export class MariaDbConnection extends Connection
{
    private cnx:any
    private lib:any
    constructor(config:ConnectionConfig){        
        super(config);
        this.lib= require('mariadb');
    }
    public async connect():Promise<void>
    { 
        this.cnx = await this.lib.createConnection({
            host: this.config.host ,
            port: this.config.port | 3306,
            user: this.config.user,
            password: this.config.password,
            database: this.config.database,
            waitForConnections: true
            // connectionLimit: 10,
            // queueLimit: 0
        });
    }
    public async disconnect():Promise<void>
    {       
        if (!this.cnx || !this.cnx.isValid()) {
            debug('connection tried to disconnect but was already at CLOSED state');
            return;
        }
        return await this.cnx.end();        
    }
    public async validate():Promise<Boolean> 
    {
        return !!this.cnx && this.cnx.isValid();
    }
    public async query(sql:string,params:Parameter[]):Promise<any>
    {        
        return await this.execute(sql,params);
    }
    public async insert(sql:string,params:Parameter[]):Promise<number>
    {        
        let result = await this.execute(sql,params);
        return result.insertId;
    }
    public async update(sql:string,params:Parameter[]):Promise<number>
    {        
        let result = await this.execute(sql,params);
        return result.affectedRows;
    }
    public async delete(sql:string,params:Parameter[]):Promise<number>
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
    private async execute(sql:string,params:Parameter[]){
        if(!this.cnx){
            if(!this.inTransaction)await this.connect()
            else throw 'Connection is closed' 
        }
        //Solve array parameters , example IN(?) where ? is array[]
        // https://github.com/sidorares/node-mysql2/issues/476

        let values:any[]=[];
        for(let i=0;i<params.length;i++){
            let param = params[i];
            if(param.type=='array')
                values.push(param.value.join(','));
            else
              values.push(param.value);     
        }  
        let result = await this.cnx.execute(sql,values);
        return result[0];
    }   
}