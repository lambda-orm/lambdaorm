import {ConnectionConfig } from './connectionConfig'
import {Connection } from './connection'

export abstract class ConnectionPool
{
    public config:ConnectionConfig
    constructor(config:ConnectionConfig){        
        this.config=config;
    }
    // public async initialize():Promise<void>{}
    public abstract acquire():Promise<Connection>;
    public abstract release(connection:Connection):Promise<void>;
    // public async finalize():Promise<void>{}
}