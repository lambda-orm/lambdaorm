import {Operand,Context} from '../../model'
import {Executor} from '../../connection'
import {IOperandExecutor} from '../'
import {MemoryLanguage} from './language'
import {Constant,Variable,Field,KeyValue,Array,Object,Operator,FunctionRef,ChildFunction,ArrowFunction,Block,
    Sentence,From,Join,Map,Filter,GroupBy,Having,Sort,Insert,Update,Delete,
    SentenceInclude,Query,Include} from './../operands'

export class MemoryExecutor implements IOperandExecutor
{
    private language:MemoryLanguage
    constructor(language:MemoryLanguage){
        this.language=language;
    }
    public execute(operand:Operand,context:Context,scheme?:any,executor?:Executor):any
    {          
        if(context)this.language.setContext(operand,new Context(context));
        return this.eval(operand);
    }
    private eval(operand:Operand):any
    {
        if(operand instanceof Sentence)
            return this.evalSentence(operand);
        else if(operand instanceof ArrowFunction)
            return this.evalArrowFunction(operand);
        else if(operand instanceof ChildFunction)
            return this.evalChildFunction(operand);    
        else if(operand instanceof FunctionRef)
            return this.evalFunctionRef(operand);
        else if(operand instanceof Operator)
            return this.evalOperator(operand);
        else if(operand instanceof Block)
            return this.evalBlock(operand);
        else if(operand instanceof Object)
            return this.evalObject(operand);
        else if(operand instanceof Array)
            return this.evalArray(operand);
        else if(operand instanceof KeyValue)
            return this.evalKeyValue(operand);
        else if(operand instanceof Field)
            return this.evalField(operand);
        else if(operand instanceof Variable)
            return this.evalVariable(operand);
        else if(operand instanceof Constant)
            return this.evalConstant(operand);
        else
            throw `Operand ${operand.type} ${operand.name} not supported`;
    }
    private evalSentence(sentence:Sentence):any
    {
        throw 'NotImplemented';
    }
    private evalArrowFunction(operand:ArrowFunction):any
    {
        //TODO: revisar
        let metadata = this.language.getFunctionMetadata(operand.name);
        if(metadata.custom)                 
            return new metadata.custom(operand.name,operand.children).eval(); 
        else{
            let args= []
            for(let i=0;i<operand.children.length;i++){
                args.push(this.eval(operand.children[i])); 
            }
            return metadata.function(...args); 
        }  
    }
    private evalChildFunction(operand:ArrowFunction):any
    {
        //TODO: revisar
        let metadata = this.language.getFunctionMetadata(operand.name);
        if(metadata.custom)                 
            return new metadata.custom(operand.name,operand.children).eval(); 
        else{
            let args= []
            for(let i=0;i<operand.children.length;i++){
                args.push(this.eval(operand.children[i])); 
            }
            return metadata.function(...args); 
        }  
    }
    private evalFunctionRef(operand:FunctionRef):any
    {
        let metadata = this.language.getFunctionMetadata(operand.name);
        if(metadata.custom)                 
            return new metadata.custom(operand.name,operand.children).eval(); 
        else{
            let args= []
            for(let i=0;i<operand.children.length;i++){
                args.push(this.eval(operand.children[i])); 
            }
            return metadata.function(...args); 
        }   
    }
    private evalOperator(operand:Operator):any
    {        
        let metadata = this.language.getOperatorMetadata(operand.name,operand.children.length);
        if(metadata.custom)                   
            return metadata.custom(operand.name,operand.children,metadata['customFunction']).eval(); 
        else{
            let args= []
            for(let i=0;i<operand.children.length;i++){
                args.push(this.eval(operand.children[i])); 
            }
            return metadata.function(...args); 
        } 
    }
    private evalBlock(operand:Block):any
    {
        for(let i=0;i<operand.children.length;i++){
            this.eval(operand.children[i]);    
        }
    }
    private evalObject(operand:Object):any
    {
        let obj:{[k: string]: any} = {};
        for(let i=0;i<operand.children.length;i++){
            let value = this.eval(operand.children[i]);
            obj[operand.children[i].name]=value;
        }
        return obj;
    }
    private evalArray(operand:Array):any
    {
        let values = [];
        for(let i=0;i<operand.children.length;i++){
            values.push(this.eval(operand.children[i]));    
        }
        return values;
    }
    private evalKeyValue(operand:KeyValue):any
    {
        return this.eval(operand.children[0]);
    }
    private evalField(operand:Field):any
    {
        throw 'NotImplemented'; 
    }
    private evalVariable(operand:Variable):any
    {
        return operand.context?operand.context.get(operand.name):null;
    }
    private evalConstant(operand:Constant):any
    {
        return operand.name;
    }
}