import {Operand,Context} from './../model'
import {IExecutor} from './../connection'
export interface IOperandExecutor
{
    execute(operand:Operand,context:Context,executor?:IExecutor):Promise<any>;
}