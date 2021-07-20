import {Node} from './../parser'
import {SchemaHelper}  from '../schema/schemaHelper'
import {Operand } from './operand'

export interface IOperandManager
{   
    build(node:Node,dialect:string,scheme?:SchemaHelper):Operand
    sql(operand:Operand):string
    model(operand:Operand):any
    deserialize(serialized:any):Operand
    serialize(value:Operand):any
}