/* eslint-disable linebreak-style */
import { Context } from './../model'
import { Operand } from './operands'
import { Executor } from './../connection'
export interface IOperandExecutor
{
  execute(operand:Operand, context:Context, executor?:Executor):Promise<any>
}
