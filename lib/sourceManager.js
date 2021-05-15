const {Node,Model,Library,Context,Operand,Constant,Variable,KeyValue,Array,Object,Operator,FunctionRef,ArrowFunction,Block} = require("./base.js");

module.exports = class SourceManager
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
    addLibrary(library){
        this._libraries[library.name] =library;
        for(const name in library.enums){
            this._model.addEnum(name,library.enums[name]);
        }
        for(const name in library.operators){
            let operator= library.operators[name];
            for(const cardinality in operator){
                let data = operator[cardinality];
                this._model.addOperator(name,cardinality,data.metadata);
            }
        }
        for(const name in library.functions){
            let data = library.functions[name];
            this._model.addFunction(name,data.metadata);
        }
    }
    nodeToOperand(node){
        children = [];
        for(p in node.children){
            child = this.nodeToOperand(p);
            children.append(child);
        }
        operand = this.createOperand(node.name,node.type,children);
        operand.id = node.id;
        return operand;
    } 
    reduce(operand){
        if(operand instanceof Operator){        
            let allConstants=true;              
            for( p in operand.children){
                if( !(p instanceof Constant)){
                    allConstants=false;
                    break;
                }
            }
            if(allConstants){
                value = operand.eval();                
                constant= Constant(value.value);
                constant.parent = operand.parent;
                constant.index = operand.index;
                return constant;
            }
            else{
                for(let i = 0;i< operand.children.length;i++){
                   const p = operand.children[i];
                   operand.children[i]=this.reduce(p);
                }
            }
        }
        return operand;
    } 
    setParent(operand,index=0,parent=null){        
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
    createOperand(name,type,children){
        if ( type == 'const')
            return Constant(name,children);
        else if ( type == 'var')
            return Variable(name,children);
        else if ( type == 'keyVal')
            return KeyValue(name,children);
        else if ( type == 'array')
            return Array(name,children);
        else if ( type == 'obj')
            return Object(name,children);
        else if ( type == 'oper')
            return this.createOperator(name,children);
        else if ( type == 'funcRef')
            return this.createFunctionRef(name,children);
        else if ( type == 'arrow')
            return this.createArrowFunction(name,children);
        else if ( type == 'block')
            return  Block(name,children);
        else
            throw 'node: '+name +' not supported';
    } 
    createOperator(name,children){
        try{
            let cardinality =len(children)
            let metadata = this._model.getOperatorMetadata(name,cardinality);            
            if(this._libraries[metadata.lib]){
                let implementation= this._libraries[metadata.lib].operators[name][cardinality];
                if(implementation.custom)                   
                    return implementation.custom(name,children,implementation['customFunction']); 
                else
                    return Operator(name,children,implementation.function);
            }
            return null;
        }
        catch(error){
            throw 'create operator: '+name+' error: '+error.toString();    
        }
    } 
    createFunctionRef(name,children){
        try{          
            let metadata = this._model.getFunctionMetadata(name);
            if(this._libraries[metadata.lib]){
                let implementation= this._libraries[metadata.lib].functions[name];
                if(implementation.custom)                 
                    return implementation.custom(name,children); 
                else
                    return FunctionRef(name,children,implementation.function);
            }
            return null;
        }
        catch(error){
            throw'cretae function ref: '+name+' error: '+error.toString(); 
        }
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
        for(p in operand.children)
            this.setContext(p,current);
        } 
    }
    serialize(operand){
        let children = []                
        for(const p in operand.children)
            children.push(this.serialize(operand.children[p]));
        if(children.length == 0) return {'n':operand.name,'t':operand.type};     
        return {'n':operand.name,'t':operand.type,'c':children}; 
    }
    deserialize(serialized){
        let operand = this._deserialize(serialized)
        return this.setParent(operand);
    }
    _deserialize(serialized){
        let children = []
        if(serialized.c)
            for(const p in serialized.c)
                children.push(this._deserialize(p));
        return this.createOperand(serialized['n'],serialized['t'],children)
    } 
    compile(node){
        let operand =this.nodeToOperand(node);
        operand =this.reduce(operand);
        operand =this.setParent(operand);
        return operand;
    } 
    eval(operand,context){
        if(context)this.setContext(operand,Context(context))
        try{   
            return operand.eval(token);
        }catch(error){
            throw 'eval: '+Operand.name+' error: '+error.toString(); 
        }
    }
}       
