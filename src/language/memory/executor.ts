import {Operand,Context} from '../../model'
import {IExecutor} from '../../connection'
import {IOperandExecutor} from '../'
import {MemoryLanguage} from './language'

export class MemoryExecutor implements IOperandExecutor
{
    private language:MemoryLanguage
    constructor(language:MemoryLanguage){
        this.language=language;
    }
    public execute(operand:Operand,context:Context,scheme?:any,executor?:IExecutor):any{          
        if(context)this.language.setContext(operand,new Context(context));
        return operand.eval();
    }
}