import { RelationType, EntityMapping } from '../../../../schema/domain'
import { Query, Include, Data, QueryOptions } from '../../../../query/domain'
import { Helper } from '../../../../shared/application'
import { Connection } from '../../../../connection/application'
import { DialectService } from '../../../../language/application'
import { MappingConfigService } from '../../../../schema/application/services/config/mappingConfigService'
import { Expressions } from '3xpr'
import { IQueryInternalExecutor } from './iQueryInternalExecutor'
import { QuerySolveReadValues } from './querySolveReadValues'

export class QuerySelectExecutor {
	private solveReadValues: QuerySolveReadValues

	constructor (
		private readonly executor: IQueryInternalExecutor,
		expressions: Expressions,
		public readonly options: QueryOptions,
		private readonly helper:Helper) {
		this.options = options
		this.executor = executor
		this.solveReadValues = new QuerySolveReadValues(expressions, this.helper)
	}

	public async select (query: Query, data: Data, mapping: MappingConfigService, dialect: DialectService, connection: Connection): Promise<any> {
		const mainResult = await connection.select(mapping, dialect, query, data)
		const entity = mapping.getEntity(query.entity) as EntityMapping

		if (mainResult.length > 0) {
			// get rows for include relations
			if (entity.hadReadValues) {
				this.solveReadValues.solve(query, mainResult)
			}
			await this.selectIncludes(query, data, mainResult, dialect, connection)
			// clear temporal fields used for include relations
			this.selectClearTemporalFields(query, mainResult)
		}

		return mainResult
	}

	private async selectIncludes (query: Query, data: Data, mainResult: any, dialect: DialectService, connection: Connection): Promise<any> {
		const idsChunkSize = this.options.chunkSize ? Math.min(connection.maxChunkSizeIdsOnSelect, this.options.chunkSize) : connection.maxChunkSizeIdsOnSelect
		const chunkSize = this.options.chunkSize ? Math.min(connection.maxChunkSizeOnSelect, this.options.chunkSize) : connection.maxChunkSizeOnSelect
		for (const include of query.includes) {
			if (!include.relation.composite || !dialect.solveComposite) {
				await this.selectInclude(include, data, mainResult, idsChunkSize, chunkSize)
			}
		}
	}

	private async selectInclude (include: Include, data: Data, mainResult: any, idsChunkSize: number, chunkSize:number): Promise<any> {
		let chunks: any[] = []
		const keyId = '__' + include.relation.from

		if (mainResult.length > idsChunkSize) {
			const promises: any[] = []
			for (let i = 0; i < mainResult.length; i += idsChunkSize) {
				const chunk = mainResult.slice(i, i + idsChunkSize)
				promises.push(this.selectChunkResult(chunk, keyId))
			}
			chunks = await Promise.all(promises)
		} else {
			chunks = [this.selectChunkResult(mainResult, keyId)]
		}

		const promises2: any[] = []
		for (const chunk of chunks) {
			if (chunk.ids !== undefined && chunk.ids.length > 0) {
				promises2.push(this.selectChild(include, data, chunk.ids, chunk.result, chunkSize))
			}
		}
		await Promise.all(promises2)
	}

	private selectClearTemporalFields (query: Query, mainResult: any):void {
		for (const p in query.includes) {
			const include = query.includes[p]
			const keyId = '__' + include.relation.from
			for (const element of mainResult) {
				const item = element[include.name]
				delete element[keyId]
				if (include.relation.type === RelationType.manyToOne) {
					for (const child of item) {
						delete child.LambdaOrmParentId
					}
				} else if (item) {
					delete item.LambdaOrmParentId
				}
			}
		}
	}

	private selectChunkResult (result: any[], keyId: string): any {
		const ids: any[] = []
		for (const item of result) {
			const id = item[keyId]
			// Replace for performance
			let exists = false
			for (const _id of ids) {
				if (_id === id) {
					exists = true
					break
				}
			}
			if (!exists && id !== undefined && id !== null) {
				ids.push(id)
			}
		}
		return { ids, result }
	}

	private selectChunkIds (result: any[], keyId: string): any[] {
		const ids: any[] = []
		for (const item of result) {
			const id = item[keyId]
			// Replace for performance
			let exists = false
			for (const _id of ids) {
				if (_id === id) {
					exists = true
					break
				}
			}
			if (!exists) {
				ids.push(id)
			}
		}
		return ids
	}

	private async selectChild (include: Include, _data: Data, ids: any[], mainResult: any, chunkSize:number): Promise<any> {
		const data = _data.clone()
		data.set('LambdaOrmParentId', ids)
		const keyId = '__' + include.relation.from
		const includeResult = await this.executor._execute(include.query, data)
		if (include.relation.type === RelationType.manyToOne) {
			if (includeResult.length > chunkSize) {
				const promises: any[] = []
				for (let i = 0; i < includeResult.length; i += chunkSize) {
					const chunk = includeResult.slice(i, i + chunkSize)
					promises.push(this.selectChildSetManyToOne(mainResult, chunk, include.name, keyId))
				}
				await Promise.all(promises)
			} else {
				this.selectChildSetManyToOne(mainResult, includeResult, include.name, keyId)
			}
		} else {
			if (includeResult.length > chunkSize) {
				const promises: any[] = []
				for (let i = 0; i < includeResult.length; i += chunkSize) {
					const chunk = includeResult.slice(i, i + chunkSize)
					promises.push(this.selectChildSetOneToMany(mainResult, chunk, include.name, keyId))
				}
				await Promise.all(promises)
			} else {
				this.selectChildSetOneToMany(mainResult, includeResult, include.name, keyId)
			}
		}
	}

	private selectChildSetManyToOne (mainResult: any[], includeResult: any[], propertyName: string, keyId: string) {
		for (const element of mainResult) {
			const relationId = element[keyId]
			if (element[propertyName] === undefined) {
				element[propertyName] = []
			}
			for (const item of includeResult) {
				if (item.LambdaOrmParentId === relationId) {
					element[propertyName].push(item)
				}
			}
		}
	}

	private selectChildSetOneToMany (mainResult: any[], includeResult: any[], propertyName: string, keyId: string) {
		for (const element of mainResult) {
			const relationId = element[keyId]
			if (element[propertyName] === undefined) {
				element[propertyName] = null
			}
			for (const item of includeResult) {
				if (item.LambdaOrmParentId === relationId) {
					element[propertyName] = item
					break
				}
			}
		}
	}
}
