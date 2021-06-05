import {Context,Operand} from '../base'


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
class Obj extends Operand
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
    Operand,
    Constant,
    Variable,
    KeyValue,
    Array,
    Obj,
    Operator,
    FunctionRef,
    ArrowFunction,
    Block   
}