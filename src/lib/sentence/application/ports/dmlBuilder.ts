import { Query } from '../../../query/domain'
import { Sentence } from 'lambdaorm-base'

export interface DmlBuilder {
	build (sentence: Sentence): Query
}
