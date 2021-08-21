import {Operand} from './../model'
import {Sentence,Query} from './operands'
export interface IQueryBuilder
{  
    build(sentence:Sentence,dialect:string):Query
    sentence(query:Query):any
    serialize(operand:Operand):any
    deserialize(serialized:any):Operand    
}