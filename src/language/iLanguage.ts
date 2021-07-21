import {IOperandManager} from './iOperandManager'
import {ISchemaBuilder} from './iSchemaBuilder'
import {IOperandExecutor} from './iOperandExecutor'
export interface ILanguage
{   
    name:string
    dialects:any
    get schema():ISchemaBuilder
    get operand():IOperandManager
    get executor():IOperandExecutor
}