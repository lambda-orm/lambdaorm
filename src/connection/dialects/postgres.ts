import {Connection,ConnectionConfig,ConnectionPool} from  './..'
import {Parameter} from '../../model'

export class PostgresConnectionPool extends ConnectionPool
{
    private static pg:any
    constructor(config:ConnectionConfig){        
        super(config);
        if(!PostgresConnectionPool.pg)
            PostgresConnectionPool.pg= require('pg');
    }
    public async acquire():Promise<Connection>
    {
        let cnx = await PostgresConnectionPool.pg.Client(this.config.connection)
        return new PostgresConnection(cnx,this);
    }
    public async release(connection:Connection):Promise<void>
    {
        await connection.cnx.end();
    }
}
export class PostgresConnection extends Connection
{   
    
    public async select(sql:string,params:Parameter[]):Promise<any>
    {        
        const result= await this._execute(sql,params);
        return result.rows;
    }
    public async insert(sql:string,params:Parameter[]):Promise<number>
    {     
        //Example
        //create table my_table(my_id serial,name text);
        //insert into my_table(name) values('pepe') returning my_id as id
        const result = await this._execute(sql,params);
        return result.rows.length>0?result.rows[0].id:null;
    }
    public async bulkInsert(sql:string,array:any[]):Promise<number[]>
    { 
        throw 'NotImplemented' 
    }
    public async update(sql:string,params:Parameter[]):Promise<number>
    {        
        const result = await this._execute(sql,params);
        return result.rowCount;
    }
    public async delete(sql:string,params:Parameter[]):Promise<number>
    {        
        const result = await this._execute(sql,params);
        return result.rowCount;
    }
    public async execute(sql:string):Promise<any>
    {        
        return await this._execute(sql);
    }
    public async beginTransaction():Promise<void>
    {
        await this.cnx.query('BEGIN');
        this.inTransaction=true;
    }
    public async commit():Promise<void>
    {
        await this.cnx.query('COMMIT');
        this.inTransaction=false;
    }
    public async rollback():Promise<void>
    {
        await this.cnx.query('ROLLBACK');
        this.inTransaction=false;
    }
    protected async _execute(sql:string,params:Parameter[]=[]){
        let values:any[]=[];
        for(let i=0;i<params.length;i++)
            values.push(params[i].value);     
        
        return await this.cnx.query(sql,values);
    }   
}