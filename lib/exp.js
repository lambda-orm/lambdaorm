const Parser = require("./parser.js");
const Minifier = require("./minifier.js");
const {Node,Model,Operand} = require("./base.js");
const NodeManager= require("./nodeManager.js");
const SourceManager= require("./sourceManager.js");
const ConfigExtends = require("config-extends");

const {DefaultLanguage} = require("./language/default.js");
const {OrmLanguage} = require("./language/orm.js");
const CoreLib= require("./coreLib.js");

// class ModelException extends Error {}
// class ExpressionException extends Error {}

class Exp {
    constructor(model){
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
    compile(expression,language='default'){
        try{
            let node=null;
            if(expression instanceof Node)
                node=expression;                
            else if (typeof expression == 'string')
                node = this.parse(expression);
            else
               throw 'not possible to compile'; 
            return this.sourceManager.compile(node,language);
        }
        catch(error){
            throw 'expression: '+expression+' error: '+error.toString();
        }
    }
    run(cnx,expression,context={}){
        try{
            let operand=null;
            if(expression instanceof Operand)
                operand=expression;
            else if (expression instanceof Node)                
                operand =this.sourceManager.compile(expression,cnx.language);                   
            else if (typeof expression == 'string'){
                let node = this.parse(expression);
                operand =this.sourceManager.compile(node,language);
            } 
            else
               throw 'not possible to run';
            return this.sourceManager.eval(cnx,operand,context);
        }
        catch(error){
            throw 'operand: '+operand.name+' error: '+error.toString();
        }
    }
}


var exp = null;
module.exports = (async function() {
    if(!exp){

        let data = await ConfigExtends.apply('lib/config/language/model.yaml');
        let model = new Model();
        model.load(data);
        
        exp= new Exp(model);    
        exp.addLanguage(new DefaultLanguage());
        exp.addLibrary(new CoreLib());

        exp.addLanguage(new OrmLanguage());
        let ormConfig = await ConfigExtends.apply('lib/config/language/orm');        
        exp.addLibrary({language:'orm',name:'sql',variants:ormConfig.variants});        

    }
    return { exp };
})();

