import {Connection,ConnectionConfig} from  './..'
import {Parameter} from '../../model'
import { promisify } from 'util';

export class PostgresConnection extends Connection
{
    private static postgresLib:any
    constructor(config:ConnectionConfig){        
        super(config);
        if(!PostgresConnection.postgresLib)
            PostgresConnection.postgresLib=require('pg')
    }
    public async connect():Promise<void>
    { 
        this.cnx = await PostgresConnection.postgresLib.Client(this.config.connectionString);
    }
    public async disconnect():Promise<void>
    {       
        if(this.cnx)  
          await promisify(callback => this.cnx?.end(callback))();
    }
    public async validate():Promise<Boolean> 
    {
        return !!this.cnx;
    }
    public async select(sql:string,params:Parameter[]):Promise<any>
    {        
        const result= await this._execute(sql,params);
        return result.rows;
    }
    public async insert(sql:string,params:Parameter[]):Promise<number>
    {        
        const result = await this._execute(sql,params);
        return result.insertId;
    }
    public async update(sql:string,params:Parameter[]):Promise<number>
    {        
        const result = await this._execute(sql,params);
        return result.affectedRows;
    }
    public async delete(sql:string,params:Parameter[]):Promise<number>
    {        
        const result = await this._execute(sql,params);
        return result.affectedRows;
    }
    public async execute(sql:string):Promise<any>
    {        
        return await this._execute(sql);
    }
    public async beginTransaction():Promise<void>
    {
        if(!this.cnx)
            await this.connect();        
        await this.cnx.query('BEGIN');
        this.inTransaction=true;
    }
    public async commit():Promise<void>
    {
        if(!this.cnx)
            throw 'Connection is closed'
        await this.cnx.query('COMMIT');
        this.inTransaction=false;
    }
    public async rollback():Promise<void>
    {
        if(!this.cnx)
            throw 'Connection is closed'
        await this.cnx.query('ROLLBACK');
        this.inTransaction=false;
    }
    protected async _execute(sql:string,params:Parameter[]=[]){
        if(!this.cnx){
            if(!this.inTransaction)await this.connect()
            else throw 'Connection is closed' 
        }
        let values:any[]=[];
        for(let i=0;i<params.length;i++)
            values.push(params[i].value);     
        
        return await this.cnx.query(sql,values);
    }   
}