import {IExecutor,Operand,Context,Delta } from './../../model/index'
import {Node} from './../../parser/index'
import {SchemaHelper,Language,Constant,Variable,KeyValue,Array,Obj,Operator,FunctionRef,ArrowFunction,Block} from '../index'
import {DefaultKeyValue,DefaultArray,DefaultObject,DefaultOperator,DefaultFunctionRef,DefaultArrowFunction,DefaultBlock} from './operands'

export class DefaultLanguage extends Language
{
    constructor(){
        super('default');
        this.operators={};
        this.functions={};
    }
    addLibrary(library:any){
        this._libraries[library.name] =library;

        for(const name in library.operators){
            let operator= library.operators[name];
            for(const operands in operator){
                let metadata = operator[operands];
                if(!this.operators[name])this.operators[name]= {}; 
                this.operators[name][operands] = metadata;
            }
        }
        for(const name in library.functions){
            let metadata = library.functions[name];
            this.functions[name] = metadata; 
        }
    }
    getOperatorMetadata(name:string,operands:number){
        try{          
            if(this.operators[name]){
                let operator = this.operators[name];
                if(operator[operands])
                    return operator[operands];
            }
            return null
        }            
        catch(error){
            throw 'error with operator: '+name;
        }
    } 
    getFunctionMetadata(name:string){
        try{
            if(this.functions[name])
                return this.functions[name];
            return null
        }
        catch(error){
            throw 'error with function: '+name;
        }
    }
    createOperand(name:string,type:string,children:Operand[]=[]){
        if ( type == 'const')
            return new Constant(name,children);
        else if ( type == 'var')
            return new  Variable(name,children);
        else if ( type == 'keyVal')
            return new DefaultKeyValue(name,children);
        else if ( type == 'array')
            return new DefaultArray(name,children);
        else if ( type == 'obj')
            return new DefaultObject(name,children);
        else if ( type == 'oper')
            return this.createOperator(name,children);
        else if ( type == 'funcRef')
            return this.createFunctionRef(name,children);
        else if ( type == 'arrow')
            return this.createArrowFunction(name,children);
        else if ( type == 'block')
            return  new DefaultBlock(name,children);
        else
            throw 'node: '+name +' not supported';
    }
    createOperator(name:string,children:Operand[]=[]){
        try{
            let operands =children.length;
            let metadata = this.getOperatorMetadata(name,operands);
            if(metadata.custom)                   
                return new metadata.custom(name,children,metadata['customFunction']); 
            else
                return new DefaultOperator(name,children,metadata.function);
        }
        catch(error){
            throw 'create operator: '+name+' error: '+error.toString();    
        }
    } 
    createFunctionRef(name:string,children:Operand[]=[]){
        try{          
            let metadata = this.getFunctionMetadata(name);
            if(metadata.custom)                 
                return new metadata.custom(name,children); 
            else
                return new DefaultFunctionRef(name,children,metadata.function);
        }
        catch(error){
            throw'cretae function ref: '+name+' error: '+error.toString(); 
        }
    }
    createArrowFunction(name:string,children:Operand[]=[]){
        try{           
            let metadata = this.getFunctionMetadata(name)
            if(metadata['custom']){                    
                return new metadata['custom'](name,children);
            } 
            else{
                let _function= metadata['function'];
                return new DefaultArrowFunction(name,children,_function);
            }
        } 
        catch(error){
            throw'cretae arrow function: '+name+' error: '+error.toString(); 
        }
    }
    protected _deserialize(serialized:any,language:string):Operand
    {
        let children = []
        if(serialized.c)
            for(const k in serialized.c){
                const p = serialized.c[k];
                children.push(this._deserialize(p,language));
            }
        return this.createOperand(serialized['n'],serialized['t'],children)
    }
    reduce(operand:Operand){
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
                   operand.children[i]=this.reduce(p);
                }
            }
        }
        return operand;
    } 
    nodeToOperand(node:Node):Operand
    {
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
    setContext(operand:Operand,context:Context){
        let current = context;
        if( operand instanceof ArrowFunction){
            let arrow = operand as ArrowFunction;
            let childContext=current.newContext();
            arrow.context   = childContext;
            current = childContext;
        }
        else if(operand instanceof Variable){
            operand.context = current;
        }       
        for(const k in operand.children){
            const p = operand.children[k];
            this.setContext(p,current);
        } 
    }
    public schemaSql(schema:SchemaHelper,delta:Delta,variant:string):string
    {
        throw 'NotImplemented';
    }
    public compile(node:Node,scheme:SchemaHelper):Operand
    {
        let operand:Operand = this.nodeToOperand(node);
        operand = this.reduce(operand);
        operand =this.setParent(operand);
        return operand;
    }
    public sql(operand:Operand):string
    {
        throw 'NotImplemented';
    }
    public model(operand:Operand):any
    {
        throw 'NotImplemented';
    }
    public sentence(operand:Operand,variant:string):any{
        throw 'NotImplemented';
    } 
    public execute(operand:Operand,context:Context,scheme?:any,executor?:IExecutor):any{          
        if(context)this.setContext(operand,new Context(context));
        return operand.eval();
    }
}