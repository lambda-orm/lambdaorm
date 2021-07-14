import {IExecutor,ConnectionConfig,Dialect,Cache,Schema,IConnectionManager,Operand,IOrm,Context } from './model/index'
import {Model,Parser} from './parser/index'
import {SchemaManager,LanguageManager,Expression,CompiledExpression,MemoryCache,ConnectionManager}  from './manager/index'
import {SqlLanguage} from './language/sql/index'
import {DefaultLanguage,CoreLib} from './language/default/index'
import {MySqlConnection}  from './connection/index'
import modelConfig from './parser/config.json'
import sqlConfig  from './language/sql/config.json'

class Orm implements IOrm
{
    private cache:Cache
    private parserManager:Parser
    private schemaManager:SchemaManager
    private languageManager:LanguageManager
    private connectionManager:IConnectionManager

    constructor(cache:Cache,parserManager:Parser,schemaManager:SchemaManager,languageManager:LanguageManager,connectionManager:IConnectionManager){
        this.cache=cache; 
        this.parserManager =  parserManager;
        this.schemaManager=schemaManager;              
        this.languageManager = languageManager;
        this.connectionManager=connectionManager;  
    }
    public get parser():Parser
    {
        return this.parserManager;
    }
    public get schema():SchemaManager
    {
        return this.schemaManager;
    }
    public get language():LanguageManager
    {
        return this.languageManager;
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
                operand = this.languageManager.compile(node,dialect,schema);
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
    public deserialize(serialized:string,language:string):CompiledExpression
    {
       let operand= this.languageManager.deserialize(serialized,language);
       return new CompiledExpression(this,operand,language);
    }
    public async execute(operand:Operand,dialect:string,context:any,connectionName?:string):Promise<any>
    {
        try{
            let _context = new Context(context);                    
            if(connectionName){ 
                let executor =this.connectionManager.createExecutor(connectionName);
                return await this.languageManager.execute(operand,dialect,_context,executor);
                
            }else{
                return await this.languageManager.execute(operand,dialect,_context);
            }            
        }catch(error){
            throw 'run: '+operand.name+' error: '+error.toString(); 
        }
    }
    // public async execute(operand:Operand,dialect:string,context:any,connectionName?:string):Promise<any>
    // {
    //     try{
    //         let _context = new Context(context);
    //         let info =  this.getDialect(dialect); 
    //         let _language = this.languages[info.language] as Language            
    //         if(connectionName){ 
    //             let sqlSquery = operand as SqlQuery;
    //             if(!sqlSquery.children || sqlSquery.children.length==0){
    //                 let executor =this.connectionManager.createExecutor(connectionName);
    //                 return await _language.execute(operand,_context,executor);
    //             }
    //             else
    //             {
    //                 let result;
    //                 await this.createTransaction(connectionName,async function(tr:IExecutor){
    //                     result = await _language.execute(operand,_context,tr);
    //                 });
    //                 return result;
    //             }                
    //         }else{
    //             return await _language.execute(operand,_context);
    //         }            
    //     }catch(error){
    //         throw 'run: '+operand.name+' error: '+error.toString(); 
    //     }
    // }
    // public async createTransaction(connectionName:string,callback:{(tr:IExecutor): Promise<void>;}):Promise<void>
    // {
    //     return await this.languageManager.createTransaction(connectionName,callback);
    // }
    public async transaction(operand:Operand,dialect:string,context:any,transaction:IExecutor):Promise<any>
    {
        let _context = new Context(context);
        return await this.languageManager.execute(operand,dialect,_context,transaction);
    }
    public async createTransaction(connectionName:string,callback:{(tr:IExecutor): Promise<void>;}):Promise<void>
    {        
        const tr = this.connectionManager.createTransaction(connectionName);
        try
        {
            await tr.begin();
            await callback(tr);
            await tr.commit();
        }
        catch(error)
        {
            tr.rollback();
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
        let cache = new MemoryCache() 
        let schemaManager=new SchemaManager();
        let connectionManager= new ConnectionManager();
        let languageManager = new LanguageManager();

        orm= new Orm(cache,parser,schemaManager,languageManager,connectionManager);    
        orm.language.add(new DefaultLanguage());
        orm.language.addLibrary(new CoreLib());

        orm.language.add(new SqlLanguage());
        orm.language.addLibrary({language:'sql',name:'sql',variants:sqlConfig.variants}); 
            
        orm.language.addDialect({name:'mysql',language:'sql',variant:'mysql',connectionType:'mysql'});
        orm.language.addDialect({name:'mariadb',language:'sql',variant:'mariadb',connectionType:'mariadb'});
        orm.language.addDialect({name:'oracle',language:'sql',variant:'oracle',connectionType:'oracle'});
        orm.language.addDialect({name:'mssql',language:'sql',variant:'mmsql',connectionType:'mmsql'});
        orm.language.addDialect({name:'postgres',language:'sql',variant:'postgres',connectionType:'postgres'});
        orm.language.addDialect({name:'memory',language:'memory'}); 
        
        orm.connection.addType('mysql',MySqlConnection);
    }
    return orm;
})();

