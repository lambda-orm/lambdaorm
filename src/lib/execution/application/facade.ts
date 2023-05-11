import { Query, ExecuteResult, QueryOptions } from '../../query/domain'
import { SchemaFacade } from '../../schema/application'
import { LanguagesService } from '../../language/application'
import { Transaction } from '../domain'
import { IOrmExpressions } from '../../shared/domain'
import { ConnectionFacade } from '../../connection/application'
import { Executor } from './services/executor'

export class ExecutionFacade {
	private executor:Executor

	constructor (private readonly connectionFacade: ConnectionFacade,
	private readonly languages: LanguagesService,
	private readonly schemaFacade: SchemaFacade,
	private readonly expressions: IOrmExpressions) {
		this.executor = new Executor(this.connectionFacade, this.languages, this.schemaFacade, this.expressions)
	}

	public async execute (query: Query, data: any, options: QueryOptions): Promise<any> {
		return this.executor.execute(query, data, options)
	}

	public async executeList (queries: Query[], options: QueryOptions): Promise<ExecuteResult[]> {
		return this.executor.executeList(queries, options)
	}

	public async transaction (options: QueryOptions, callback: { (tr: Transaction): Promise<void> }): Promise<void> {
		return this.executor.transaction(options, callback)
	}
}
