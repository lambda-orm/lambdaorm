import Parser from './parser'
import SchemaManager  from './schema'
import Connection  from './../connection/base'
import Node from './../base/node'
import Context from './../base/context'
import Operand from './../base/operand'

export default class LanguageManager
{
    private parser:Parser
    private languages:any
    private schemaManager:SchemaManager
    private connectionTypes:any
    private connections:any

    constructor(parser:Parser,schemaManager:SchemaManager){
        this.parser =  parser
        this.schemaManager=schemaManager
        this.languages={};
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
    public addConnection(value:any){
        
        let ConnectionType = this.connectionTypes[value.variant]; 
        let cnx = new ConnectionType(value) as Connection;  
        this.connections[value.name] = cnx;
    }
    public getConnection(name:string):Connection
    {
        return this.connections[name];
    }
    public compile(expression:string,language:string,variant?:string,schemaName?:string)
    {
        try{
            let node:Node= this.parser.parse(expression);
            let schema = schemaName?this.schemaManager.getInstance(schemaName):undefined;
            let operand= this.languages[language].compile(node,schema,variant);
            return operand; 
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
    public async run(operand:Operand,context:any,connectionName?:string)
    {
        try{
            let _context = new Context(context);
            if(connectionName){
                let connection = this.connections[connectionName]; 
                return await this.languages[connection.language].run(operand,_context,connection);
            }else{
                return await this.languages['default'].run(operand,_context);
            }            
        }catch(error){
            throw 'run: '+operand.name+' error: '+error.toString(); 
        }
    }
}