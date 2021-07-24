import {Operand,Context} from './../model/index'
import {Helper} from '../helper'

export class Constant extends Operand
{    
    constructor(name:string){
      super(name,[],Helper.getType(name));
    }
    eval():any
    {
        return this.name;
    }
}
export class Variable extends Operand
{
    public context?: Context
    constructor(name:string,type:string='any'){
        super(name,[],type);  
        this.context  = undefined;
    }    
    eval():any{
        return this.context?this.context.get(this.name):null;
    }
    set(value:any){
        if(this.context)
          this.context.set(this.name,value);
    }
} 
export class KeyValue extends Operand
{
    eval():any{
        return this.children[0].eval();
    }
}
export class Array extends Operand
{
    constructor(name:string,children:Operand[]=[]){
        super(name,children,'array');
    }
    eval():any{
        let values = [];
        for(let i=0;i<this.children.length;i++){
            values.push(this.children[i].eval());    
        }
        return values;
    } 
}
export class Obj extends Operand
{
    constructor(name:string,children:Operand[]=[]){
        super(name,children,'object');
    }
    eval():any{        
        let obj:{[k: string]: any} = {};
        for(let i=0;i<this.children.length;i++){
            let value = this.children[i].eval();
            obj[this.children[i].name]=value;
        }
        return obj;
    }
} 
export class Operator extends Operand
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
export class FunctionRef extends Operand
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
export class ArrowFunction extends FunctionRef 
{
    public context?: Context
    constructor(name:string,children:Operand[]=[],_function:any=null){
        super(name,children,_function); 
        this.context = undefined;
    } 
}
export class Block extends Operand
{    
    eval():any{
        for(let i=0;i<this.children.length;i++){
            this.children[i].eval();    
        }
    } 
}

