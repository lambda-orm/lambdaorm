import {OperandManager} from './operandManager'
import {ISchemaBuilder} from './iSchemaBuilder'
import {IOperandExecutor} from './iOperandExecutor'
export interface ILanguage
{   
    name:string
    dialects:any
    get schema():ISchemaBuilder
    get operand():OperandManager
    get executor():IOperandExecutor
}