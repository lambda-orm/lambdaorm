import {Operand,Constant,Variable,KeyValue,Array,Obj,Operator,FunctionRef,ArrowFunction,Block} from '../operands'

class DefaultKeyValue extends KeyValue
{
    eval(){
        return this.children[0].eval();
    }
}
class DefaultArray extends Array
{
    eval(){
        let values = [];
        for(let i=0;i<this.children.length;i++){
            values.push(this.children[i].eval());    
        }
        return values;
    } 
}
class DefaultObject extends Obj
{
    eval(){        
        let dic= {}
        for(let i=0;i<this.children.length;i++){
            let value = this.children[i].eval();
            dic[this.children[i].name]=value;
        }
        return dic;
    }
} 
class DefaultOperator extends Operator
{
    constructor(name,children=[],_function=null){
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
class DefaultFunctionRef extends FunctionRef
{
    constructor(name,language,children=[],_function=null){
        super(name,language,children); 
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
class DefaultArrowFunction extends ArrowFunction {}
class DefaultBlock extends Block
{
    eval(){
        for(let i=0;i<this.children.length;i++){
            this.children[i].eval();    
        }
    } 
}



export {   
    DefaultKeyValue,
    DefaultArray,
    DefaultObject,
    DefaultOperator,
    DefaultFunctionRef,
    DefaultArrowFunction,
    DefaultBlock
}