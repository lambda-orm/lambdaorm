import {Language,SchemaHelper} from '../language/index'
import {Node,Parser} from './../parser/index'
import {Dialect,IExecutor,ConnectionConfig,Cache,Operand,Context,IConnectionManager, Delta } from './../model/index'

export class LanguageManager
{
    private languages:any
    private dialects:any
    constructor(){
        this.languages={};
        this.dialects={};
    }
    public addDialect(value:Dialect):void
    {
        this.dialects[value.name] =value;
    }
    public getDialect(dialect:string):Dialect
    {
        return this.dialects[dialect];
    }
    public add(value:any){
        this.languages[value.name] =value;
    }
    public addLibrary(value:any){
        this.languages[value.language].addLibrary(value);        
    }
    public schemaSql(delta:Delta,dialect:string):string
    {
        try
        {
            let info =  this.getDialect(dialect);
            return this.languages[info.language].schemaSql(delta,dialect);
        }
        catch(error){
            throw 'schemaSql error: '+error.toString(); 
        }
    }
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
    public sql(operand:Operand,dialect:string):string
    {
        try
        {
            let info =  this.getDialect(dialect);
            return this.languages[info.language].sql(operand);
        }
        catch(error){
            throw 'sql: '+operand.name+' error: '+error.toString(); 
        }
    }
    public model(operand:Operand,dialect:string):any
    {
        try
        {
            let info =  this.getDialect(dialect);
            return this.languages[info.language].model(operand);
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
}