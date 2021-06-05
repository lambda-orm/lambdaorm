import Parser from './parser'
import {Context,Node,Model,Operand} from './base'
import DefaultLanguage from './language/default/language'
import SqlLanguage from './language/sql/language'
import CoreLib from './coreLib'
import modelConfig from './config/model.json'
import sqlConfig  from './config/sql.json'

// class ModelException extends Error {}
// class ExpressionException extends Error {}

class Orm {

    private model:any
    private parser:Parser
    private languages:any
    private schemes:any

    constructor(model:any){
        this.model = model;
        this.parser =  new Parser(this.model);
        this.languages={};
        this.schemes={};        
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
    public compile(expression:string,scheme:string,language:string){
        try{
            let node:Node= this.parser.parse(expression);
            let _scheme =  this.schemes[scheme];
            let operand= this.languages[language].compile(node,_scheme);
            return operand;            
        }
        catch(error){
            throw 'expression: '+expression+' error: '+error.toString();
        }
    }
    public run(cnx:any,operand:Operand,context:Context):any{
        try{
            let scheme =  this.schemes[cnx.scheme];
            return this.languages[cnx.language].run(operand,context,scheme,cnx);
        }catch(error){
            throw 'run: '+Operand.name+' error: '+error.toString(); 
        }
    }
    public eval(cnx:any,expression:string,scheme:string,language:string,context:Context):any{
        try{
            let operand = this.compile(expression,scheme,language);
            return this.run(cnx,operand,context);
        }catch(error){
            throw 'eval: '+expression+' error: '+error.toString(); 
        }
    } 
    public sentence(operand:Operand,language:string,variant:string):any{
        return this.languages[language].sentence(operand,variant);
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
    }
    return orm;
})();

