import { Query, Include } from '../../../../query/domain'
import { Connection } from '../../../../connection/application'
import { DialectService } from '../../../../language/application'
import { QueryOptions, MappingConfigService, Data, RelationType } from 'lambdaorm-base'
import { Expressions } from '3xpr'
import { QueryInternalExecutor } from './queryInternalExecutor'
import { QueryEvalConstraints } from './queryEvalConstraints'
import { QuerySolveWriteValues } from './querySolveWriteValues'

export class QueryUpdateExecutor {
	public options: QueryOptions
	private solveWriteValues: QuerySolveWriteValues
	private constraints: QueryEvalConstraints
	private executor: QueryInternalExecutor
	constructor (executor: QueryInternalExecutor, expressions: Expressions, options: QueryOptions) {
		this.options = options
		this.executor = executor
		this.solveWriteValues = new QuerySolveWriteValues(expressions)
		this.solveWriteValues = new QuerySolveWriteValues(expressions)
		this.constraints = new QueryEvalConstraints(expressions)
	}

	public async update (query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<number> {
		const entity = mapping.getEntity(query.entity)
		// solve default properties
		if (entity && entity.hadWriteValues) {
			this.solveWriteValues.solve(query, data.data)
		}
		// evaluate constraints
		this.constraints.eval(query, data.data)
		// update
		const changeCount = await connection.update(mapping, dialect, query, data)
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				await this.updateInclude(include, data)
			}
		}
		return changeCount
	}

	private async updateInclude (include: Include, data: Data): Promise<void> {
		const children = data.get(include.relation.name)
		if (children) {
			if (include.relation.type === RelationType.manyToOne) {
				for (const child of children) {
					const childData = new Data(child, data)
					await this.executor._execute(include.query, childData)
				}
			} else {
				const childData = new Data(children, data)
				await this.executor._execute(include.query, childData)
			}
		}
	}
}
