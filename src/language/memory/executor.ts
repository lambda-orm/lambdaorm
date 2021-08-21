import {Operand,Context} from '../../model'
import {Executor} from '../../connection'
import {IOperandExecutor} from '../'
import {MemoryLanguage} from './language'
import {Constant,Variable,Field,KeyValue,Array,Object,Operator,FunctionRef,ArrowFunction,Block,
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
        return this.evalOperand(operand);
    }
    private evalOperand(operand:Operand):any
    {
        if(operand instanceof Sentence)
            return this.evalSentence(operand);
        else if(operand instanceof Insert)
            return this.evalInsert(operand);
        else if(operand instanceof Update)
            return this.evalUpdate(operand);
        else if(operand instanceof Delete)
            return this.evalDelete(operand);
        else if(operand instanceof ArrowFunction)
            return this.evalArrowFunction(operand);
        else if(operand instanceof FunctionRef)
            return this.evalFunctionRef(operand);
        else if(operand instanceof Operator)
            return this.evaldOperator(operand);
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
    private evalInsert(operand:Insert):any
    {
        throw 'NotImplemented';
    }
    private evalUpdate(operand:Update):any
    {
        throw 'NotImplemented';
    }
    private evalDelete(operand:Delete):any
    {
        throw 'NotImplemented';
    }
    private buildArrowFunction(operand:ArrowFunction,metadata:SqlDialectMetadata):string
    {
        let template = metadata.dml(operand.name);
        for(let i=0;i<operand.children.length;i++){
            template =template.replace('{'+i+'}',this.buildOperand(operand.children[i],metadata));
        }
        return template.trim(); 
    }
    private buildFunctionRef(operand:FunctionRef,metadata:SqlDialectMetadata):string
    {
        let funcData = metadata.function(operand.name);
        if(!funcData) throw 'Function '+operand.name+' not found';        
        let text= '';
        if(funcData.type == 'multiple'){
            let template = funcData.template;
            text = this.buildOperand(operand.children[0],metadata);    
            for(let i=1;i<operand.children.length;i++){
                text =template.replace('{acumulated}',text);
                text = text.replace('{value}',this.buildOperand(operand.children[i],metadata));
            }
        }else{
            text = funcData.template;
            for(let i=0;i<operand.children.length;i++){
                text =text.replace('{'+i+'}',this.buildOperand(operand.children[i],metadata));
            }
        }
        return text;
    }
    private buildOperator(operand:Operator,metadata:SqlDialectMetadata):string
    {
        let text = metadata.operator(operand.name,operand.children.length);
        for(let i=0;i<operand.children.length;i++){
            text = text.replace('{'+i+'}',this.buildOperand(operand.children[i],metadata));
        }
        return text;  
    }
    private buildBlock(operand:Block,metadata:SqlDialectMetadata):string
    {
        let text = ''
        for(let i=0;i<operand.children.length;i++){
            text += (this.buildOperand(operand.children[i],metadata)+';');    
        }
        return text;
    }
    private buildObject(operand:Object,metadata:SqlDialectMetadata):string
    {
        let text= '';
        let template = metadata.function('as').template;
        for(let i=0;i<operand.children.length;i++){
            let value = this.buildOperand(operand.children[i],metadata);
            let alias =  metadata.delimiter(operand.children[i].name,true);              
            let fieldText = template.replace('{value}',value);
            fieldText = fieldText.replace('{alias}',alias);
            text += (i>0?', ':'')+fieldText;
        }
        return text;
    }
    private buildArray(operand:Array,metadata:SqlDialectMetadata):string
    {
        let text = ''
        for(let i=0;i<operand.children.length;i++){
            text += (i>0?', ':'')+this.buildOperand(operand.children[i],metadata);              
        }
        return text;
    }
    private buildKeyValue(operand:KeyValue,metadata:SqlDialectMetadata):string
    {
        return this.buildOperand(operand.children[0],metadata);
    }
    private buildField(operand:Field,metadata:SqlDialectMetadata):string
    {
        let parts = operand.mapping.split('.');
        if(parts.length == 1){
            let name = parts[0];
            return metadata.other('column').replace('{name}',metadata.delimiter(name,true));
        }else{
            let aliasEntity = parts[0];
            let name = parts[1];
            let text = metadata.other('field');
            text =text.replace('{entityAlias}',aliasEntity);
            text =text.replace('{name}',metadata.delimiter(name));
            return text;
        } 
    }
    private buildVariable(operand:Variable,metadata:SqlDialectMetadata):string
    {
        let number=operand._number?operand._number:0
        let text = metadata.other('variable');
        text =text.replace('{name}',operand.name);
        text =text.replace('{number}',number.toString());
        return text;
    }
    private buildConstant(operand:Constant,metadata:SqlDialectMetadata):string
    {
        switch (operand.type) {
            case 'string':
                return  SqlString.escape(operand.name);
            case 'boolean':
                return metadata.other(operand.name) 
            case 'number':
                return operand.name;      
            default:
                return SqlString.escape(operand.name);
        }
    }

}