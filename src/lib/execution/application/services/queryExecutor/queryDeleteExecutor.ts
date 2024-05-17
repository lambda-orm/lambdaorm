import { Query, Include } from '../../../../query/domain'
import { Connection } from '../../../../connection/domain'
import { DialectService } from '../../../../language/application'
import { QueryOptions, MappingConfigService, Data, RelationType } from 'lambdaorm-base'
import { QueryInternalExecutor } from './queryInternalExecutor'

export class QueryDeleteExecutor {
	public options: QueryOptions
	private executor: QueryInternalExecutor
	constructor (executor: QueryInternalExecutor, options: QueryOptions) {
		this.options = options
		this.executor = executor
	}

	public async delete (query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<number> {
		// before remove relations entities
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				await this.include(include, data)
			}
		}
		// remove main entity
		return connection.delete(mapping, dialect, query, data)
	}

	private async include (include: Include, data: Data):Promise<void> {
		const relation = data.get(include.relation.name)
		if (relation) {
			if (include.relation.type === RelationType.manyToOne) {
				for (const child of relation) {
					const childData = new Data(child, data)
					await this.executor._execute(include.query, childData)
				}
			} else {
				const childData = new Data(relation, data)
				await this.executor._execute(include.query, childData)
			}
		}
	}
}
