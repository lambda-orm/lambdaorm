import {OperandManager,SchemaBuilder,OperandExecutor} from './../language'

export interface ILanguage
{   
    name:string
    get schema():SchemaBuilder
    get operand():OperandManager
    get executor():OperandExecutor
}