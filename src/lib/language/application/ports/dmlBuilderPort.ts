import { Query } from '../../../query/domain'
export interface DMLBuilderPort {
	build(source: any): Query
}
