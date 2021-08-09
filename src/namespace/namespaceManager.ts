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
        let stateFile=path.join(this.orm.config.state.path,`${name}-schema.json`);
        let state = fs.existsSync(stateFile)?JSON.parse(fs.readFileSync(stateFile)):null;
        let current = this.orm.schema.get(namespace.schema) as Schema;
        let schemaSync:SchemaSync = this.orm.schema.sync(current,state);
        return new NamespaceSync(this.orm,namespace,stateFile,current,schemaSync);
    }
    public drop(name:string):NamespaceDrop
    {        
        let namespace = this.get(name);
        let schemaFile = this.getSchemaFile(name);
        let mappingFile = this.getMappingFile(name);
        let pendingFile = this.getPendingFile(name);
        let schema = this.getSchema(name);        
        let schemaDrop:SchemaDrop = this.orm.schema.drop(schema);        
        return new NamespaceDrop(this.orm,namespace,schemaFile,mappingFile,pendingFile,schemaDrop);        
    }
    public async export(name:string,transaction?:ITransaction):Promise<SchemaData>
    {        
        let schema = this.getSchema(name); 
        return await this.orm.schema.export(schema).execute(name,transaction);
    }
    public async import(name:string,data:SchemaData,transaction?:ITransaction)
    {       
        let schema = this.getSchema(name); 
        let mappingFile = this.getMappingFile(name);
        let mapping = this.getMapping(name);
        let pendingFile = this.getPendingFile(name);
        let pending = this.getPending(name);
        await this.orm.schema.import(schema).execute(data,mapping,pending,name,transaction);
        fs.writeFileSync(mappingFile,JSON.stringify(mapping));
        fs.writeFileSync(pendingFile,JSON.stringify(pending));
    }
    public exists(name:string)
    {
        let schemaFile=this.getSchemaFile(name);
        return fs.existsSync(schemaFile);
    }    
    protected getSchemaFile(name:string)
    {
        return path.join(this.orm.config.state.path,`${name}-schema.json`);
    }
    protected getSchema(name:string):any
    {
        let file=this.getSchemaFile(name);
        if(!fs.existsSync(file))
           throw `Not exists file ${file}`; 
        return JSON.parse(fs.readFileSync(file));
    }
    protected getMappingFile(name:string)
    {
        return path.join(this.orm.config.state.path,`${name}-mapping.json`);
    }
    protected getMapping(name:string):any
    {
        let file=this.getMappingFile(name);
        if(!fs.existsSync(file))
           return {}; 
        return JSON.parse(fs.readFileSync(file));
    }
    protected getPendingFile(name:string)
    {
        return path.join(this.orm.config.state.path,`${name}-pending.json`);
    }
    protected getPending(name:string):any
    {
        let file=this.getPendingFile(name);
        if(!fs.existsSync(file))
           return {}; 
        return JSON.parse(fs.readFileSync(file));
    }
}