import {Delta,IOrm,Namespace,Schema} from '../model/index'
import {SchemaDrop} from './../schema'
import {ITransaction,ExecutionResult} from '../connection'
const fs = require('fs');
const path = require('path');

export class NamespaceDrop 
{
    protected orm:IOrm
    protected schemaDrop:SchemaDrop
    protected namespace:Namespace
    protected schemaStateFile:string
    protected mappingFile:string
    constructor(orm:IOrm,namespace:Namespace,schemaStateFile:string,mappingFile:string,schemaDrop:SchemaDrop){
        this.orm= orm;
        this.namespace= namespace;
        this.schemaStateFile= schemaStateFile;
        this.mappingFile= mappingFile;
        this.schemaDrop= schemaDrop;
    }
    public sentence():any[]
    {
        let connection = this.orm.connection.get(this.namespace.connection);
        return this.schemaDrop.sentence(connection.dialect);
    }
    public async execute(transaction?:ITransaction,tryAllCan:boolean=false):Promise<ExecutionResult>
    {
       let result= await this.schemaDrop.execute(this.namespace.name,transaction,tryAllCan);
       fs.unlinkSync(this.schemaStateFile);
       if(fs.existsSync(this.mappingFile)) 
          fs.unlinkSync(this.mappingFile);
       return result;
    }
}