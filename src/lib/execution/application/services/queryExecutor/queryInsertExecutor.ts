import { EntityMapping } from '../../../../schema/domain'
import { Query, Data, QueryOptions } from '../../../../query/domain'
import { Connection } from '../../../../connection/application'
import { DialectService } from '../../../../language/application'
import { MappingConfigService } from '../../../../schema/application/services/config/mappingConfigService'
import { Expressions } from '3xpr'
import { QuerySolveDefaults } from './querySolveDefaults'
import { QuerySolveWriteValues } from './querySolveWriteValues'
import { QueryEvalConstraints } from './queryEvalConstraints'
import { IQueryInternalExecutor } from './iQueryInternalExecutor'

export class QueryInsertExecutor {
	public options: QueryOptions
	private solveDefaults:QuerySolveDefaults
	private solveWriteValues: QuerySolveWriteValues
	private constraints: QueryEvalConstraints
	private executor: IQueryInternalExecutor
	constructor (executor: IQueryInternalExecutor, expressions: Expressions, options: QueryOptions) {
		this.options = options
		this.executor = executor
		this.solveWriteValues = new QuerySolveWriteValues(expressions)
		this.solveDefaults = new QuerySolveDefaults(expressions)
		this.solveWriteValues = new QuerySolveWriteValues(expressions)
		this.constraints = new QueryEvalConstraints(expressions)
	}

	public async insert (query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any> {
		// before insert the relationships of the type oneToOne and oneToMany
		const autoIncrement = mapping.getAutoIncrement(query.entity)
		const entity = mapping.getEntity(query.entity) as EntityMapping

		await this.insertIncludeBefore(query, data, dialect)
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
		const insertId = await connection.insert(mapping, dialect, query, data)
		if (autoIncrement) {
			data.set(autoIncrement.name, insertId)
		}
		// after insert the relationships of the type oneToOne and manyToOne
		await this.insertIncludeAfter(query, data, dialect)
		return insertId
	}

	private async insertIncludeBefore (query: Query, data: Data, dialect: DialectService): Promise<any> {
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				const relation = data.get(include.relation.name)
				if (relation && (include.relation.type === 'oneToOne' || include.relation.type === 'oneToMany')) {
					const relationData = new Data(relation, data)
					const relationId = await this.executor._execute(include.query, relationData)
					data.set(include.relation.from, relationId)
				}
			}
		}
	}

	private async insertIncludeAfter (query: Query, data: Data, dialect: DialectService): Promise<any> {
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				const relation = data.get(include.relation.name)
				if (relation && include.relation.type === 'manyToOne') {
					const parentId = data.get(include.relation.from)
					const childPropertyName = include.relation.to
					for (const child of relation) {
						child[childPropertyName] = parentId
						const childData = new Data(child, data)
						await this.executor._execute(include.query, childData)
					}
				}
			}
		}
	}
}
