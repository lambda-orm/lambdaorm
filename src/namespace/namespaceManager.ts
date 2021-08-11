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
        return new NamespaceSync(this.orm,namespace);
    }
    public drop(name:string):NamespaceDrop
    {       
        let namespace = this.get(name); 
        return new NamespaceDrop(this.orm,namespace);        
    }
    public model(name:string):string
    {       
        let namespace = this.get(name); 
        const schema:Schema = this.orm.schema.get(namespace.schema) as Schema;
        return  this.orm.schema.model(schema);      
    }
    public async export(name:string,transaction?:ITransaction):Promise<SchemaData>
    {        
        let state = await this.getState(name); 
        return await this.orm.schema.export(state.schema).execute(name,transaction);
    }
    public async import(name:string,data:SchemaData,transaction?:ITransaction)
    {       
        let state = await this.getState(name); 
        await this.orm.schema.import(state.schema).execute(data,state.mapping,state.pending,name,transaction);
        await this.updateDataState(name,state.mapping,state.pending);
    }
    public exists(name:string)
    {
        let file=this.getStateFile(name);
        return fs.existsSync(file);
    }
    public async getState(name:string):Promise<any>
    {
        let file=this.getStateFile(name);
        if(!fs.existsSync(file))
           return {schema:null,mapping:{},pending:[]}; 
        return JSON.parse(fs.readFileSync(file));
    }
    public async updateSchemaState(name:string,schema:Schema):Promise<void>
    {
        let stateFile=this.getStateFile(name);
        let state = await this.getState(name);
        state.schema = schema;
        fs.writeFileSync(stateFile,JSON.stringify(state));
    }
    public async updateDataState(name:string,mapping:any,pending:any[]):Promise<void>
    {
        let stateFile=this.getStateFile(name);
        let state = await this.getState(name);
        state.mapping = mapping;
        state.pending = pending;
        fs.writeFileSync(stateFile,JSON.stringify(state));
    }
    public async removeState(name:string):Promise<any>
    {
        let file=this.getStateFile(name);
        if(fs.existsSync(file)) 
            fs.unlinkSync(file);
    }
    protected getStateFile(name:string)
    {
        return path.join(this.orm.config.state.path,`${name}-state.json`);
    } 
}