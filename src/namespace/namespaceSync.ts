import {Delta,IOrm,Namespace,Schema} from '../model/index'
import {SchemaSync,ExecutionSyncResult} from './../schema'
import {ITransaction} from '../connection'
const fs = require('fs');
const path = require('path');

export class NamespaceSync 
{
    protected orm:IOrm
    protected schemaSync:SchemaSync
    protected namespace:Namespace
    protected schemaStateFile:string
    protected schema:Schema
    constructor(orm:IOrm,namespace:Namespace,schemaStateFile:string,schema:Schema,schemaSync:SchemaSync){
        this.orm= orm;
        this.namespace= namespace;
        this.schemaStateFile= schemaStateFile;
        this.schema= schema;
        this.schemaSync= schemaSync;
    }
    public serialize():Delta
    {
        return this.schemaSync.serialize();
    }
    public sentence():any[]
    {
        let connection = this.orm.connection.get(this.namespace.connection);
        return this.schemaSync.sentence(connection.dialect);
    }
    public async execute(transaction?:ITransaction):Promise<ExecutionSyncResult>
    {
       let result= await this.schemaSync.execute(this.namespace.name,transaction );
       fs.writeFileSync(this.schemaStateFile,JSON.stringify(this.schema));
       return result;
    }
}