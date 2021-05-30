class Node
{
    
    public name: any
    public type: string
    public children: Node[]
    public id?:string
    public parent?: Node
    public index?: number
    public level?:number

    constructor(name:any,type:string,children:Node[]=[]){ 
        this.name = name;
        this.type = type;         
        this.children  = children;
        this.parent = null;
        this.index = null;
    }    
}

class Model
{
    public operators: any
    public enums: any
    public functions: any

    constructor(){
        this.operators={};
        this.enums={};
        this.functions={};
    } 
    addEnum(key,source){
        this.enums[key]=source;
    }
    isEnum(name:string){    
        let names = name.split('.');
        return !!this.enums[names[0]];
    }
    getEnumValue(name:string,option:string){ 
        return this.enums[name][option];
    }
    getEnum(name:string){ 
        return this.enums[name];
    }  
    addOperator(name:string,operands:number,metadata:any){
        if(!this.operators[name])this.operators[name]= {}; 
        this.operators[name][operands] = metadata;
    }
    load(data:any){
        for(const name in data.enums){
            this.addEnum(name,data.enums[name]);
        }
        for(const type in data.operators){
            let count = type == 'ternary'?3:type=='binary'?2:1;
            for(const name in data.operators[type]){
                let metadata= data.operators[type][name];
                this.addOperator(name,count,metadata);
            }
        }
    }
    // addFunction(name,metadata){
    //     this.functions[name] = metadata; 
    // } 
    // getOperatorMetadata(name,operands){
    //     try{          
    //         if(this._operators[name]){
    //             let operator = this._operators[name];
    //             if(operator[operands])
    //                 return operator[operands];
    //         }
    //         return null
    //     }            
    //     catch(error){
    //         throw 'error with operator: '+name;
    //     }
    // } 
    // getFunctionMetadata(name){
    //     try{
    //         if(this._functions[name])
    //             return this._functions[name];
    //         return null
    //     }
    //     catch(error){
    //         throw 'error with function: '+name;
    //     }
    // }
}
class Context
{
    protected _data: any
    protected _parent: any 

    constructor(data:any,parent=null){
        this._data = data;
        this._parent= parent;
    }
    newContext(){        
        return new Context({},this)
    }
    getContext(variable:string){
        if(this._data[variable] || this._parent == null)return this._data
        let _context =this._parent.getContext(variable);
        return  _context?_context:this._data;
    }
    get(name:string){
        let names=name.split('.');
        let value = this.getContext(names[0]); 
        for(let n in names){
            if(value[n]) return null;
            value=value[n];
        }
        return value;
    }
    set(name:string,value:any){
        let names=name.split('.') ;       
        let level = names.length -1;
        let list = this.getContext(names[0]);
        for(let i=0;i<names.length;i++){ 
            const p = names[i];
            if(i == level)
                list[p]=value;
            else                    
                list=list[p];
        }
    }
    init(name,value){
        this._data[name]=value; 
    } 
}

class Language
{
    protected _name:string
    protected _libraries:any
    protected operators?:any;
    protected functions:any;

    constructor(name:string){
        this._name = name;
        this._libraries={};
    }
    get name(){
        return this._name;
    }
    addLibrary(library:any){
        throw 'NotImplemented';
    }
    compile(node:Node,scheme:any=null):Operand{
        throw 'NotImplemented';
    }
    eval(operand:Operand,context:object){  
        throw 'NotImplemented';      
    }
    setParent(operand:Operand,index:number=0,parent:Operand=null){        
        try{
            if(parent){
                operand.id = parent.id +'.'+index;
                operand.parent = parent;
                operand.index = index;
                operand.level = parent.level +1;
            }  
            else{
                operand.id = '0';
                operand.parent = null;
                operand.index = 0;
                operand.level = 0;
            }
            for(let i = 0;i< operand.children.length;i++){
                const p = operand.children[i];
                this.setParent(p,i,operand); 
            }          
            return operand;
        }
        catch(error){
            throw 'set parent: '+operand.name+' error: '+error.toString();
        }
    }
}



