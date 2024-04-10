import { Include, Query } from '../../../../query/domain'
import { Connection } from '../../../../connection/application'
import { DialectService } from '../../../../language/application'
import { MappingConfigService, QueryOptions, EntityMapping, Data, RelationType } from 'lambdaorm-base'
import { QueryInternalExecutor } from './queryInternalExecutor'

export class QueryBulkDeleteExecutor {
	public options: QueryOptions
	private executor: QueryInternalExecutor
	constructor (executor: QueryInternalExecutor, options: QueryOptions) {
		this.options = options
		this.executor = executor
	}

	public async bulkDelete (query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<void> {
		// before remove relations entities
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				await this.include(include, data)
			}
		}

		// delete data
		const chunkSize = this.options.chunkSize ? Math.min(connection.maxChunkSizeOnBulkInsert, this.options.chunkSize) : connection.maxChunkSizeOnBulkInsert
		let ids: any[] = []
		for (let i = 0; i < data.data.length; i += chunkSize) {
			const chunk = data.data.slice(i, i + chunkSize)
			const result = await connection.bulkDelete(mapping, dialect, query, chunk)
			ids = ids.concat(result)
		}
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

	protected async _chunk (query: Query, entity: EntityMapping, chunk: any[], mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<void> {
		connection.bulkDelete(mapping, dialect, query, chunk)
	}
}
