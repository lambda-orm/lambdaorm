import {Cache,IOrm,Context,Config } from './model'
import {Model,NodeManager} from './node/index'
import {Expression,MemoryCache,TransactionManager}  from './manager'
import {SchemaManager}  from './schema/schemaManager'
import {DatabaseManager}  from './database'
import {ConnectionManager,MySqlConnectionPool,MariadbConnectionPool,PostgresConnectionPool,ConnectionConfig} from './connection'
import {LanguageManager,Operand,Sentence,Query} from './language'
import {SqlLanguage} from './language/sql/index'
import {CoreLib} from './language/lib/coreLib'
import modelConfig from './node/config.json'
import sqlConfig  from './language/sql/config.json'
import {Helper}  from './helper'
const ConfigExtends = require("config-extends");
const fs = require('fs');
const path = require('path');

class Orm implements IOrm
{
    private _cache:Cache
    public config:Config
    private languageModel:Model
    private nodeManager:NodeManager
    private schemaManager:SchemaManager
    private databaseManager:DatabaseManager
    private connectionManager:ConnectionManager
    private languageManager:LanguageManager

    private static _instance: Orm;
    public static get instance():Orm
    {      
        if(!this._instance){
            this._instance = new Orm();
        }  
        return this._instance;
    }

    constructor(){
        this.config={paths:{}};
        this._cache= new MemoryCache()
        this.connectionManager= new ConnectionManager();

        this.languageModel = new Model();
        this.languageModel.load(modelConfig);
        this.nodeManager = new NodeManager(this.languageModel);
        
        this.schemaManager= new SchemaManager(this);
        this.databaseManager =  new DatabaseManager(this);

        let sqlLanguage =  new SqlLanguage();
        sqlLanguage.addLibrary({name:'sql',dialects:sqlConfig.dialects});

        this.languageManager= new LanguageManager(this,this.languageModel);
        this.language.addLibrary(new CoreLib());
        this.language.add(sqlLanguage);
        
        this.connection.addType('mysql',MySqlConnectionPool);
        this.connection.addType('mariadb',MariadbConnectionPool);
        this.connection.addType('postgres',PostgresConnectionPool);
        // this.connection.addType('mssql',MssqlConnectionPool);
        // this.connection.addType('oracle',OracleConnectionPool);
    }
    public async init(configPath:string=process.cwd()):Promise<void>
    {
        this.config = await ConfigExtends.apply(configPath);
        if(!this.config.paths)
            this.config.paths={}
        if(!this.config.paths.state)
            this.config.paths.state=path.join(process.cwd(),'state');        
        if(!this.config.paths.schemas)
            this.config.paths.schemas=path.join(process.cwd(),'schemas');
        if(!fs.existsSync(this.config.paths.state))
            fs.mkdirSync(this.config.paths.state);     
        let _schemas =  await ConfigExtends.apply(this.config.paths.schemas);
        if(_schemas){
            for(const p in _schemas){
                if(p=='abstract')continue;
                this.schema.load(_schemas[p]);
            }
        }
        if(this.config.databases){
            for(const p in this.config.databases){
                const database = this.config.databases[p];
                if(!Helper.nvl(database.disable,false)){
                    let connectionConfig:ConnectionConfig={name:database.name,dialect:database.dialect,connection:{}};
                    if(database.connectionSource== null || database.connectionSource=='direct'){
                        connectionConfig.connection=database.connection;
                    }
                    else if(database.connectionSource=='env'){
                        const value = process.env[database.connection] as string;
                        connectionConfig.connection= JSON.parse(value);
                    }
                    this.connection.load(connectionConfig);
                }
                this.database.load(database);  
            }
        }
    }
    public get node():NodeManager
    {
        return this.nodeManager;
    }
    public get schema():SchemaManager
    {
        return this.schemaManager;
    }
    public get language():LanguageManager
    {
        return this.languageManager;
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
    public complete(expression:string,schema:string):string
    {       
        try{ 
            let _schema = this.schemaManager.getInstance(schema);
            let node= this.node.parse(expression);
            let completeNode = this.language.complete(node,_schema);
            return this.node.toExpression(completeNode);
        }
        catch(error){
            console.log(error)
            throw 'complete expression: '+expression+' error: '+error.toString();
        }
    }
    public async build(expression:string,schema:string):Promise<Operand>
    {       
        try{ 
            let key = 'build_'+expression;
            let operand= await this._cache.get(key);
            if(!operand){
                let _schema = this.schemaManager.getInstance(schema);
                let node= this.node.parse(expression);
                operand = this.language.build(node,_schema);
                await this._cache.set(key,operand);
            }            
            return operand as Operand; 
        }
        catch(error){
            console.log(error)
            throw 'build expression: '+expression+' error: '+error.toString();
        }
    }
    public async query(expression:string,dialect:string,schema:string):Promise<Query>
    {       
        try{ 
            let key = dialect+'-query_'+expression;
            let operand= await this._cache.get(key);
            if(!operand){
                let sentence= await this.build(expression,schema) as Sentence;
                operand = this.language.query(dialect,sentence);
                await this._cache.set(key,operand);
            }            
            return operand as Query; 
        }
        catch(error){
            console.log(error)
            throw 'query expression: '+expression+' error: '+error.toString();
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
    public async eval(expression:string,context:any,schema:string):Promise<any>
    {          
        let operand = await this.build(expression,schema);
        let _context = new Context(context);
        return this.language.eval(operand,_context);
    }    
    public async execute(expression:string,context:any,database:string):Promise<any>
    {
        let _database= this.database.get(database);
        let operand = await this.query(expression,_database.dialect,_database.schema);
        try{
            let _context = new Context(context);
            let _database= this.database.get(database);
            let result;
            if(operand.children.length==0){
                let executor =this.connectionManager.createExecutor(_database.name);
                result = await this.language.execute(_database.dialect,operand,_context,executor);
            }
            else
            {                   
                const transaction = this.connectionManager.createTransaction(database);
                try
                {
                    await transaction.begin();
                    result= await this.language.execute(_database.dialect,operand,_context,transaction);
                    await transaction.commit();
                }
                catch(error)
                {
                    console.log(error);
                    transaction.rollback();
                    throw error;
                }
            }
            return result;                      
        }catch(error){
            throw 'execute: '+expression+' error: '+error.toString(); 
        }
    }
    public async executeSentence(sentence:any,database:string):Promise<any>
    {
        let executor =this.connectionManager.createExecutor(database);
        return await executor.execute(sentence);
    }
    public async transaction(database:string,callback:{(tr:TransactionManager): Promise<void>;}):Promise<void>
    {  
        const transaction = this.connectionManager.createTransaction(database);
        try
        {
            await transaction.begin();
            let transactionManager = new TransactionManager(this,database,transaction);
            await callback(transactionManager);
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
export const orm = Orm.instance;