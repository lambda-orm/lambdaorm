const ConfigExtends = require("config-extends");
const Parser = require("./parser.js")
const {Node,Model,Library} = require("./base.js")
const NodeManager= require("./nodeManager.js")
const SourceManager= require("./sourceManager.js")


const CoreLib= require("./coreLib.js")

// class ModelException extends Error {}
// class ExpressionException extends Error {}

class Exp {
    constructor(){
        this.model = new Model();
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
        if(value instanceof Node)
            return this.nodeManager.serialize(value);
        else if (value instanceof Operand)
            return this.sourceManager.serialize(value);
        return None 
    } 
    parse(expression){
        try{
            // minified = this.minify(expression) 
            let node= this.parser.parse(expression)            
            this.nodeManager.setParent(node)
            return node
        }
        catch(error){
            throw 'expression: '+expression+' error: '+error.toString();
        }
    }
}


(async () => { 

// let oracle = await ConfigExtends.apply('lib/sql.yaml','lib/oracle.yaml');
// console.log(oracle);
let exp = new Exp();
result = exp.parse('1+1');
console.log(JSON.stringify(exp.serialize(result)))

})();
