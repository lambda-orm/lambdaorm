import {Operand,Delta} from '../../model'
import {Node} from '../../node'
import {OperandManager,Constant,Variable,Operator} from '../'
import {DefaultKeyValue,DefaultArray,DefaultObject,DefaultOperator,DefaultFunctionRef,DefaultArrowFunction,DefaultBlock} from './operands'
import {SchemaHelper} from '../../schema/schemaHelper'
import {MemoryLanguage} from './language'

export class MemoryOperandManager extends OperandManager
{   
    private language:MemoryLanguage
    constructor(language:MemoryLanguage){
        super();
        this.language=language;
    }
    public build(node:Node,dialect:string,schema:SchemaHelper):Operand
    {
        let operand:Operand = this.nodeToOperand(node);
        operand = this.reduce(operand);
        operand =this.setParent(operand);
        return operand;
    }
    public schemaSql(schema:SchemaHelper,delta:Delta,variant:string):string
    {
        throw 'NotImplemented';
    }    
    public sentence(operand:Operand):string
    {
        throw 'NotImplemented';
    }
    public model(operand:Operand):any
    {
        throw 'NotImplemented';
    }
    private nodeToOperand(node:Node):Operand
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
    private createOperand(name:string,type:string,children:Operand[]=[]){
        if ( type == 'const')
            return new Constant(name);
        else if ( type == 'var')
            return new  Variable(name);
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
    private createOperator(name:string,children:Operand[]=[]){
        try{
            let operands =children.length;
            let metadata = this.language.getOperatorMetadata(name,operands);
            if(metadata.custom)                   
                return new metadata.custom(name,children,metadata['customFunction']); 
            else
                return new DefaultOperator(name,children,metadata.function);
        }
        catch(error){
            throw 'create operator: '+name+' error: '+error.toString();    
        }
    } 
    private createFunctionRef(name:string,children:Operand[]=[]){
        try{          
            let metadata = this.language.getFunctionMetadata(name);
            if(metadata.custom)                 
                return new metadata.custom(name,children); 
            else
                return new DefaultFunctionRef(name,children,metadata.function);
        }
        catch(error){
            throw'cretae function ref: '+name+' error: '+error.toString(); 
        }
    }
    private createArrowFunction(name:string,children:Operand[]=[]){
        try{           
            let metadata = this.language.getFunctionMetadata(name)
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
    protected _deserialize(serialized:any):Operand
    {
        let children = []
        if(serialized.c)
            for(const k in serialized.c){
                const p = serialized.c[k];
                children.push(this._deserialize(p));
            }
        return this.createOperand(serialized['n'],serialized['t'],children)
    }
    private reduce(operand:Operand){
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
}