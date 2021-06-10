import Parser from './parser'
import {Context,Node,Model,Operand} from './base'
import DefaultLanguage from './language/default/language'
import SqlLanguage from './language/sql/language'
import CoreLib from './language/default/coreLib'
import modelConfig from './config/model.json'
import sqlConfig  from './config/sql.json'
import Connection  from './connection/base'
import MySqlConnection  from './connection/mysql'


class Orm {

    private model:any
    private parser:Parser
    private languages:any
    private schemes:any
    private connectionTypes:any
    private connections:any

    constructor(model:any){
        this.model = model;
        this.parser =  new Parser(this.model);
        this.languages={};
        this.schemes={};
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
    public addScheme(value:any){

        value.entity = {};
        for(const p in value.entities){
            let entity = value.entities[p];
            entity.property={};    
            for(const q in entity.properties){
                let property = entity.properties[q];
                entity.property[property.name] = property;
            }
            entity.relation={};    
            for(const q in entity.relations){
                let relation = entity.relations[q];
                entity.relation[relation.name] = relation;
            }
            value.entity[entity.name] = entity
            delete entity.properties;
            delete entity.relations;
        } 
        delete value.entities;
        this.schemes[value.name] =value;
    }
    public addConnection(value:any){
        let ConnectionType = this.connectionTypes[value.variant]; 
        let cnx = new ConnectionType(value) as Connection;  
        this.connections[value.name] = cnx;
    }     
    public compile(expression:string,language:string,variant?:string,scheme?:string){
        try{
            let node:Node= this.parser.parse(expression);
            let _scheme = scheme!=null?this.schemes[scheme]:null;
            let operand= this.languages[language].compile(node,_scheme,variant);
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
    public async eval(expression:string,context:any,connectionName?:string)
    {
        try{
            if(connectionName){
                let connection = this.connections[connectionName]; 
                let operand = this.compile(expression,connection.language,connection.variant,connection.scheme);
                return await this.run(operand,context,connectionName);
            }else{
                let operand = this.compile(expression,'default');
                return await this.run(operand,context);
            }
        }catch(error){
            throw 'eval: '+expression+' error: '+error.toString(); 
        }
    } 
    public async exec(func:Function,context:any,connectionName?:string)
    {
        try{
            return await this.eval(func.toString().replace('()=>',''),context,connectionName);
        }catch(error){
            throw 'error: '+error.toString(); 
        }
    } 
}
var orm = null;
export = (function() {
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

