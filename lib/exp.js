const Parser = require("./parser.js");
const Minifier = require("./minifier.js");
const {Node,Model,Library,Context,Operand,Constant,Variable,KeyValue,Array,Object,Operator,FunctionRef,ArrowFunction,Block} = require("./base.js");
const NodeManager= require("./nodeManager.js");
const SourceManager= require("./sourceManager.js");
const CoreLib= require("./coreLib.js");

// class ModelException extends Error {}
// class ExpressionException extends Error {}

module.exports= class Exp {
    constructor(){
        this.model = new Model();
        this.minifier = new Minifier();
        this.parser =  new Parser(this.model);
        this.nodeManager = new NodeManager(this.model);
        this.sourceManager = new SourceManager(this.model);        
        this.addLibrary(new CoreLib());
    }
    addLibrary(library){
        this.sourceManager.addLibrary(library);
        this.refresh(); 
    }
    refresh(){
        this.parser.refresh(); 
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
    compile(expression){
        try{
            let node=null;
            if(expression instanceof Node)
                node=expression;                
            else if (typeof expression == 'string')
                node = this.parse(expression);
            else
               throw 'not possible to compile'; 
            return this.sourceManager.compile(node);
        }
        catch(error){
            throw 'expression: '+expression+' error: '+error.toString();
        }
    }
    run(expression,context={}){
        try{
            operand=null;
            if(expression instanceof Operand)
                operand=expression;
            else if (expression instanceof Node)                
                operand =this.sourceManager.compile(expression);                   
            else if (typeof expression == 'string'){
                let node = this.parse(expression);
                operand =this.sourceManager.compile(node);
            } 
            else
               throw 'not possible to run';
            return this.sourceManager.eval(operand,context,token);
        }
        catch(error){
            throw 'operand: '+operand.name+' error: '+error.toString();
        }
    }
}