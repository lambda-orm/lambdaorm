import { Query } from '../../../query/domain'
export interface DMLBuilder {
	build(source: any): Query
}
