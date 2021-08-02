import {Node} from './../parser'
import {SchemaHelper}  from '../schema/schemaHelper'
import {Operand } from './../model'

export interface IOperandManager
{   
    build(node:Node,dialect:string,scheme?:SchemaHelper):Operand
    sentence(operand:Operand):string
    model(operand:Operand):any
    deserialize(serialized:any):Operand
    serialize(value:Operand):any
}