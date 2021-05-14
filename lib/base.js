
class Node
{
    constructor(name,type,children=[]){ 
        this._name = name;
        this._type = type;         
        this._children  = children;
        this._parent = null;
        this._index = null;
    }    
    get name(){
        return this._name;
    }
    set name(value){
        this._name =value ;
    }    
    get type(){
        return this._type;
    } 
    set type(value){
        this._type =value; 
    } 
    get children(){
        return this._children; 
    }
    get parent(){
        return this._parent;
    } 
    set parent(value){
        this._parent =value; 
    }    
    get index(){
        return this._index; 
    }
    set index(value){
        this._index =value; 
    } 
}

class Model
{
    constructor(){
        this._operators={};
        this._enums={};
        this._functions={};
    }    
    get enums(){
        return this._enums;
    }    
    get operators(){
        return this._operators;
    }    
    get functions(){
        return this._functions;
    }
    addEnum(key,source){
        this.enums[key]=source;
    }
    isEnum(name){    
        names = name.split('.');
        return names[0] in this.enums.keys();
    }
    getEnumValue(name,option){ 
        return this.enums[name][option];
    }
    getEnum(name){ 
        return this.enums[name];
    }  
    addOperator(name,cardinality,metadata){
        if(!this._operators[name])this._operators[name]= {}; 
        this.operators[name][cardinality] = metadata;
    } 
    addFunction(name,metadata){
        this.functions[name] = metadata; 
    } 
    getOperatorMetadata(name,cardinality){
        try{          
            if(this._operators[name]){
                operator = this._operators[name];
                if(operator[cardinality])
                    return operator[cardinality];
            }
            return null
        }            
        catch(error){
            throw 'error with operator: '+name;
        }
    } 
    getFunctionMetadata(name){
        try{
            if(this._functions[name])
                return this._functions[name];
            return null
        }
        catch(error){
            throw 'error with function: '+name;
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
    get name(){
        return this._name;
    }    
    get enums(){
        return this._enums;
    }    
    get operators(){
        return this._operators;
    }    
    get functions(){
        return this._functions;
    }

    addOperator(name,category,source,priority=-1,custom=null,customFunction=null){
        if(!this._operators[name])this._operators[name]= {}
        let metadata = this.getMetadata(source);
        let cardinality = metadata['args'].length;  
        metadata['lib'] =this._name;
        metadata['category'] =category;
        metadata['priority'] =priority;
          
        this._operators[name][cardinality]={'function':source,'metadata':metadata,'custom':custom,'customFunction':customFunction};
    }


    getMetadata(source){        
        let args=[];
        let _args = this.getArgs(source);
        for(const p in _args){
            let data = p.split('=');             
            let arg = {'name':data[0]
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
        let args = f => f.toString ().replace (/[\r\n\s]+/g, ' ').
              match (/(?:function\s*\w*)?\s*(?:\((.*?)\)|([^\s]+))/).
              slice (1,3).
              join ('').
              split (/\s*,\s*/);
        return args(source);      
    }

}

module.exports = {
    Node: Node,
    Model: Model,
    Library: Library
}