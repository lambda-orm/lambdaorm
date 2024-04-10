import { Query } from '../../../../query/domain'
import { Connection } from '../../../../connection/application'
import { DialectService } from '../../../../language/application'
import { MappingConfigService, EntityMapping, Data } from 'lambdaorm-base'
import { QueryBulkInsertExecutor } from './queryBulkInsertExecutor'

export class QueryBulkMergeExecutor extends QueryBulkInsertExecutor {
	public async bulkMerge (query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any[]> {
		const entity = mapping.getEntity(query.entity) as EntityMapping

		// before insert the relationships of the type oneToMany and oneToOne with relation required
		await this.bulkIncludesBefore(query, data, entity, dialect)

		// insert data
		const chunkSize = this.options.chunkSize ? Math.min(connection.maxChunkSizeOnBulkInsert, this.options.chunkSize) : connection.maxChunkSizeOnBulkInsert
		let ids: any[] = []
		for (let i = 0; i < data.data.length; i += chunkSize) {
			const chunk = data.data.slice(i, i + chunkSize)
			const result = await this._chunk(query, entity, chunk, mapping, dialect, connection)
			ids = ids.concat(result)
		}
		const autoIncrement = mapping.getAutoIncrement(query.entity)
		if (autoIncrement) {
			for (let i = 0; i < data.data.length; i++) {
				data.data[i][autoIncrement.name] = ids[i]
			}
		}

		// after insert the relationships of the type manyToOne and oneToOne with relation not required
		await this.bulkIncludesAfter(query, data, mapping, dialect)
		return ids
	}

	protected override async _chunk (query: Query, entity: EntityMapping, chunk: any[], mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any[]> {
		// solve default properties
		if (entity.hadDefaults) {
			this.solveDefaults.solve(query, chunk)
		}
		// solve write properties
		if (entity.hadWriteValues) {
			this.solveWriteValues.solve(query, chunk)
		}
		// evaluate constraints
		this.constraints.eval(query, chunk)
		return connection.bulkMerge(mapping, dialect, query, chunk)
	}
}
