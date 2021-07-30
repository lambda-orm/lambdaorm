
import {Parameter } from '../model'
import {ConnectionConfig } from './connectionConfig'

export abstract class Connection
{
    public config:ConnectionConfig
    public inTransaction:boolean
    protected cnx:any
    constructor(config:ConnectionConfig){        
        this.config=config;
        this.inTransaction=false;
    }
    public abstract connect():Promise<void>;
    public abstract disconnect():Promise<void>;
    public abstract validate():Promise<Boolean>;
    public abstract select(sql:string,params:Parameter[]):Promise<any>;
    public abstract insert(sql:string,params:Parameter[]):Promise<number>;
    public abstract update(sql:string,params:Parameter[]):Promise<number>;
    public abstract delete(sql:string,params:Parameter[]):Promise<number>;
    public abstract execute(sql:string):Promise<any>;
    public abstract bulkInsert(sql:string,params:Parameter[],array:any[]):Promise<number[]>;
    public abstract beginTransaction():Promise<void>;
    public abstract commit():Promise<void>;
    public abstract rollback():Promise<void>;
}

