import Parser from './parser'
import Node from './base/node'
import Context from './base/context'
import Operand from './base/operand'
import Model from './base/model'
import DefaultLanguage from './language/default/language'
import SqlLanguage from './language/sql/language'
import CoreLib from './language/default/coreLib'
import modelConfig from './base/config.json'
import sqlConfig  from './language/sql/config.json'
import Connection  from './connection/base'
import MySqlConnection  from './connection/mysql'
import * as model from './model/schema'
import SchemaManager  from './manager/schema'
import Schema  from './base/schema'



class Expression
{
    constructor(orm:Orm,expression:string){        
        this.orm=orm
        this.expression= expression;

    }
    protected orm:Orm 
    protected expression:string    
    protected language?:string
    protected variant?:string
    protected schema?:string
    
    public compile(language:string,variant:string,schema:string):CompiledExpression 
    {
       if(!this.expression)throw 'Expression not defined';
       this.language = language;
       this.variant = variant;
       this.schema = schema;
       let operand=this.orm.compile(this.expression,this.language,this.variant,this.schema);
       return new CompiledExpression(this.orm,operand,this.language);
    }  
    public async run(context:any,connection:string)
    {     
        let cnx = this.orm.getConnection(connection);
        let compiled = this.compile(cnx.language,cnx.variant,cnx.schema); 
        return await compiled.run(context,connection) 
    }
}

class CompiledExpression
{
    constructor(orm:Orm,operand:Operand,language:string){        
        this.orm=orm
        this.operand= operand;
        this.language= language;

    }
    protected orm:Orm 
    protected operand:Operand
    protected language:string    
       
    public serialize():string
    {
        return this.orm.serialize(this.operand,this.language );
    }    
    public async run(context:any,connectionName:string)
    {        
        return await this.orm.eval(this.operand as Operand,context,connectionName)
    }
}

class Orm {

    private model:any
    private parser:Parser
    private languages:any
    private schemaManager:SchemaManager
    private connectionTypes:any
    private connections:any

    constructor(model:any){
        this.model = model;
        this.parser =  new Parser(this.model);
        this.languages={};
        this.schemaManager=new SchemaManager();
        this.connectionTypes={}; 
        this.connections={};  
    }
    public addLanguage(value:any){
        this.languages[value.name] =value;
    }
    public addLibrary(value:any){
        this.languages[value.language].addLibrary(value);        
    }
    public addConnectionType(name:string,value:any){
        this.connectionTypes[name] =value;
    }
    public applySchema(value:model.Schema):void
    {
        this.schemaManager.apply(value);
    }
    public addMetadata(type:'entity'| 'property'|'relation',data:any):void
    {
       console.log(type+':'+JSON.stringify(data))
    }
    public introspectSchema(path:string):void
    {
       //TODO
    }
    public deleteSchema(name:string):void
    {
        return this.schemaManager.delete(name);
    }  
    public getSchema(name:string):model.Schema | undefined
    {
        return this.schemaManager.get(name);
    }
    public listSchema():model.Schema[]
    {
        return this.schemaManager.list();
    } 
    public addConnection(value:any){
        let ConnectionType = this.connectionTypes[value.variant]; 
        let cnx = new ConnectionType(value) as Connection;  
        this.connections[value.name] = cnx;
    }
    public getConnection(name:string):Connection
    {
        return this.connections[name];
    }
    
    public expression(value:string){
        return new Expression(this,value)
    }
    public query(value:Function):Expression
    {
        let str = value.toString();
        let index = str.indexOf('=>')+2;
        let expression = str.substring(index,str.length);
        return new Expression(this,expression)
    }
    // public deserialize(serialized:string,language:string):Expression
    // {
    //    this.language = language;
    //    this.operand=this.orm.deserialize(serialized,this.language);
    //    return this;
    // }    

    public compile(expression:string,language:string,variant?:string,schemaName?:string)
    {
        try{
            let node:Node= this.parser.parse(expression);
            let schema = schemaName?this.schemaManager.getInstance(schemaName):undefined;
            let operand= this.languages[language].compile(node,schema,variant);
            return operand; 
        }
        catch(error){
            throw 'expression: '+expression+' error: '+error.toString();
        }
    }    
    public serialize(operand:Operand,language:string):string
    {
        try
        {
            return this.languages[language].serialize(operand);
        }
        catch(error){
            throw 'serialize: '+operand.name+' error: '+error.toString(); 
        }
    }
    public deserialize(serialized:string,language:string):Operand
    {
        try
        {
            return this.languages[language].deserialize(serialized);
        }
        catch(error){
            throw 'deserialize: '+serialized+' error: '+error.toString(); 
        }
    }
    public async eval(operand:Operand,context:any,connectionName?:string)
    {
        try{
            let _context = new Context(context);
            if(connectionName){
                let connection = this.connections[connectionName]; 
                return await this.languages[connection.language].eval(operand,_context,connection);
            }else{
                return await this.languages['default'].eval(operand,_context);
            }            
        }catch(error){
            throw 'run: '+operand.name+' error: '+error.toString(); 
        }
    }
    public async run(expression:string,context:any,connectionName?:string)
    {
        try{
            if(connectionName){
                let connection = this.connections[connectionName]; 
                let operand = this.compile(expression,connection.language,connection.variant,connection.schema);
                return await this.eval(operand,context,connectionName);
            }else{
                let operand = this.compile(expression,'default');
                return await this.eval(operand,context);
            }
        }catch(error){
            throw 'eval: '+expression+' error: '+error.toString(); 
        }
    }
}
var orm = null;
export =(function() {
    if(!orm){
        let model = new Model();
        model.load(modelConfig);
        
        orm= new Orm(model);    
        orm.addLanguage(new DefaultLanguage());
        orm.addLibrary(new CoreLib());

        orm.addLanguage(new SqlLanguage());
        orm.addLibrary({language:'sql',name:'sql',variants:sqlConfig.variants}); 

        orm.addConnectionType('mysql',MySqlConnection);
    }
    return orm;
})();

