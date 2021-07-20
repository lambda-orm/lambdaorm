import {Context} from './context'
import {IExecutor} from './iExecutor'
import {Operand} from './operand'
export interface IOperandExecutor
{
    execute(operand:Operand,context:Context,executor?:IExecutor):Promise<any>;
}