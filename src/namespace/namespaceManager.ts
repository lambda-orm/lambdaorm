import {Schema,Entity,Property,Relation,Index,Delta,IOrm,Namespace} from '../model'
import {SchemaSync,SchemaData,SchemaDrop} from './../schema'
import {ITransaction} from '../connection'
import {NamespaceSync} from './namespaceSync'
import {NamespaceDrop} from './namespaceDrop'
const fs = require('fs');
const path = require('path');

export class NamespaceManager
{
    public namespaces:any
    private orm:IOrm 
    constructor(orm:IOrm){
        this.orm=orm;
        this.namespaces={};
    }
    public add(namespace:Namespace):void
    {
        this.namespaces[namespace.name] =namespace;
    }
    public get(name:string):Namespace 
    {        
        return this.namespaces[name]as Namespace
    }
    public sync(name:string):NamespaceSync
    {   
        let namespace = this.get(name);
        let schemaStateFile=path.join(this.orm.config.state.path,`${name}-schema.json`);
        let schemaState = fs.existsSync(schemaStateFile)?JSON.parse(fs.readFileSync(schemaStateFile)):null;
        let schemaCurrent = this.orm.schema.get(namespace.schema) as Schema;
        let schemaSync:SchemaSync = this.orm.schema.sync(schemaCurrent,schemaState);
        return new NamespaceSync(this.orm,namespace,schemaStateFile,schemaCurrent,schemaSync);
    }
    public drop(name:string):NamespaceDrop
    {        
        let namespace = this.get(name);
        let schemaFile=path.join(this.orm.config.state.path,`${name}-schema.json`);
        let schema = fs.existsSync(schemaFile)?JSON.parse(fs.readFileSync(schemaFile)):null;
        let schemaDrop:SchemaDrop = this.orm.schema.drop(schema);
        return new NamespaceDrop(this.orm,namespace,schemaFile,schemaDrop);
    }
    public async export(name:string,transaction?:ITransaction):Promise<SchemaData>
    {        
        let schemaFile=path.join(this.orm.config.state.path,`${name}-schema.json`);
        let schema = fs.existsSync(schemaFile)?JSON.parse(fs.readFileSync(schemaFile)):null;
        return await this.orm.schema.export(schema).execute(name,transaction);
    }
    public async import(name:string,data:SchemaData,transaction?:ITransaction)
    {       
        let schemaFile=path.join(this.orm.config.state.path,`${name}-schema.json`);
        let schema = fs.existsSync(schemaFile)?JSON.parse(fs.readFileSync(schemaFile)):null;
        let mappingFile=path.join(this.orm.config.state.path,`${name}-mapping.json`);
        let mapping = fs.existsSync(mappingFile)?JSON.parse(fs.readFileSync(mappingFile)):{};
        await this.orm.schema.import(schema).execute(data,mapping,name,transaction);
        fs.writeFileSync(mappingFile,JSON.stringify(mapping));
    }
}