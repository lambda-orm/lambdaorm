const {Context,Language,Operand,Constant,Variable,KeyValue,Array,Object,Operator,FunctionRef,ArrowFunction,Block} = require("../base");

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
        for(let i=0;i<this._children.length;i++){
            values.push(this.children[i].eval());    
        }
        return values;
    } 
}
class DefaultObject extends Object
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
class DefaultOperator extends Operator
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
class DefaultFunctionRef extends FunctionRef
{
    constructor(name,language,children=[],_function=null){
        super(name,language,children); 
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
class DefaultArrowFunction extends ArrowFunction {}
class DefaultBlock extends Block
{
    eval(){
        for(let i=0;i<this._children.length;i++){
            this.children[i].eval();    
        }
    } 
}

class DefaultLanguage extends Language
{
    constructor(){
        super('default');
        this._operators={};
        this._functions={};
    }
    addLibrary(library){
        this._libraries[library.name] =library;

        for(const name in library.operators){
            let operator= library.operators[name];
            for(const operands in operator){
                let metadata = operator[operands];
                if(!this._operators[name])this._operators[name]= {}; 
                this._operators[name][operands] = metadata;
            }
        }
        for(const name in library.functions){
            let metadata = library.functions[name];
            this._functions[name] = metadata; 
        }
    }
    getOperatorMetadata(name,operands){
        try{          
            if(this._operators[name]){
                let operator = this._operators[name];
                if(operator[operands])
                    return operator[operands];
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
    createOperand(name,type,children){
        if ( type == 'const')
            return new Constant(name,this._name,children);
        else if ( type == 'var')
            return new  Variable(name,this._name,children);
        else if ( type == 'keyVal')
            return new DefaultKeyValue(name,this._name,children);
        else if ( type == 'array')
            return new DefaultArray(name,this._name,children);
        else if ( type == 'obj')
            return new DefaultObject(name,this._name,children);
        else if ( type == 'oper')
            return this.createOperator(name,children);
        else if ( type == 'funcRef')
            return this.createFunctionRef(name,children);
        else if ( type == 'arrow')
            return this.createArrowFunction(name,children);
        else if ( type == 'block')
            return  new DefaultBlock(name,this._name,children);
        else
            throw 'node: '+name +' not supported';
    }
    createOperator(name,children){
        try{
            let operands =children.length;
            let metadata = this.getOperatorMetadata(name,operands);
            if(metadata.custom)                   
                return new metadata.custom(name,this._name,children,metadata['customFunction']); 
            else
                return new DefaultOperator(name,this._name,children,metadata.function);
        }
        catch(error){
            throw 'create operator: '+name+' error: '+error.toString();    
        }
    } 
    createFunctionRef(name,children){
        try{          
            let metadata = this.getFunctionMetadata(name);
            if(metadata.custom)                 
                return new metadata.custom(name,this._name,children); 
            else
                return new DefaultFunctionRef(name,this._name,children,metadata.function);
        }
        catch(error){
            throw'cretae function ref: '+name+' error: '+error.toString(); 
        }
    }
    createArrowFunction(name,children){
        try{           
            let metadata = this.getFunctionMetadata(name)
            if(metadata['custom']){                    
                return new metadata['custom'](name,this._name,children);
            } 
            else{
                let _function= metadata['function'];
                return new DefaultArrowFunction(name,this._name,children,_function);
            }
        } 
        catch(error){
            throw'cretae arrow function: '+name+' error: '+error.toString(); 
        }
    }
    reduce(operand){
        if(operand instanceof Operator){        
            let allConstants=true;              
            for(const k in operand.children){
                const p = operand.children[k];
                if( !(p instanceof Constant)){
                    allConstants=false;
                    break;
                }
            }
            if(allConstants){
                let value = operand.eval();                
                let constant= new Constant(value);
                constant.parent = operand.parent;
                constant.index = operand.index;
                return constant;
            }
            else{
                for(let i = 0;i< operand.children.length;i++){
                   const p = operand.children[i];
                   operand.children[i]=this.reduce(p,language);
                }
            }
        }
        return operand;
    } 
    nodeToOperand(node){
        let children = [];
        if(node.children){
            for(let k in node.children){
                let p = node.children[k];
                let child = this.nodeToOperand(p);
                children.push(child);
            }
        }
        return this.createOperand(node.name,node.type,children);
    }
    setContext(operand,context){
        let current = context;
        if( operand.prototype instanceof ArrowFunction){
            let childContext=current.newContext();
            operand.context = childContext;
            current = childContext;
        }
        else if(operand.prototype instanceof Variable){
            operand.context = current;
        }       
        for(const k in operand.children){
            const p = operand.children[k];
            this.setContext(p,current);
        } 
    }
    eval(operand,context,scheme,cnx){          
        if(context)this.setContext(operand,new Context(context));
        return operand.eval();
    }
}
module.exports = {   
    DefaultKeyValue: DefaultKeyValue,
    DefaultArray: DefaultArray,
    DefaultObject: DefaultObject,
    DefaultOperator: DefaultOperator,
    DefaultFunctionRef: DefaultFunctionRef,
    DefaultArrowFunction: DefaultArrowFunction,
    DefaultBlock: DefaultBlock,
    DefaultLanguage: DefaultLanguage
}