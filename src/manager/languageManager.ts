import Parser from '../parser/parser'
import SchemaManager  from './schemaManager'
import Connection  from '../connection/base'
import Context from '../language/context'
import Operand from '../language/operand'
import Language from '../language/language'
import {Cache,MemoryCache} from './../model/cache'

export default class LanguageManager
{
    private parser:Parser
    private languages:any
    private schemaManager:SchemaManager
    private connectionTypes:any
    private connections:any
    private cache:Cache

    constructor(parser:Parser,schemaManager:SchemaManager){
        this.parser =  parser
        this.schemaManager=schemaManager
        this.languages={};
        this.connectionTypes={}; 
        this.connections={};
        this.cache=new MemoryCache()  
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
    public async compile(expression:string,language:string,variant?:string,schemaName?:string):Promise<Operand>
    {       
        try{       
            let key = language+':'+variant+'-exp_'+expression
            let operand= await this.cache.get(key)
            if(!operand){
                let node= this.parser.parse(expression);
                let schema = schemaName?this.schemaManager.getInstance(schemaName):undefined;
                let _language = this.languages[language] as Language
                operand= _language.compile(node,schema,variant);
                await this.cache.set(key,operand)
            }            
            return operand as Operand; 
        }
        catch(error){
            console.log(error)
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
    public query(operand:Operand,language:string):string
    {
        try
        {
            return this.languages[language].query(operand);
        }
        catch(error){
            throw 'query: '+operand.name+' error: '+error.toString(); 
        }
    }
    public schema(operand:Operand,language:string):any
    {
        try
        {
            return this.languages[language].schema(operand);
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
                let _language = this.languages[connection.language] as Language 
                return await _language.run(operand,_context,connection);
            }else{
                return await this.languages['default'].run(operand,_context);
            }            
        }catch(error){
            throw 'run: '+operand.name+' error: '+error.toString(); 
        }
    }
}