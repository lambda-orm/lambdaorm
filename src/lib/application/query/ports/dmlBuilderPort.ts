import { Sentence, Query } from '../../../domain'

export interface DmlBuilderPort {
	build (sentence: Sentence): Query
}
