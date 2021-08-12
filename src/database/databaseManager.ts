import {Schema,Entity,Property,Relation,Index,Delta,IOrm,Database} from '../model'
import {SchemaSync,SchemaData,SchemaDrop} from '../schema'
import {Transaction,ConnectionConfig} from '../connection'
import {DatabaseSync} from './databaseSync'
import {DatabaseClean} from './databaseClean'
const fs = require('fs');
const path = require('path');

export class DatabaseManager
{
    public databases:any
    private orm:IOrm 
    constructor(orm:IOrm){
        this.orm=orm;
        this.databases={};
    }
    public load(database:Database):void
    {           
        this.databases[database.name] =database;
    }
    public get(name:string):Database 
    {        
        return this.databases[name]as Database
    }
    public sync(name:string):DatabaseSync
    {   
        let database = this.get(name);
        return new DatabaseSync(this.orm,database);
    }
    public clean(name:string):DatabaseClean
    {       
        let database = this.get(name); 
        return new DatabaseClean(this.orm,database);        
    }
    public model(name:string):string
    {       
        let database = this.get(name); 
        const schema:Schema = this.orm.schema.get(database.schema) as Schema;
        return  this.orm.schema.model(schema);      
    }
    public async export(name:string,transaction?:Transaction):Promise<SchemaData>
    {        
        let state = await this.getState(name); 
        return await this.orm.schema.export(state.schema).execute(name,transaction);
    }
    public async import(name:string,data:SchemaData,transaction?:Transaction)
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
        return path.join(this.orm.config.statePath,`${name}-state.json`);
    } 
}