class Library
{
    public name:string
    public language:string
    public enums:any
    public operators:any
    public functions:any

    constructor(name:string,language:string){
        this.name = name;
        this.language = language;
        this.enums={};
        this.operators={};
        this.functions={};
    }    
    addEnum(key:string,source:any){        
        this.enums[key] =source;
    }
    addFunction(name:string,source:any,custom:any=null,isArrowFunction:boolean=false){      
        let metadata = this.getMetadata(source);
        metadata['lib'] =this.name;
        metadata['language '] =this.language;  
        metadata['isArrowFunction'] =isArrowFunction;        
        this.functions[name]={'function':source,'metadata':metadata,'custom':custom}; 
    }
    addOperator(name:string,source:any,custom:any=null,customFunction:any=null){
        if(!this.operators[name])this.operators[name]= {}
        let metadata = this.getMetadata(source);
        let operands = metadata['args'].length;  
        metadata['lib'] =this.name;
        metadata['language '] =this.language; 
        this.operators[name][operands]={'function':source,'metadata':metadata,'custom':custom,'customFunction':customFunction};
    }
    getMetadata(source:any){        
        let args=[];
        let _args = this.getArgs(source);
        for(const k in _args){
            const p = _args[k];
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

class Operand
{
    public name: string
    public id: string
    public parent?:Operand
    public index?:number
    public level?:number
    public children?:Operand[]

    constructor(name:string,children:Operand[]=[]){
        this.name = name;
        this.children  = children;        
        this.id = null;
        this.parent = null;
        this.index = 0;
        this.level = 0;
    }    
    eval():any{
        throw 'Not implemented';
    }
    set(value:any){}
    build(metadata:any):any{}
}
class Constant extends Operand
{
    public type:string

    constructor(name:string,children=[]){
      super(name,children);  
      this.type  = typeof name;
    }   
  
    eval():any{
        return this.name;
    }
    
}
class Variable extends Operand
{
    public context?: Context

    constructor(name:string,children:Operand[]=[]){
        super(name,children);  
        this.context  = null;
    }    
    eval():any{
        return this.context.get(this.name);
    }
    set(value:any){
        this.context.set(this.name,value);
    }
}   

class KeyValue extends Operand
{
    eval():any{
        return this.children[0].eval();
    }
}
class Array extends Operand
{
    eval():any{
        let values = [];
        for(let i=0;i<this.children.length;i++){
            values.push(this.children[i].eval());    
        }
        return values;
    } 
}
class Object extends Operand
{
    eval():any{        
        let dic= {}
        for(let i=0;i<this.children.length;i++){
            let value = this.children[i].eval();
            dic[this.children[i].name]=value;
        }
        return dic;
    }
} 
class Operator extends Operand
{
    protected _function:any

    constructor(name:string,children:Operand[]=[],_function:any=null){
        super(name,children); 
        this._function = _function;
    }    
    eval():any{        
        let args= []
        for(let i=0;i<this.children.length;i++){
            args.push(this.children[i].eval()); 
        }
        return this._function(...args);  
    }
}                             
class FunctionRef extends Operand
{
    protected _function:any

    constructor(name:string,children:Operand[]=[],_function:any=null){
        super(name,children); 
        this._function = _function;
    }    
    eval():any{        
        let args= []
        for(let i=0;i<this.children.length;i++){
            args.push(this.children[i].eval()); 
        }
        return this._function(...args);  
    }
}
class ArrowFunction extends FunctionRef {}
class Block extends Operand
{
    eval():any{
        for(let i=0;i<this.children.length;i++){
            this.children[i].eval();    
        }
    } 
}

export {
    Node,
    Model,
    Language,
    Library,
    Context,
    Operand,
    Constant,
    Variable,
    KeyValue,
    Array,
    Object,
    Operator,
    FunctionRef,
    ArrowFunction,
    Block   
}