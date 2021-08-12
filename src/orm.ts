import {Cache,Operand,IOrm,Context,Namespace,Config } from './model'
import {Model,Parser} from './parser/index'
import {Expression,CompiledExpression,MemoryCache}  from './manager'
import {SchemaManager}  from './schema'
import {DatabaseManager}  from './database'
import {ITransaction,IConnectionManager,ConnectionManager,MySqlConnectionPool,MariadbConnectionPool,PostgresConnectionPool,MssqlConnectionPool, ConnectionConfig} from './connection'
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
    private cache:Cache
    private parserManager:Parser
    private schemaManager:SchemaManager
    private databaseManager:DatabaseManager
    private connectionManager:IConnectionManager
    public languages:any
    public dialects:any
    public config:Config

    constructor(parserManager:Parser){
        this.languages={};
        this.dialects={};
        this.config={schemas:{sourceType:'path'},state:{sourceType:'path',path:'./orm'},namespaces:[]};
        this.cache= new MemoryCache() 
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
    public async loadConfig(config:Config):Promise<void>
    {
        this.config = config;
        if(this.config.state.sourceType == 'path'){
            if(!fs.existsSync(this.config.state.path))
                fs.mkdirSync(this.config.state.path);
        } 
        let _schemas:any={};
        if(this.config.schemas.sourceType=='path'){
            _schemas =  await ConfigExtends.apply(this.config.schemas.path);
            if(_schemas){
                for(const p in _schemas){
                    if(p=='abstract')continue;
                    this.schema.load(_schemas[p]);
                }
            }
        }              
        for(const p in this.config.namespaces)
          this.database.load(config.namespaces[p]);
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
    public get connection():IConnectionManager
    {
        return this.connectionManager;
    }
    public setCache(value:Cache){
        this.cache=value;
    }
    public async compile(expression:string,dialect:string,schemaName?:string):Promise<Operand>
    {       
        try{ 
            let key = dialect+'-exp_'+expression
            let operand= await this.cache.get(key)
            if(!operand){
                let schema = schemaName?this.schemaManager.getInstance(schemaName):undefined;
                let node= this.parser.parse(expression);
                operand = this.language(dialect).operand.build(node,dialect,schema);
                await this.cache.set(key,operand)
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
    public deserialize(serialized:string,dialect:string):CompiledExpression
    {
       let operand= this.language(dialect).operand.deserialize(serialized);
       return new CompiledExpression(this,operand,dialect);
    }
    public async execute(operand:Operand,context:any,namespace:string,transaction?:ITransaction):Promise<any>
    {
        try{
            let _context = new Context(context);
            let _namespace= this.database.get(namespace);
            if(transaction){
                return await this.language(_namespace.dialect).executor.execute(operand,_context,transaction);
            }else{    

                let result;
                if(operand.children.length==0){
                    let executor =this.connectionManager.createExecutor(_namespace.name);
                    result = await this.language(_namespace.dialect).executor.execute(operand,_context,executor);
                }
                else
                {
                    await this.createTransaction(_namespace.name,async (transaction)=>{
                        result= await this.language(_namespace.dialect).executor.execute(operand,_context,transaction);
                    });
                }
                return result;                    
            }
                      
        }catch(error){
            throw 'run: '+operand.name+' error: '+error.toString(); 
        }
    }
    public async executeSentence(sentence:any,namespace:string,transaction?:ITransaction):Promise<any>
    {
        try{
            let _namespace= this.database.get(namespace);
            if(transaction){
                return await transaction.execute(sentence);
            }else{
                let executor =this.connectionManager.createExecutor(_namespace.name);
                return await executor.execute(sentence); 
            }           
        }catch(error){
            throw 'error: '+error.toString(); 
        }
    }
    public async createTransaction(connectionName:string,callback:{(tr:ITransaction): Promise<void>;}):Promise<void>
    {        
        const transaction = this.connectionManager.createTransaction(connectionName);
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

