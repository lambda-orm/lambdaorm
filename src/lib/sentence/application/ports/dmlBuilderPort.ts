import { Query } from '../../../query/domain'
import { Sentence } from '../../domain'

export interface DmlBuilderPort {
	build (sentence: Sentence): Query
}
