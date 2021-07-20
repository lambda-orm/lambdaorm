import {OperandManager,SchemaBuilder,OperandExecutor} from './../language'

export interface ILanguage
{   
    name:string
    dialects:any
    get schema():SchemaBuilder
    get operand():OperandManager
    get executor():OperandExecutor
}