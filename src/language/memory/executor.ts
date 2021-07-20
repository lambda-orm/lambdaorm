import {IExecutor,Operand,Context} from '../../model'
import {OperandExecutor} from '../'
import {MemoryLanguage} from './language'

export class MemoryExecutor extends OperandExecutor
{
    private language:MemoryLanguage
    constructor(language:MemoryLanguage){
        super();
        this.language=language;
    }
    public execute(operand:Operand,context:Context,scheme?:any,executor?:IExecutor):any{          
        if(context)this.language.setContext(operand,new Context(context));
        return operand.eval();
    }
}