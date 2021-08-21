import {Operand,Context} from '../../model'
import {Variable,ArrowFunction,ILanguage,IOperandExecutor,IQueryBuilder,ISchemaBuilder} from '../'
import {MemoryExecutor} from './executor'

export class MemoryLanguage implements ILanguage
{
    public name:string
    public libraries:any
    public dialects:any
    public operators:any
    public functions:any  
    private operandExecutor:MemoryExecutor
    constructor(){
        this.name= 'memory',
        this.libraries={}; 
        this.dialects = [{name:this.name,dialect:'memory'}];
        this.operators={};
        this.functions={};        
        this.operandExecutor = new MemoryExecutor(this);
    }
    addLibrary(library:any):void
    {
        this.libraries[library.name] =library;
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
    public get schema():ISchemaBuilder
    {
        throw 'NotImplemented';
    }
    public get query():IQueryBuilder
    {
        throw 'NotImplemented';
    }
    public get executor():IOperandExecutor
    {
        return this.operandExecutor;
    }
}


