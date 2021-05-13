const ConfigExtends = require("config-extends");
const Parser = require("./parser.js")





class SourceManager
{
    constructor(model){
        this._model=model;
        this._libraries={};
    }    
    get model(){
        return this._model;
    }
    get libraries(){
        return this._libraries;
    }
    get addLibrary(library){
        this._libraries[library.name] =library;
        for(const name in library.enums){
            this._model.addEnum(name,library.enums[name]);
        }
        for(const name in library.operators){
            data= library.operators[name]
            this._model.addOperator(name,data.key,data.cardinality,data.metadata)
        }
        for(const name in library.functions){
            data = library.functions[name];
            this._model.addFunction(name,data.metadata);
        }
    } 
}       


class Library
{
    constructor(name){
        this._name = name
        this._enums={} 
        this._operators={}
        this._functions={}
    }

    addOperator(name,key,category,source,priority=-1,custom=null,customFunction=null){
        let metadata = this.getMetadata(source);
        let cardinality = metadata['args'].length;  
        metadata['lib'] =this._name;
        metadata['category'] =category;
        metadata['priority'] =priority;
          
        this._operators[name]={'key':key,'cardinality':cardinality,'function':source,'metadata':metadata,'custom':custom,'customFunction':customFunction};
    }


    getMetadata(source){        
        args=[];
        _signature = ''
        _args = this.getArgs(source);
        for( p in _args){
            let data = p.split('=');             
            arg = {'name':data[0]
                  ,'default':data.length>1?data[1]:null
                  }
            args.push(arg)
        }
        return {
            'originalName': source.name,
            'signature': '('+_args.toString()+')',
            'doc':null,
            'args': args
        }
    }
    getArgs(source){
        args = f => f.toString ().replace (/[\r\n\s]+/g, ' ').
              match (/(?:function\s*\w*)?\s*(?:\((.*?)\)|([^\s]+))/).
              slice (1,3).
              join ('').
              split (/\s*,\s*/);
        return args(source);      
    }

}


class Operators{
      
    static addition(a,b) {return a+b;}
    static subtraction(a,b) {return a-b;}
    static negative(a) {return a*-1;}
}

class CoreLib extends Library
{
    constructor(){
       super('core'); 
       this.initOperators(); 
    } 

    initOperators(){      

        this.addOperator('addition','+','arithmetic',Operators.addition,4)
        this.addOperator('subtraction','-','arithmetic',Operators.subtraction,4)
        this.addOperator('negative','-','arithmetic',Operators.negative,8)
    }

    
}


class Exp {
    constructor(){

        this.parser =  new Parser();
    }

}


(async () => { 

let oracle = await ConfigExtends.apply('lib/sql.yaml','lib/oracle.yaml');
console.log(oracle);

})();
