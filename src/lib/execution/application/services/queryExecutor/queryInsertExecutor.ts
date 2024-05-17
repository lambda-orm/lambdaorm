import { Query } from '../../../../query/domain'
import { Connection } from '../../../../connection/domain'
import { DialectService } from '../../../../language/application'
import { QueryOptions, MappingConfigService, Data, EntityMapping, RelationType } from 'lambdaorm-base'
import { Expressions } from '3xpr'
import { QuerySolveDefaults } from './querySolveDefaults'
import { QuerySolveWriteValues } from './querySolveWriteValues'
import { QueryEvalConstraints } from './queryEvalConstraints'
import { QueryInternalExecutor } from './queryInternalExecutor'
export class QueryInsertExecutor {
	public options: QueryOptions
	protected solveDefaults:QuerySolveDefaults
	protected solveWriteValues: QuerySolveWriteValues
	protected constraints: QueryEvalConstraints
	protected executor: QueryInternalExecutor
	constructor (executor: QueryInternalExecutor, expressions: Expressions, options: QueryOptions) {
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
		const insertId = await connection.insert(mapping, dialect, query, data)
		if (autoIncrement) {
			data.set(autoIncrement.name, insertId)
		}
		// after insert the relationships of the type oneToOne and manyToOne
		await this.includeAfter(query, data, dialect)
		return insertId
	}

	protected async includeBefore (query: Query, data: Data, dialect: DialectService): Promise<any> {
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				const relation = data.get(include.relation.name)
				if (relation && (include.relation.type === RelationType.oneToOne || include.relation.type === RelationType.oneToMany)) {
					const relationData = new Data(relation, data)
					const relationId = await this.executor._execute(include.query, relationData)
					data.set(include.relation.from, relationId)
				}
			}
		}
	}

	protected async includeAfter (query: Query, data: Data, dialect: DialectService): Promise<any> {
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				const relation = data.get(include.relation.name)
				if (relation && include.relation.type === RelationType.manyToOne) {
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
