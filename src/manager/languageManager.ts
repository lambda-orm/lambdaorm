import Parser from '../parser/parser'
import SchemaManager  from './schemaManager'
import Connection  from '../connection/base'
import Context from '../language/context'
import Operand from '../language/operand'
import Language from '../language/language'
import {Cache,MemoryCache} from './../model/cache'
import Dialect from './../model/dialect'

export default class LanguageManager
{
    private parser:Parser
    private languages:any
    private dialects:any
    private schemaManager:SchemaManager
    private connectionTypes:any
    private connections:any
    private cache:Cache

    constructor(parser:Parser,schemaManager:SchemaManager){
        this.parser =  parser
        this.schemaManager=schemaManager
        this.languages={};
        this.dialects={};
        this.connectionTypes={}; 
        this.connections={};
        this.cache=new MemoryCache()  
    }

    public addDialect(dialect:string,value:Dialect):void
    {
        this.dialects[dialect] =value;
    }
    public getDialect(dialect:string):Dialect
    {
        return this.dialects[dialect];
    }
    public setCache(value:Cache){
        this.cache=value;
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
    public addConnection(value:any){
        
        let ConnectionType = this.connectionTypes[value.variant]; 
        let cnx = new ConnectionType(value) as Connection;  
        this.connections[value.name] = cnx;
    }
    public getConnection(name:string):Connection
    {
        return this.connections[name];
    }
    public async compile(expression:string,dialect:string,schemaName?:string):Promise<Operand>
    {       
        try{      
            let dialectInfo =  this.getDialect(dialect);
            let key = dialect+'-exp_'+expression
            let operand= await this.cache.get(key)
            if(!operand){
                let node= this.parser.parse(expression);
                let schema = schemaName?this.schemaManager.getInstance(schemaName):undefined;
                let _language = this.languages[dialectInfo.language] as Language
                operand= _language.compile(node,schema,dialectInfo.variant);
                await this.cache.set(key,operand)
            }            
            return operand as Operand; 
        }
        catch(error){
            console.log(error)
            throw 'expression: '+expression+' error: '+error.toString();
        }
    }   
    public serialize(operand:Operand,dialect:string):string
    {
        try
        {
            let info =  this.getDialect(dialect);
            return this.languages[info.language].serialize(operand);
        }
        catch(error){
            throw 'serialize: '+operand.name+' error: '+error.toString(); 
        }
    }
    public deserialize(serialized:string,dialect:string):Operand
    {
        try
        {
            let info =  this.getDialect(dialect);
            return this.languages[info.language].deserialize(serialized);
        }
        catch(error){
            throw 'deserialize: '+serialized+' error: '+error.toString(); 
        }
    }
    public query(operand:Operand,dialect:string):string
    {
        try
        {
            let info =  this.getDialect(dialect);
            return this.languages[info.language].query(operand);
        }
        catch(error){
            throw 'query: '+operand.name+' error: '+error.toString(); 
        }
    }
    public schema(operand:Operand,dialect:string):any
    {
        try
        {
            let info =  this.getDialect(dialect);
            return this.languages[info.language].schema(operand);
        }
        catch(error){
            throw 'query: '+operand.name+' error: '+error.toString(); 
        }
    }
    public async run(operand:Operand,context:any,connectionName?:string)
    {
        try{
            let _context = new Context(context);            
            if(connectionName){                
                let connection = this.connections[connectionName] as Connection;
                let info =  this.getDialect(connection.dialect);
                let _language = this.languages[info.language] as Language 
                return await _language.run(operand,_context,connection);
            }else{
                return await this.languages['memory'].run(operand,_context);
            }            
        }catch(error){
            throw 'run: '+operand.name+' error: '+error.toString(); 
        }
    }
}