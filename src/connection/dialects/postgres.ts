import {Connection,ConnectionConfig,ConnectionPool} from  './..'
import {Parameter} from '../../model'
import {Helper} from './../../helper'

//https://node-postgres.com/features/connecting


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
        let cnx = new PostgresConnectionPool.pg.Client(this.config.connection)
        cnx.connect();
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
    public async bulkInsert(sql:string,array:any[],parameters:Parameter[],fieldId?:string):Promise<number[]>
    {       
        let rows:string[]=[];
        for(const p in array){
            const values = array[p];
            let row:any[]=[];
            for(let i=0;i<parameters.length;i++){
                const parameter = parameters[i];
                let value = values[i];
                if(value==null || value==undefined ){
                    value='null';
                }else{
                    switch(parameter.type){
                        case 'boolean':
                            value=value?'true':'false';break;
                        case 'string':
                            value=Helper.escape(value);
                            value=Helper.replace(value,"\\'","\\''");
                            break;
                        case 'datetime':
                        case 'date':
                        case 'time':    
                            value=Helper.escape(value);break;
                    }
                }
                row.push(value);
            }
            rows.push(`(${row.join(',')})`);
        }
        let returning = fieldId?'RETURNING '+fieldId:''; 
        let query = `${sql} ${rows.join(',')} ${returning};`;
        let result = await this.cnx.query(query);
        let ids:number[]=[];
        if(fieldId){
            let fieldIdlower = fieldId.toLowerCase();
            for(const p in result.rows){
                const id = result.rows[p][fieldIdlower] as number;
                ids.push(id);
            }
        }
        return ids;
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
    protected async _execute(sql:string,params:Parameter[]=[]):Promise<any>
    {                
        let values:any[]=[];
        for(let i=0;i<params.length;i++)
            values.push(params[i].value); 
        return await this.cnx.query(sql,values);
    }   
}