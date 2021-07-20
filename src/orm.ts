import {IExecutor,ITransaction,Dialect,Cache,Schema,IConnectionManager,Operand,IOrm,Context } from './model/index'
import {Model,Parser} from './parser/index'
import {SchemaManager,DialectManager,Expression,CompiledExpression,MemoryCache,ConnectionManager}  from './manager/index'
import {SqlLanguage} from './language/sql/index'
// import {MemoryLanguage,CoreLib} from './language/memory/index'
import {MySqlConnection}  from './connection/index'
import modelConfig from './parser/config.json'
import sqlConfig  from './language/sql/config.json'

class Orm implements IOrm
{
    private cache:Cache
    private parserManager:Parser
    private schemaManager:SchemaManager
    private dialectManager:DialectManager
    private connectionManager:IConnectionManager

    constructor(parserManager:Parser){
        this.cache= new MemoryCache() 
        this.parserManager =  parserManager;
        this.schemaManager= new SchemaManager(this);           
        this.dialectManager  = new DialectManager();
        this.connectionManager= new ConnectionManager();  
    }
    public get parser():Parser
    {
        return this.parserManager;
    }
    public get schema():SchemaManager
    {
        return this.schemaManager;
    }
    public get dialect():DialectManager
    {
        return this.dialectManager;
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
                operand = this.dialectManager.compile(node,dialect,schema);
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
       let operand= this.dialectManager.deserialize(serialized,language);
       return new CompiledExpression(this,operand,language);
    }
    public async execute(operand:Operand,dialect:string,context:any,connection?:string|ITransaction):Promise<any>
    {
        try{
            let _context = new Context(context);                    
            if(connection){ 
                if( typeof connection === "string"){
                    let result;
                    if(operand.children.length==0){
                        let executor =this.connectionManager.createExecutor(connection);
                        result = await this.dialectManager.execute(operand,dialect,_context,executor);
                    }
                    else
                    {
                        await this.createTransaction(connection,async (transaction)=>{
                            result= await this.dialectManager.execute(operand,dialect,_context,transaction);
                        });
                    }
                    return result;                    
                }else{
                    let transaction = connection as ITransaction;
                    if(transaction)
                        return await this.dialectManager.execute(operand,dialect,_context,transaction);
                    else
                        throw `connection no valid`; 
                }
            }else{
                return await this.dialectManager.execute(operand,dialect,_context);
            }            
        }catch(error){
            throw 'run: '+operand.name+' error: '+error.toString(); 
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
        
        // let memoryLanguage =new MemoryLanguage();
        // memoryLanguage.addLibrary(new CoreLib());

        let sqlLanguage =  new SqlLanguage();
        sqlLanguage.addLibrary({name:'sql',dialects:sqlConfig.dialects});
        
        // orm.dialect.addLanguage(memoryLanguage);
        orm.dialect.addLanguage(sqlLanguage);        
            
        orm.dialect.add({name:'mysql',language:'sql'});
        orm.dialect.add({name:'mariadb',language:'sql'});
        orm.dialect.add({name:'oracle',language:'sql'});
        orm.dialect.add({name:'mssql',language:'sql'});
        orm.dialect.add({name:'postgres',language:'sql'});
        orm.dialect.add({name:'memory',language:'memory'}); 
        
        orm.connection.addType('mysql',MySqlConnection);
    }
    return orm;
})();

