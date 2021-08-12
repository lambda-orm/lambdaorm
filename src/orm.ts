import {Cache,Operand,IOrm,Context,Config } from './model'
import {Model,Parser} from './parser/index'
import {Expression,MemoryCache}  from './manager'
import {SchemaManager}  from './schema'
import {DatabaseManager}  from './database'
import {Transaction,ConnectionManager,MySqlConnectionPool,MariadbConnectionPool,PostgresConnectionPool,ConnectionConfig} from './connection'
import {ILanguage} from './language'
import {SqlLanguage} from './language/sql/index'
import {MemoryLanguage,CoreLib} from './language/memory'
import modelConfig from './parser/config.json'
import sqlConfig  from './language/sql/config.json'
const ConfigExtends = require("config-extends");
const fs = require('fs');
const path = require('path');

class Orm implements IOrm
{
    private _cache:Cache
    public config:Config
    private parserManager:Parser
    private schemaManager:SchemaManager
    private databaseManager:DatabaseManager
    private connectionManager:ConnectionManager
    private languages:any
    private dialects:any

    constructor(parserManager:Parser){
        this.languages={};
        this.dialects={};
        this.config={databases:[]};
        this._cache= new MemoryCache() 
        this.parserManager =  parserManager;
        this.schemaManager= new SchemaManager(this);           
        this.connectionManager= new ConnectionManager();
        this.databaseManager =  new DatabaseManager(this);
    }
    public addLanguage(language:ILanguage){
        this.languages[language.name] =language;
        for(const name in language.dialects)
            this.dialects[name]= {name:name,language:language.name};         
    }
    public language(dialect:string):ILanguage 
    {
        let info =  this.dialects[dialect];
        return this.languages[info.language] as ILanguage
    }
    public async loadConfig(source:string=process.cwd()):Promise<void>
    {
        this.config = await ConfigExtends.apply(source);
        if(!this.config.statePath)
            this.config.statePath=path.join(process.cwd(),'orm','state');
        if(!fs.existsSync(this.config.statePath))
            fs.mkdirSync(this.config.statePath);
        if(!this.config.statePath)
            this.config.schemasPath=path.join(process.cwd(),'orm','schemas'); 
        let _schemas =  await ConfigExtends.apply(this.config.schemasPath);
        if(_schemas){
            for(const p in _schemas){
                if(p=='abstract')continue;
                this.schema.load(_schemas[p]);
            }
        }           
        for(const p in this.config.databases){
            const database = this.config.databases[p];
            let connectionConfig:ConnectionConfig={name:database.name,dialect:database.dialect,connection:{}};
            if(database.connectionSource== null || database.connectionSource=='direct'){
                connectionConfig.connection=database.connection;
            }
            else if(database.connectionSource=='env'){
                const value = process.env[database.connection] as string;
                connectionConfig.connection= JSON.parse(value);
            }
            this.connection.load(connectionConfig);
            this.database.load(database);  
        }
    }
    public get parser():Parser
    {
        return this.parserManager;
    }
    public get schema():SchemaManager
    {
        return this.schemaManager;
    }
    public get database():DatabaseManager
    {
        return this.databaseManager;
    }
    public get connection():ConnectionManager
    {
        return this.connectionManager;
    }
    public set cache(value:Cache)
    {
        this._cache=value;
    }
    public async compile(expression:string,dialect:string,schema:string):Promise<Operand>
    {       
        try{ 
            let key = dialect+'-exp_'+expression;
            let operand= await this._cache.get(key);
            if(!operand){
                let _schema = this.schemaManager.getInstance(schema);
                let node= this.parser.parse(expression);
                operand = this.language(dialect).operand.build(node,dialect,_schema);
                await this._cache.set(key,operand);
            }            
            return operand as Operand; 
        }
        catch(error){
            console.log(error)
            throw 'compile expression: '+expression+' error: '+error.toString();
        }
    }
    public expression(value:string):Expression
    {
        return new Expression(this,value)
    }
    public lambda(value:Function):Expression
    {
        let str = value.toString();
        let index = str.indexOf('=>')+2;
        let expression = str.substring(index,str.length);
        return new Expression(this,expression)
    }    
    public async execute(operand:Operand,context:any,database:string,transaction?:Transaction):Promise<any>
    {
        try{
            let _context = new Context(context);
            let _database= this.database.get(database);
            if(transaction){
                return await this.language(_database.dialect).executor.execute(operand,_context,transaction);
            }else{    

                let result;
                if(operand.children.length==0){
                    let executor =this.connectionManager.createExecutor(_database.name);
                    result = await this.language(_database.dialect).executor.execute(operand,_context,executor);
                }
                else
                {
                    await this.transaction(_database.name,async (transaction)=>{
                        result= await this.language(_database.dialect).executor.execute(operand,_context,transaction);
                    });
                }
                return result;                    
            }
                      
        }catch(error){
            throw 'run: '+operand.name+' error: '+error.toString(); 
        }
    }
    public async executeSentence(sentence:any,database:string,transaction?:Transaction):Promise<any>
    {
        try{
            let _database= this.database.get(database);
            if(transaction){
                return await transaction.execute(sentence);
            }else{
                let executor =this.connectionManager.createExecutor(_database.name);
                return await executor.execute(sentence); 
            }           
        }catch(error){
            throw 'error: '+error.toString(); 
        }
    }
    public async transaction(database:string,callback:{(tr:Transaction): Promise<void>;}):Promise<void>
    {  
        const transaction = this.connectionManager.createTransaction(database);
        try
        {
            await transaction.begin();
            await callback(transaction);
            await transaction.commit();
        }
        catch(error)
        {
            console.log(error);
            transaction.rollback();
            throw error;
        }    
    } 
}
var orm = null;
export =(function() {
    if(!orm){
        let model = new Model();
        model.load(modelConfig);
        let parser=  new Parser(model);

        orm= new Orm(parser);  
        
        let memoryLanguage =new MemoryLanguage();
        memoryLanguage.addLibrary(new CoreLib());

        let sqlLanguage =  new SqlLanguage(model);
        sqlLanguage.addLibrary({name:'sql',dialects:sqlConfig.dialects});
        
        orm.addLanguage(memoryLanguage);
        orm.addLanguage(sqlLanguage);
        
        orm.connection.addType('mysql',MySqlConnectionPool);
        orm.connection.addType('mariadb',MariadbConnectionPool);
        orm.connection.addType('postgres',PostgresConnectionPool);
        // orm.connection.addType('mssql',MssqlConnectionPool);
    }
    return orm;
})();

