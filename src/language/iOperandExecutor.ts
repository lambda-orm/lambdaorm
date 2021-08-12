import {Operand,Context} from './../model'
import {Executor} from './../connection'
export interface IOperandExecutor
{
    execute(operand:Operand,context:Context,executor?:Executor):Promise<any>;
}