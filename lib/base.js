
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
class Context
{
    constructor(data,parent=null){
        this.data = data;
        this._parent= parent;
    }
    newContext(){        
        return Context({},self)
    }
    getConext(variable){
        if(this.data[variable] || this._parent == null)return this.data
        let _context =this._parent.getConext(variable);
        return  _context?_context:this.data;
    }
    get(name){
        let names=name.split('.');
        let value = this.getConext(names[0]); 
        for(n in names){
            if(value[n]) return null;
            value=value[n];
        }
        return value;
    }
    set(name,value){
        let names=name.split('.') ;       
        let level = len(names)-1;
        let list = this.getConext(names[0]);
        for(let i=0;i<names.length;i++){ 
            const p = names[i];
            if(i == level)
                list[p]=value;
            else                    
                list=list[p];
        }
    }
    init(name,value){
        this.data[name]=value; 
    } 
}
class Operand
{
    constructor(name,children=[]){
        this._name = name;        
        this._children  = children;
        this._id = None;
        this._parent = None;
        this._index = 0;
        this._level = 0;
    }    
    get name(){
        return this._name;
    }
    set name(value){
        this._name =value;
    }
    get id(){
        return this._id;
    }
    set id(value){
        this._id =value; 
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
    get level(){
        return this._level; 
    }
    set level(value){
        this._level =value; 
    }    
    get children(){
        return this._children;
    }
    eval(){
        throw 'Not implemented';
    }
}
class Constant extends Operand
{
    constructor(name,children=[]){
      super(name,children);  
      this._type  = typeof name;
    }    
    get type(){ 
        return this._type; 
    } 
    eval(){
        return this._name;
    }
}
class Variable extends Operand
{
    constructor(name,children=[]){
        super(name,children);  
        this._context  = null;
    }    
    get context(){
        return this._context;
    }
    set context(value){
        this._context=value;
    }
    eval(){
        return this.context.get(this._name);
    }
    set(value){
        this.context.set(this._name,value);
    }
}   
class KeyValue extends Operand
{
    eval(){
        return this.children[0].eval();
    }
}
class Array extends Operand
{
    eval(){
        let values = [];
        for(let i=0;i<this._children.length;i++){
            values.push(this.children[i].eval());    
        }
        return values;
    } 
}
class Object extends Operand
{
    eval(){        
        let dic= {}
        for(let i=0;i<this._children.length;i++){
            let value = this.children[i].eval();
            dic[this._children[i].name]=value;
        }
        return dic;
    }
} 
class Operator extends Operand
{
    constructor(name,children=[],_function=null){
        super(name,children); 
        this._function = _function;
    }    
    eval(){        
        let args= []
        for(let i=0;i<this._children.length;i++){
            args.push(this.children[i].eval()); 
        }
        return this._function(...args);  
    }
}                             
class FunctionRef extends Operand
{
    constructor(name,children=[],_function=null){
        super(name,children); 
        this._function = _function;
    }    
    eval(){        
        let args= []
        for(let i=0;i<this._children.length;i++){
            args.push(this.children[i].eval()); 
        }
        return this._function(...args);  
    }
}
class ArrowFunction extends FunctionRef {}
class Block extends Operand
{
    eval(){
        for(let i=0;i<this._children.length;i++){
            this.children[i].eval();    
        }
    } 
}
module.exports = {
    Node: Node,
    Model: Model,
    Library: Library,
    Context: Context,
    Operand: Operand,
    Constant: Constant,
    Variable: Variable,
    KeyValue: KeyValue,
    Array: Array,
    Object: Object,
    Operator: Operator,
    FunctionRef: FunctionRef,
    ArrowFunction: ArrowFunction,
    Block: Block
}