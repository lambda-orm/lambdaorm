import {SchemaManager}  from './schemaManager'
import {Language,SchemaHelper} from '../language/index'
import {Node,Parser} from './../parser/index'
import {SqlQuery } from 'language/sql/index'
import {Dialect,IExecutor,ConnectionConfig,Cache,Operand,Context,IConnectionManager } from './../model/index'

export class LanguageManager
{
    // private parser:Parser
    private languages:any
    private dialects:any
    // private connectionManager:IConnectionManager
    // private cache:Cache

    constructor(){
        // this.parser =  parser;
        // this.connectionManager=connectionManager;
        this.languages={};
        this.dialects={};
        // this.cache=cache; 
    }
    // public get connection():IConnectionManager
    // {
    //     return this.connectionManager;
    // }
    public addDialect(value:Dialect):void
    {
        this.dialects[value.name] =value;
    }
    public getDialect(dialect:string):Dialect
    {
        return this.dialects[dialect];
    }
    // public setCache(value:Cache){
    //     this.cache=value;
    // }
    public add(value:any){
        this.languages[value.name] =value;
    }
    public addLibrary(value:any){
        this.languages[value.language].addLibrary(value);        
    }
    // public async parse(expression:string):Promise<Node>
    // {       
    //     try{  
    //         let key = 'parse_'+expression
    //         let node= await this.cache.get(key)
    //         if(!node){
    //             node= this.parser.parse(expression);
    //             await this.cache.set(key,node)
    //         }            
    //         return node as Node; 
    //     }
    //     catch(error){
    //         console.log(error)
    //         throw 'parse expression: '+expression+' error: '+error.toString();
    //     }
    // } 
    public compile(node:Node,dialect:string,schema?:SchemaHelper):Operand
    {       
        try
        {      
            let dialectInfo =  this.getDialect(dialect);                
            let _language = this.languages[dialectInfo.language] as Language
            return _language.compile(node,schema,dialectInfo.variant);
        }
        catch(error){
            console.log(error)
            throw 'compile error: '+error.toString();
        }
    }
    // public async compile(expression:string,dialect:string,schema?:SchemaHelper):Promise<Operand>
    // {       
    //     try{      
    //         let dialectInfo =  this.getDialect(dialect);
    //         let key = dialect+'-exp_'+expression
    //         let operand= await this.cache.get(key)
    //         if(!operand){
    //             let node= this.parser.parse(expression);
    //             let _language = this.languages[dialectInfo.language] as Language
    //             operand= _language.compile(node,schema,dialectInfo.variant);
    //             await this.cache.set(key,operand)
    //         }            
    //         return operand as Operand; 
    //     }
    //     catch(error){
    //         console.log(error)
    //         throw 'compile expression: '+expression+' error: '+error.toString();
    //     }
    // }
    // public nodeSerialize(value:Node):any
    // {
    //     return this.parser.serialize(value)
    // }
    // public nodeDeserialize(json:string):Node
    // {
    //     return this.parser.deserialize(json)
    // }
    public serialize(operand:Operand,dialect:string):any
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
    public deserialize(json:any,dialect:string):Operand
    {
        try
        {
            let info =  this.getDialect(dialect);
            return this.languages[info.language].deserialize(json);
        }
        catch(error){
            throw 'deserialize: '+json+' error: '+error.toString(); 
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
    public async execute(operand:Operand,dialect:string,context:Context,executor?:IExecutor):Promise<any>
    {
        try{
            let info =  this.getDialect(dialect); 
            let _language = this.languages[info.language] as Language            
            if(executor){ 
                return await _language.execute(operand,context,executor);                
            }else{
                return await _language.execute(operand,context);
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
    // public async transaction(operand:Operand,dialect:string,context:any,transaction:IExecutor):Promise<any>
    // {
    //     let _context = new Context(context);
    //     let info =  this.getDialect(dialect); 
    //     let _language = this.languages[info.language] as Language 
    //     return await _language.execute(operand,_context,transaction);
    // }
    // public async createTransaction(connectionName:string,callback:{(tr:IExecutor): Promise<void>;}):Promise<void>
    // {        
    //     const tr = this.connectionManager.createTransaction(connectionName);
    //     try
    //     {
    //         await tr.begin();
    //         await callback(tr);
    //         await tr.commit();
    //     }
    //     catch(error)
    //     {
    //         tr.rollback();
    //         throw error;
    //     }        
    // }
}