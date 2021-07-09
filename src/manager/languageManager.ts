import Parser from '../parser/parser'
import SchemaManager  from './schemaManager'
import Context from '../language/context'
import Operand from '../language/operand'
import Language from '../language/language'
import {Cache,MemoryCache} from './../model/cache'
import Dialect from './../model/dialect'
import Node from './../parser/node'
import { SqlQuery } from 'language/sql/operands'

import { ConnectionManager,ConnectionConfig,IExecutor } from './../drivers'

export default class LanguageManager
{
    private parser:Parser
    private languages:any
    private dialects:any
    private schemaManager:SchemaManager
    private connectionManager:ConnectionManager
    // private connectionTypes:any
    // private connections:any
    private cache:Cache

    constructor(parser:Parser,schemaManager:SchemaManager,connectionManager:ConnectionManager){
        this.parser =  parser;
        this.schemaManager=schemaManager;
        this.connectionManager=connectionManager;
        this.languages={};
        this.dialects={};
        // this.connectionTypes={}; 
        // this.connections={};
        this.cache=new MemoryCache()  
    }

    public addDialect(value:Dialect):void
    {
        this.dialects[value.name] =value;
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
        this.connectionManager.addConnectionType(name,value);
    }
    public addConnection(value:ConnectionConfig){
        this.connectionManager.add(value);
    }
    public getConnection(name:string):ConnectionConfig
    {
        return this.connectionManager.get(name);
    }
    public async parse(expression:string):Promise<Node>
    {       
        try{  
            let key = 'parse_'+expression
            let node= await this.cache.get(key)
            if(!node){
                node= this.parser.parse(expression);
                await this.cache.set(key,node)
            }            
            return node as Node; 
        }
        catch(error){
            console.log(error)
            throw 'parse expression: '+expression+' error: '+error.toString();
        }
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
            throw 'compile expression: '+expression+' error: '+error.toString();
        }
    }
    
    public nodeSerialize(value:Node):any
    {
        return this.parser.serialize(value)
    }
    public nodeDeserialize(json:string):Node
    {
        return this.parser.deserialize(json)
    }
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
    public async run(operand:Operand,dialect:string,context:any,connectionName?:string)
    {
        try{
            let _context = new Context(context);
            let info =  this.getDialect(dialect); 
            let _language = this.languages[info.language] as Language            
            if(connectionName){ 
                let sqlSquery = operand as SqlQuery;
                if(!sqlSquery.children || sqlSquery.children.length==0){
                    let executor =this.connectionManager.createExecutor(connectionName);
                    return await _language.run(operand,_context,executor);
                }
                else
                {
                    const transaccion = this.connectionManager.createTransaction(connectionName);
                    try
                    {
                        await transaccion.begin();
                        let result = await _language.run(operand,_context,transaccion);
                        await transaccion.commit();
                        return result;
                    }
                    catch(error)
                    {
                        transaccion.rollback();
                        throw error;
                    }
                }
                
            }else{
                return await _language.run(operand,_context);
            }            
        }catch(error){
            throw 'run: '+operand.name+' error: '+error.toString(); 
        }
    }
    public async transaction(connectionName:string,callback:{(tr:IExecutor): Promise<void>;}):Promise<void>
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