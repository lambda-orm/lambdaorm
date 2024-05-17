import { Query } from '../../../../query/domain'
import { Connection } from '../../../../connection/domain'
import { DialectService } from '../../../../language/domain'
import { MappingConfigService, Data, EntityMapping } from 'lambdaorm-base'
import { QueryInsertExecutor } from './queryInsertExecutor'
export class QueryUpsertExecutor extends QueryInsertExecutor {
	public async upsert (query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any> {
		// before insert the relationships of the type oneToOne and oneToMany
		const autoIncrement = mapping.getAutoIncrement(query.entity)
		const entity = mapping.getEntity(query.entity) as EntityMapping

		await this.includeBefore(query, data, dialect)
		// solve default properties
		if (entity.hadDefaults) {
			this.solveDefaults.solve(query, data.data)
		}
		// solve default properties
		if (entity.hadWriteValues) {
			this.solveWriteValues.solve(query, data.data)
		}
		// evaluate constraints
		this.constraints.eval(query, data.data)
		// insert main entity
		const insertId = await connection.upsert(mapping, dialect, query, data)
		if (autoIncrement) {
			data.set(autoIncrement.name, insertId)
		}
		// after insert the relationships of the type oneToOne and manyToOne
		await this.includeAfter(query, data, dialect)
		return insertId
	}
}
