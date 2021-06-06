import Parser from './parser'
import {Context,Node,Model,Operand} from './base'
import DefaultLanguage from './language/default/language'
import SqlLanguage from './language/sql/language'
import CoreLib from './language/default/coreLib'
import modelConfig from './config/model.json'
import sqlConfig  from './config/sql.json'
import Connection  from './connection/base'
import MySqlConnection  from './connection/mysql'

// class ModelException extends Error {}
// class ExpressionException extends Error {}

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
    public addScheme(value:any){
        this.schemes[value.name] =value;
    }
    public addConnectionType(name:string,value:any){
        this.connectionTypes[name] =value;
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
    public run(operand:Operand,context:Context,connectionName?:string):any{
        try{
            if(connectionName){
                let connection = this.connections[connectionName]; 
                return this.languages[connection.language].run(operand,context,connection);
            }else{
                return this.languages['default'].run(operand,context);
            }            
        }catch(error){
            throw 'run: '+operand.name+' error: '+error.toString(); 
        }
    }
    public eval(expression:string,context:Context,connectionName?:string):any{
        try{
            if(connectionName){
                let connection = this.connections[connectionName]; 
                let operand = this.compile(expression,connection.language,connection.variant,connection.scheme);
                return this.run(operand,context,connectionName);
            }else{
                let operand = this.compile(expression,'default');
                return this.run(operand,context);
            }
        }catch(error){
            throw 'eval: '+expression+' error: '+error.toString(); 
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

