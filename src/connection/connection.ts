
import {ConnectionConfig } from '../model'


export abstract class Connection
{
    public config:ConnectionConfig
    public inTransaction:boolean

    constructor(config:ConnectionConfig){        
        this.config=config;
        this.inTransaction=false;
    }
    public abstract connect():Promise<void>;
    public abstract disconnect():Promise<void>;
    public abstract validate():Promise<Boolean>;
    public abstract query(sql:string,params:any[]):Promise<any>;
    public abstract insert(sql:string,params:any[]):Promise<number>;
    public abstract update(sql:string,params:any[]):Promise<number>;
    public abstract delete(sql:string,params:any[]):Promise<number>;
    public abstract beginTransaction():Promise<void>;
    public abstract commit():Promise<void>;
    public abstract rollback():Promise<void>;
}

