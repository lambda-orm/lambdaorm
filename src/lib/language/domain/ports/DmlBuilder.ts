import { Sentence } from 'lambdaorm-base'
import { Query } from '../../../query/domain'
export interface DmlBuilder {
	build (sentence: Sentence): Query
}
