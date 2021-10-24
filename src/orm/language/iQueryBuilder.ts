import { Operand, Sentence } from './operands'
import { DialectMetadata } from './dialectMetadata'
import { Query } from './../model'
export interface IQueryBuilder
{
	build(sentence:Sentence, metadata:DialectMetadata):Query
	sentence(query:Query):any
	serialize(operand:Operand):any
	deserialize(serialized:any):Operand
}
