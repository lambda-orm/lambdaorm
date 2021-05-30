import Parser from './parser'
import Minifier from './minifier'
import {Context,Node,Model,Operand} from './base'
import NodeManager from './nodeManager'
import SourceManager from './sourceManager'

import {DefaultLanguage} from './language/default'
import {SqlLanguage} from './language/sql'
import CoreLib from './coreLib'
import modelConfig from './config/model.json'
import sqlConfig  from './config/sql.json'

// class ModelException extends Error {}
// class ExpressionException extends Error {}

class Orm {

    public model:any
    public minifier:Minifier
    public parser:Parser
    public nodeManager:NodeManager
    public sourceManager:SourceManager

    constructor(model:any){
        this.model = model;
        this.minifier = new Minifier();
        this.parser =  new Parser(this.model);
        this.nodeManager = new NodeManager(this.model);
        this.sourceManager = new SourceManager();        
    }
    addLanguage(value){
        this.sourceManager.addLanguage(value);
    }
    addLibrary(value){
        this.sourceManager.addLibrary(value);
    }
    addScheme(value){
        this.sourceManager.addScheme(value);
    }
    serialize(value){
        let json = null;        
        if(value instanceof Node){
            json= this.nodeManager.serialize(value);
        }
        else if (value instanceof Operand){
            json =this.sourceManager.serialize(value);
        }
        
        if(json)return JSON.stringify(json);
        return null; 
    }
    minify(expression){
        return this.minifier.minify(expression);
    }      
    parse(expression){
        try{
            let minified = this.minifier.minify(expression); 
            let node= this.parser.parse(minified);            
            this.nodeManager.setParent(node)
            return node
        }
        catch(error){
            throw 'expression: '+expression+' error: '+error.toString();
        }
    }
    compile(expression,scheme,language='default'){
        try{
            let node=null;
            if(expression instanceof Node)
                node=expression;                
            else if (typeof expression == 'string')
                node = this.parse(expression);
            else
               throw 'not possible to compile'; 
            return this.sourceManager.compile(node,scheme,language);
        }
        catch(error){
            throw 'expression: '+expression+' error: '+error.toString();
        }
    }
    sentence(expression,scheme,language,variant){
        let operand=null;
        try{
            if(expression instanceof Operand)
                operand=expression;
            else if (expression instanceof Node)                
                operand =this.sourceManager.compile(expression,scheme,language);                   
            else if (typeof expression == 'string'){
                let node = this.parse(expression);
                operand =this.sourceManager.compile(node,scheme,language);
            } 
            else
               throw 'not possible to run';
            return this.sourceManager.sentence(operand,language,variant);            
        }
        catch(error){
            if(operand)
                throw 'operand: '+operand.name+' error: '+error.toString();
            else 
                throw 'expression: '+expression+' error: '+error.toString(); 
        }
    }
    run(cnx,expression,context:Context=null){
        let operand=null;
        try{            
            if(expression instanceof Operand)
                operand=expression;
            else if (expression instanceof Node)                
                operand =this.sourceManager.compile(expression,cnx.scheme,cnx.language);                   
            else if (typeof expression == 'string'){
                let node = this.parse(expression);
                operand =this.sourceManager.compile(node,cnx.scheme,cnx.language);
            } 
            else
               throw 'not possible to run';
            return this.sourceManager.run(cnx,operand,context);
        }
        catch(error){
            if(operand)
                throw 'operand: '+operand.name+' error: '+error.toString();
            else 
                throw 'expression: '+expression+' error: '+error.toString(); 
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

    }
    return orm;
})();

