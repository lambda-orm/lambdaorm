import { Query } from '../../../query/domain'
import { Sentence } from 'lambdaorm-base'

export interface DmlBuilderPort {
	build (sentence: Sentence): Query
}
