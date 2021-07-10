import {Operand} from './../../model'
import {Constant,Variable,KeyValue,Array,Obj,Operator,FunctionRef,ArrowFunction,Block} from '../operands'

export class DefaultKeyValue extends KeyValue
{
    eval(){
        return this.children[0].eval();
    }
}
export class DefaultArray extends Array
{
    eval(){
        let values = [];
        for(let i=0;i<this.children.length;i++){
            values.push(this.children[i].eval());    
        }
        return values;
    } 
}
export class DefaultObject extends Obj
{
    eval():any{        
        let obj:{[k: string]: any} = {};
        for(let i=0;i<this.children.length;i++){
            let value = this.children[i].eval();
            obj[this.children[i].name]=value;
        }
        return obj;
    }
} 
export class DefaultOperator extends Operator
{
    constructor(name:string,children:Operand[]=[],_function=null){
        super(name,children); 
        this._function = _function;
    }    
    eval(){        
        let args= []
        for(let i=0;i<this.children.length;i++){
            args.push(this.children[i].eval()); 
        }
        return this._function(...args);  
    }
}                             
export class DefaultFunctionRef extends FunctionRef
{
    constructor(name:string,children:Operand[]=[],_function=null){
        super(name,children); 
        this._function = _function;
    }    
    eval(){        
        let args= []
        for(let i=0;i<this.children.length;i++){
            args.push(this.children[i].eval()); 
        }
        return this._function(...args);  
    }
}
export class DefaultArrowFunction extends ArrowFunction {}
export class DefaultBlock extends Block
{
    eval(){
        for(let i=0;i<this.children.length;i++){
            this.children[i].eval();    
        }
    } 
}



// export {   
//     DefaultKeyValue,
//     DefaultArray,
//     DefaultObject,
//     DefaultOperator,
//     DefaultFunctionRef,
//     DefaultArrowFunction,
//     DefaultBlock
// }